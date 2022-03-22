import { ethers } from "hardhat";
import { Greeter, Greeter__factory } from "../typechain";

async function main() {
  // We get the contract to deploy
  // const Greeter: Greeter__factory = await ethers.getContractFactory("Greeter");
  // const greeter: Greeter = await Greeter.deploy("Hello, Hardhat!");

  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
