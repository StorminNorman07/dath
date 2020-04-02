const submitted = document.querySelector('form');
const ul = document.querySelector('ul');
const button = document.querySelector('button');
todoList = [];

// function addItem() {
// 	const newTodoInput = document.querySelector('input[name="newtodo"]');
// 	const newLi = document.createElement('li');
// 	const newCheckbox = document.createElement('input');
// 	newCheckbox.type = 'checkbox';
// 	newCheckbox.value = 1;

// 	newLi.innerText = newTodoInput.value;
// 	todoList.push(newTodoInput.value);
// 	newLi.classList.add('completed');
// 	newLi.classList.toggle('completed');
// 	ul.append(newLi);
// 	newLi.prepend(newCheckbox);
// 	newTodoInput.value = '';
// }

// submitted.addEventListener('submit', function(event) {
// 	event.preventDefault();
// 	addItem();
// 	localStorage.setItem('todoList', JSON.stringify(todoList));
// });

function addItem(selection, text) {
	//Creates new todo item with 'text' as the item.
	const newLi = document.createElement('li');
	const newCheckbox = document.createElement('input');
	newCheckbox.type = 'checkbox';
	newCheckbox.value = 1;

	newLi.innerText = text;
	todoList.push(text);
	newLi.classList.add('completed');
	newLi.classList.toggle('completed');
	ul.append(newLi);
	newLi.prepend(newCheckbox);
	selection.value = '';
}

submitted.addEventListener('submit', function(event) {
	event.preventDefault();
	const newTodoInput = document.querySelector('input[name="newtodo"]');
	// Make sure doesn't start with whitespace or empty
	if (checkInput(newTodoInput.value)) {
		addItem(newTodoInput, newTodoInput.value);
		localStorage.setItem('todoList', JSON.stringify(todoList));
	}
});

// Validates that input is not blank or starts with spaces
function checkInput(value) {
	// First check if user has entered text
	if (!value) {
		return false;
	}
	// Then check if removing whitespace still has a value
	const trimmed = value.trim();
	if (trimmed) {
		return true;
	}
	return false;
}

ul.addEventListener('change', function(event) {
	if (event.target.tagName === 'INPUT') {
		theLi = event.path[1];
		theLi.classList.toggle('completed');
	}
	console.log(event.path[1]);
});

button.addEventListener('click', function(event) {
	button.classList.toggle('notPressed');
	setTimeout(function() {
		button.classList.toggle('notPressed');
	}, 200);
	localStorage.clear();
	ul.textContent = '';
});

let jsonArray = JSON.parse(localStorage.getItem('todoList'));
if (jsonArray.length > 0) {
	for (todo of jsonArray) {
		item = document.createElement('input');
		item.innerText = todo;
		addItem(item, item.innerText);
	}
}
