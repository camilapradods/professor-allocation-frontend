const tableBody = document.getElementById("table-body");

async function createCourse(event) {
    event.preventDefault();


    const name = document.getElementById("name");

    const course = {
    name: name.value,
};

    const response = await fetch("http://localhost:8080/courses", {
        method: "POST",
        body: JSON.stringify(course),
        headers: {
            "Content-Type": "application/json",
        }
    }
);

    const data = await response.json();

    console.log(course);
}

function setCourseTableBody(courses = []) {
    let body = "";


    courses.forEach(function (course) {
        body += `
            <tr>
                <td>${course.id}</td>
                <td>${course.name}</td>
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

async function getCourses() {
    const response = await fetch("http://localhost:8080/courses");

    const data = await response.json();

setCourseTableBody(data);
}

getCourses();
getDepartments();


