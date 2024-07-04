document.addEventListener('DOMContentLoaded', function () {
  const formAddTodo = document.getElementById('add-item-todo');

  const inputAddTodo = formAddTodo.querySelector('.input');
  const buttonAddTodo = formAddTodo.querySelector('.button');

  if (!inputAddTodo || !buttonAddTodo) {
    return;
  }

  buttonAddTodo.setAttribute('disabled', true);

  inputAddTodo.addEventListener('input', function() {
    if (inputAddTodo.value.trim() !== '') {
      buttonAddTodo.removeAttribute('disabled');
    } else {
      buttonAddTodo.setAttribute('disabled', true);
    }
  });

  function isDuplicateTodoItem(todoText) {
    const items = document.querySelectorAll('.tab-content.show .list .text');
  
    return Array.from(items).some(item => item.textContent.trim() === todoText);
  }

  formAddTodo.addEventListener('submit', function(event) {
    event.preventDefault();

    const inputElement = event.target.querySelector('.input');
    const inputValue = inputElement.value.trim();
  
    if (inputValue === "" || isDuplicateTodoItem(inputValue)) return;
  
    // Create new list item element
    const newItem = document.createElement('li');
    newItem.classList.add('item');
    newItem.setAttribute('onclick', 'selectItem(event)');
    newItem.innerHTML = `
      <div class="icon"></div>
      <p class="text">${inputValue}</p>
      <button class="delete" onclick="deleteItem(event)">
        <img src="./assets/images/delete.svg" alt="Delete Icon">
      </button>
    `;
  
    // Append the new item to the currently visible list
    const visibleTabContent = document.querySelector('.tab-content.show .list');
    visibleTabContent.appendChild(newItem);
  
    // Clear the input field
    inputElement.value = "";
    buttonAddTodo.setAttribute('disabled', true);
  });
});

function openTab(evt, tabName) {
  // Select all tab contents and tab links
  const tabContents = document.getElementsByClassName("tab-content");
  const tabLinks = document.getElementsByClassName("tab-link");

  // Hide all tab contents by removing 'show' class
  for (const tabContent of tabContents) {
    tabContent.classList.remove("show");
  }

  // Deactivate all tab links by removing 'active' class
  for (const tabLink of tabLinks) {
    tabLink.classList.remove("active");
  }

  // Show the selected tab content
  document.getElementById(tabName).classList.add("show");

  // Highlight the current tab link as active
  evt.currentTarget.classList.add("active");
}

function selectItem(event) {
  const item = event.currentTarget.closest('.item');
  item.classList.toggle('selected');
}


function deleteItem(event) {
  event.stopImmediatePropagation();
  const item = event.currentTarget.closest('.item');
  const todoName = item.querySelector('.text').textContent;

  const confirmation = confirm(`${todoName} will be deleted. Are you sure?`);

  if (confirmation) {
    item.remove();
  }
}

function clearCompleted() {
  const selectedItems = document.querySelectorAll('.tab-content.show .list .item.selected');
  
  for (const item of selectedItems) {
    item.remove();
  }
 }
