// ==============================
// UNICORE LOGIN
// ==============================

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (email === "" || password === "") {
            loginMessage.textContent = "Please enter your email and password.";
            return;
        }

        // Demo login
        // Any email/password will open the dashboard.
        localStorage.setItem("unicoreLoggedIn", "true");
        localStorage.setItem("unicoreStudentEmail", email);

        loginMessage.textContent = "Login successful. Opening dashboard...";

        setTimeout(function () {
            window.location.href = "dashboard.html";
        }, 700);

    });
}


// ==============================
// SHOW / HIDE PASSWORD
// ==============================

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

if (togglePassword && passwordInput) {

    togglePassword.addEventListener("click", function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";
            togglePassword.textContent = "Hide";

        } else {

            passwordInput.type = "password";
            togglePassword.textContent = "Show";

        }

    });

}


// ==============================
// FORGOT PASSWORD
// ==============================

const forgotPassword = document.getElementById("forgotPassword");

if (forgotPassword) {

    forgotPassword.addEventListener("click", function (event) {

        event.preventDefault();

        alert(
            "Password recovery will be available in the next version."
        );

    });

}


// ==============================
// MOBILE SIDEBAR
// ==============================

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

if (menuToggle && sidebar) {

    menuToggle.addEventListener("click", function () {

        sidebar.classList.toggle("open");

        if (sidebarOverlay) {
            sidebarOverlay.classList.toggle("show");
        }

    });

}


if (sidebarOverlay && sidebar) {

    sidebarOverlay.addEventListener("click", function () {

        sidebar.classList.remove("open");
        sidebarOverlay.classList.remove("show");

    });

}


// ==============================
// LOGOUT
// ==============================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        localStorage.removeItem("unicoreLoggedIn");
        localStorage.removeItem("unicoreStudentEmail");

        window.location.href = "index.html";

    });

}
// =========================================
// COURSES PAGE FUNCTIONALITY
// =========================================

const courseSearch = document.getElementById("courseSearch");
const coursesGrid = document.getElementById("coursesGrid");
const noCourses = document.getElementById("noCourses");

if (courseSearch && coursesGrid) {

    courseSearch.addEventListener("input", function () {

        const searchValue = this.value.toLowerCase().trim();
        const courseCards = coursesGrid.querySelectorAll(".course-card");

        let visibleCourses = 0;

        courseCards.forEach(function (card) {

            const courseText = card.textContent.toLowerCase();

            if (courseText.includes(searchValue)) {
                card.style.display = "";
                visibleCourses++;
            } else {
                card.style.display = "none";
            }

        });

        if (noCourses) {
            noCourses.style.display =
                visibleCourses === 0 ? "block" : "none";
        }

    });
}


// =========================================
// COURSE BUTTONS
// =========================================

const courseButtons = document.querySelectorAll(".course-button");

courseButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const courseCard = this.closest(".course-card");

        if (!courseCard) return;

        const courseName =
            courseCard.querySelector("h4")?.textContent || "this course";

        alert(
            "Course Details\n\n" +
            courseName +
            "\n\nMore course details will be available in the next portal update."
        );

    });

});
// =========================================
// ASSIGNMENTS PAGE FUNCTIONALITY
// =========================================

const assignmentFilter = document.getElementById("assignmentFilter");
const assignmentsGrid = document.getElementById("assignmentsGrid");
const noAssignments = document.getElementById("noAssignments");

if (assignmentFilter && assignmentsGrid) {

    assignmentFilter.addEventListener("change", function () {

        const selectedStatus = this.value;
        const assignmentCards =
            assignmentsGrid.querySelectorAll(".assignment-card");

        let visibleAssignments = 0;

        assignmentCards.forEach(function (card) {

            const cardStatus = card.dataset.status;

            if (
                selectedStatus === "all" ||
                cardStatus === selectedStatus
            ) {
                card.style.display = "";
                visibleAssignments++;
            } else {
                card.style.display = "none";
            }

        });

        if (noAssignments) {
            noAssignments.style.display =
                visibleAssignments === 0 ? "block" : "none";
        }

    });
}


// =========================================
// ASSIGNMENT ACTION BUTTONS
// =========================================

const assignmentButtons =
    document.querySelectorAll(".assignment-action");

assignmentButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const assignmentCard =
            this.closest(".assignment-card");

        if (!assignmentCard) return;

        const assignmentName =
            assignmentCard.querySelector("h4")?.textContent ||
            "Assignment";

        const courseName =
            assignmentCard.querySelector(".assignment-course")?.textContent ||
            "Course";

        const status =
            assignmentCard.querySelector(".assignment-status")?.textContent ||
            "Pending";

        alert(
            "Assignment Details\n\n" +
            assignmentName +
            "\n" +
            courseName +
            "\n\nStatus: " +
            status +
            "\n\nDetailed assignment information will be available in the next portal update."
        );

    });

});
