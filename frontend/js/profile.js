let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    window.location.href = "login.htm";
}

function displayProfile() {
    if (!currentUser) return;

    const navUserName = document.getElementById("navUserName");
    const userAvatar = document.getElementById("userAvatar");
    const navUserRole = document.getElementById("navUserRole");

    if (navUserName) navUserName.textContent = currentUser.name;
    if (userAvatar) userAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
    if (navUserRole) navUserRole.textContent = getRoleName(currentUser.role);

    document.getElementById("profileAvatar").textContent = currentUser.name.charAt(0).toUpperCase();
    document.getElementById("profileName").textContent = currentUser.name;
    document.getElementById("profileEmail").textContent = currentUser.email;
    document.getElementById("profileRole").textContent = getRoleName(currentUser.role);

    document.getElementById("detailName").textContent = currentUser.name || "-";
    document.getElementById("detailEmail").textContent = currentUser.email || "-";
    document.getElementById("detailStudentId").textContent = currentUser.studentId || "-";
    document.getElementById("detailRole").textContent = getRoleName(currentUser.role);
    document.getElementById("detailCreated").textContent = formatDate(currentUser.createdAt);

    loadStatistics();
}

function getRoleName(role) {
    if (role === "admin") return "Administrator";
    if (role === "faculty") return "Faculty";
    return "Student";
}

function formatDate(date) {
    if (!date) return "Not available";
    return new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function loadStatistics() {
    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    const queueRequests = JSON.parse(localStorage.getItem("queueRequests")) || [];

    const myReservations = reservations.filter(r => r.userId === currentUser.id);
    const active = myReservations.filter(r => r.status === "active").length;
    const completed = myReservations.filter(r => r.status === "completed").length;
    const myQueue = queueRequests.filter(q => q.userId === currentUser.id && q.status === "waiting").length;

    document.getElementById("totalReservations").textContent = myReservations.length;
    document.getElementById("activeReservations").textContent = active;
    document.getElementById("queueCount").textContent = myQueue;
    document.getElementById("completedReservations").textContent = completed;
}

function openEditModal() {
    document.getElementById("editName").value = currentUser.name || "";
    document.getElementById("editEmail").value = currentUser.email || "";
    document.getElementById("editStudentId").value = currentUser.studentId || "";
    document.getElementById("editMessage").textContent = "";
    document.getElementById("editProfileModal").classList.add("show");
}

function closeEditModal() {
    document.getElementById("editProfileModal").classList.remove("show");
}

document.getElementById("editProfileForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("editName").value.trim();
    const email = document.getElementById("editEmail").value.trim().toLowerCase();
    const studentId = document.getElementById("editStudentId").value.trim();
    const message = document.getElementById("editMessage");

    if (!name || !email || !studentId) {
        message.textContent = "Please fill in all fields.";
        message.className = "form-message error";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = users.some(u => u.email === email && u.id !== currentUser.id);

    if (emailExists) {
        message.textContent = "This email is already being used.";
        message.className = "form-message error";
        return;
    }

    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex === -1) {
        message.textContent = "User account could not be found.";
        message.className = "form-message error";
        return;
    }

    users[userIndex].name = name;
    users[userIndex].email = email;
    users[userIndex].studentId = studentId;

    currentUser.name = name;
    currentUser.email = email;
    currentUser.studentId = studentId;

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    message.textContent = "Profile updated successfully.";
    message.className = "form-message success";

    displayProfile();
    setTimeout(closeEditModal, 700);
});

function openPasswordModal() {
    document.getElementById("passwordForm").reset();
    document.getElementById("passwordMessage").textContent = "";
    document.getElementById("passwordModal").classList.add("show");
}

function closePasswordModal() {
    document.getElementById("passwordModal").classList.remove("show");
}

document.getElementById("passwordForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmNewPassword").value;
    const message = document.getElementById("passwordMessage");

    if (currentPassword !== currentUser.password) {
        message.textContent = "Current password is incorrect.";
        message.className = "form-message error";
        return;
    }

    if (newPassword.length < 6) {
        message.textContent = "New password must contain at least 6 characters.";
        message.className = "form-message error";
        return;
    }

    if (newPassword !== confirmPassword) {
        message.textContent = "New passwords do not match.";
        message.className = "form-message error";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);

    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        currentUser.password = newPassword;

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        message.textContent = "Password changed successfully.";
        message.className = "form-message success";
        setTimeout(closePasswordModal, 800);
    }
});

function toggleUserMenu() {
    const menu = document.getElementById("userMenu");
    if (menu) menu.classList.toggle("show");
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.htm";
}

displayProfile();