const uri = 'https://localhost:44325/api/empleats';
let todos = [];


//Calls the function _displayemployees
function getEmployees() {
  fetch(uri)
    .then(response => response.json())
    .then(data => _displayEmployees(data))
    .catch(error => console.error('Unable to get employees.', error));
}

//Parses the introduced data and calls the API POST method
function addEmployee() {
  const addNameTextbox = document.getElementById('add-name');
  const addSurnameTextbox = document.getElementById('add-surname');
  const addSalaryTextbox = document.getElementById('add-salary');
  const addRoleTextbox = document.getElementById('add-role');

  const employee = {
    name: addNameTextbox.value.trim(),
    surname:addSurnameTextbox.value.trim(),
    salary: parseInt(addSalaryTextbox.value.trim()),
    role: addRoleTextbox.value.trim()
  };

  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employee)
  })
    .then(response => response.json())
    .then(() => {
      getEmployees();
      addNameTextbox.value = '';
    })
    .catch(error => console.error('Unable to add employee.', error));
}

//Calls the API DELETE method
function deleteEmployee(id) {
  fetch(`${uri}/${id}`, {
    method: 'DELETE'
  })
  .then(() => getEmployees())
  .catch(error => console.error('Unable to delete employee.', error));
}

function displayEditForm(id) {
  const employee = todos.find(employee => employee.id === id);
  
  document.getElementById('edit-name').value = employee.name;
  document.getElementById('edit-id').value = employee.id;
  document.getElementById('edit-isComplete').checked = employee.isComplete;
  document.getElementById('editForm').style.display = 'block';
}

function updateemployee() {
  const employeeId = document.getElementById('edit-id').value;
  const employee = {
    id: parseInt(employeeId, 10),
    isComplete: document.getElementById('edit-isComplete').checked,
    name: document.getElementById('edit-name').value.trim()
  };

  fetch(`${uri}/${employeeId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employee)
  })
  .then(() => getEmployees())
  .catch(error => console.error('Unable to update employee.', error));

  closeInput();

  return false;
}

function closeInput() {
  document.getElementById('editForm').style.display = 'none';
}

function _displayCount(employeeCount) {
  const name = (employeeCount === 1) ? 'to-do' : 'to-dos';

  document.getElementById('counter').innerText = `${employeeCount} ${name}`;
}

function displayModalDelete(employeeId){
  //alert(employeeId);
  //$("#deleteModal").modal().val(employeeId);

  $('#deleteModal').modal().on('show.bs.modal', function(e) {
    //$('#idHolder').html( employeeId );
    //var Id = $(e.relatedTarget).data(employeeId);
    //$(e.relatedTarget).find('input[name="employeeTextbox"]').val(employeeId);
  });

  $("[data-modal-action=yes]").click(function () {
    //call the delete ajax method 
    //awardid= 45
   deleteEmployee(employeeId)  //calling delete method
  $("#deleteModal").modal("hide");
  });
}



function _displayEmployees(data) {
  //alert("display");
  const tBody = document.getElementById('todos');
  tBody.innerHTML = '';

  _displayCount(data.length);

  const button = document.createElement('button');

  data.forEach(employee => {
    let isCompleteCheckbox = document.createElement('input');
    isCompleteCheckbox.type = 'checkbox';
    isCompleteCheckbox.disabled = true;
    isCompleteCheckbox.checked = employee.isComplete;

    let editButton = button.cloneNode(false);
    editButton.innerText = 'Edit';
    editButton.setAttribute('class', 'btn btn-primary')
    editButton.setAttribute('data-toogle', 'modal')
    editButton.setAttribute('data-target', '#exampleModal')
    editButton.setAttribute('onclick', `displayModalEdit(${employee.id})`);
    //editButton.setAttribute('onclick', `displayEditForm(${employee.id})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('class', 'btn btn-primary')
    deleteButton.setAttribute('data-toogle', 'modal')
    deleteButton.setAttribute('data-target', '#exampleModal')
    deleteButton.setAttribute('onclick', `displayModalDelete(${employee.id})`);
    //deleteButton.setAttribute('onclick', `deleteEmployee(${employee.id})`);

    let tr = tBody.insertRow();

    let td1 = tr.insertCell(0);
    let name = document.createTextNode(employee.name);
    td1.appendChild(name);

    let td2 = tr.insertCell(1);
    let surname = document.createTextNode(employee.surname);
    td2.appendChild(surname);

    let td3 = tr.insertCell(2);
    let salary = document.createTextNode(employee.salary);
    td3.appendChild(salary);

    let td4 = tr.insertCell(3);
    let role = document.createTextNode(employee.role);
    td4.appendChild(role);

    let td5 = tr.insertCell(4);
    td5.appendChild(editButton);

    let td6 = tr.insertCell(5);
    td6.appendChild(deleteButton);
  });

  todos = data;
}