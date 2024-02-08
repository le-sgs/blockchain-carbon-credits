// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CarbonCredits {
    struct Credit {
        uint256 amount;
        address owner;
    }

    mapping(uint256 => Credit) public credits;
    uint256 public nextCreditId;

    function registerCredit(uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0");
        credits[nextCreditId] = Credit(amount, msg.sender);
        nextCreditId++;
    }

    function transferCredit(uint256 creditId, address to, uint256 amount) public {
        require(credits[creditId].owner == msg.sender, "Not the owner of the credit");
        require(credits[creditId].amount >= amount, "Not enough credit amount");

        credits[creditId].amount -= amount;
        credits[nextCreditId++] = Credit(amount, to);
    }
}
