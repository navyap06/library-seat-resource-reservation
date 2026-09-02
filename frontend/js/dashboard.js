const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    window.location.href = "login.htm";
}

if (currentUser) {
    const welcomeName = document.getElementById("welcomeName");
    const navUserName = document.getElementById("navUserName");
    const userAvatar = document.getElementById("userAvatar");

    if (welcomeName) welcomeName.textContent = currentUser.name;
    if (navUserName) navUserName.textContent = currentUser.name;
    if (userAvatar) userAvatar.textContent = currentUser.name.charAt(0).toUpperCase();

    loadDashboardData();
}

function toggleUserMenu() {
    const menu = document.getElementById("userMenu");
    if (menu) menu.classList.toggle("show");
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.htm";
}

function loadDashboardData() {
    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    const queueRequests = JSON.parse(localStorage.getItem("queueRequests")) || [];
    const currentUserId = currentUser ? currentUser.id : null;

    const myReservations = reservations.filter(r => r.userId === currentUserId);
    const active = myReservations.filter(r => r.status === "active");
    const completed = myReservations.filter(r => r.status === "completed");
    const myQueue = queueRequests.filter(q => q.userId === currentUserId && q.status === "waiting");

    const activeEl = document.getElementById("activeReservations");
    const reservedEl = document.getElementById("resourcesReserved");
    const completedEl = document.getElementById("completedReservations");
    const queuePosEl = document.getElementById("queuePosition");

    if (activeEl) activeEl.textContent = active.length;
    if (reservedEl) reservedEl.textContent = myReservations.length;
    if (completedEl) completedEl.textContent = completed.length;
    if (queuePosEl) queuePosEl.textContent = myQueue.length > 0 ? `#${myQueue.length}` : "—";
}