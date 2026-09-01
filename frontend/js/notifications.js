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

function markAsRead(button) {
    const notification = button.closest(".notification-item");
    if (!notification || notification.classList.contains("read")) return;

    notification.classList.remove("unread");
    notification.classList.add("read");
    notification.setAttribute("data-read", "true");

    const dot = notification.querySelector(".unread-dot");
    if (dot) dot.remove();
    button.remove();

    updateNotificationCount();
}

function markAllAsRead() {
    const notifications = document.querySelectorAll(".notification-item.unread");

    notifications.forEach(notification => {
        notification.classList.remove("unread");
        notification.classList.add("read");
        notification.setAttribute("data-read", "true");

        const dot = notification.querySelector(".unread-dot");
        if (dot) dot.remove();

        const button = notification.querySelector(".notification-read-btn");
        if (button) button.remove();
    });

    updateNotificationCount();
}

function updateNotificationCount() {
    const unreadCount = document.querySelectorAll(".notification-item.unread").length;

    const pageCount = document.getElementById("notificationCount");
    const headerCount = document.getElementById("headerNotificationCount");
    const emptyState = document.getElementById("notificationsEmpty");
    const listSection = document.getElementById("notificationsList");

    if (pageCount) pageCount.textContent = unreadCount;

    if (headerCount) {
        headerCount.textContent = unreadCount;
        headerCount.style.display = unreadCount === 0 ? "none" : "flex";
    }

    if (emptyState && listSection) {
        emptyState.style.display = unreadCount === 0 && document.querySelectorAll(".notification-item").length === 0 ? "block" : "none";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    loadLoggedInUser();
    updateNotificationCount();
});