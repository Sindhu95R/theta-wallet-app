// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BatchPayment {
    function payMultiple(
        address[] calldata recipients,
        uint256[] calldata amounts
    ) external payable {
        require(
            recipients.length == amounts.length,
            "Recipients and amounts arrays must be of the same length"
        );

        uint256 totalAmount = 0;

        // Calculate the total amount to be sent
        for (uint256 i = 0; i < amounts.length; i++) {
            totalAmount += amounts[i];
        }

        require(msg.value == totalAmount, "Insufficient ether provided");

        // Transfer the amounts to each recipient
        for (uint256 i = 0; i < recipients.length; i++) {
            payable(recipients[i]).transfer(amounts[i]);
        }
    }
}
