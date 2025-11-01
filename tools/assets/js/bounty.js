let globalData = {}

function calcPrizepool(){
    // inputs
    const buyIn = document.getElementById("buyIn");
    const bountyValue = document.getElementById("bounty");
    const apl = document.getElementById("apl");
    const lps = document.getElementById("lps");
    const rebuy = document.getElementById("rebuy");

    const totalPlayers = document.getElementById("totalPlayers");
    const totalLPS = document.getElementById("totalLPS");
    const totalLifelines = document.getElementById("totalLifelines");

    // outputs
    const totalCash = document.getElementById("totalCash");
    const totalCashAPL = document.getElementById("totalCashAPL");
    const totalCashLifeline = document.getElementById("totalCashLifeline");
    const totalCashPrizepool = document.getElementById("totalCashPrizepool");
    const totalCashLPS = document.getElementById("totalCashLPS");
    const totalCashBounties = document.getElementById("totalCashBounty");

    //logic
    let totalBuyin = buyIn.value * totalPlayers.value;
    let commission = apl.value * totalPlayers.value;
    let baseBounty = bountyValue.value * totalPlayers.value;
    let basePrizepool = totalBuyin - commission;

    let ourLPS = lps.value * totalLPS.value;

    let rebuysForPrizepool = (rebuy.value * totalLifelines.value) - (bountyValue.value * totalLifelines.value);
    let rebuyBounty = bountyValue.value * totalLifelines.value;
    let totalBounty = baseBounty + rebuyBounty;

    let finalPrizepool = basePrizepool + rebuysForPrizepool;

    let totalCashOnHand = totalBuyin + ourLPS + rebuysForPrizepool + totalBounty;

    totalCash.innerHTML = `${totalCashOnHand}`;
    totalCashAPL.innerHTML = `${commission}`;
    totalCashLifeline.innerHTML = `${rebuysForPrizepool}`;
    totalCashPrizepool.innerHTML = `${finalPrizepool}`;
    totalCashLPS.innerHTML = `${ourLPS}`;
    totalCashBounties.innerHTML = `${totalBounty}`;

    return {prizepool: finalPrizepool, bounties: totalBounty, numPlayers: totalPlayers.value};
}

function calculatePayouts(numPlaces, topHeavyFactor, prizePool) {
    if (numPlaces < 1 || topHeavyFactor < 1 || topHeavyFactor > 10 || prizePool <= 0) {
        throw new Error("Invalid input");
    }
    // Create weights for each place using an exponential decay
    let weights = [];
    for (let i = 0; i < numPlaces; i++) {
        weights.push(1 / Math.pow(i + 1, topHeavyFactor / 3)); // Steeper decay for higher factors
    }
    const totalWeight = weights.reduce((a, b) => a + b, 0);

    // Calculate raw payout amounts
    let rawPayouts = weights.map(w => (w / totalWeight) * prizePool);

    // Round each payout to nearest 10
    let payouts = rawPayouts.map(p => Math.round(p / 10) * 10);
    // Adjust total to match prizePool (may be slightly off due to rounding)
    let totalPayout = payouts.reduce((a, b) => a + b, 0);
    let diff = prizePool - totalPayout;

    // Apply rounding difference to the top payout
    if (diff !== 0) {
        payouts[0] += diff;
    }

    return payouts;
}

function calculateBounties(data) {
    const topRatio = document.getElementById("topBounty").value;
    const places = Math.floor(data.numPlayers * 0.2);
    let bountyPool = data.bounties;

    // One-third goes to the top prize (rounded to nearest 100)
    const topPrize = Math.round((bountyPool / topRatio) / 100) * 100;
    bountyPool -= topPrize;

    // One-third of remaining places get the minimum prize
    const minPrize = 200;
    const minPrizes = Math.floor(places / 3);

    const bounties = [];

    for (let i = 0; i < minPrizes; i++) {
        bounties.push(minPrize);
        bountyPool -= minPrize;
    }

    // Add the top prize
    bounties.push(topPrize);

    // Distribute remaining bounty pool evenly between min and max
    const remainingSpots = places - minPrizes - 1; // minus 1 for top prize
    const avg = bountyPool / remainingSpots;
    const max = avg * 1.3; // up to 30% above average
    const min = avg * 0.7; // down to 30% below average

    for (let i = 0; i < remainingSpots; i++) {
        // Create variation between min and max
        const randomFactor = Math.random();
        const prize = Math.round((min + (max - min) * randomFactor) / 100) * 100;
        bounties.push(prize);
        bountyPool -= prize;
    }

    // Distribute any rounding leftovers to the last prize
    if (bountyPool !== 0) {
        bounties[bounties.length - 1] += bountyPool;
    }

    return bounties.sort((a, b)=> b-a);
}


function displayStructure(payouts){
    const outputList = document.getElementById("paystructureOutput")
    outputList.innerHTML = "";
    payouts.forEach((value) => {
        const item = document.createElement("li");
        item.innerHTML = value;
        outputList.appendChild(item);
    })
}

function processBounties(bounties) {
    const outputList = document.getElementById("bountyOutput");
    outputList.innerHTML = "";
    globalData.items = [];

    bounties.forEach((value) => {
        const item = document.createElement("li");
        const text = document.createElement("span");
        const button = document.createElement("button");

        text.textContent = value;
        button.textContent = "Add Ticket";

        item.appendChild(text);
        item.appendChild(button);
        outputList.appendChild(item);

        const bountyObj = {
            paid: false,
            value: value,
            listItem: item,
            ticket: false,
        };

        // Event listener for the button
        button.addEventListener("click", () => {
            bountyObj.value -= 1500;
            bountyObj.ticket = true;
            text.textContent = bountyObj.value; // update the display
            button.disabled = true; // optional: prevent double clicks
        });

        globalData.items.push(bountyObj);
    });
}

function payStructure(){
    const numPayed = document.getElementById("numPayed");
    const factor = document.getElementById("topHeavy");
    const data = calcPrizepool();
    const payouts = calculatePayouts(numPayed.value, factor.value, data.prizepool);
    displayStructure(payouts)
    const bounties = calculateBounties(data);
    processBounties(bounties)
}

function saveAndOpen() {

      // Save to localStorage
      localStorage.setItem('prizes', JSON.stringify(globalData));

      // Open the next page in a new tab
      window.open('user-selection.html', '_blank');

    }
