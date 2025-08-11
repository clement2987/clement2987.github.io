const login = document.getElementById("login");
const roster = document.getElementById("roster");
const venue = document.getElementById("venue");
const team = document.getElementById("team");
const pickup = document.getElementById("pickup");

let info = {
    user: "",
    monvenue: "",
    tuevenue: "Cardinia",
    wedvenue: "Settlement",
    thurvenue: "",
    frivenue: "",
    satvenue: "Leighoak",
    sunvenue: "Highways",
    availableShifts: {
        mon: ["The Coffee Club", "Sunset Lounge", "Echo Bar"],
        tue: ["Neon Alley"],
        wed: ["The Green Room", "Skyline Rooftop"],
        thur: [],
        fri: ["Pulse Lounge", "Crimson Bar", "The Hideout"],
        sat: ["Velvet Underground"],
        sun: []
    },
    venue: "",
    venueDetails: {
        Cardinia: {
            rego: "18:30",
            start: "19:00",
            avgPlayers: "42",
            gInstructions: "10K early bird, 100k start stack, straight freeze out, $10 LPS",
            vInstructions: "give $10 per player to the bar after rego closes. game goes slow untill the first break, after which the players drop like flies. be ready to break tables",
            notes: "use the big tv behind rego dest for the clock, you can try to access it wirelessly but I find it is easier to use hdmi cord. remote at the bar, if you get a hdmi extender you can use the cord with the number 2 written on it, then use hdmi 2",
            buyin: "40",
            apl: "10",
            lps: "10",
            rebuy: "0"
        },
        Settlement: {
            rego: "18:00",
            start: "19:00",
            avgPlayers: "40",
            gInstructions: "10K early bird, 75k start. players pay $25 at the bar, keep the recipts and return them to the bar to receive the prize money. $10 LPS, $20 lifeline worth an extra 75k in chips to be used if the player busts or reaches the first break. I use stamp cards to track the lifelines",
            vInstructions: "close the tables upstairs first, to let the venue start packing up, close tables towards the rego desk then run the final table on the hardwood un front of the rail of the upstairs area. the venue staff like to reset the carpeted area first. hdmi cable already attached to tv behind rego, ask the bar for the remote",
            notes: "3rd wednsday of every month is a $60 freezeout, on these days the start stack is 125k, no lifeline for these events. again return recipts to the bar to get the prize money. Kit at the venue, in the managers office",
            buyin: "25",
            apl: "10",
            lps: "10",
            rebuy: "20"
        },
        Leighoak: {
            rego: "19:00",
            start: "19:30",
            avgPlayers: "70",
            gInstructions: "$30 to enter, $20 LPS. 50k start and 50k for a stamp card",
            vInstructions: "each player receives a stamp card, $10 over the bar gives them 4 stamps",
            notes: "I tend to be fairly trusting with the stamp cards, if a player busts early I give them the chips but remind them to show the bar some love. lots of players come late for this one, I often do not have time to buy up the blacks because I am constantly registering new players. chips and cards at the venue",
            buyin: "30",
            apl: "10",
            lps: "20",
            rebuy: "0"
        },
        Highways: {
            rego: "11:00",
            start: "11:30",
            avgPlayers: "150",
            gInstructions: "one TD handles rego and the other runs the game. when running the game I keep the tables 6 handed for the first 7 tables, sending new players straight to a new table. once I have 7 tables at 6 handed I will start filling them to 8 and open new tables as needed, this is a rough rule and use best judgment.",
            vInstructions: "when running the tournament seat players manually, keep track of gaps and keep tables balanced. when rego closes the blinds will go to 3k/6k. instruct the players to deal one hand of 3/6, at the completion of that hand rego will be closed and the players will be unable to re-enter",
            notes: "keep the blacks in play untill after the first break, we have a level of 700/1,400 and they will be needed. keep yellows in play until 7,000/14,000. keep blues in play untill after rego closes, it is far too busy to stress about the race off before. some players have faverite seats, they will tell you who they are.",
            buyin: "200",
            apl: "15",
            lps: "20",
            rebuy: "200"
        }
    }
};

function createButton(day){
    let button = document.createElement("button");
    button.className = "button";
    button.dataset.day = day;
    button.textContent = "Give Away Shift";
    button.onclick = function() {
        giveShift(button);
    };
    return button;
}

function pickupSelect(day){
    let select = document.createElement("select");
    select.name = `${day}Select`;
    select.dataset.day = day;
    select.className = "pickup-select";

    // Placeholder option
    let placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Select a shift to pick up";
    placeholder.disabled = true;
    placeholder.selected = true;
    select.appendChild(placeholder);

    // Add options based on availableShifts
    if (info.availableShifts[day] && info.availableShifts[day].length > 0) {
        info.availableShifts[day].forEach((venue, index) => {
            let option = document.createElement("option");
            option.value = venue;
            option.textContent = venue;
            select.appendChild(option);
        });
    } else {
        let noShifts = document.createElement("option");
        noShifts.value = "";
        noShifts.textContent = "No shifts available";
        noShifts.disabled = true;
        select.appendChild(noShifts);
    }

    // Event handler placeholder
    select.onchange = function() {
        // Replace `handlePickup` with your real handler name later
        handlePickup(select);
    };

    return select;
}

function loadVenue(venueName){
    info.venue = venueName;
    roster.style.display = "none";
    venue.style.display = "block";
    document.getElementById("displayVenuename").innerHTML = venueName;

    document.getElementById("dtime").innerHTML = `Rego: ${info.venueDetails[venueName].rego}, Start: ${info.venueDetails[venueName].start}`
    document.getElementById("davg").innerHTML = `average number of players: ${info.venueDetails[venueName].avgPlayers}`
    document.getElementById("gdet").innerHTML = `Game instructions: ${info.venueDetails[venueName].gInstructions}`
    document.getElementById("gins").innerHTML = `venue instructions: ${info.venueDetails[venueName].vInstructions}`
    document.getElementById("vnotes").innerHTML = `additional notes: ${info.venueDetails[venueName].notes}`

    document.getElementById("buyIn").value = info.venueDetails[venueName].buyin;
    document.getElementById("apl").value = info.venueDetails[venueName].apl;
    document.getElementById("lps").value = info.venueDetails[venueName].lps;
    document.getElementById("rebuy").value = info.venueDetails[venueName].rebuy;
}

function leaveVenue(){
    roster.style.display = "block";
    venue.style.display = "none";
}

function createLink(venueName){
    let link = document.createElement('a');
    link.innerHTML = venueName;
    link.href = "#"
    link.onclick = function(event) {
        event.preventDefault();         // Stop the link from navigating
        loadVenue(venueName);          // Call your handler
    };
    return link;
}

function populateTable(){
    const days = ['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun'];

    days.forEach(day => {
        const venueId = day + 'Venue';
        const venueValue = info[venueId.toLowerCase()];
        const actionCell = document.getElementById(`${day}Action`);
        actionCell.innerHTML = "";
        const venueCell = document.getElementById(venueId);
        venueCell.innerHTML = "";
        if (venueValue === ""){
            actionCell.appendChild(pickupSelect(day));
            
        }
        else {
            actionCell.appendChild(createButton(day));
            venueCell.appendChild(createLink(venueValue));
        }
        // document.getElementById(venueId).innerText = venueValue;
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function giveShift(el){
    let day = el.dataset.day;

    el.innerHTML = "waiting for someone to pick up shift"
    el.disabled = true;

    await sleep(3000);

    info[day+"venue"] = ""
    populateTable()
}

function handlePickup(el){
    let day = el.dataset.day;
    let venue = el.value;
    console.log(day)
    console.log(venue)
    info[day+"venue"] = venue;
    populateTable()
}

function loadRoster(){
    roster.style.display = "block";
    document.getElementById("displayUsername").innerHTML = info.user;
    populateTable();
}

function loginUser(){
    info.user = document.getElementById("user-name").value;
    login.style.display = "none";
    loadRoster();
}

loadRoster();

function calcPrizepool(){
    // inputs
    const buyIn = document.getElementById("buyIn");
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

    //logic
    let totalBuyin = buyIn.value * totalPlayers.value;
    let commission = apl.value * totalPlayers.value;
    let basePrizepool = totalBuyin - commission;

    let ourLPS = lps.value * totalLPS.value;

    let rebuysForPrizepool = rebuy.value * totalLifelines.value;

    let finalPrizepool = basePrizepool + rebuysForPrizepool;

    let totalCashOnHand = totalBuyin + ourLPS + rebuysForPrizepool;

    totalCash.innerHTML = `${totalCashOnHand}`;
    totalCashAPL.innerHTML = `${commission}`;
    totalCashLifeline.innerHTML = `${rebuysForPrizepool}`;
    totalCashPrizepool.innerHTML = `${finalPrizepool}`;
    totalCashLPS.innerHTML = `${ourLPS}`;

    return finalPrizepool;
}

function calculatePayouts(numPlaces, topHeavyFactor, prizePool) {
    if (numPlaces < 1 || topHeavyFactor < 1 || topHeavyFactor > 10 || prizePool <= 0) {
        throw new Error("Invalid input");
    }
    console.log(prizePool)
    // Create weights for each place using an exponential decay
    let weights = [];
    for (let i = 0; i < numPlaces; i++) {
        weights.push(1 / Math.pow(i + 1, topHeavyFactor / 3)); // Steeper decay for higher factors
    }
    console.log(weights)
    const totalWeight = weights.reduce((a, b) => a + b, 0);

    // Calculate raw payout amounts
    let rawPayouts = weights.map(w => (w / totalWeight) * prizePool);

    // Round each payout to nearest 10
    let payouts = rawPayouts.map(p => Math.round(p / 10) * 10);
    console.log(payouts)
    // Adjust total to match prizePool (may be slightly off due to rounding)
    let totalPayout = payouts.reduce((a, b) => a + b, 0);
    let diff = prizePool - totalPayout;

    // Apply rounding difference to the top payout
    if (diff !== 0) {
        payouts[0] += diff;
    }

    return payouts;
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

function payStructure(){
    const numPayed = document.getElementById("numPayed");
    const factor = document.getElementById("topHeavy");
    const prizepool = calcPrizepool();
    const payouts = calculatePayouts(numPayed.value, factor.value, prizepool);
    console.log(payouts)
    displayStructure(payouts)

}






