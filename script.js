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

fetch('calls.json')
  .then(res => res.json())
  .then(calls => {
    const tbody = document.getElementById('calls-body');
    calls.forEach(call => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${call.callId}</td>
        <td class="${statusClass(call.nature)}">${call.nature}</td>
        <td>${call.location}</td>
        <td>${call.priority}</td>
        <td class="${statusClass(call.status)}">${call.status}</td>
        <td class="units">${call.units.join(', ')}</td>
      `;
      tbody.appendChild(row);
    });
});

function renderCallsTable() {

}

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

function mapOpen() {
  const mapPopup = document.getElementById('map-popup');
  mapPopup.classList.remove('hidden');
}

function mapClose() {
  const mapPopup = document.getElementById('map-popup');
  mapPopup.classList.add('hidden');
}

function callOpen() {
  const callPopup = document.getElementById('create-call-popup');
  callPopup.classList.remove('hidden');
}

function callClose() {
  const callPopup = document.getElementById('create-call-popup');
  callPopup.classList.add('hidden');
}

function createCall() {
  // Getting json file contents
  fetch('calls.json')
  .then(res => res.json())
  .then(data => {
  
    const nature = document.getElementById('nature');
    const location = document.getElementById('loc');
    const prty = document.getElementById('prty');

    // const newCall = { callId: data_array.len() - 1, nature: nature.value, location: location.value, priority: prty.value };
    // data.push(newObject);

    // const updatedJsonString = JSON.stringify(data, null, 2);

    // fs.writeFileSync(filePath, updatedJsonString, 'utf8');
    // console.log('Object added to JSON file successfully!');

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

    callClose()

  })

  fetch('/calls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      callId: num,
      nature: nature.value,
      location: location.value,
      priority: prty.value
    })
  })
  .then(res => res.json())
  .then(data => console.log('Saved:', data));
}
