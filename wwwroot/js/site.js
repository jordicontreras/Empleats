const uri = 'https://localhost:44325/api/empleats';
let todos = [];
var count=0;


//Calls the function _displayemployees
function getEmployees() {
  fetch(uri)
    .then(response => response.json())
    .then(data => _displayEmployees(data))
    .catch(error => console.error('Unable to get employees.', error));
}


//Function that adds a new employee
function addEmployee() {
  //We save in constats the values introduced in the form by the user
  const addNameTextbox = document.getElementById('add-name');
  const addSurnameTextbox = document.getElementById('add-surname');
  const addSalaryTextbox = document.getElementById('add-salary');
  const addRoleTextbox = document.getElementById('add-role');

  //We create the array employeeAdd with the data introduced in the form by the user
  const employeeAdd = {
    name: addNameTextbox.value.trim(),
    surname:addSurnameTextbox.value.trim(),
    salary: parseInt(addSalaryTextbox.value.trim()),
    role: addRoleTextbox.value.trim()
  };

  //Calls the API POST method
  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employeeAdd)
  })
    .then(response => response.json())
    .then(() => {
      getEmployees();//Calls the get employees method to update the employees list
      addNameTextbox.value = '';
      addSurnameTextbox.value = '';
      addSalaryTextbox.value = '';
      addRoleTextbox.value = '';

    })
    .catch(error => console.error('Unable to add employee.', error));
}

//Call to the API DELETE method
function deleteEmployee(id) {
  fetch(`${uri}/${id}`, {
    method: 'DELETE'
  })
  .then(() => getEmployees())//Calls the get employees method to update the employees list
  .catch(error => console.error('Unable to delete employee.', error));
}


function displayEditForm(id) {
  const employee = todos.find(employee => employee.id === id);
  
  document.getElementById('edit-name').value = employee.name;
  document.getElementById('edit-id').value = employee.id;
  document.getElementById('edit-isComplete').checked = employee.isComplete;
  document.getElementById('editForm').style.display = 'block';
}

//Function that updates the employee
function updateEmployee(employeeId) {
  count++
  //We create the array employeeUpdate with the data introduced in the form by the user
  const employeeUpdate = {
    id: employeeId,
    name: document.getElementById('editFormName').value.trim(),
    surname: document.getElementById('editFormSurname').value.trim(),
    role: document.getElementById('editFormRole').value.trim(),
    salary: parseInt(document.getElementById('editFormSalary').value.trim())
  };
  console.log("entramos en updateEmployee")
  console.log("employeeId is:"+employeeId)
  //Call to the API PUT method to update the employee data
  fetch(`${uri}/${employeeId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employeeUpdate)
  })
  .then(() => getEmployees())//Calls the get employees method to update the employees list
  .catch(error => console.error('Unable to update employee.', error));

  //Calls the function that hides the modal window
  closeInput();
  employeeId=null;

  return false;
 
}

//Function to hide the modal form of updating employees(A different way to do it)
function closeInput() {
  document.getElementById('editModal').style.display = 'none';
}


//Function that displays the modal window to confirm the delete action
function displayModalDelete(employeeId){

  //Shows the delete confirmation modal window
  $('#deleteModal').modal().on('show.bs.modal');

  //If the user confirmes delete calls the delete function
  $("[data-modal-action=yes]").click(function () {
    deleteEmployee(employeeId)  //calling delete method
    //Hides the delete confirmation modal window
    $("#deleteModal").modal("hide");
  });

}

//Function that displays the modal window form for editing an employee
function displayModalEdit(employeeId){

  //Calls the API GET method to recover the data of the employee
  fetch(`${uri}/${employeeId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    //body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => fillFormUpdate(data))

  //Shows the modal window form for updating the employee
  $('#editModal').modal().on('show.bs.modal');  

  //If the user clicks Save calls the updateEmployee function
  $("[data-modal-action=save]").click(function () {
    //Calls updateEmployee method
    updateEmployee(employeeId);  
    //Hides the modal window
    $("#editModal").modal("hide");
  });
}


// Fills the input boxes with the data we got from the GET request
function fillFormUpdate(data){

    document.getElementById('editFormName').value = data.name;
    document.getElementById('editFormSurname').value = data.surname;
    document.getElementById('editFormRole').value = data.role;
    document.getElementById('editFormSalary').value = data.salary;

  }


function _displayEmployees(data) {

  const tBody = document.getElementById('todos');
  tBody.innerHTML = '';

  const button = document.createElement('button');

  data.forEach(employee => {

    let editButton = button.cloneNode(false);
    editButton.innerText = 'Edit';
    editButton.setAttribute('class', 'btn btn-primary')
    editButton.setAttribute('data-toogle', 'modal')
    editButton.setAttribute('data-target', '#editModal')
    editButton.setAttribute('onclick', `displayModalEdit(${employee.id})`);
    //editButton.setAttribute('onclick', `displayEditForm(${employee.id})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('class', 'btn btn-primary')
    deleteButton.setAttribute('data-toogle', 'modal')
    deleteButton.setAttribute('data-target', '#deleteModal')
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