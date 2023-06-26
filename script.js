// Function to add a new task to the list
function addTask(event) {
    event.preventDefault();
  
    // Get the input value
    const input = document.getElementById("todoInput");
    const taskText = input.value;
  
    if (taskText.trim() !== "") {
      // Create a new list item
      const listItem = document.createElement("li");
      listItem.textContent = taskText;
  
      // Add the list item to the to-do list
      const todoList = document.getElementById("todoList");
      todoList.appendChild(listItem);
  
      // Clear the input field
      input.value = "";
  
      // Save the updated list to local storage
      saveListToStorage();
    }
  }
  
  // Function to remove a task from the list
  function removeTask() {
    const todoList = document.getElementById("todoList");
  
    // Get the selected task
    const selectedTask = todoList.querySelector(".selected");
  
    if (selectedTask) {
      // Remove the task from the list
      todoList.removeChild(selectedTask);
  
      // Save the updated list to local storage
      saveListToStorage();
    }
  }
  
  // Function to remove all tasks from the list
  function removeAllTasks() {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";
  
    // Save the updated list to local storage
    saveListToStorage();
  }
  
  // Function to add a new tab
  function addTab() {
    const tabList = document.getElementById("tabList");
  
    // Create a new tab
    const tab = document.createElement("li");
    tab.textContent = "List " + (tabList.children.length + 1);
  
    // Add event listener to switch to the selected tab
    tab.addEventListener("click", switchTab);
  
    // Add the tab to the tab list
    tabList.appendChild(tab);
  
    // Create a new to-do list for the tab
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";
  
    // Save the updated list to local storage
    saveListToStorage();
  }
  
  // Function to switch to the selected tab
  function switchTab(event) {
    const selectedTab = event.target;
  
    // Remove the "selected" class from all tabs
    const tabList = document.getElementById("tabList");
    for (let i = 0; i < tabList.children.length; i++) {
      tabList.children[i].classList.remove("selected");
    }
  
    // Add the "selected" class to the clicked tab
    selectedTab.classList.add("selected");
  
    // Save the updated list to local storage
    saveListToStorage();
  }
  
  // Function to save the list to local storage
  function saveListToStorage() {
    const tabList = document.getElementById("tabList");
    const todoList = document.getElementById("todoList");
  
    // Get the index of the currently selected tab
    let selectedTabIndex = -1;
    for (let i = 0; i < tabList.children.length; i++) {
      if (tabList.children[i].classList.contains("selected")) {
        selectedTabIndex = i;
        break;
      }
    }
  
    // Create an array to store the tasks
    const tasks = [];
  
    // Iterate through each list item and add the task text to the array
    for (let i = 0; i < todoList.children.length; i++) {
      const listItem = todoList.children[i];
      tasks.push(listItem.textContent);
    }
  
    // Save the tasks array and selected tab index to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("selectedTabIndex", selectedTabIndex);
  }
  
  // Function to load the list from local storage
  function loadListFromStorage() {
    const tasks = localStorage.getItem("tasks");
    const selectedTabIndex = localStorage.getItem("selectedTabIndex");
  
    if (tasks && selectedTabIndex !== null) {
      const todoList = document.getElementById("todoList");
      const tabList = document.getElementById("tabList");
  
      // Clear the to-do list
      todoList.innerHTML = "";
  
      // Parse the stored tasks array
      const parsedTasks = JSON.parse(tasks);
  
      // Create list items for each task and add them to the to-do list
      parsedTasks.forEach(task => {
        const listItem = document.createElement("li");
        listItem.textContent = task;
        todoList.appendChild(listItem);
      });
  
      // Set the selected tab based on the stored index
      if (selectedTabIndex >= 0 && selectedTabIndex < tabList.children.length) {
        const selectedTab = tabList.children[selectedTabIndex];
        selectedTab.classList.add("selected");
      }
    }
  }
  
  // Attach event listeners
  const form = document.getElementById("todoForm");
  form.addEventListener("submit", addTask);
  
  const removeButton = document.getElementById("removeButton");
  removeButton.addEventListener("click", removeTask);
  
  const removeAllButton = document.getElementById("removeAllButton");
  removeAllButton.addEventListener("click", removeAllTasks);
  
  const addTabButton = document.getElementById("addTabButton");
  addTabButton.addEventListener("click", addTab);
  
  const tabList = document.getElementById("tabList");
  for (let i = 0; i < tabList.children.length; i++) {
    tabList.children[i].addEventListener("click", switchTab);
  }
  
  // Load the list from local storage on page load
  window.addEventListener("load", loadListFromStorage);
  