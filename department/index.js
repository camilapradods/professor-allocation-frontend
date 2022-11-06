const tableBody = document.getElementById("table-body");

async function createDepartment(event) {
    event.preventDefault();


    const name = document.getElementById("name");

    const department = {
    name: name.value,
};

    const response = await fetch("http://localhost:8080/departments", {
        method: "POST",
        body: JSON.stringify(department),
        headers: {
            "Content-Type": "application/json",
        }
    }
);

    const data = await response.json();

    console.log(department);
}

function setDepartmentTableBody(departments = []) {
    let body = "";


    departments.forEach(function (department) {
        body += `
            <tr>
                <td>${department.id}</td>
                <td>${department.name}</td>
                <td>
                <div class="dropdown">
                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  
                </a>
              
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Edit</a></li>
                  <li><a class="dropdown-item" href="#">Remove</a></li>
                </ul>
              </div></td>
            <tr>
        
        `
    });

    tableBody.innerHTML = body;
}

async function getDepartments() {
    const response = await fetch("http://localhost:8080/departments");

    const data = await response.json();

setDepartmentTableBody(data);
}

getDepartments();


