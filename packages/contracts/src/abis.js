import erc20Abi from "./abis/erc20.json";
import ownableAbi from "./abis/ownable.json";
import safeMailAbi from "./abis/SafeMail.json";
import stakeAbi from "./abis/Stake.json";

const abis = {
  erc20: erc20Abi,
  ownable: ownableAbi,
  safeMail: safeMailAbi,
  stake: stakeAbi,
};

export default abis;
