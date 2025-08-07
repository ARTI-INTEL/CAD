function statusClass(status) {
  switch (status.toUpperCase()) {
    case 'ENROUTE': return 'enroute';
    case 'AVAILABLE': return 'available';
    case 'BUSY': return 'busy';
    case 'UNAVAILABLE': return 'unavailable';
    case 'ON SCENE': return 'on-scene';
    default: return '';
  }
}

const officer = JSON.parse(localStorage.getItem('loggedOfficer'));
if (!officer) window.location.href = 'login.html';

document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('loggedOfficer');
  window.location.href = 'login.html';
});

document.querySelectorAll('.status-buttons button').forEach(button => {
  button.addEventListener('click', () => {
    officer.status = button.dataset.status;
    localStorage.setItem('loggedOfficer', JSON.stringify(officer));
    renderOfficerTable();
  });
});

function renderOfficerTable() {
  const tbody = document.getElementById('officers-body');
  tbody.innerHTML = '';
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${officer.name}</td>
    <td>${officer.unit}</td>
    <td class="${statusClass(officer.status)}">${officer.status}</td>
    <td>${officer.call}</td>
    <td>${officer.agency}</td>
    <td>${officer.location}</td>
  `;
  tbody.appendChild(row);
}

renderOfficerTable();

function homeOpen() {
  allClose()
  const homePage = document.getElementById('home-page');
  homePage.classList.remove('hidden');
}

function mapOpen() {
  allClose()
  const mapPage = document.getElementById('map-page');
  mapPage.classList.remove('hidden');
}

function cadOpen() {
  allClose()
  const callPage = document.getElementById('cad-page');
  callPage.classList.remove('hidden');
}

function searchOpen() {
  allClose()
  const searchPage = document.getElementById('search-page')
  searchPage.classList.remove('hidden')
}

function reportsOpen(){
  allClose()
  const reportsPage = document.getElementById('reports-page')
  reportsPage.classList.remove('hidden')
}

function historyOpen() {
  allClose()
  const historyPage = document.getElementById('history-page')
  historyPage.classList.remove('hidden')
}

function allClose() {
  const homePage = document.getElementById('home-page');
  const mapPage = document.getElementById('map-page');
  const callPage = document.getElementById('cad-page');
  const searchPage = document.getElementById('search-page')
  const reportsPage = document.getElementById('reports-page')
  const historyPage = document.getElementById('history-page')
  homePage.classList.add('hidden')
  mapPage.classList.add('hidden')
  callPage.classList.add('hidden')
  searchPage.classList.add('hidden')
  reportsPage.classList.add('hidden')
  historyPage.classList.add('hidden')
}

function notesPopup() {
  const popup = document.getElementById('notepad-popup');
  popup.classList.remove('hidden');
  const notes = localStorage.getItem('notes') || '';
  document.getElementById('notepad-textarea').value = notes;
}

function closeNotepadPopup() {
  const popup = document.getElementById('notepad-popup');
  popup.classList.add('hidden');
}

function saveNotes() {
  const notes = document.getElementById('notepad-textarea').value;
  localStorage.setItem('notes', notes);
  alert('Notes saved successfully!');
  closeNotepadPopup();
}

function createCallPopup() {
  const popup = document.getElementById('add-call-popup');
  popup.classList.remove('hidden');
}

function closeCreateCallPopup() {
  const popup = document.getElementById('add-call-popup');
  popup.classList.add('hidden');
  document.getElementById('create-call-form').reset();
}

// Function to create a call and add it to the table
function createCall() {
  const nature = document.getElementById('call-nature');
  const location = document.getElementById('call-location');
  const prty = document.getElementById('call-priority');
  const table = document.getElementById('calls-table');

  num = table.rows.length; // Get the current number of rows to use as call number

  const tbody = document.getElementById('calls-body');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${num}</td>
    <td class="${statusClass(nature.value)}">${nature.value}</td>
    <td>${location.value}</td>
    <td>${[prty.value]}</td>
    <td class="units">${""}</td>
  `;
    tbody.appendChild(row);

  closeCreateCallPopup();
  alert('Call created successfully!');
}

function createBoloPopup() {
  const popup = document.getElementById('add-bolo-popup');
  popup.classList.remove('hidden');
}

function closeCreateBoloPopup() {
  const popup = document.getElementById('add-bolo-popup');
  popup.classList.add('hidden');
  document.getElementById('create-bolo-form').reset();
} 

// Function to create a BOLO and add it to the table
function createBolo() {
  const type = document.getElementById('bolo-type');
  const reason = document.getElementById('bolo-reason');
  const description = document.getElementById('bolo-description');

  const tbody = document.getElementById('bolo-body');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${type.value}</td>
    <td>${reason.value}</td>  
    <td>${description.value}</td>
  `;
  tbody.appendChild(row);

  closeCreateBoloPopup();
  alert('BOLO created successfully!');
}

// Event that triggers when you click on a row in the calls table
const table = document.getElementById('calls-table'); // Assuming your table has an ID 'myTable'
table.addEventListener('click', function(event) {
    editCallPopup(event.target.closest('tr'));
});

// Function to open the edit call popup and populate it with the clicked row's data
function editCallPopup(row) {
  const popup = document.getElementById('edit-call-popup');
  popup.classList.remove('hidden');

  // Get the cells of the clicked row
  const cells = row.getElementsByTagName('td');
  
  // Populate the form fields with the current values
  document.getElementById('call-ID').textContent = `Call ID: ${cells[0].textContent}`;
  document.getElementById('edit-call-nature').value = cells[1].textContent;
  document.getElementById('edit-call-location').value = cells[2].textContent;
  document.getElementById('edit-call-priority').value = cells[3].textContent;

  //event listener for buttons
  document.getElementById('call-attach').onclick = function() {
    attachToCall(row);
  }

  document.getElementById('code-4').onclick = function() {
    code4(row);
  }

  document.getElementById('update-call').onclick = function() {
    updateCall(row); 
  }
  // Store the row index in global var for later use
  const currentRow = row.rowIndex; // Get the index of the clicked row
  localStorage.setItem("row",currentRow)
} 

function closeEditCallPopup() {
  const popup = document.getElementById('edit-call-popup');
  popup.classList.add('hidden');
  document.getElementById('edit-call-form').reset();
  localStorage.removeItem("row"); // Clear the row index from local storage
}

// Updates the units assigned to the call
function attachToCall(row) {
  const cells = row.getElementsByTagName('td');
  let units = cells[4].textContent;
  
  if (!units.includes(officer.unit)) {
    units = units ? `${units}, ${officer.unit}` : officer.unit;
    cells[4].textContent = units;
  }

  closeEditCallPopup();
  alert('Call updated successfully!');
}

// Function to send call to history table by clicking CODE 4 button
function code4(row) {
  const historyTable = document.getElementById('history-table');
  const historyBody = historyTable.querySelector('tbody');

  // Create a new row for the history table
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${row.cells[0].textContent}</td>
    <td>${row.cells[1].textContent}</td>
    <td>${row.cells[2].textContent}</td>
    <td>${row.cells[3].textContent}</td>
    <td>${row.cells[4].textContent}</td>
  `;

  // Append the new row to the history table
  historyBody.appendChild(newRow);

  // Remove the row from the calls table
  row.remove();

  closeEditCallPopup();
  alert('Call marked as CODE 4 and moved to history successfully!');
}

function updateCall(row) {
  const nature = document.getElementById('edit-call-nature');
  const location = document.getElementById('edit-call-location');
  const prty = document.getElementById('edit-call-priority');

  // Update the row directly
  row.cells[1].textContent = nature.value;
  row.cells[2].textContent = location.value;
  row.cells[3].textContent = prty.value;

  closeEditCallPopup();
  alert('Call updated successfully!');
}
