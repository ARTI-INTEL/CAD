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

function createCall() {
  const nature = document.getElementById('call-nature');
  const location = document.getElementById('call-location');
  const prty = document.getElementById('call-priorty');

  const row = document.createElement('tr');
  const tbody = document.getElementById('calls-body');
    row.innerHTML = `
      <td>${data.length + 1}</td>
      <td class="${statusClass(nature.value)}">${nature.value}</td>
      <td>${location.value}</td>
      <td>${[prty.value]}</td>
      <td class="${statusClass('enroute')}">${'ENROUTE'}</td>
      <td class="units">${"4PI-04, MED-04, FLY-02, 2PS-01"}</td>
    `;
    tbody.appendChild(row);

    num = data.length + 1

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

function createBolo() {
  const type = document.getElementById('bolo-type');
  const reason = document.getElementById('bolo-reason');
  const description = document.getElementById('bolo-description');

  const row = document.createElement('tr');
  const tbody = document.getElementById('bolos-body');
  row.innerHTML = `
    <td>${type.value}</td>
    <td>${reason.value}</td>  
    <td>${description.value}</td>
  `;
  tbody.appendChild(row);
  closeCreateBoloPopup();
  alert('BOLO created successfully!');
  document.getElementById('create-bolo-form').reset();
}

