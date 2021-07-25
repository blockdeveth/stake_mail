# Prototype for stake mail

It has 2 contracts:
- SafeMail: through which users cand send message via contract events.
- Stake: When user sends a mail, their 1 MAIL token is locked in Stake contract.

Receiver can `reportSpam` the mail, and Kleros court will take a decision.
If the mail is judged to be spam, then sender's 1 MAIL token is sent from Stake contract to receiver, otherwise, it is returned to sender.
