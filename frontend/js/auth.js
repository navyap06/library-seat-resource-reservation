const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;
        const message = document.getElementById("loginMessage");

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.email.toLowerCase() === email && u.password === password);

        if (!user) {
            message.textContent = "Invalid email or password.";
            message.className = "auth-message error";
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(user));
        message.textContent = "Login successful! Redirecting...";
        message.className = "auth-message success";

        setTimeout(() => {
            window.location.href = "dashboard.htm";
        }, 800);
    });
}

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("registerEmail").value.trim().toLowerCase();
        const studentId = document.getElementById("studentId").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const terms = document.getElementById("terms").checked;
        const message = document.getElementById("registerMessage");

        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (password !== confirmPassword) {
            message.textContent = "Passwords do not match.";
            message.className = "auth-message error";
            return;
        }

        if (password.length < 6) {
            message.textContent = "Password must contain at least 6 characters.";
            message.className = "auth-message error";
            return;
        }

        if (!terms) {
            message.textContent = "Please accept the terms and conditions.";
            message.className = "auth-message error";
            return;
        }

        if (users.some(u => u.email.toLowerCase() === email)) {
            message.textContent = "An account with this email already exists.";
            message.className = "auth-message error";
            return;
        }

        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            studentId: studentId,
            password: password,
            role: "student",
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        message.textContent = "Account created successfully! Redirecting to login...";
        message.className = "auth-message success";

        setTimeout(() => {
            window.location.href = "login.htm";
        }, 1200);
    });
}

function togglePassword() {
    const passwordInput = document.getElementById("password");
    if (passwordInput) {
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    }
}

function toggleRegisterPassword() {
    const passwordInput = document.getElementById("registerPassword");
    if (passwordInput) {
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    }
}

function forgotPassword() {
    alert("Password recovery will be added later.");
}

function googleLogin() {
    alert("Google authentication will be added in the second evaluation.");
}