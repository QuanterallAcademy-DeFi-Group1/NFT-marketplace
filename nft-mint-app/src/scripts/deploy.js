const hre = require('hardhat')

module.exports = async () => {
    const NFTokenFactory = await hre.ethers.getContractFactory("NFToken")
    console.log("Deploying contract")
    const NFToken = await NFTokenFactory.deploy()
    await NFToken.deployed()
    console.log("Contract deployed to:", NFToken.address)

    const transactionResponse = await NFToken.mint("0xE41ebAfF77579f5A3Bf8fA90fa430D57FADcefe6", 1)
    await transactionResponse.wait()

    console.log("Minted!")
    console.log(NFToken.price)
}

/*main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })*/