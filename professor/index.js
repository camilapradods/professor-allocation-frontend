const tableBody = document.getElementById("table-body");

async function createProfessor(event) {
    event.preventDefault();
    
    const professorModal = document.getElementById("professorModal");
    const modal = bootstrap.Modal.getInstance(professorModal);

    const name = document.getElementById("name");
    const cpf = document.getElementById("cpf");
    const department = document.getElementById("department");

    const professor = {
        name: name.value,
        cpf: cpf.value,
        departmentId: department.value,
    };

        const response = await fetch(
            "http://localhost:8080/professors", 
            {
            method: "POST",
            body: JSON.stringify(professor),
            headers: {
                "Content-Type": "application/json",
            }
        }
    );

        if (!response.ok) {
            alert ("Professor criado com sucesso")
            await getProfessors();
            modal.hide();
        } else {
            const modalAlert = document.getElementById("modal-alert");

            modalAlert.innerHTML = 
            `<div class="alert alert-danger m-2">Erro ao executar ação</div>`
        }
    }

async function removeProfessor(professorId) {
    const response = await fetch(
        `http://localhost:8080/professors/${professorId}`, 
        {
        method: "DELETE",
        }
    );
    if (response.ok) {
        await getProfessors();
    } else {
        alert("Erro ao deletar")
    }
}

function setDepartmentOptionList(departments = []) {

    const department = document.getElementById("department");

    let body = "";

    departments.forEach(function (department) {
        body += `<option value="${department.id}">${department.name}</option>`
    })

    department.innerHTML = body;

}

function setProfessorTableBody(professors = []) {
    let body = "";


    professors.forEach(function (professor) {
        body += `
            <tr>
                <td>${professor.id}</td>
                <td>${professor.cpf}</td>
                <td>${professor.name}</td>
                <td>${professor.department.name}</td>
                <td> 
                <div class="dropdown">
                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  
                </a>
              
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Edit</a></li>
                  <li onClick="removeProfessor(${professor.id})"><a class="dropdown-item">Remove</a></li>
                </ul>
              </div></td>
            <tr>
        
        `
    });

    tableBody.innerHTML = body;
}

async function getProfessors() {
    const response = await fetch("http://localhost:8080/professors");

    const data = await response.json();

setProfessorTableBody(data);
}

async function getDepartments() {
    const response = await fetch("http://localhost:8080/departments");

    const data = await response.json();

setDepartmentOptionList(data);
}

getProfessors();
getDepartments();


