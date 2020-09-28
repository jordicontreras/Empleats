const uri = 'api/Empleats';
let todos = [];

function getEmpleats() {
  fetch(uri)
    .then(response => response.json())
    .then(data => _displayEmpleats(data))
    .catch(error => console.error('Unable to get empleats.', error));
}

function addEmpleat() {
  const addNameTextbox = document.getElementById('add-name');

  const empleat = {
    name: addNameTextbox.value.trim(),
    surname: "Garcia",
    salary: 1800,
    role: "net dev"
  };

  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(empleat)
  })
    .then(response => response.json())
    .then(() => {
      getEmpleats();
      addNameTextbox.value = '';
    })
    .catch(error => console.error('Unable to add empleat.', error));
}

function deleteEmpleat(id) {
  fetch(`${uri}/${id}`, {
    method: 'DELETE'
  })
  .then(() => getEmpleats())
  .catch(error => console.error('Unable to delete empleat.', error));
}

function displayEditForm(id) {
  const empleat = todos.find(empleat => empleat.id === id);
  
  document.getElementById('edit-name').value = empleat.name;
  document.getElementById('edit-id').value = empleat.id;
  document.getElementById('edit-isComplete').checked = empleat.isComplete;
  document.getElementById('editForm').style.display = 'block';
}

function updateEmpleat() {
  const empleatId = document.getElementById('edit-id').value;
  const empleat = {
    id: parseInt(empleatId, 10),
    isComplete: document.getElementById('edit-isComplete').checked,
    name: document.getElementById('edit-name').value.trim()
  };

  fetch(`${uri}/${empleatId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(empleat)
  })
  .then(() => getEmpleats())
  .catch(error => console.error('Unable to update empleat.', error));

  closeInput();

  return false;
}

function closeInput() {
  document.getElementById('editForm').style.display = 'none';
}

function _displayCount(empleatCount) {
  const name = (empleatCount === 1) ? 'to-do' : 'to-dos';

  document.getElementById('counter').innerText = `${empleatCount} ${name}`;
}

function _displayEmpleats(data) {
  alert("display");
  const tBody = document.getElementById('todos');
  tBody.innerHTML = '';

  _displayCount(data.length);

  const button = document.createElement('button');

  data.forEach(empleat => {
    let isCompleteCheckbox = document.createElement('input');
    isCompleteCheckbox.type = 'checkbox';
    isCompleteCheckbox.disabled = true;
    isCompleteCheckbox.checked = empleat.isComplete;

    let editButton = button.cloneNode(false);
    editButton.innerText = 'Edit';
    editButton.setAttribute('onclick', `displayEditForm(${empleat.id})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('onclick', `deleteEmpleat(${empleat.id})`);

    let tr = tBody.insertRow();
    
    let td1 = tr.insertCell(0);
    td1.appendChild(isCompleteCheckbox);

    let td2 = tr.insertCell(1);
    let textNode = document.createTextNode(empleat.name);
    td2.appendChild(textNode);

    let td3 = tr.insertCell(2);
    td3.appendChild(editButton);

    let td4 = tr.insertCell(3);
    td4.appendChild(deleteButton);
  });

  todos = data;
}