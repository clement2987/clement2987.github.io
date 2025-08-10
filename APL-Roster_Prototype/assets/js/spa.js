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
    venueDetails = {
        Cardinia: {},
        Settlement: {},
        Leighoak: {},
        Highways: {}
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
