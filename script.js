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
// =========================================
// TIMETABLE PRINT
// =========================================

const printTimetable = document.getElementById("printTimetable");

if (printTimetable) {
    printTimetable.addEventListener("click", function () {
        window.print();
    });
}
// =========================================
// RESULTS PRINT
// =========================================

const printResults = document.getElementById("printResults");

if (printResults) {
    printResults.addEventListener("click", function () {
        window.print();
    });
}
/* =========================================
   ANNOUNCEMENTS PAGE
========================================= */

const announcementFilterButtons =
    document.querySelectorAll(".announcement-filter-btn");

const announcementCards =
    document.querySelectorAll(".announcement-card");

const noAnnouncements =
    document.getElementById("noAnnouncements");


if (announcementFilterButtons.length > 0) {

    announcementFilterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedFilter = button.getAttribute("data-filter");

            announcementFilterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            let visibleCount = 0;

            announcementCards.forEach(function (card) {

                const category = card.getAttribute("data-category");

                if (
                    selectedFilter === "all" ||
                    category === selectedFilter
                ) {
                    card.style.display = "flex";
                    visibleCount++;
                } else {
                    card.style.display = "none";
                }

            });


            if (noAnnouncements) {

                if (visibleCount === 0) {
                    noAnnouncements.style.display = "block";
                } else {
                    noAnnouncements.style.display = "none";
                }

            }

        });

    });

}


/* READ MORE BUTTON */

const announcementReadButtons =
    document.querySelectorAll(".announcement-read");


announcementReadButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const announcementCard =
            button.closest(".announcement-card");

        const title =
            announcementCard.querySelector("h3").textContent.trim();

        const description =
            announcementCard.querySelector(
                ".announcement-card-content > p"
            ).textContent.trim();

        alert(
            title +
            "\n\n" +
            description
        );

    });

});
/* =========================================
   PROFILE PAGE
========================================= */

const profileStatus = document.querySelector(".profile-status");

if (profileStatus) {

    profileStatus.addEventListener("click", function () {

        alert(
            "Account Status\n\n" +
            "Your UniCore student account is currently active."
        );

    });

}
/* =========================================
   LOGIN PROTECTION
========================================= */

const protectedPages = [
    "dashboard.html",
    "courses.html",
    "assignments.html",
    "timetable.html",
    "results.html",
    "announcements.html",
    "profile.html"
];

const currentPage =
    window.location.pathname.split("/").pop();

const isLoggedIn =
    localStorage.getItem("unicoreLoggedIn") === "true";


if (
    protectedPages.includes(currentPage) &&
    !isLoggedIn
) {
    window.location.href = "index.html";
}
/* =========================================
   LOGIN PAGE REDIRECT
========================================= */

if (
    (currentPage === "" || currentPage === "index.html") &&
    isLoggedIn
) {
    window.location.href = "dashboard.html";
}
/* =========================================
   STUDY REMINDERS
========================================= */

const addReminderButton =
    document.getElementById("addReminderButton");

const reminderForm =
    document.getElementById("reminderForm");

const reminderInput =
    document.getElementById("reminderInput");

const saveReminderButton =
    document.getElementById("saveReminderButton");

const cancelReminderButton =
    document.getElementById("cancelReminderButton");

const remindersList =
    document.getElementById("remindersList");


/* OPEN REMINDER FORM */

if (addReminderButton) {

    addReminderButton.addEventListener("click", function () {

        reminderForm.classList.add("show");

        reminderInput.focus();

    });

}


/* CANCEL */

if (cancelReminderButton) {

    cancelReminderButton.addEventListener("click", function () {

        reminderInput.value = "";

        reminderForm.classList.remove("show");

    });

}


/* SAVE REMINDER */

if (saveReminderButton) {

    saveReminderButton.addEventListener("click", function () {

        const reminderText =
            reminderInput.value.trim();


        if (reminderText === "") {

            alert("Please enter a study reminder.");

            reminderInput.focus();

            return;

        }


        const reminderItem =
            document.createElement("div");

        reminderItem.className = "reminder-item";


        reminderItem.innerHTML = `
            <label>
                <input type="checkbox">
                <span>${reminderText}</span>
            </label>

            <span class="reminder-time">
                Today
            </span>
        `;


        remindersList.appendChild(reminderItem);


        reminderInput.value = "";

        reminderForm.classList.remove("show");


        addReminderCheckbox(
            reminderItem.querySelector(
                'input[type="checkbox"]'
            )
        );

    });

}


/* CHECKBOX COMPLETION */

function addReminderCheckbox(checkbox) {

    if (!checkbox) {
        return;
    }


    checkbox.addEventListener("change", function () {

        const reminderItem =
            checkbox.closest(".reminder-item");


        if (checkbox.checked) {

            reminderItem.classList.add("completed");

        } else {

            reminderItem.classList.remove("completed");

        }

    });

}


/* EXISTING REMINDERS */

document
    .querySelectorAll(
        '.reminder-item input[type="checkbox"]'
    )
    .forEach(function (checkbox) {

        addReminderCheckbox(checkbox);

    });
/* ================================
   HELP & SUPPORT FUNCTIONALITY
================================ */

// FAQ accordion

const faqQuestions =
    document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        const faqItem =
            question.closest(".faq-item");

        faqItem.classList.toggle("open");

    });

});


// Quick support buttons

const helpActionButtons =
    document.querySelectorAll(".help-action");

helpActionButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const targetId =
            button.getAttribute("data-target");

        const targetSection =
            document.getElementById(targetId);

        if (targetSection) {

            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


// Support form

const supportForm =
    document.getElementById("supportForm");

if (supportForm) {

    supportForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("supportName").value.trim();

        const message =
            document.getElementById("supportMessage").value.trim();

        if (name === "" || message === "") {

            alert(
                "Please complete all required fields."
            );

            return;
        }

        alert(
            "Thank you, " +
            name +
            "!\n\n" +
            "Your support request has been submitted successfully."
        );

        supportForm.reset();

    });

}
