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
					return false;
				}

				function printDates(){
					console.log(selectedStartDate);
					console.log(selectedEndDate);
					console.log(nowDate.getMonth())
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
						}
						else if (selectedStartDate.getTime() === selectedDate.getTime()){
							selectedStartDate = null;
							document.getElementById("dropOff").value = "";
						}
						else if (selectedEndDate !== null && selectedEndDate.getTime() === selectedDate.getTime()){
							selectedEndDate = null;
							document.getElementById("pickUp").value = "";
						}
						else if (!selectedEndDate) {
							selectedEndDate = selectedDate;
							document.getElementById("pickUp").value = `${String(selectedEndDate.getDate()).padStart(2, "0")}/${String(selectedEndDate.getMonth() +1).padStart(2, "0")}/${selectedEndDate.getFullYear()}`;
						}
						if (selectedStartDate !== null && selectedEndDate !== null) {
							const startDate = selectedStartDate < selectedDate ? selectedStartDate : selectedDate;
							const endDate = selectedStartDate < selectedDate ? selectedDate : selectedStartDate;
							selectedEndDate = endDate
							selectedStartDate = startDate;
							document.getElementById("dropOff").value = `${String(selectedStartDate.getDate()).padStart(2, "0")}/${String(selectedStartDate.getMonth() +1).padStart(2, "0")}/${selectedStartDate.getFullYear()}`;
							document.getElementById("pickUp").value = `${String(selectedEndDate.getDate()).padStart(2, "0")}/${String(selectedEndDate.getMonth() +1).padStart(2, "0")}/${selectedEndDate.getFullYear()}`;
						}
						renderCalendar();
					}
				});
		
				renderCalendar();