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


document.querySelector('.add-todo').addEventListener('submit', function(event) {
  event.preventDefault();

  const inputElement = event.target.querySelector('.input');
  const inputValue = inputElement.value.trim();

  if (inputValue === "") return;

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
});

function selectItem(event) {
  const item = event.currentTarget.closest('.item');
  if (item.classList.contains('selected')) {
    item.remove();
  } else {
    item.classList.toggle('selected');
  }
}


function deleteItem(event) {
  const item = event.currentTarget.closest('.item');
  item.remove();
}
