//app variables
const Tables = [];
let countdownTimers = new Map();

//app functions
function addHours(hour, n){
    let future = hour + n;
    if(future > 23){
        future -= 24;
    }
    return future;
}

function removePast(hour){
    const half = `${String(hour).padStart(2, "0")}:30`;
    const full = `${String(hour).padStart(2, "0")}:00`;

    const x = document.getElementById(half);
    if (x !== null){
        x.remove();
    }

    const y = document.getElementById(full);
    if (y !== null) {
        y.remove();
    }
}

function displayTime(){
    const now = new Date();
    const clock = document.getElementById("clock");
    const hours = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    let timeString = `${String(hours).padStart(2, "0")}:${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    clock.textContent = timeString;

    if (min === 50 && sec === 0) {
        removePast(hours);
    }
}
displayTime();
setInterval(displayTime, 1000);

function creatBreakLists(){
    const unorderedList = document.getElementById("times");
    const now = new Date();
    const hoursLeft = now.getHours();

    next = 1;

    while(true){
        let hour = addHours(hoursLeft, next);
        if(hour == 4){
            break;
        }
        let listItem = document.createElement("li");
        listItem.setAttribute("id", `${String(hour).padStart(2, "0")}:00`);
        let listHeading = document.createElement("p");
        listHeading.textContent = `${String(hour).padStart(2, "0")}:00`;
        listItem.appendChild(listHeading);
        unorderedList.appendChild(listItem);
        listItem = document.createElement("li");
        listItem.setAttribute("id", `${String(hour).padStart(2, "0")}:30`)
        listHeading = document.createElement("p");
        listHeading.textContent = `${String(hour).padStart(2, "0")}:30`;
        listItem.appendChild(listHeading);
        unorderedList.appendChild(listItem);
        next++;
    }
}

creatBreakLists();

function addTable(number, time){
    if (number < 1){
        return;
    }
    let opened = 0;
    if(time === "now"){
        const now = new Date();
        let half = 0;
        if (now.getMinutes() > 29){
            half = 0.5;
        }
        opened = now.getHours() + half;
    }
    else {
        const [hour, min] = time.split(":");
        half = 0;
        if (min === "30"){
            half = 0.5;
        }
        opened = Number(hour) + half;
    }

    const newTable = {
        "number": number,
        "opened": opened,
        "break": false,
        "players": {
            "1": {
                "patron_number":0,
                "holding":0
            },
            "2": {
                "patron_number":0,
                "holding":0
            },
            "3": {
                "patron_number":0,
                "holding":0
            },
            "4": {
                "patron_number":0,
                "holding":0
            },
            "5": {
                "patron_number":0,
                "holding":0
            },
            "6": {
                "patron_number":0,
                "holding":0
            },
            "7": {
                "patron_number":0,
                "holding":0
            },
            "8": {
                "patron_number":0,
                "holding":0
            }
        }
    };

    Tables.push(newTable);
    sortBreaks(newTable);
}

function createTableElement(table){
    const tableDiv = document.createElement("div");
    tableDiv.classList.add("table");
    tableDiv.id = `table${table.number}`;

    const tableNumberLabel = document.createElement("label");
    tableNumberLabel.classList.add("tableNumber");
    tableNumberLabel.textContent = `Table ${table.number}`;

    const breakButton = document.createElement("button");
    breakButton.id = `table${table.number}break`;
    breakButton.classList.add("tableBreak");
    breakButton.textContent = "Break";

    breakButton.addEventListener("click", ()=> {
        startBreak(breakButton);
    })

    const marker = document.createElement("button");
    //marker.classList.add("marker");
    marker.textContent = ". ."
    marker.style.backgroundColor = "grey";
    marker.addEventListener("click", ()=> {
        mark(marker);
    })

    const playerButton = document.createElement("button");
    playerButton.classList.add("playerButton");
    playerButton.textContent = "Players ▼";

    const tableDivContainer = document.createElement("div");
    tableDivContainer.classList.add("tableDivContainer");

    const closeTable = document.createElement("button");
    //closeTable.classList.add("marker")
    closeTable.style.backgroundColor = "red";
    closeTable.style.color = "white";
    closeTable.textContent = "X";
    closeTable.addEventListener("click", ()=> {
        closeTables(`table${table.number}`);
    })

    tableDivContainer.appendChild(tableNumberLabel);
    tableDivContainer.appendChild(breakButton);    
    tableDivContainer.appendChild(playerButton);
    tableDivContainer.appendChild(closeTable);
    tableDivContainer.appendChild(marker);
    tableDiv.appendChild(tableDivContainer);

    const playerDiv = document.createElement("div");
    for(let seat = 1; seat < 9; seat++){
        const seatLabel = document.createElement("label");
        seatLabel.textContent = `Seat ${seat}. `;

        const idLabel = document.createElement("label");
        idLabel.textContent = "Player ID: ";

        const idInput = document.createElement("input");

        const holdingLabel = document.createElement("label");
        holdingLabel.textContent = "holding $";

        const holdingInput = document.createElement("input");

        const lineBreak = document.createElement("br")

        playerDiv.appendChild(seatLabel);
        playerDiv.appendChild(idLabel);
        playerDiv.appendChild(idInput);
        playerDiv.appendChild(holdingLabel);
        playerDiv.appendChild(holdingInput);
        playerDiv.appendChild(lineBreak);
    }
    playerDiv.style.display = "none";
    playerDiv.classList.add("playerDiv");
    playerButton.addEventListener("click", ()=> togglePlayerList(playerDiv));
    tableDiv.appendChild(playerDiv);

    return tableDiv
}

function sortBreaks(table){
    let hour = 0;
    let minute = 0;
    if (table.opened % 1 == 0){
        hour = table.opened;
    }
    else {
        hour = table.opened - 0.5;
        minute = 30;
    }

    while(true){
        hour = addHours(hour, 3);
        const setTime = document.getElementById(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`);
        if (setTime === null){
            break;
        }
        setTime.appendChild(createTableElement(table));
    }
}

function togglePlayerList(element){
    if (element.style.display === "none"){
        element.style.display = "block";
    }
    else {
        element.style.display = "none";
    }
}

function startBreak(self) {
    if (self.textContent === "Break") { // Check if it is equal to "Break"
        self.style.backgroundColor = "#f6a39d";
        let countdownTime = 15 * 60; // 15 minutes in seconds

        const countdownTimer = setInterval(() => {
            if (countdownTime <= 0) {
                clearInterval(countdownTimer);
                self.textContent = "Break";
                self.style.backgroundColor = "#f5f2b5";
            } else {
                const minutes = Math.floor(countdownTime / 60);
                const seconds = countdownTime % 60;
                self.textContent = `${minutes}:${String(seconds).padStart(2, "0")}`;
                countdownTime--;
            }
        }, 1000);

        // Store the timer for this button
        countdownTimers.set(self, countdownTimer);
    } else {
        return;
    }
}

function mark(self){
    if (self.style.backgroundColor === "grey"){
        self.style.backgroundColor = "green";
    }
    else {
        self.style.backgroundColor = "grey";
    }
}

function closeTables(tableNum){
    let tables = document.querySelectorAll(`#${tableNum}`);

    tables.forEach((table) => {
        table.remove();
    })
}


//document events
document.getElementById("submitTable").addEventListener("click", function(){
    const number = document.getElementById("tableNumber");
    const time = document.getElementById("openTime");
    addTable(number.value, time.value);

    //dev line
    console.log(Tables)

    number.value = "";
    time.value = "now";
});