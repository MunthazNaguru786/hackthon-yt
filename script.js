const API_BASE_URL = 'http://localhost:3000/api'; // Backend API URL

// Mock data (You should fetch this from an API)
const userDetails=[];

const courses = [
    { id: 1, name: 'Advanced Data Structures', type: 'Theory',option1:'DataStructures',option2:'Trees&Graphs'},
    { id: 2, name: 'Operating Systems', type: 'Theory' ,option1:'FileSystems',option2:'ProcessManagement'},
    { id: 3, name: 'Database Systems', type: 'Theory' ,option1:'SQLCommands',option2:'DatabaseAdministration'},
    { id: 4, name: 'Computer Networks', type: 'Theory' ,option1:'PacketTransfering',option2:'LAN'},
    { id: 5, name: 'Python Lab', type: 'Lab' ,option1:'Opps',option2:'BasicsOfPython'},
    { id: 6, name: 'C Lab', type: 'Lab',option1:'Functions',option2:'BasicsOfC' }
];
const addToArray=()=>{
    alert('hello');
    const uid=document.querySelector('.js-userId').value;
    const pass=document.querySelector('.js-Password').value;
    console.log(uid,pass);
}
const teachers = {
    1: [
        { 
         id: 1, name: 'Prof. Alice', rating: 4.5 },
        { id: 2, name: 'Prof. Bob', rating: 4.7 }
    ],
    2: [
        { id: 3, name: 'Prof. Carol', rating: 4.2 },
        { id: 4, name: 'Prof. Dave', rating: 4.6 }
    ],
    3: [
        { id: 5, name: 'Prof. Eve', rating: 4.8 }
    ]
};

const selectedCourses = [];

// Step 1: Display available courses
function displayCourses() {
    const courseSelectionForm = document.getElementById('courseSelectionForm');
    courses.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.className = 'col-md-6';
        courseDiv.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${course.name} (${course.type})</h5>
                    <select class="btn btn-info" onclick="selectCourse(${course.id})">
                    <option>${course.option1}</option>
                    <option>${course.option2}</option>
                    </select>
                </div>
            </div>
        `;
        courseSelectionForm.appendChild(courseDiv);
    });
}

// Step 2: Select a course and assign a teacher
function selectCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (selectedCourses.includes(course)) return alert('Course already selected');

    selectedCourses.push(course);

    const teacherAssignmentDiv = document.getElementById('teacherAssignment');
    const availableTeachers = teachers[courseId] || [];

    let teacherSelectHTML = '<select class="form-select">';
    availableTeachers.forEach(teacher => {
        teacherSelectHTML += `<option value="${teacher.id}">${teacher.name} (Rating: ${teacher.rating})</option>`;
    });
    teacherSelectHTML += '</select>';

    const courseDiv = document.createElement('div');
    courseDiv.className = 'col-md-6';
    courseDiv.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${course.name}</h5>
                <label for="teacherSelect" class="form-label">Assign Teacher</label>
                ${teacherSelectHTML}
            </div>
        </div>
    `;
    teacherAssignmentDiv.appendChild(courseDiv);
}

// Step 3: Handle feedback form submission
document.getElementById('feedbackForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const feedback = document.getElementById('teacherFeedback').value;
    const rating = document.getElementById('teacherRating').value;

    const response = await fetch(`${API_BASE_URL}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: 1,  // Mock user
            teacherId: 2,  // Mock teacher selection
            feedback: feedback,
            rating: rating
        })
    });

    const result = await response.json();
    alert(result.message);
});

// Initialize the app by displaying courses
displayCourses();

// Function to select a course
async function selectCourse(studentId, courseId, teacherId, semester) {
    const response = await fetch('/api/select_course', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ student_id: studentId, course_id: courseId, teacher_id: teacherId, semester: semester })
    });
    const data = await response.json();
    if (response.ok) {
        console.log('Course selected successfully:', data.message);
    } else {
        console.error('Error selecting course:', data.error);
    }
}

// Event listener for course selection form
document.getElementById('course-selection-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const studentId = document.getElementById('studentId').value;
    const courseId = document.getElementById('courseId').value;
    const teacherId = document.getElementById('teacherId').value;
    const semester = document.getElementById('semester').value;

    await selectCourse(studentId, courseId, teacherId, semester);
});

async function selectCourse(studentId, courseId, teacherId, semester) {
    const response = await fetch('/api/select_course', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ student_id: studentId, course_id: courseId, teacher_id: teacherId, semester: semester })
    });
    const data = await response.json();
    if (response.ok) {
        console.log('Course selected successfully:', data.message);
    } else {
        console.error('Error selecting course:', data.error);
    }
}

// First, include Axios in your project
// <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

// Function to submit feedback
async function submitFeedback(studentId, teacherId, content, rating) {
    try {
        const response = await axios.post('/api/submit_feedback', {
            student_id: studentId,
            teacher_id: teacherId,
            content: content,
            rating: rating
        });
        console.log('Feedback submitted successfully:', response.data.message);
    } catch (error) {
        console.error('Error submitting feedback:', error.response.data.error);
    }
}