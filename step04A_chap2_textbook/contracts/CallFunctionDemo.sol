//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "./SecondContract.sol";

contract CallFunctionDemo {
    /*
        call(), delegtecall() and staticcall() are availabale on address datatype.
        We can call a function of a contract using them
        These are low level calls.
        When code of a contract not avaialble these functions can be used to call a function
        call() is as we are calling the second contract
        delegatecall() is for accessing the function in the contract being called
        staticcall() should not change change state of the contract
    */
    uint256 public val = 5;
    address contractAddress;
    string public name = "Hello";

    constructor(address _contractAddress) {
        contractAddress = _contractAddress;
    }

    function callerFunctionTest() public {
        (bool success, bytes memory data) = contractAddress.call(
            abi.encodeWithSignature("doSomething(uint256)", 12)
        );
        console.log(
            "1 - CallFunctionDemo:: callerFunctionTest success = ",
            success
        );
        // SecondContract abc = new SecondContract();
        // abc.doSomething();
    }

    function callerFunctionTestDelegate() public {
        ///
        (bool success, bytes memory data) = contractAddress.delegatecall(
            abi.encodeWithSignature("doSomething(uint256)", 1)
        );
        console.log(
            "2 - CallFunctionDemo:: callerFunctionTestDelegate success = ",
            success
        );
        //SecondContract abc = new SecondContract();
        //abc.doSomething();
    }

    function callerFunctionTestStatic() public view {
        (bool success, bytes memory data) = contractAddress.staticcall(
            abi.encodeWithSignature("doSomething(uint256)", 125)
        );
        console.log(
            "3 - CallFunctionDemo:: callerFunctionTestStatic success = ",
            success
        );
        //SecondContract abc = new SecondContract();
        //abc.doSomething();
    }

    function withdraw() public {
        (bool success, bytes memory data) = contractAddress.call{
            value: address(this).balance
        }("");
        console.log("CallFunctionDemo:: withdraw success = ", success);
        //SecondContract abc = new SecondContract();
        //abc.doSomething();
    }
}

// import "./DemoLib.sol";
// contract CallFunctionDemo  {

//     function callerFunctionTestLibrary () public {
//         DemoLib.doSomething();
//         //(bool success, bytes memory data) = contractAddress.delegatecall(abi.encodeWithSignature("doSomething(uint256)", 12));
//         //console.log("CallFunctionDemo:: callerFunctionTestDelegate success = ",success);
//         //SecondContract abc = new SecondContract();
//         //abc.doSomething();
//     }

// }
