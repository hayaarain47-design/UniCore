/* ==========================================
   UNICORE DASHBOARD
========================================== */

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const logoutBtn = document.getElementById("logoutBtn");


// ==========================================
// MOBILE SIDEBAR
// ==========================================

if (menuToggle) {

    menuToggle.addEventListener("click", function () {
        sidebar.classList.toggle("open");
        sidebarOverlay.classList.toggle("show");
    });

}


if (sidebarOverlay) {

    sidebarOverlay.addEventListener("click", function () {
        sidebar.classList.remove("open");
        sidebarOverlay.classList.remove("show");
    });

}


// ==========================================
// LOGOUT
// ==========================================

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        localStorage.removeItem("uniCoreLoggedIn");
        localStorage.removeItem("uniCoreStudentEmail");

        window.location.href = "index.html";

    });

}


// ==========================================
// PROTECT DASHBOARD
// ==========================================

if (
    window.location.pathname.includes("dashboard.html") &&
    localStorage.getItem("uniCoreLoggedIn") !== "true"
) {

    window.location.href = "index.html";

}
