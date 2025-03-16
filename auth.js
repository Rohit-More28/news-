document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const logoutBtn = document.getElementById("logout-btn"); // Logout button (if available)

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            try {
                const response = await fetch("http://localhost:5000/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem("token", data.token);
                    alert("Login successful!");
                    window.location.href = "homepage.html"; // Redirect after login
                } else {
                    alert("Login failed: " + data.message);
                }
            } catch (error) {
                console.error("Login Error:", error);
                alert("Server error! Try again later.");
            }
        });
    }

    // Handle Signup
    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const username = document.getElementById("signup-username").value;
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;

            try {
                const response = await fetch("http://localhost:5000/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, email, password })
                });

                const data = await response.json();
                if (response.ok) {
                    alert("Account created successfully!");
                    window.location.href = "index.html"; // Redirect to login
                } else {
                    alert("Signup failed: " + data.message);
                }
            } catch (error) {
                console.error("Signup Error:", error);
                alert("Server error! Try again later.");
            }
        });
    }

    // Logout Function
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("token"); // Remove JWT token
            alert("Logged out successfully!");
            window.location.href = "index.html"; // Redirect to login page
        });
    }

    // Check if user is logged in (for protected pages)
    function checkAuth() {
        const token = localStorage.getItem("token");
        if (!token && window.location.pathname.includes("homepage.html")) {
            alert("Unauthorized! Please log in.");
            window.location.href = "index.html"; // Redirect to login if not authenticated
        }
    }

    checkAuth(); // Run authentication check
});
