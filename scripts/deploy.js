const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  const SafeMail = await hre.ethers.getContractFactory("contracts/SafeMail.sol:SafeMail");
  const mail = await SafeMail.deploy("0x4D733181B675Bb56de1B516fc6CbF0015C7Cf1F1", "0x12");

  const Stake = await hre.ethers.getContractFactory("Stake");
  const stake = await Stake.deploy();


  await mail.deployed();

  console.log("SafeMail deployed to:", mail.address);

  await stake.deployed();

  console.log("Stake deployed to:", stake.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
