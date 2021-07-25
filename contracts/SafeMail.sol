// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

interface Arbitrator {
     function arbitrationCost(bytes memory _extraData) external returns(uint);
     function createDispute(uint _choices, bytes memory _extraData) external payable returns(uint);
 }
 
contract SafeMail is ERC20, Ownable, ERC20Permit {
    Arbitrator public arbitrator;
    bytes public arbitratorExtraData; // Extra data to require particular dispute and appeal behaviour.

    modifier onlyArbitrator {require(msg.sender == address(arbitrator), "Can only be called by the arbitrator."); _;}

    event Mail(uint mailId, address sender, address receiver, string content);
    event MetaEvidence(uint indexed _metaEvidenceID, string _evidence);
    event Dispute(Arbitrator indexed _arbitrator, uint indexed _disputeID, uint _metaEvidenceID, uint _evidenceGroupID);
    event Evidence(Arbitrator indexed _arbitrator, uint indexed _evidenceGroupID, address indexed _party, string _evidence);
    event Ruling(Arbitrator indexed _arbitrator, uint indexed _disputeID, uint _ruling);


    // msg.sender => number of mails sent (incremental mailId)
    mapping(address => uint) counter;

    // mailId => msg.sender when staked (always 1 token staked)
    mapping(uint => address) stake;

    uint disputedTokens = 0;
    // disputeId => (sender => receiver)
    mapping(uint => address) disputeToSender;
    mapping(uint => address) disputeToReceiver;

    address stakeAddr;

    constructor(address _arbitrator, bytes memory _arbitratorExtraData) ERC20("Mail", "MAIL") ERC20Permit("Mail") {
        _mint(msg.sender, 100 * 10 ** decimals());
        arbitrator = Arbitrator(_arbitrator);
        arbitratorExtraData = _arbitratorExtraData;
    }

    function setStakeAddr(address _addr) external onlyOwner {
        stakeAddr = _addr;
    }
    function rule(uint _disputeID, uint _ruling) public onlyArbitrator {
        emit Ruling(arbitrator, _disputeID, _ruling);

        executeRuling(_disputeID,_ruling);
    }
    
    function executeRuling(uint _disputeID, uint _ruling) internal {
        if(_ruling == 2 ) {
            transferFrom(stakeAddr, disputeToReceiver[_disputeID], 1 * 10 ** decimals());
        } else {
            transferFrom(stakeAddr, disputeToSender[_disputeID], 1 * 10 ** decimals());
        }
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function sendMail(address _to, string memory content) external {
        require(balanceOf(msg.sender) >= 1 * 10 ** decimals(), "Insufficient balance.");
        counter[msg.sender]++;
        transferFrom(msg.sender, stakeAddr, 1 * 10 ** decimals());
        stake[counter[msg.sender]] = msg.sender;
        
        emit Mail(counter[msg.sender], msg.sender, _to, content);
    }

    function reportSpam(uint mailId, address sender) public payable {
        uint arbitrationCost = arbitrator.arbitrationCost(arbitratorExtraData);
        // Require that the total pay at least the arbitration cost.
        require(msg.value == arbitrationCost, "Fee must equal arbitration cost.");
        delete stake[mailId];
        raiseDispute(mailId, sender, arbitrationCost);
    }

    /** @dev Create a dispute. UNTRUSTED.
     *  @param _arbitrationCost Amount to pay the arbitrator.
     */
    function raiseDispute(uint mailId, address sender, uint _arbitrationCost) internal {
        uint disputeID = arbitrator.createDispute{value: _arbitrationCost}(2, arbitratorExtraData);
        disputeToSender[disputeID] = sender;
        disputeToReceiver[disputeID] = msg.sender;
        emit Dispute(arbitrator, disputeID, 0, 0);
    }

}