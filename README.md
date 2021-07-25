# Prototype for stake mail

Demo video: https://youtu.be/P1rUBsEHTM4

https://github.com/kleros/dapp-ideas/issues/21

It has 2 contracts:
- SafeMail([sol](https://github.com/blockdeveth/stake_mail/blob/main/contracts/SafeMail.sol#L66)): through which users can send message via contract events.
- Stake([sol](https://github.com/blockdeveth/stake_mail/blob/main/contracts/Stake.sol)): When user sends a mail, their 1 MAIL token is locked in Stake contract.

Receiver can `[reportSpam](https://github.com/blockdeveth/stake_mail/blob/main/contracts/SafeMail.sol#L75)` the mail, and Kleros court will take a decision.
If the mail is judged to be spam, then sender's 1 MAIL token is sent from Stake contract to receiver, otherwise, it is returned to sender.

Contracts are deployed on Kovan: 
- SafeMail: https://kovan.etherscan.io/address/0x84373A4b2D2E3349C68C0d5B244A729cB370D9fa
- Stake: https://kovan.etherscan.io/address/0x100159abe1968490dF780cFf4C7F14c0Bbe24C16#writeContract
- Centralized Arbitrator: https://kovan.etherscan.io/address/0x4d733181b675bb56de1b516fc6cbf0015c7cf1f1

## UI
- Start a local server: `yarn react-app:start`
- It shows the interface to send a mail.
<img width="1421" alt="Screen Shot 2021-07-25 at 3 25 45 PM" src="https://user-images.githubusercontent.com/1689531/126902720-18d65ad6-fbc5-4ece-8d2d-7e9563f31dd2.png">

- After sending the mail, get the mailId from the [kovan events page](0x84373A4b2D2E3349C68C0d5B244A729cB370D9fa).
<img width="705" alt="Screen Shot 2021-07-25 at 3 33 55 PM" src="https://user-images.githubusercontent.com/1689531/126903009-afabd2cc-39d6-4531-9d56-7bf7e42fe800.png">

- Using the mailId, report it from the interface, and head over to https://centralizedarbitrator.kleros.io/

- Use `0x4d733181b675bb56de1b516fc6cbf0015c7cf1f1` as the Arbitrator (or deploy your own and add the new address in this code).
<img width="1428" alt="Screen Shot 2021-07-25 at 3 16 35 PM" src="https://user-images.githubusercontent.com/1689531/126902354-241feef8-bf65-47a6-9cca-60beba03341d.png">

- It will load all the current disputes.

- You can vote and check the subsequent balance of sender and receiver based on your vote.

## Future Work
- There is no privacy in the mechanism. All the mails can be seen by anyone. Use private and public key encryption.
- Add a timeout so that receiver can report a mail within a day of receiving it.

## Components used
The app was bootstrapped from [create-eth-app](https://github.com/paulrberg/create-eth-app), and [Kleros documentation](https://kleros.gitbook.io/docs/).
