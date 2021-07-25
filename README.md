# Prototype for stake mail

https://github.com/kleros/dapp-ideas/issues/21

It has 2 contracts:
- SafeMail: through which users cand send message via contract events.
- Stake: When user sends a mail, their 1 MAIL token is locked in Stake contract.

Receiver can `reportSpam` the mail, and Kleros court will take a decision.
If the mail is judged to be spam, then sender's 1 MAIL token is sent from Stake contract to receiver, otherwise, it is returned to sender.

Contracts are deployed on Kovan: 
SafeMail: https://kovan.etherscan.io/address/0x84373A4b2D2E3349C68C0d5B244A729cB370D9fa
Stake: https://kovan.etherscan.io/address/0x100159abe1968490dF780cFf4C7F14c0Bbe24C16#writeContract
Centralized Arbitrator: https://kovan.etherscan.io/address/0x4d733181b675bb56de1b516fc6cbf0015c7cf1f1
