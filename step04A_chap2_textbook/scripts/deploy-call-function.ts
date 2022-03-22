import { ethers } from "hardhat";

async function main() {
  // We get the contract to deploy
  const [owner, addr1] = await ethers.getSigners();
  console.log("Owner:", owner.address);
  const SecondContract = await ethers.getContractFactory("SecondContract");
  const secondContract = await SecondContract.deploy();
  await secondContract.deployed();
  console.log("SecondContract deployed to:", secondContract.address);

  const CallFunctionDemo = await ethers.getContractFactory("CallFunctionDemo");
  const callFunctionDemo = await CallFunctionDemo.deploy(
    secondContract.address
  );
  await callFunctionDemo.deployed();
  console.log("CallFunctionDemo deployed to:", callFunctionDemo.address);

  console.log(
    "CallFunctionDemo value before = ",
    (await callFunctionDemo.val()).toString()
  );
  console.log(
    "secondContract value before = ",
    (await secondContract.val()).toString()
  );

  const txt1 = await callFunctionDemo.callerFunctionTest();
  console.log(
    "CallFunctionDemo value after call() and before delegatecall() = ",
    (await callFunctionDemo.val()).toString()
  );
  console.log(
    "secondContract value after call() and before delegatecall()= ",
    (await secondContract.val()).toString()
  );

  const txt2 = await callFunctionDemo.callerFunctionTestDelegate();
  console.log(
    "CallFunctionDemo value after delegatecall() and before staticcall()= ",
    (await callFunctionDemo.val()).toString()
  );
  console.log(
    "secondContract value after delegatecall() and before staticcall()= ",
    (await secondContract.val()).toString()
  );

  const txt3 = await callFunctionDemo.callerFunctionTestStatic();
  console.log(
    "CallFunctionDemo value after staticcall()= ",
    (await callFunctionDemo.val()).toString()
  );
  console.log(
    "secondContract value after staticcall()= ",
    (await secondContract.val()).toString()
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
