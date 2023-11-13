// generic functions
function onlyNumbers(event) {
	event.target.value = event.target.value.replace(/[^0-9]/g, '');
}

function checkDetails()  {
	if (
		fcustemerName.value !== "" &&
		femail.value !== "" &&
		fphone.value !== "" &&
		faddress.value !== "" &&
		fdogsname.value !== "" &&
		fbreed.value !== "" &&
		fdogSize.value !== ""
	){
		enableButton(detailsNext);
	}
	else {
		disableButton(detailsNext);
	}
}

function checkCardinfo(){
	if (
		fnameOnCard.value !== "" &&
		fcardNumber.value !== "" &&
		fcardExpiry.value !== "" &&
		fccv.value !== ""
	){
		enableButton(paymentNext);
	}
	else {
		disableButton(paymentNext);
	}
}

//hidden form items
const fstay = document.getElementById('fstay');

const fstartDate = document.getElementById('fstartDate');
const fendDate = document.getElementById('fendDate');
const fdays = document.getElementById('fdays')

const fwalks = document.getElementById('fwalks');
const fswims = document.getElementById('fswims');
const ftreats = document.getElementById('ftreats');
const ffood = document.getElementById('ffood');
const fgrooming = document.getElementById('fgrooming');

const fcustemerName = document.getElementById('fcustemerName');
const femail = document.getElementById('femail');
const fphone = document.getElementById('fphone');
const faddress = document.getElementById('faddress');
const fdogsname = document.getElementById('fdogsname');
const fbreed = document.getElementById('fbreed');
const fdogSize = document.getElementById('fdogSize');
const fabout = document.getElementById('fabout');

const fpayment = document.getElementById('fpayment');
const fnameOnCard = document.getElementById('fnameOnCard');
const fcardNumber = document.getElementById('fcardNumber');
const fcardExpiry = document.getElementById('fcardExpiry');
const fccv = document.getElementById('fccv');

// buttons
const dogStayButton = document.getElementById("dogsStayButton");
dogStayButton.addEventListener("click", function(){
	document.getElementById("dogsStaySelection").setAttribute("hidden", "true");
	document.getElementById("stayCal").removeAttribute("hidden");
});

const calBack = document.getElementById("calBack")
calBack.addEventListener("click", function(){
	document.getElementById("stayCal").setAttribute("hidden", "true");
	document.getElementById("dogsStaySelection").removeAttribute("hidden");
});

const calNext = document.getElementById("calNext");
calNext.addEventListener("click", function(){
	document.getElementById("stayCal").setAttribute("hidden", "true");
	document.getElementById("extras").removeAttribute("hidden");
});

const extraBack = document.getElementById("extraBack");
extraBack.addEventListener("click", function(){
	document.getElementById("extras").setAttribute("hidden", "true");
	document.getElementById("stayCal").removeAttribute("hidden");
});

const extraNext = document.getElementById("extraNext");
extraNext.addEventListener("click", function(){
	document.getElementById("extras").setAttribute("hidden", "true");
	document.getElementById("custemerDetails").removeAttribute("hidden");
});

const detailsBack = document.getElementById("detailsBack");
detailsBack.addEventListener("click", function(){
	document.getElementById("custemerDetails").setAttribute("hidden", "true");
	document.getElementById("extras").removeAttribute("hidden");
});

const detailsNext = document.getElementById("detailsNext");
detailsNext.addEventListener("click", function(){
	document.getElementById("custemerDetails").setAttribute("hidden", "true");
	document.getElementById("payment").removeAttribute("hidden");

	// provide Quote for payment
	let quote = 0;
	switch(fdogSize.value){
		case "small":
			quote = Number(fdays.value) * 30;
			break;
		case "medium":
			quote = Number(fdays.value) * 50;
			break;
		default:
			quote = Number(fdays.value) * 70;
	}
	document.getElementById("quoteToPay").innerHTML = `the total cost for your dog to stay here for ${fdays.value} days is $${quote}.00`;
	document.getElementById("fullAmount").innerHTML = `$${quote}.00`;
	document.getElementById("justDeposit").innerHTML = `$${quote/10}.00`;
});

const paymentBack = document.getElementById("paymentBack");
paymentBack.addEventListener("click", function(){
	document.getElementById("payment").setAttribute("hidden", "true");
	document.getElementById("custemerDetails").removeAttribute("hidden");
});

const paymentNext = document.getElementById("paymentNext");
paymentNext.addEventListener("click", function(){
	document.getElementById("payment").setAttribute("hidden", "true");
	document.getElementById("paymentResult").removeAttribute("hidden");

	// prepare success message
	document.getElementById("welcome").innerHTML = `we look foward to meeting ${fdogsname.value} on ${fstartDate.value}`;
});

//enable buttons as input is valid
function enableButton(b) {
	b.removeAttribute("disabled");
}

function disableButton(b) {
	b.setAttribute("disabled", "true");
}


// Handles calendar generation and input
const calendarBody = document.getElementById('calendarBody');
const monthSelector = document.getElementById('monthSelector');
const yearSelector = document.getElementById('yearSelector');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Initialize the calendar
let currentDate = new Date();
const nowDate = new Date()
let selectedStartDate = null;
let selectedEndDate = null;

//function to check if a guiven date falls in between the start and end dates
function dateChecker(year, month, date) {
	//handle months of january and december
	if (month > 11) {
		year++;
		month -=12;
	}
	else if (month < 0) {
		year--;
		month += 12;
	}
	
	//return false if neither start and end dates selected
	if (selectedStartDate === null && selectedEndDate === null) {
		return false;
	}
	//create a date object to compare against
	const checker = new Date(year, month, date);
	if (selectedStartDate !== null && !selectedEndDate) {
		return selectedStartDate.getTime() == checker.getTime();
	}
	else if (selectedEndDate !== null && !selectedStartDate) {
		return selectedEndDate.getTime() == checker.getTime();
	}
	else {
			return (selectedStartDate <= checker && selectedEndDate >= checker);
		}
}

// Function to render the calendar
function renderCalendar() {
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();
	const Year = nowDate.getFullYear();


	monthSelector.innerHTML = '';
	yearSelector.innerHTML = '';

	for (let i = 0; i < 12; i++) {
		if (i < nowDate.getMonth() && year === Year){
			i += nowDate.getMonth();
		}
		const option = document.createElement('option');
		option.value = i;
		option.textContent = months[i];
		monthSelector.appendChild(option);
	}

	for (let i = Year; i <= year + 10; i++) {
		const option = document.createElement('option');
		option.value = i;
		option.textContent = i;
		yearSelector.appendChild(option);
	}

	monthSelector.value = month;
	yearSelector.value = year;

	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);
	const prevMonthLastDay = new Date(year, month, 0);
	const daysInMonth = lastDay.getDate();
	const daysInPrevMonth = prevMonthLastDay.getDate();
	const startingDay = firstDay.getDay();
	let date = 1;
	let prevDate = daysInPrevMonth - startingDay + 1;
	let nextDate = 1;

	let html = '';

	const unselectables = 'class="unselectable" style="color:grey"';
	const s_unselectables = 'class="unselectable" style="color:grey; background-color:#18453B85;"';

	for (let i = 0; i < 6; i++) {
		html += '<tr>';

		for (let j = 0; j < 7; j++) {
			if (i === 0 && j < startingDay) {
				if (dateChecker(year, month - 1, prevDate) === true) {
					html += `<td ${s_unselectables}>${prevDate}</td>`;
					prevDate++;
				}
				else {
					html += `<td ${unselectables}>${prevDate}</td>`;
					prevDate++;
				}
				
			} else if (date <= daysInMonth) {
				if (month === nowDate.getMonth() && date < nowDate.getDate()){
					html += `<td ${unselectables}>${date}</td>`;
					date++;
				}
				else if (dateChecker(year, month, date) === true){
					html += `<td data-date="${date}" style="background-color:#18453B85; cursor:pointer; color:black">${date}</td>`;
					date++;
				}
				else {
					html += `<td data-date="${date}" style="color:black; cursor:pointer;">${date}</td>`;
					date++;
				}
				
			} else {
				if (dateChecker(year, month + 1, nextDate) === true) {
					html += `<td ${s_unselectables}>${nextDate}</td>`;
					nextDate++;
				}
				else {
					html += `<td ${unselectables}>${nextDate}</td>`;
					nextDate++;
				}
				
			}
		}

		html += '</tr>';
	}

	calendarBody.innerHTML = html;
}

// Handle previous and next month buttons
prevMonthButton.addEventListener('click', () => {
	if (currentDate.getMonth() === nowDate.getMonth() && currentDate.getFullYear() === nowDate.getFullYear()){
		return;
	}
	currentDate.setMonth(currentDate.getMonth() - 1);
	renderCalendar();
});

nextMonthButton.addEventListener('click', () => {
	currentDate.setMonth(currentDate.getMonth() + 1);
	renderCalendar();
});

// Handle month and year selectors
monthSelector.addEventListener('change', () => {
	currentDate.setMonth(parseInt(monthSelector.value));
	renderCalendar();
});

yearSelector.addEventListener('change', () => {
	currentDate.setFullYear(parseInt(yearSelector.value));
	renderCalendar();
});

// Handle date selection
calendarBody.addEventListener('click', (event) => {
	if (event.target.tagName === 'TD' && !event.target.classList.contains('unselectable')) {
		const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(event.target.getAttribute('data-date')));
		if (!selectedStartDate) {
			selectedStartDate = selectedDate;
			document.getElementById("dropOff").value = `${String(selectedStartDate.getDate()).padStart(2, "0")}/${String(selectedStartDate.getMonth() +1).padStart(2, "0")}/${selectedStartDate.getFullYear()}`;
			fstartDate.value = `${String(selectedStartDate.getDate()).padStart(2, "0")}/${String(selectedStartDate.getMonth() +1).padStart(2, "0")}/${selectedStartDate.getFullYear()}`
		}
		else if (selectedStartDate.getTime() === selectedDate.getTime()){
			selectedStartDate = null;
			document.getElementById("dropOff").value = "";
			fstartDate.value = "";
			fdays.value = ""
			disableButton(calNext);
		}
		else if (selectedEndDate !== null && selectedEndDate.getTime() === selectedDate.getTime()){
			selectedEndDate = null;
			document.getElementById("pickUp").value = "";
			fendDate.value = "";
			fdays.value = ""
			disableButton(calNext);
		}
		else if (!selectedEndDate) {
			selectedEndDate = selectedDate;
			document.getElementById("pickUp").value = `${String(selectedEndDate.getDate()).padStart(2, "0")}/${String(selectedEndDate.getMonth() +1).padStart(2, "0")}/${selectedEndDate.getFullYear()}`;
			fendDate.value = `${String(selectedEndDate.getDate()).padStart(2, "0")}/${String(selectedEndDate.getMonth() +1).padStart(2, "0")}/${selectedEndDate.getFullYear()}`;
		}
		if (selectedStartDate !== null && selectedEndDate !== null) {
			const startDate = selectedStartDate < selectedDate ? selectedStartDate : selectedDate;
			const endDate = selectedStartDate < selectedDate ? selectedDate : selectedStartDate;
			selectedEndDate = endDate
			selectedStartDate = startDate;
			document.getElementById("dropOff").value = `${String(selectedStartDate.getDate()).padStart(2, "0")}/${String(selectedStartDate.getMonth() +1).padStart(2, "0")}/${selectedStartDate.getFullYear()}`;
			document.getElementById("pickUp").value = `${String(selectedEndDate.getDate()).padStart(2, "0")}/${String(selectedEndDate.getMonth() +1).padStart(2, "0")}/${selectedEndDate.getFullYear()}`;
			fstartDate.value = document.getElementById("dropOff").value;
			fendDate.value = document.getElementById("pickUp").value;

			// Calculate the number of days between the two dates
            const timeDiff = selectedEndDate.getTime() - selectedStartDate.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
			fdays.value = daysDiff + 1;
			enableButton(calNext);
		}
		renderCalendar();
	}
});

renderCalendar();

// Handles dog breed selection
// JSON with dog breeds
const breeds = {
    "breeds": [
          {
                "breed": "affenpinscher",
                "size": "small"
          },
          {
                "breed": "american cocker spaniel",
                "size": "small"
          },
          {
                "breed": "australian silky terrier",
                "size": "small"
          },
          {
                "breed": "australian terrier",
                "size": "small"
          },
          {
                "breed": "basenji",
                "size": "small"
          },
          {
                "breed": "bedlington terrier",
                "size": "small"
          },
          {
                "breed": "bichon frise",
                "size": "small"
          },
          {
                "breed": "border terrier",
                "size": "small"
          },
          {
                "breed": "boston terrier",
                "size": "small"
          },
          {
                "breed": "cairn terrier",
                "size": "small"
          },
          {
                "breed": "cavalier king charles spaniel",
                "size": "small"
          },
          {
                "breed": "chihuahua",
                "size": "small"
          },
          {
                "breed": "chinese crested",
                "size": "small"
          },
          {
                "breed": "dachshund (miniature)",
                "size": "small"
          },
          {
                "breed": "dandie dinmont terrier",
                "size": "small"
          },
          {
                "breed": "english toy terrier",
                "size": "small"
          },
          {
                "breed": "fox terrier",
                "size": "small"
          },
          {
                "breed": "french bulldog",
                "size": "small"
          },
          {
                "breed": "german spitz (small)",
                "size": "small"
          },
          {
                "breed": "griffon",
                "size": "small"
          },
          {
                "breed": "italian greyhound",
                "size": "small"
          },
          {
                "breed": "jack russell terrier",
                "size": "small"
          },
          {
                "breed": "japanese chin",
                "size": "small"
          },
          {
                "breed": "japanese spitz",
                "size": "small"
          },
          {
                "breed": "king charles spaniel",
                "size": "small"
          },
          {
                "breed": "lakeland terrier",
                "size": "small"
          },
          {
                "breed": "lhasa apso",
                "size": "small"
          },
          {
                "breed": "lowchen",
                "size": "small"
          },
          {
                "breed": "maltese terrier",
                "size": "small"
          },
          {
                "breed": "manchester terrier",
                "size": "small"
          },
          {
                "breed": "norfolk terrier",
                "size": "small"
          },
          {
                "breed": "norwich terrier",
                "size": "small"
          },
          {
                "breed": "papillon",
                "size": "small"
          },
          {
                "breed": "pekeingese",
                "size": "small"
          },
          {
                "breed": "phalene",
                "size": "small"
          },
          {
                "breed": "pinscher (miniature)",
                "size": "small"
          },
          {
                "breed": "pomeranian",
                "size": "small"
          },
          {
                "breed": "poodle (miniature)",
                "size": "small"
          },
          {
                "breed": "poodle (toy)",
                "size": "small"
          },
          {
                "breed": "pug",
                "size": "small"
          },
          {
                "breed": "schipperke",
                "size": "small"
          },
          {
                "breed": "schnauzer (miniature)",
                "size": "small"
          },
          {
                "breed": "scottish terrier",
                "size": "small"
          },
          {
                "breed": "sealyham terrier",
                "size": "small"
          },
          {
                "breed": "shetland sheepdog",
                "size": "small"
          },
          {
                "breed": "shih tzu",
                "size": "small"
          },
          {
                "breed": "tibetan spaniel",
                "size": "small"
          },
          {
                "breed": "tibetan terrier",
                "size": "small"
          },
          {
                "breed": "welsh terrier",
                "size": "small"
          },
          {
                "breed": "west highland white terrier",
                "size": "small"
          },
          {
                "breed": "yorkshire terrier",
                "size": "small"
          },
          {
                "breed": "american water spaniel",
                "size": "medium"
          },
          {
                "breed": "australian kelpie/cattle dog",
                "size": "medium"
          },
          {
                "breed": "basset petit griffon vendeen",
                "size": "medium"
          },
          {
                "breed": "beagle",
                "size": "medium"
          },
          {
                "breed": "border collie",
                "size": "medium"
          },
          {
                "breed": "brittany spaniel",
                "size": "medium"
          },
          {
                "breed": "bull terrier",
                "size": "medium"
          },
          {
                "breed": "canaan dog",
                "size": "medium"
          },
          {
                "breed": "cocker spaniel (english)",
                "size": "medium"
          },
          {
                "breed": "collie (rough/smooth/bearded)",
                "size": "medium"
          },
          {
                "breed": "dachshund (standard)",
                "size": "medium"
          },
          {
                "breed": "elkhound",
                "size": "medium"
          },
          {
                "breed": "english springer spaniel",
                "size": "medium"
          },
          {
                "breed": "field spaniel",
                "size": "medium"
          },
          {
                "breed": "finnish spitz",
                "size": "medium"
          },
          {
                "breed": "foxhound",
                "size": "medium"
          },
          {
                "breed": "glenn of imaal terrier",
                "size": "medium"
          },
          {
                "breed": "irish terrier",
                "size": "medium"
          },
          {
                "breed": "keeshound",
                "size": "medium"
          },
          {
                "breed": "kerry blue terrier",
                "size": "medium"
          },
          {
                "breed": "norwegian buhund",
                "size": "medium"
          },
          {
                "breed": "pharaoh hound",
                "size": "medium"
          },
          {
                "breed": "pinscher",
                "size": "medium"
          },
          {
                "breed": "portuguese water dog",
                "size": "medium"
          },
          {
                "breed": "puli",
                "size": "medium"
          },
          {
                "breed": "saluki",
                "size": "medium"
          },
          {
                "breed": "samoyed",
                "size": "medium"
          },
          {
                "breed": "schnauzer",
                "size": "medium"
          },
          {
                "breed": "shar-pei",
                "size": "medium"
          },
          {
                "breed": "sheba inu",
                "size": "medium"
          },
          {
                "breed": "siberian husky",
                "size": "medium"
          },
          {
                "breed": "skye terrier",
                "size": "medium"
          },
          {
                "breed": "soft coated wheaten terrier",
                "size": "medium"
          },
          {
                "breed": "staffordshire bull terrier",
                "size": "medium"
          },
          {
                "breed": "sussex spaniel",
                "size": "medium"
          },
          {
                "breed": "welsh corgi (pembroke/cardigan)",
                "size": "medium"
          },
          {
                "breed": "welsh springer spaniel",
                "size": "medium"
          },
          {
                "breed": "whippet",
                "size": "medium"
          },
          {
                "breed": "afghan hound",
                "size": "large"
          },
          {
                "breed": "airedale",
                "size": "large"
          },
          {
                "breed": "alaskan malamute",
                "size": "large"
          },
          {
                "breed": "basset hound",
                "size": "large"
          },
          {
                "breed": "belgain shepherd dog",
                "size": "large"
          },
          {
                "breed": "bernese mountain dog",
                "size": "large"
          },
          {
                "breed": "borzoi",
                "size": "large"
          },
          {
                "breed": "bouvier des flandres",
                "size": "large"
          },
          {
                "breed": "boxer",
                "size": "large"
          },
          {
                "breed": "briard",
                "size": "large"
          },
          {
                "breed": "bulldog",
                "size": "large"
          },
          {
                "breed": "chesapeake bay retriever",
                "size": "large"
          },
          {
                "breed": "chow chow",
                "size": "large"
          },
          {
                "breed": "clumber spaniel",
                "size": "large"
          },
          {
                "breed": "curly-coated retriever",
                "size": "large"
          },
          {
                "breed": "dalmatian",
                "size": "large"
          },
          {
                "breed": "deerhound",
                "size": "large"
          },
          {
                "breed": "doberman",
                "size": "large"
          },
          {
                "breed": "english setter",
                "size": "large"
          },
          {
                "breed": "eskimo dog",
                "size": "large"
          },
          {
                "breed": "estrela mountain dog",
                "size": "large"
          },
          {
                "breed": "flat-coated retriever",
                "size": "large"
          },
          {
                "breed": "german shepherd dog",
                "size": "large"
          },
          {
                "breed": "golden retriever",
                "size": "large"
          },
          {
                "breed": "gordon setter",
                "size": "large"
          },
          {
                "breed": "greyhound",
                "size": "large"
          },
          {
                "breed": "hovawart",
                "size": "large"
          },
          {
                "breed": "hungarian vizsla",
                "size": "large"
          },
          {
                "breed": "ibizan hound",
                "size": "large"
          },
          {
                "breed": "irish setter",
                "size": "large"
          },
          {
                "breed": "irish water spaniel",
                "size": "large"
          },
          {
                "breed": "italian spinone",
                "size": "large"
          },
          {
                "breed": "japanese akita",
                "size": "large"
          },
          {
                "breed": "labrador retriever",
                "size": "large"
          },
          {
                "breed": "maremma sheepdog",
                "size": "large"
          },
          {
                "breed": "munsterlander (large)",
                "size": "large"
          },
          {
                "breed": "old english sheepdog",
                "size": "large"
          },
          {
                "breed": "otterhound",
                "size": "large"
          },
          {
                "breed": "pointer",
                "size": "large"
          },
          {
                "breed": "poodle (standard)",
                "size": "large"
          },
          {
                "breed": "schnauzer (giant)",
                "size": "large"
          },
          {
                "breed": "rhodesian ridgeback",
                "size": "large"
          },
          {
                "breed": "rottweiler",
                "size": "large"
          },
          {
                "breed": "weimaraner",
                "size": "large"
          },
          {
                "breed": "anatolian shepherd dog",
                "size": "giant"
          },
          {
                "breed": "bloodhound",
                "size": "giant"
          },
          {
                "breed": "bullmastiff",
                "size": "giant"
          },
          {
                "breed": "great dane",
                "size": "giant"
          },
          {
                "breed": "irish wolfhound",
                "size": "giant"
          },
          {
                "breed": "komondor",
                "size": "giant"
          },
          {
                "breed": "leonberger",
                "size": "giant"
          },
          {
                "breed": "mastiff",
                "size": "giant"
          },
          {
                "breed": "neapolitan mastiff",
                "size": "giant"
          },
          {
                "breed": "newfoundland",
                "size": "giant"
          },
          {
                "breed": "pyrenean mountain dog",
                "size": "giant"
          },
          {
                "breed": "st. bernard",
                "size": "giant"
          },
		  {
				"breed": "other (small)",
				"size": "small"
		  },
		  {
				"breed": "other (medium)",
				"size": "medium"
	  	  },
		  {
				"breed": "other (large)",
				"size": "large"
		  }
    ]
}

// handle mixed breeds and unknown
const otherBreeds = breeds.breeds.filter(breed => {
	return (
		breed.breed.toLowerCase().includes("other")
	);
});

// display list of dog breeds
function showDropDown(results, ddmenu){    
    const dropdown = document.querySelector(".breedDropdown");
    //const dropdownContainer = document.querySelector(".resultsContainter");
    dropdown.innerHTML = "";
	if (ddmenu.value === ""){
        return;
    }

	otherBreeds.forEach((result) => {
		const option = document.createElement("li");
        option.textContent = result.breed;
        option.addEventListener("click", () => {
            ddmenu.value = result.breed;
			fbreed.value = result.breed;
			fdogSize.value = result.size;
            dropdown.innerHTML = "";
			checkDetails()
        });
        dropdown.appendChild(option);
	});
    results.forEach((result) => {
		if (result.breed.includes("other")){
			return;
		}
        const option = document.createElement("li");
        option.textContent = result.breed;
        option.addEventListener("click", () => {
            ddmenu.value = result.breed;
			fbreed.value = result.breed;
			fdogSize.value = result.size;
            dropdown.innerHTML = "";
			checkDetails()
        });
        dropdown.appendChild(option);
    });
}

const breedInput = document.getElementById("dogsBreed")
breedInput.addEventListener("input", () => {
	const searchTerm = breedInput.value.toLowerCase().trim();
	const filteredBreeds = breeds.breeds.filter(breed => {
		return (
			breed.breed.toLowerCase().includes(searchTerm)
		);
	});
	showDropDown(filteredBreeds, breedInput);
});

// handle image selection
const images = document.querySelectorAll('.selectableImage');
images.forEach(image => {
	image.addEventListener('click', function () {
		// Remove the 'enclosureSelected' class from all images
		images.forEach(otherImage => {
			if (otherImage !== this) {
				otherImage.classList.remove('enclosureSelected');
			}
		});

		// Toggle the 'enclosureSelected' class on the clicked image
		this.classList.toggle('enclosureSelected');
		if (this.classList.contains("enclosureSelected")){
			fstay.value = "yes"
			enableButton(dogStayButton);
		}
		else {
			fstay.value = ""
			disableButton(dogStayButton);
		}
	});
});

//handle details
document.getElementById("custemersPhoneNumber").addEventListener("input", function() {
	this.value = this.value.replace(/[^0-9]/g, '');
	fphone.value = this.value;
	checkDetails();
});

document.getElementById("dogsName").addEventListener("input", function() {
	fdogsname.value = this.value;
	checkDetails();
});

document.getElementById("specialInstructions").addEventListener("input", function(){
	fabout.value = this.value;
	checkDetails();
});

document.getElementById("Address").addEventListener("input", function(){
	faddress.value = this.value;
	checkDetails();
});

document.getElementById("email").addEventListener("input", function(){
	femail.value = this.value;
	checkDetails();
});

document.getElementById("ownerName").addEventListener("input", function(){
	fcustemerName.value = this.value;
	checkDetails();
});

//handle payment
const nameOnCard = document.getElementById("nameOnCard");
const cardNumber = document.getElementById("cardNo");
const expiry = document.getElementById("cardExpiry");
const ccv = document.getElementById("cardCcv");

function varifyCard(n){
	const regex = new RegExp("^[0-9]{13,19}$");
    if (!regex.test(n)){
        return false;
    }

	let checkSum = 0;
	let j = 1;
	for (let i = n.length - 1; i >= 0; i--){
		let calc = Number(n.charAt(i)) * j;
		if (calc > 9) {
			checkSum++;
			calc-= 10;
		}

		checkSum+= calc;

		if (j === 1) {
			j = 2
		}
		else {
			j = 1
		}
	}

	return (checkSum % 10) === 0;
}

cardNumber.addEventListener("input", function() {
	this.value = this.value.replace(/[^0-9]/g, '');
	if (this.value === "") {
		this.style.backgroundColor = "white";
		fcardNumber.value = this.value;
		checkCardinfo();
	}
	else if (varifyCard(this.value) === true) {
		this.style.backgroundColor = "#4eb98010";
		fcardNumber.value = this.value;
		checkCardinfo();
	}
	else {
		this.style.backgroundColor = "#ff000010";
		fcardNumber.value = "";
		checkCardinfo();
	}
	
});

expiry.addEventListener("input", function() {
	// Remove non-numeric characters
    this.value = this.value.replace(/[^0-9/]/g, '');

    // Add '/' automatically when the value is two characters long and the input is not 'deleteContentBackward'
    if (this.value.length === 2 && event.inputType !== 'deleteContentBackward') {
        this.value += '/';
    }

    // Handle backspace to delete the second number and the '/'
    if (event.inputType === 'deleteContentBackward' && this.value.length === 2) {
        this.value = this.value.substring(0, 1);
    }

    // Limit to 4 characters
    if (this.value.length > 5) {
        this.value = this.value.substring(0, 5);
    }

	const regex = new RegExp("^[0-9]{2}/[0-9]{2}$");
	if (regex.test(this.value)){
		expiry.style.backgroundColor = "#4eb98010";
		fcardExpiry.value = this.value;
		checkCardinfo();
	}
	else {
		expiry.style.backgroundColor = "white";
		fcardExpiry.value = "";
		checkCardinfo();
	}
});

ccv.addEventListener("input", function(){
	this.value = this.value.replace(/[^0-9]/g, '');
	if (this.value.length > 3) {
        this.value = this.value.substring(0, 3);
	}
	if (this.value.length === 3) {
        ccv.style.backgroundColor = "#4eb98010";
		fccv.value = this.value;
		checkCardinfo();
	}
	else {
		ccv.style.backgroundColor = "white";
		fccv.value = "";
		checkCardinfo();
	}
});

nameOnCard.addEventListener('input', function() {
	const regex = new RegExp("^[a-zA-Z]+ [a-zA-Z]+$");
	if (regex.test(nameOnCard.value)) {
		nameOnCard.style.backgroundColor = "#4eb98010";
		fnameOnCard.value = nameOnCard.value;
		checkCardinfo();
	}
	else {
		nameOnCard.style.backgroundColor = "white";
		fnameOnCard.value = "";
		checkCardinfo();
	}
})