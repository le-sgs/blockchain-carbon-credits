Using terminal
Launch Ganache
//Following are commands to be entered one by one (Transactions done between accounts already listed in Ganache)
truffle compile
truffle migrate --reset
truffle console
const carbonCredits = await CarbonCredits.deployed();
const accounts = await web3.eth.getAccounts();
//Register carbon credits
await carbonCredits.registerCredit(1000, { from: accounts[0] }); 
//Check registered credits
const credit = await carbonCredits.credits(0);
console.log(credit);
//Transfer credits
await carbonCredits.transferCredit(0, accounts[1], 200, { from: accounts[0] });
//Check transfered credits
const remainingCredit = await carbonCredits.credits(0);
console.log(remainingCredit);
//Check new credit entry for accounts[1]
const newCredit = await carbonCredits.credits(1);
console.log(newCredit);
//Exit console
.exit
