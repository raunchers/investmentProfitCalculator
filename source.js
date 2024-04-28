// Will calculate the gross profit from selling X amount of assets between Y and Z price

// Use an array of objects to store the calculated results for each price point
// I.E, selling from 1 to 5 dollar with increments of 1 dollar.

// Results will hold the results for each price point calculation
class Results{
    // Remaining Asset Balance
    remainingBalance
    // Percent of balance to be sold
    sellPrecent
    // Amount of remaining asset to be sold
    totalAssetToBeSold
    // Sell Price
    sellPrice
    // Gross Profits
    currentGrossProfit
    // Total gross profits
    totalGrossProfits

    // Constructor
    constructor(remainingBalance, sellPrecent, totalAssetToBeSold, sellPrice, currentGrossProfit, totalGrossProfits){
        this.remainingBalance = remainingBalance.toFixed(2)
        this.sellPrecent = sellPrecent.toFixed(2) + "%"
        this.totalAssetToBeSold = totalAssetToBeSold.toFixed(2)
        this.sellPrice = "$" + sellPrice.toFixed(2)
        this.currentGrossProfit = "$" + currentGrossProfit.toFixed(2)
        this.totalGrossProfits = "$" + totalGrossProfits.toFixed(2)
    }

}

// onSubmit gathers the entered data by the user and parses them as a float
function onSubimt(){

    // Grab the total amount of asset being sold
    let totalAssetAmnt = parseFloat(document.getElementById("totalAssetAmnt").value)

    // Grab the percentage of the total amount to be sold at each price increment
    let percentAmnt = parseFloat(document.getElementById("percentAmnt").value)

    // Grabe the Price Increment
    let priceChange = parseFloat(document.getElementById("priceChange").value)

    // Grab the Starting sell price
    let startPrice = parseFloat(document.getElementById("startPrice").value)

    // Grab the Ending sell price
    let endPrice = parseFloat(document.getElementById("endPrice").value)

    calculateProfits(totalAssetAmnt, percentAmnt, priceChange, startPrice, endPrice)
}

function calculateProfits(totalAssetAmnt, percentAmnt, priceChange, startPrice, endPrice){

    // Array to hold all price increment results. Will hold objects
    let resultsArr = []

    // Running counter of amount of asset left to sell
    let remainingAssetBalance = totalAssetAmnt

    // Current amount of asset to be sold
    let assetToSell = 0

    // Convert to decimal for calculations
    let percentSell = (percentAmnt / 100)

    // Starting price to sell at
    let sellPrice = startPrice

    // Current gross profits at the price point
    let currentGrossProfit = 0

    // Total gross profits
    let totalGrossProfit = 0

    // Loop through the price points and calculate the gross profits for each point
    while(sellPrice <= endPrice){

        // Calculate how much of the asset is to be sold
        assetToSell = (remainingAssetBalance * percentSell)

        // Calculate the remaining asset balance
        remainingAssetBalance = (remainingAssetBalance - assetToSell)

        // Calculate the gross profit at current price point
        currentGrossProfit = parseFloat(assetToSell * sellPrice)

        // Calculate the total gross profits
        totalGrossProfit = (totalGrossProfit + currentGrossProfit)

        // new Obj to hold the current calculations
        const results = new Results(remainingAssetBalance, percentAmnt, assetToSell, sellPrice, currentGrossProfit, totalGrossProfit)

        // Push results to the array
        resultsArr.push(results)

        // Increment the selling price
        sellPrice += priceChange
    }

    let table = document.querySelector("table")
    generateTableHead(table, resultsArr)

    console.log(resultsArr)
}

// clearPage will reload the current page
function clearPage(){
    location.reload()
}

// generateTableHead generates the table headers after the user clicks submit on the form
function generateTableHead(table, arr){
    // Will hold the table header text needed to create the theads
    let theadEntries = ["Remaining Asset Balance", "Precent To Sell", "Asset Amount To Sell", "Selling Price", "Profits At Price Point", "Total Profits"]

    let thead = table.createTHead()
    let row = thead.insertRow()

    for (let entry of theadEntries){
        let th = document.createElement("th")
        let text = document.createTextNode(entry)
        th.appendChild(text)
        row.appendChild(th)
    }

    generateTable(table, arr)
}

// generateTable generates the table data. Will create a new row for each object in the array
function generateTable(table, arr){

    for(let object of arr){
        let row = table.insertRow()
        for(key in object){
            let cell = row.insertCell()
            let text = document.createTextNode(object[key])
            cell.appendChild(text)
        }
    }
}