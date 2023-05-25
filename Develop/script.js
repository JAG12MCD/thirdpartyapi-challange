// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

const getCurrentHour = () => {
	return dayjs().hour();
};

const getFullDay = ()=>{
  return dayjs().format("dddd, MMMM DD");
}

const convert24To12 = (hours) => {
	if (hours <= 12) return `${hours}AM`;
	else return `${hours - 12}PM`;
};

const handleSaveButton = (hour, description) => {
  updateDescription(hour, description);
};

const updateDescription = (hour, description)=>{
  const calenderData = JSON.parse(localStorage.getItem("calender") || "{}");
  calenderData[hour] = description;
  localStorage.setItem("calender",JSON.stringify(calenderData));
}

const getDescription  =(hour)=>{
  const calenderData = JSON.parse(localStorage.getItem("calender") || "{}");
  return calenderData[hour] || "";
}

const createSlot = (hour, timeClass) => {
	var divElement = $('<div>', {
		id: `hour-${hour}`,
		class: `row time-block ${timeClass}`,
	});

	var hourDiv = $('<div>', {
		class: 'col-2 col-md-1 hour text-center py-3',
		text: convert24To12(hour),
	});

	var textarea = $('<textarea>', {
		class: 'col-8 col-md-10 description',
		rows: '3',
	});

  textarea.val(getDescription(hour));

	var button = $('<button>', {
		class: 'btn saveBtn col-2 col-md-1',
		'aria-label': 'save',
	});

	button.click(() => {
		handleSaveButton(hour, textarea.val());
	});

	var icon = $('<i>', {
		class: 'fas fa-save',
		'aria-hidden': 'true',
	});

	button.append(icon);

	divElement.append(hourDiv, textarea, button);

	return divElement;
};

const addSlots = () => {
	const mainContainer = $('#main_container');

	for (let i = 9; i < 18; i++) {
		let timeClass;
		const currentHour = getCurrentHour();

		if (currentHour == i) timeClass = 'present';
		else if (i < currentHour) timeClass = 'past';
		else timeClass = 'future';
		mainContainer.append(createSlot(i, timeClass));
	}
};

$(function () {
	addSlots();
  $("#currentDay").text(getFullDay())
	// TODO: Add a listener for click events on the save button. This code should
	// use the id in the containing time-block as a key to save the user input in
	// local storage. HINT: What does `this` reference in the click listener
	// function? How can DOM traversal be used to get the "hour-x" id of the
	// time-block containing the button that was clicked? How might the id be
	// useful when saving the description in local storage?
	//
	// TODO: Add code to apply the past, present, or future class to each time
	// block by comparing the id to the current hour. HINTS: How can the id
	// attribute of each time-block be used to conditionally add or remove the
	// past, present, and future classes? How can Day.js be used to get the
	// current hour in 24-hour time?
	//
	// TODO: Add code to get any user input that was saved in localStorage and set
	// the values of the corresponding textarea elements. HINT: How can the id
	// attribute of each time-block be used to do this?
	//
	// TODO: Add code to display the current date in the header of the page.
});
