/* =========================================================
   UNICORE STUDENT PORTAL
   Complete JavaScript
   ========================================================= */


/* =========================================================
   GLOBAL PAGE INFORMATION
   ========================================================= */

const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

const isLoggedIn =
    localStorage.getItem("unicoreLoggedIn") === "true";


/* =========================================================
   LOGIN PROTECTION
   ========================================================= */

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

if (
    protectedPages.includes(currentPage) &&
    !isLoggedIn
) {
    window.location.href = "index.html";
}


/* =========================================================
   LOGIN PAGE REDIRECT
   ========================================================= */

if (
    (currentPage === "" || currentPage === "index.html") &&
    isLoggedIn
) {
    window.location.href = "dashboard.html";
}


/* =========================================================
   UNICORE LOGIN
   ========================================================= */

const loginForm =
    document.getElementById("loginForm");

const loginMessage =
    document.getElementById("loginMessage");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const emailInput =
            document.getElementById("email");

        const passwordInput =
            document.getElementById("password");

        const rememberMe =
            document.getElementById("rememberMe");

        const email =
            emailInput ? emailInput.value.trim() : "";

        const password =
            passwordInput ? passwordInput.value.trim() : "";

        if (email === "" || password === "") {

            if (loginMessage) {
                loginMessage.textContent =
                    "Please enter your email and password.";
            }

            return;
        }

        /*
         * Demo authentication.
         * Any non-empty email/password is accepted.
         */

        localStorage.setItem(
            "unicoreLoggedIn",
            "true"
        );

        localStorage.setItem(
            "unicoreStudentEmail",
            email
        );

        if (rememberMe && rememberMe.checked) {

            localStorage.setItem(
                "unicoreRememberMe",
                "true"
            );

        } else {

            localStorage.removeItem(
                "unicoreRememberMe"
            );

        }

        if (loginMessage) {

            loginMessage.textContent =
                "Login successful. Opening dashboard...";

        }

        setTimeout(function () {

            window.location.href =
                "dashboard.html";

        }, 700);

    });

}


/* =========================================================
   SHOW / HIDE PASSWORD
   ========================================================= */

const togglePassword =
    document.getElementById("togglePassword");

const passwordInput =
    document.getElementById("password");

if (togglePassword && passwordInput) {

    togglePassword.addEventListener(
        "click",
        function () {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                togglePassword.textContent =
                    "Hide";

            } else {

                passwordInput.type = "password";

                togglePassword.textContent =
                    "Show";

            }

        }
    );

}


/* =========================================================
   FORGOT PASSWORD
   ========================================================= */

const forgotPassword =
    document.getElementById("forgotPassword");

if (forgotPassword) {

    forgotPassword.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            alert(
                "Password recovery\n\n" +
                "Password recovery will be available " +
                "in the next UniCore portal update."
            );

        }
    );

}


/* =========================================================
   MOBILE SIDEBAR
   ========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const sidebar =
    document.getElementById("sidebar");

const sidebarOverlay =
    document.getElementById("sidebarOverlay");


function closeSidebar() {

    if (sidebar) {
        sidebar.classList.remove("open");
    }

    if (sidebarOverlay) {
        sidebarOverlay.classList.remove("show");
    }

}


function openSidebar() {

    if (sidebar) {
        sidebar.classList.add("open");
    }

    if (sidebarOverlay) {
        sidebarOverlay.classList.add("show");
    }

}


if (menuToggle && sidebar) {

    menuToggle.addEventListener(
        "click",
        function () {

            if (sidebar.classList.contains("open")) {

                closeSidebar();

            } else {

                openSidebar();

            }

        }
    );

}


if (sidebarOverlay) {

    sidebarOverlay.addEventListener(
        "click",
        closeSidebar
    );

}


/* Close mobile sidebar after clicking navigation */

const sidebarLinks =
    document.querySelectorAll(
        ".sidebar-nav a"
    );

sidebarLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function () {

            closeSidebar();

        }
    );

});


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

sidebarLinks.forEach(function (link) {

    const linkPage =
        link.getAttribute("href");

    if (
        linkPage &&
        linkPage === currentPage
    ) {

        sidebarLinks.forEach(function (item) {

            item.classList.remove("active");

        });

        link.classList.add("active");

    }

});


/* =========================================================
   LOGOUT
   ========================================================= */

const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            const confirmLogout =
                confirm(
                    "Are you sure you want to log out?"
                );

            if (!confirmLogout) {
                return;
            }

            localStorage.removeItem(
                "unicoreLoggedIn"
            );

            localStorage.removeItem(
                "unicoreStudentEmail"
            );

            localStorage.removeItem(
                "unicoreRememberMe"
            );

            window.location.href =
                "index.html";

        }
    );

}


/* =========================================================
   COURSES PAGE
   ========================================================= */

const courseSearch =
    document.getElementById("courseSearch");

const coursesGrid =
    document.getElementById("coursesGrid");

const noCourses =
    document.getElementById("noCourses");


if (courseSearch && coursesGrid) {

    courseSearch.addEventListener(
        "input",
        function () {

            const searchValue =
                this.value
                    .toLowerCase()
                    .trim();

            const courseCards =
                coursesGrid.querySelectorAll(
                    ".course-card"
                );

            let visibleCourses = 0;

            courseCards.forEach(
                function (card) {

                    const courseText =
                        card.textContent
                            .toLowerCase();

                    if (
                        courseText.includes(
                            searchValue
                        )
                    ) {

                        card.style.display =
                            "";

                        visibleCourses++;

                    } else {

                        card.style.display =
                            "none";

                    }

                }
            );

            if (noCourses) {

                noCourses.style.display =
                    visibleCourses === 0
                        ? "block"
                        : "none";

            }

        }
    );

}


/* =========================================================
   COURSE BUTTONS
   ========================================================= */

const courseButtons =
    document.querySelectorAll(
        ".course-button"
    );

courseButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const courseCard =
                this.closest(".course-card");

            if (!courseCard) {
                return;
            }

            const courseNameElement =
                courseCard.querySelector("h4");

            const courseName =
                courseNameElement
                    ? courseNameElement.textContent.trim()
                    : "Course";

            const courseCodeElement =
                courseCard.querySelector(
                    ".course-code"
                );

            const courseCode =
                courseCodeElement
                    ? courseCodeElement.textContent.trim()
                    : "";

            alert(
                "Course Details\n\n" +
                courseName +
                "\n" +
                courseCode +
                "\n\n" +
                "Course details and resources " +
                "will be available in the next portal update."
            );

        }
    );

});


/* =========================================================
   ASSIGNMENTS PAGE
   ========================================================= */

const assignmentFilter =
    document.getElementById(
        "assignmentFilter"
    );

const assignmentsGrid =
    document.getElementById(
        "assignmentsGrid"
    );

const noAssignments =
    document.getElementById(
        "noAssignments"
    );


if (assignmentFilter && assignmentsGrid) {

    assignmentFilter.addEventListener(
        "change",
        function () {

            const selectedStatus =
                this.value;

            const assignmentCards =
                assignmentsGrid.querySelectorAll(
                    ".assignment-card"
                );

            let visibleAssignments = 0;

            assignmentCards.forEach(
                function (card) {

                    const cardStatus =
                        card.dataset.status;

                    if (
                        selectedStatus === "all" ||
                        cardStatus === selectedStatus
                    ) {

                        card.style.display =
                            "";

                        visibleAssignments++;

                    } else {

                        card.style.display =
                            "none";

                    }

                }
            );

            if (noAssignments) {

                noAssignments.style.display =
                    visibleAssignments === 0
                        ? "block"
                        : "none";

            }

        }
    );

}


/* =========================================================
   ASSIGNMENT ACTION BUTTONS
   ========================================================= */

const assignmentButtons =
    document.querySelectorAll(
        ".assignment-action"
    );

assignmentButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const assignmentCard =
                this.closest(
                    ".assignment-card"
                );

            if (!assignmentCard) {
                return;
            }

            const assignmentNameElement =
                assignmentCard.querySelector(
                    "h4"
                );

            const assignmentName =
                assignmentNameElement
                    ? assignmentNameElement.textContent.trim()
                    : "Assignment";

            const courseElement =
                assignmentCard.querySelector(
                    ".assignment-course"
                );

            const courseName =
                courseElement
                    ? courseElement.textContent.trim()
                    : "Course";

            const statusElement =
                assignmentCard.querySelector(
                    ".assignment-status"
                );

            const status =
                statusElement
                    ? statusElement.textContent.trim()
                    : "Pending";

            alert(
                "Assignment Details\n\n" +
                assignmentName +
                "\n" +
                courseName +
                "\n\n" +
                "Status: " +
                status +
                "\n\n" +
                "Detailed assignment information " +
                "will be available in the next portal update."
            );

        }
    );

});


/* =========================================================
   TIMETABLE PRINT
   ========================================================= */

const printTimetable =
    document.getElementById(
        "printTimetable"
    );

if (printTimetable) {

    printTimetable.addEventListener(
        "click",
        function () {

            window.print();

        }
    );

}


/* =========================================================
   RESULTS PRINT
   ========================================================= */

const printResults =
    document.getElementById(
        "printResults"
    );

if (printResults) {

    printResults.addEventListener(
        "click",
        function () {

            window.print();

        }
    );

}


/* =========================================================
   ANNOUNCEMENTS PAGE
   ========================================================= */

const announcementFilterButtons =
    document.querySelectorAll(
        ".announcement-filter-btn"
    );

const announcementCards =
    document.querySelectorAll(
        ".announcement-card"
    );

const noAnnouncements =
    document.getElementById(
        "noAnnouncements"
    );


announcementFilterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const selectedFilter =
                    button.getAttribute(
                        "data-filter"
                    );

                announcementFilterButtons
                    .forEach(function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    });

                button.classList.add(
                    "active"
                );

                let visibleCount = 0;

                announcementCards.forEach(
                    function (card) {

                        const category =
                            card.getAttribute(
                                "data-category"
                            );

                        if (
                            selectedFilter === "all" ||
                            category === selectedFilter
                        ) {

                            card.style.display =
                                "flex";

                            visibleCount++;

                        } else {

                            card.style.display =
                                "none";

                        }

                    }
                );

                if (noAnnouncements) {

                    noAnnouncements.style.display =
                        visibleCount === 0
                            ? "block"
                            : "none";

                }

            }
        );

    }
);


/* =========================================================
   ANNOUNCEMENT READ MORE
   ========================================================= */

const announcementReadButtons =
    document.querySelectorAll(
        ".announcement-read"
    );

announcementReadButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const announcementCard =
                    this.closest(
                        ".announcement-card"
                    );

                if (!announcementCard) {
                    return;
                }

                const titleElement =
                    announcementCard.querySelector(
                        "h3"
                    );

                const descriptionElement =
                    announcementCard.querySelector(
                        ".announcement-card-content > p"
                    );

                const title =
                    titleElement
                        ? titleElement.textContent.trim()
                        : "Announcement";

                const description =
                    descriptionElement
                        ? descriptionElement.textContent.trim()
                        : "No additional information available.";

                alert(
                    title +
                    "\n\n" +
                    description
                );

            }
        );

    }
);


/* =========================================================
   PROFILE PAGE
   ========================================================= */

const profileStatus =
    document.querySelector(
        ".profile-status"
    );

if (profileStatus) {

    profileStatus.addEventListener(
        "click",
        function () {

            alert(
                "Account Status\n\n" +
                "Your UniCore student account " +
                "is currently active."
            );

        }
    );

}


/* =========================================================
   STUDY REMINDERS
   ========================================================= */

const addReminderButton =
    document.getElementById(
        "addReminderButton"
    );

const reminderForm =
    document.getElementById(
        "reminderForm"
    );

const reminderInput =
    document.getElementById(
        "reminderInput"
    );

const saveReminderButton =
    document.getElementById(
        "saveReminderButton"
    );

const cancelReminderButton =
    document.getElementById(
        "cancelReminderButton"
    );

const remindersList =
    document.getElementById(
        "remindersList"
    );


/* =========================================================
   REMINDER STORAGE
   ========================================================= */

const reminderStorageKey =
    "unicoreStudyReminders";


function getStoredReminders() {

    try {

        const stored =
            localStorage.getItem(
                reminderStorageKey
            );

        return stored
            ? JSON.parse(stored)
            : [];

    } catch (error) {

        return [];

    }

}


function saveStoredReminders(
    reminders
) {

    localStorage.setItem(
        reminderStorageKey,
        JSON.stringify(reminders)
    );

}


/* =========================================================
   CREATE REMINDER ELEMENT
   ========================================================= */

function createReminderElement(
    reminder
) {

    const reminderItem =
        document.createElement("div");

    reminderItem.className =
        "reminder-item";

    if (reminder.completed) {

        reminderItem.classList.add(
            "completed"
        );

    }

    const label =
        document.createElement("label");

    const checkbox =
        document.createElement("input");

    checkbox.type =
        "checkbox";

    checkbox.checked =
        Boolean(reminder.completed);

    const text =
        document.createElement("span");

    text.textContent =
        reminder.text;

    const time =
        document.createElement("span");

    time.className =
        "reminder-time";

    time.textContent =
        reminder.time || "Today";

    label.appendChild(
        checkbox
    );

    label.appendChild(
        text
    );

    reminderItem.appendChild(
        label
    );

    reminderItem.appendChild(
        time
    );

    checkbox.addEventListener(
        "change",
        function () {

            reminder.completed =
                checkbox.checked;

            if (checkbox.checked) {

                reminderItem.classList.add(
                    "completed"
                );

            } else {

                reminderItem.classList.remove(
                    "completed"
                );

            }

            saveReminderState();

        }
    );

    return reminderItem;

}


/* =========================================================
   SAVE CURRENT REMINDER STATE
   ========================================================= */

function saveReminderState() {

    if (!remindersList) {
        return;
    }

    const reminders = [];

    const reminderItems =
        remindersList.querySelectorAll(
            ".reminder-item"
        );

    reminderItems.forEach(
        function (item) {

            const textElement =
                item.querySelector(
                    "label span"
                );

            const checkbox =
                item.querySelector(
                    'input[type="checkbox"]'
                );

            const timeElement =
                item.querySelector(
                    ".reminder-time"
                );

            if (!textElement) {
                return;
            }

            reminders.push({

                text:
                    textElement.textContent.trim(),

                completed:
                    checkbox
                        ? checkbox.checked
                        : false,

                time:
                    timeElement
                        ? timeElement.textContent.trim()
                        : "Today"

            });

        }
    );

    saveStoredReminders(
        reminders
    );

}


/* =========================================================
   LOAD REMINDERS
   ========================================================= */

function loadReminders() {

    if (!remindersList) {
        return;
    }

    const storedReminders =
        getStoredReminders();

    if (storedReminders.length === 0) {
        return;
    }

    /*
     * Remove the default HTML reminders
     * when saved reminders exist.
     */

    remindersList.innerHTML = "";

    storedReminders.forEach(
        function (reminder) {

            remindersList.appendChild(
                createReminderElement(
                    reminder
                )
            );

        }
    );

}


loadReminders();


/* =========================================================
   OPEN REMINDER FORM
   ========================================================= */

if (addReminderButton) {

    addReminderButton.addEventListener(
        "click",
        function () {

            if (!reminderForm) {
                return;
            }

            reminderForm.classList.add(
                "show"
            );

            if (reminderInput) {
                reminderInput.focus();
            }

        }
    );

}


/* =========================================================
   CANCEL REMINDER
   ========================================================= */

if (cancelReminderButton) {

    cancelReminderButton.addEventListener(
        "click",
        function () {

            if (reminderInput) {
                reminderInput.value = "";
            }

            if (reminderForm) {
                reminderForm.classList.remove(
                    "show"
                );
            }

        }
    );

}


/* =========================================================
   SAVE NEW REMINDER
   ========================================================= */

if (saveReminderButton) {

    saveReminderButton.addEventListener(
        "click",
        function () {

            if (!reminderInput || !remindersList) {
                return;
            }

            const reminderText =
                reminderInput.value.trim();

            if (reminderText === "") {

                alert(
                    "Please enter a study reminder."
                );

                reminderInput.focus();

                return;

            }

            const newReminder = {

                text:
                    reminderText,

                completed:
                    false,

                time:
                    "Today"

            };

            remindersList.appendChild(
                createReminderElement(
                    newReminder
                )
            );

            saveReminderState();

            reminderInput.value = "";

            if (reminderForm) {

                reminderForm.classList.remove(
                    "show"
                );

            }

        }
    );

}


/* =========================================================
   ENTER KEY FOR REMINDER
   ========================================================= */

if (reminderInput) {

    reminderInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                if (saveReminderButton) {
                    saveReminderButton.click();
                }

            }

        }
    );

}


/* =========================================================
   HELP & SUPPORT
   ========================================================= */

/* FAQ accordion */

const faqQuestions =
    document.querySelectorAll(
        ".faq-question"
    );

faqQuestions.forEach(
    function (question) {

        question.addEventListener(
            "click",
            function () {

                const faqItem =
                    question.closest(
                        ".faq-item"
                    );

                if (!faqItem) {
                    return;
                }

                const wasOpen =
                    faqItem.classList.contains(
                        "open"
                    );

                /*
                 * Close other FAQ items
                 * for a cleaner accordion.
                 */

                document
                    .querySelectorAll(
                        ".faq-item.open"
                    )
                    .forEach(
                        function (item) {

                            item.classList.remove(
                                "open"
                            );

                        }
                    );

                if (!wasOpen) {

                    faqItem.classList.add(
                        "open"
                    );

                }

            }
        );

    }
);


/* =========================================================
   HELP QUICK ACTION BUTTONS
   ========================================================= */

const helpActionButtons =
    document.querySelectorAll(
        ".help-action"
    );

helpActionButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const targetId =
                    button.getAttribute(
                        "data-target"
                    );

                const targetSection =
                    document.getElementById(
                        targetId
                    );

                if (targetSection) {

                    targetSection.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

                    });

                }

            }
        );

    }
);


/* =========================================================
   SUPPORT FORM
   ========================================================= */

const supportForm =
    document.getElementById(
        "supportForm"
    );

if (supportForm) {

    supportForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const nameInput =
                document.getElementById(
                    "supportName"
                );

            const messageInput =
                document.getElementById(
                    "supportMessage"
                );

            const name =
                nameInput
                    ? nameInput.value.trim()
                    : "";

            const message =
                messageInput
                    ? messageInput.value.trim()
                    : "";

            if (
                name === "" ||
                message === ""
            ) {

                alert(
                    "Please complete all required fields."
                );

                return;

            }

            alert(
                "Support Request Submitted\n\n" +
                "Thank you, " +
                name +
                "!\n\n" +
                "Your support request has been " +
                "submitted successfully."
            );

            supportForm.reset();

        }
    );

}


/* =========================================================
   END OF UNICORE JAVASCRIPT
   ========================================================= */
