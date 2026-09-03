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
