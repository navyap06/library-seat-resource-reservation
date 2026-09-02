function loadLoggedInUser() {
    const userData = localStorage.getItem("currentUser") || localStorage.getItem("loggedInUser");
    let username = "User";
    let role = "Student";

    if (userData) {
        try {
            const user = JSON.parse(userData);
            username = user.name || user.username || user.fullName || "User";
            role = user.role || "Student";
        } catch (e) {
            username = userData;
        }
    }

    const navUserName = document.getElementById("navUserName");
    const navUserRole = document.getElementById("navUserRole");
    const userAvatar = document.getElementById("userAvatar");

    if (navUserName) navUserName.textContent = username;
    if (navUserRole) navUserRole.textContent = role.charAt(0).toUpperCase() + role.slice(1);
    if (userAvatar) userAvatar.textContent = username.trim().charAt(0).toUpperCase();
}

function toggleUserMenu() {
    const menu = document.getElementById("userMenu");
    if (menu) menu.classList.toggle("show");
}

document.addEventListener("click", function (event) {
    const profile = document.querySelector(".user-profile");
    const menu = document.getElementById("userMenu");

    if (profile && menu && !profile.contains(event.target) && !menu.contains(event.target)) {
        menu.classList.remove("show");
    }
});

function logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.htm";
}

document.addEventListener("DOMContentLoaded", function () {
    loadLoggedInUser();

    const filter = document.getElementById("historyFilter");
    const historyItems = document.querySelectorAll(".history-item");
    const emptyMessage = document.getElementById("historyEmpty");

    if (!filter) return;

    filter.addEventListener("change", function () {
        const selected = filter.value;
        let visibleCount = 0;

        historyItems.forEach(item => {
            const status = item.getAttribute("data-status");
            if (selected === "all" || status === selected) {
                item.style.display = "flex";
                visibleCount++;
            } else {
                item.style.display = "none";
            }
        });

        if (emptyMessage) {
            emptyMessage.style.display = visibleCount === 0 ? "block" : "none";
        }
    });
});