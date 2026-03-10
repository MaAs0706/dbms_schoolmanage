const API = "http://localhost:3000/api";

let currentSection = "students";

let student = [];
let classes = [];
let teachers = [];
let subjects = [];
let marks = [];


/* ---------------- NAVIGATION ---------------- */

function navigate(section, event) {

  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(`section-${section}`).classList.add("active");

  document.querySelectorAll(".nav-item").forEach(i => i.classList.remove("active"));
  event.target.classList.add("active");

  currentSection = section;

  loadSectionData();
}


/* ---------------- LOAD DATA ---------------- */

async function loadSectionData() {

  try {

    if (currentSection === "student") {
      const res = await fetch(`${API}/student`);
      student = await res.json();
      renderStudents();
    }

    if (currentSection === "class") {
      const res = await fetch(`${API}/class`);
      classes = await res.json();
      renderClasses();
    }

    if (currentSection === "teacher") {
      const res = await fetch(`${API}/teacher`);
      teachers = await res.json();
      renderTeachers();
    }

    if (currentSection === "subject") {
      const res = await fetch(`${API}/subject`);
      subjects = await res.json();
      renderSubjects();
    }

    if (currentSection === "marks") {
      const res = await fetch(`${API}/marks`);
      marks = await res.json();
      renderMarks();
    }

  } catch (err) {
    toast("Error loading data");
  }
}


/* ---------------- STUDENTS ---------------- */

function renderStudents() {

  const body = document.getElementById("students-body");
  body.innerHTML = "";

  student.forEach(s => {

    body.innerHTML += `
      <tr>
        <td>${s.StudentID}</td>
        <td>${s.Name}</td>
        <td>${s.Age}</td>
        <td>${s.ClassID}</td>
        <td>
          <button onclick="deleteStudent(${s.StudentID})">Delete</button>
        </td>
      </tr>
    `;
  });
}

async function deleteStudent(id) {

  if (!confirm("Delete student?")) return;

  await fetch(`${API}/student/${id}`, {
    method: "DELETE"
  });

  loadSectionData();
}


/* ---------------- CLASSES ---------------- */

function renderClasses() {

  const body = document.getElementById("classes-body");
  body.innerHTML = "";

  classes.forEach(c => {

    body.innerHTML += `
      <tr>
        <td>${c.ClassID}</td>
        <td>${c.ClassName}</td>
        <td>
          <button onclick="deleteClass(${c.ClassID})">Delete</button>
        </td>
      </tr>
    `;
  });
}

async function deleteClass(id) {

  await fetch(`${API}/class/${id}`, {
    method: "DELETE"
  });

  loadSectionData();
}


/* ---------------- TEACHERS ---------------- */

function renderTeachers() {

  const body = document.getElementById("teachers-body");
  body.innerHTML = "";

  teachers.forEach(t => {

    body.innerHTML += `
      <tr>
        <td>${t.TeacherID}</td>
        <td>${t.Name}</td>
        <td>${t.Subject}</td>
        <td>
          <button onclick="deleteTeacher(${t.TeacherID})">Delete</button>
        </td>
      </tr>
    `;
  });
}

async function deleteTeacher(id) {

  await fetch(`${API}/teacher/${id}`, {
    method: "DELETE"
  });

  loadSectionData();
}


/* ---------------- SUBJECTS ---------------- */

function renderSubjects() {

  const body = document.getElementById("subject-body");
  body.innerHTML = "";

  subjects.forEach(s => {

    body.innerHTML += `
      <tr>
        <td>${s.SubjectID}</td>
        <td>${s.SubjectName}</td>
        <td>${s.TeacherID}</td>
        <td>
          <button onclick="deleteSubject(${s.SubjectID})">Delete</button>
        </td>
      </tr>
    `;
  });
}

async function deleteSubject(id) {

  await fetch(`${API}/subject/${id}`, {
    method: "DELETE"
  });

  loadSectionData();
}


/* ---------------- MARKS ---------------- */

function renderMarks() {

  const body = document.getElementById("marks-body");
  body.innerHTML = "";

  marks.forEach(m => {

    body.innerHTML += `
      <tr>
        <td>${m.MarkID}</td>
        <td>${m.StudentID}</td>
        <td>${m.SubjectID}</td>
        <td>${m.Score}</td>
        <td>
          <button onclick="deleteMarks(${m.MarkID})">Delete</button>
        </td>
      </tr>
    `;
  });
}

async function deleteMarks(id) {

  await fetch(`${API}/marks/${id}`, {
    method: "DELETE"
  });

  loadSectionData();
}


/* ---------------- TOAST ---------------- */

function toast(msg) {

  const container = document.getElementById("toastContainer");

  const el = document.createElement("div");
  el.className = "toast";
  el.innerText = msg;

  container.appendChild(el);

  setTimeout(() => {
    el.remove();
  },3000);
}


/* ---------------- INIT ---------------- */

loadSectionData();