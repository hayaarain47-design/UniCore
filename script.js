/* =========================================
   UniCore - Student Portal JavaScript
   ========================================= */


/* =========================================
   1. LOGIN SYSTEM
   ========================================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    // Show / Hide Password
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");

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


    // Forgot Password
    const forgotPassword = document.getElementById("forgotPassword");

    if (forgotPassword) {
        forgotPassword.addEventListener("click", function (event) {
            event.preventDefault();

            alert(
                "Password Reset\n\n" +
                "For this demo portal, please contact the university administration."
            );
        });
    }


    // Login
    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const loginMessage = document.getElementById("loginMessage");

        const email = emailInput ? emailInput.value.trim() : "";
        const password = passwordInput ? passwordInput.value.trim() : "";

        if (email === "" || password === "") {

            if (loginMessage) {
                loginMessage.textContent =
                    "Please enter your email and password.";
            }

            return;
        }


        // Save login status
        localStorage.setItem("unicoreLoggedIn", "true");
        localStorage.setItem("unicoreStudentEmail", email);


        // Remember Me
        const rememberMe = document.getElementById("rememberMe");

        if (rememberMe && rememberMe.checked) {
            localStorage.setItem("unicoreRememberMe", "true");
        } else {
            localStorage.removeItem("unicoreRememberMe");
        }


        if (loginMessage) {
            loginMessage.textContent =
                "Login successful. Redirecting...";
        }


        setTimeout(function () {
            window.location.href = "dashboard.html";
        }, 700);

    });

}


/* =========================================
   2. REDIRECT LOGGED-IN USER
   ========================================= */

if (
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname.endsWith("/")
) {

    const isLoggedIn =
        localStorage.getItem("unicoreLoggedIn") === "true";

    if (isLoggedIn) {

        const loginFormExists =
            document.getElementById("loginForm");

        if (loginFormExists) {
            // User can still see login page.
            // No automatic redirect here.
        }
    }
}


/* =========================================
   3. PROTECT PORTAL PAGES
   ========================================= */

const protectedPages = [
    "dashboard.html",
    "courses.html",
    "assignments.html",
    "timetable.html",
    "results.html",
    "announcements.html",
    "profile.html",
    "help.html"
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
   4. SIDEBAR MOBILE MENU
   ========================================= */

const menuToggle =
    document.getElementById("menuToggle");

const sidebar =
    document.getElementById("sidebar");

const sidebarOverlay =
    document.getElementById("sidebarOverlay");


function openSidebar() {

    if (sidebar) {
        sidebar.classList.add("open");
    }

    if (sidebarOverlay) {
        sidebarOverlay.classList.add("show");
    }

}


function closeSidebar() {

    if (sidebar) {
        sidebar.classList.remove("open");
    }

    if (sidebarOverlay) {
        sidebarOverlay.classList.remove("show");
    }

}


if (menuToggle) {

    menuToggle.addEventListener("click", function () {
        openSidebar();
    });

}


if (sidebarOverlay) {

    sidebarOverlay.addEventListener("click", function () {
        closeSidebar();
    });

}


/* Close sidebar after clicking navigation link */

const sidebarLinks =
    document.querySelectorAll(".sidebar a");

sidebarLinks.forEach(function (link) {

    link.addEventListener("click", function () {
        closeSidebar();
    });

});


/* =========================================
   5. LOGOUT
   ========================================= */

const logoutButton =
    document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener("click", function (event) {

        event.preventDefault();

        localStorage.removeItem("unicoreLoggedIn");
        localStorage.removeItem("unicoreStudentEmail");
        localStorage.removeItem("unicoreRememberMe");

        window.location.href = "index.html";

    });

}


/* =========================================
   6. AUTOMATIC ACTIVE NAVIGATION
   ========================================= */

const navLinks =
    document.querySelectorAll(".sidebar a");

navLinks.forEach(function (link) {

    const linkPage =
        link.getAttribute("href");

    if (linkPage === currentPage) {
        link.classList.add("active");
    }

});


/* =========================================
   7. COURSE SEARCH
   ========================================= */

const courseSearch =
    document.getElementById("courseSearch");

const courseCards =
    document.querySelectorAll(".course-card");

if (courseSearch) {

    courseSearch.addEventListener("input", function () {

        const searchValue =
            courseSearch.value.toLowerCase().trim();

        courseCards.forEach(function (card) {

            const cardText =
                card.textContent.toLowerCase();

            if (cardText.includes(searchValue)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

    });

}


/* =========================================
   8. COURSE BUTTONS
   ========================================= */

const courseButtons =
    document.querySelectorAll(".course-btn");

courseButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const courseCard =
            button.closest(".course-card");

        if (!courseCard) {
            return;
        }

        const courseNameElement =
            courseCard.querySelector("h3");

        const courseName =
            courseNameElement
                ? courseNameElement.textContent
                : "this course";

        alert(
            "Course Details\n\n" +
            courseName +
            "\n\nCourse information is available in the UniCore portal."
        );

    });

});


/* =========================================
   9. ASSIGNMENT FILTER
   ========================================= */

const assignmentFilter =
    document.getElementById("assignmentFilter");

const assignmentCards =
    document.querySelectorAll(".assignment-card");

if (assignmentFilter) {

    assignmentFilter.addEventListener("change", function () {

        const selected =
            assignmentFilter.value.toLowerCase();

        assignmentCards.forEach(function (card) {

            const statusElement =
                card.querySelector(".assignment-status");

            if (!statusElement) {
                return;
            }

            const status =
                statusElement.textContent.toLowerCase();

            if (
                selected === "all" ||
                selected === "" ||
                status.includes(selected)
            ) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

    });

}


/* =========================================
   10. ASSIGNMENT BUTTONS
   ========================================= */

const assignmentButtons =
    document.querySelectorAll(".assignment-btn");

assignmentButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const assignmentCard =
            button.closest(".assignment-card");

        if (!assignmentCard) {
            return;
        }

        const titleElement =
            assignmentCard.querySelector("h3");

        const title =
            titleElement
                ? titleElement.textContent
                : "Assignment";

        alert(
            title +
            "\n\nAssignment details are available in the portal."
        );

    });

});


/* =========================================
   11. TIMETABLE PRINT
   ========================================= */

const printTimetable =
    document.getElementById("printTimetable");

if (printTimetable) {

    printTimetable.addEventListener("click", function () {
        window.print();
    });

}


/* =========================================
   12. RESULTS PRINT
   ========================================= */

const printResults =
    document.getElementById("printResults");

if (printResults) {

    printResults.addEventListener("click", function () {
        window.print();
    });

}


/* =========================================
   13. ANNOUNCEMENT FILTER
   ========================================= */

const announcementFilter =
    document.getElementById("announcementFilter");

const announcementCards =
    document.querySelectorAll(".announcement-card");

if (announcementFilter) {

    announcementFilter.addEventListener("change", function () {

        const selected =
            announcementFilter.value.toLowerCase();

        announcementCards.forEach(function (card) {

            const categoryElement =
                card.querySelector(".announcement-category");

            if (!categoryElement) {
                return;
            }

            const category =
                categoryElement.textContent.toLowerCase();

            if (
                selected === "all" ||
                selected === "" ||
                category.includes(selected)
            ) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

    });

}


/* =========================================
   14. ANNOUNCEMENT READ MORE
   ========================================= */

const readMoreButtons =
    document.querySelectorAll(".read-more");

readMoreButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const announcementCard =
            button.closest(".announcement-card");

        if (!announcementCard) {
            return;
        }

        const extraContent =
            announcementCard.querySelector(".announcement-extra");

        if (extraContent) {

            if (
                extraContent.style.display === "block"
            ) {

                extraContent.style.display = "none";
                button.textContent = "Read More";

            } else {

                extraContent.style.display = "block";
                button.textContent = "Read Less";

            }

        } else {

            alert(
                "Full announcement details are available in the UniCore portal."
            );

        }

    });

});


/* =========================================
   15. PROFILE STATUS
   ========================================= */

const profileStatus =
    document.querySelector(".profile-status");

if (profileStatus) {

    profileStatus.addEventListener("click", function () {

        alert(
            "Account Status\n\n" +
            "Your UniCore student account is currently active."
        );

    });

}


/* =========================================
   16. STUDY REMINDERS
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


if (addReminderButton) {

    addReminderButton.addEventListener("click", function () {

        if (reminderForm) {
            reminderForm.classList.add("show");
        }

        if (reminderInput) {
            reminderInput.focus();
        }

    });

}


if (cancelReminderButton) {

    cancelReminderButton.addEventListener("click", function () {

        if (reminderInput) {
            reminderInput.value = "";
        }

        if (reminderForm) {
            reminderForm.classList.remove("show");
        }

    });

}


if (saveReminderButton) {

    saveReminderButton.addEventListener("click", function () {

        if (!reminderInput || !remindersList) {
            return;
        }

        const reminderText =
            reminderInput.value.trim();

        if (reminderText === "") {

            alert("Please enter a study reminder.");
            reminderInput.focus();

            return;
        }


        const reminderItem =
            document.createElement("div");

        reminderItem.className =
            "reminder-item";

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

        if (reminderForm) {
            reminderForm.classList.remove("show");
        }


        addReminderCheckbox(
            reminderItem.querySelector(
                'input[type="checkbox"]'
            )
        );

    });

}


function addReminderCheckbox(checkbox) {

    if (!checkbox) {
        return;
    }

    checkbox.addEventListener("change", function () {

        const reminderItem =
            checkbox.closest(".reminder-item");

        if (!reminderItem) {
            return;
        }

        if (checkbox.checked) {
            reminderItem.classList.add("completed");
        } else {
            reminderItem.classList.remove("completed");
        }

    });

}


document
    .querySelectorAll(
        '.reminder-item input[type="checkbox"]'
    )
    .forEach(function (checkbox) {

        addReminderCheckbox(checkbox);

    });


/* =========================================
   17. FAQ ACCORDION
   ========================================= */

const faqQuestions =
    document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        const faqItem =
            question.closest(".faq-item");

        if (faqItem) {
            faqItem.classList.toggle("open");
        }

    });

});


/* =========================================
   18. HELP QUICK ACTIONS
   ========================================= */

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


/* =========================================
   19. SUPPORT FORM
   ========================================= */

const supportForm =
    document.getElementById("supportForm");

if (supportForm) {

    supportForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const nameInput =
            document.getElementById("supportName");

        const messageInput =
            document.getElementById("supportMessage");

        const name =
            nameInput
                ? nameInput.value.trim()
                : "";

        const message =
            messageInput
                ? messageInput.value.trim()
                : "";


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


/* =========================================
   20. PREVENT OLD LOGIN SESSION
   ========================================= */

window.addEventListener("pageshow", function () {

    const loggedIn =
        localStorage.getItem("unicoreLoggedIn");

    if (
        protectedPages.includes(currentPage) &&
        loggedIn !== "true"
    ) {

        window.location.href = "index.html";

    }

});
