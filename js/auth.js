
// LOGIN FORM VALIDATION

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        const message = document.getElementById("loginMessage");

        message.className = "form-message";

        if (!email || !password) {
            message.textContent = "Please fill in all fields.";
            message.classList.add("error");
            return;
        }

        if (password.length < 6) {
            message.textContent = "Password must contain at least 6 characters.";
            message.classList.add("error");
            return;
        }

        message.textContent =
            "Form validation successful! Backend authentication is not connected yet.";

        message.classList.add("success");
    });
}


// REGISTRATION FORM VALIDATION

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("fullName").value.trim();

        const email = document.getElementById("registerEmail").value.trim();

        const password = document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message = document.getElementById("registerMessage");

        message.className = "form-message";

        if (!name || !email || !password || !confirmPassword) {
            message.textContent = "Please fill in all fields.";
            message.classList.add("error");
            return;
        }

        if (password.length < 6) {
            message.textContent = "Password must contain at least 6 characters.";
            message.classList.add("error");
            return;
        }

        if (password !== confirmPassword) {
            message.textContent = "Passwords do not match!";
            message.classList.add("error");
            return;
        }

        message.textContent =
            "Registration form validated successfully! Backend is not connected yet.";

        message.classList.add("success");
    });
}
