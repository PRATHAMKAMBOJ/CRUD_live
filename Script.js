//This is dummy data ->
let empRecords = [
    {
        uId: Math.floor(Math.random() * 100),
        Name: "Jane",
        Address: "Mohali",
        Country: "India",
        Contact: 99443434
    },
    {
        uId: Math.floor(Math.random() * 100),
        Name: "Peter",
        Address: "Cambridge",
        Country: "UK",
        Contact: 99090722
    },
    {
        uId: Math.floor(Math.random() * 100),
        Name: "Gwen",
        Address: "London",
        Country: "China",
        Contact: 99090722
    }
];

//Show the form with the help of ADD Employee and Cancel Button
const showEmployeeForm = () => {
    const showEmployeeForm = document.getElementById("empForm");
    showEmployeeForm.style.display = 'table';
    reset();
    document.getElementById("showEmpForm").setAttribute("disabled",true);
}


//To close the employye form
const closeForm = () => {
    const closeEmployeeForm = document.getElementById("empForm");
    if (closeEmployeeForm.style.display === 'table') {
        closeEmployeeForm.style.display = 'none';
    }
    document.getElementById("showEmpForm").removeAttribute("disabled");
}

//reset all the prefilled values in form
const reset = () => {
    document.getElementById("empNameId").value = '';
    document.getElementById("empAddressId").value = '';
    document.getElementById("empCountryId").value = '';
    document.getElementById("empContactId").value = '';
    document.getElementById("empuniqueId").value = '';
    document.getElementById("formType").value = ' ';
};

const employeeTableBody = document.getElementById("empTableBody");

//Display data of Employee from EmpRecords
const displayEmployeeRecords = () => {
    empRecords.map((empData, index) => {
        row = document.createElement("tr");
        row.innerHTML = `
        <td id='emp-serialno'>${index+1}</td>

        <td id='emp-fname'>${empData.Name}</td>

        <td id='emp-address'>${empData.Address}</td>

        <td id='emp-country'>${empData.Country}</td>

        <td id='emp-contact'>${empData.Contact}</td>

        <td><button id="delBtn"  type="button" class="btn btn-primary btn-sm edit" onclick="deleteEmployeeRecord(${index})">Delete</button>
        <button id="editBtn" type="button" class="btn btn-primary btn-sm delete" onclick="updateEmployeeRecords(${index})">Edit</button></td>
    `;
        employeeTableBody.appendChild(row);
        reset();
    });
}

//Fetch values from the from and add to EmpRecords
const fetchEmpRecord = () => {
    let nullId = document.getElementById("empuniqueId").value;
    let formType = document.getElementById("formType").value;
    let newEmployeeRecord = { uId: nullId ? nullId : Math.floor(Math.random() * 100), 
    Name: document.getElementById("empNameId").value,
    Address: document.getElementById("empAddressId").value,
    Country: document.getElementById("empCountryId").value,
    Contact: document.getElementById("empContactId").value };
    //Error Handling
    if (Object.values(newEmployeeRecord).includes('')) {
        document.getElementById("emptyFieldTag").style.display='block';
    }
    else {
        document.getElementById("emptyFieldTag").style.display='none';
        if (formType == " " ) {
            empRecords.push(newEmployeeRecord);
        } else {
            empRecords = empRecords.map(obj => {
                if (parseInt(newEmployeeRecord.uId) == obj.uId) {
                    return newEmployeeRecord;
                } else {
                    return obj;
                }
            });
        }
        document.getElementById("empTableBody").innerHTML = ``;
        document.getElementById("formType").value = " ";
        displayEmployeeRecords();
    }
}


//Delete Employee data from EmpRecords
let deleteEmployeeRecord = (index) => {
    empRecords.splice(index, 1);
    document.getElementById("empTableBody").innerHTML = ``;
    displayEmployeeRecords();
    }


//Edit/Update Employee data from EmpRecord
const updateEmployeeRecords = (index) => {
    document.getElementById("empNameId").value = empRecords[index].Name;
    document.getElementById("empAddressId").value = empRecords[index].Address;
    document.getElementById("empCountryId").value = empRecords[index].Country;
    document.getElementById("empContactId").value = empRecords[index].Contact;
    document.getElementById("empuniqueId").value = empRecords[index].uId;
    document.getElementById("formType").value = index;
    document.getElementById("empForm").style.display = 'table';
    document.getElementById("resetButton").addEventListener("click",function(){
    updateEmployeeRecords(index);
    })
}
//Calling Reset Function
document.getElementById("resetButton").addEventListener("click", reset);
//Calling Show function
document.getElementById("showEmpForm").addEventListener("click", showEmployeeForm);
//Calling Cancel Function
document.getElementById("cancelBtn").addEventListener("click", closeForm);

displayEmployeeRecords();
reset();