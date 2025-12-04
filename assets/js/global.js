// ================== COMPONENT RENDERER ==================
function renderComponents(elements, callback) {
    let pending = elements.length;
    if (pending === 0) {
        callback && callback();
        return;
    }

    for (let element of elements) {
        const dataImport = element.getAttribute("data-import");

        fetch(dataImport)
        .then(res => {
            if (!res.ok) throw "Not found";
            return res.text();
        })
        .then(html => {
            element.innerHTML = html;
            loadComponentScripts(element);

            // Load nested components recursively
            const children = element.querySelectorAll("[data-import]");
            renderComponents(children, () => {
                pending--;
                if (pending === 0) callback && callback();
            });
        })
        .catch(() => {
            element.innerHTML = "<h4>Component not found</h4>";
            pending--;
            if (pending === 0) callback && callback();
        });
    }
}

// ================== SCRIPT LOADER ==================
function loadComponentScripts(element) {
    const scripts = element.querySelectorAll("script");
    for (let script of scripts) {
        const newScript = document.createElement("script");
        if (script.src) newScript.src = script.src;
        if (script.textContent) newScript.textContent = script.textContent;
        script.remove();
        element.appendChild(newScript);
    }
}

// ================== PAGE SWITCHER ==================
function switchPages(page) {
    const signupForm = document.querySelector("#signup");
    const loginForm = document.querySelector("#login");
    const heroHeader = document.querySelector("#hero-header");
    const heroParag = document.querySelector("#hero-parag");
    const btnSignup = document.querySelector("#btnSignup");
    const btnLogin = document.querySelector("#btnLogin");

    if (page === "signup") {
        signupForm?.classList.remove("hidden");
        signupForm?.classList.add("signup");
        loginForm?.classList.add("hidden");
        loginForm?.classList.remove("login");
        heroHeader && (heroHeader.textContent = "Join TaskMaster");
        heroParag && (heroParag.textContent = "Create an account to boost your productivity");
        btnSignup?.classList.add("active");
        btnLogin?.classList.remove("active");
    } else if (page === "login") {
        loginForm?.classList.remove("hidden");
        loginForm?.classList.add("login");
        signupForm?.classList.add("hidden");
        signupForm?.classList.remove("signup");
        heroHeader && (heroHeader.textContent = "Welcome Back!");
        heroParag && (heroParag.textContent = "Enter your details to access your account");
        btnLogin?.classList.add("active");
        btnSignup?.classList.remove("active");
    }
}

// ================== FORM VALIDATION & SUBMISSION ==================
function initForms() {
    const signupFormEl = document.querySelector("#signup form");
    const loginFormEl = document.querySelector("#login form");
    const btnSignup = document.querySelector("#btnSignup");
    const btnLogin = document.querySelector("#btnLogin");

    // ---- SIGNUP ----
    if (signupFormEl) {
        signupFormEl.addEventListener("submit", e => {
            e.preventDefault();
            const fullName = document.getElementById("fullName")?.value.trim();
            const email = document.getElementById("email")?.value.trim();
            const password = document.getElementById("signup_password")?.value;

            if (!fullName || !email || !password) return alert("All fields are required");
            if (password.length < 6) return alert("Password must be at least 6 characters");
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert("Enter a valid email");

            const users = JSON.parse(localStorage.getItem("users")) || [];
            const existingUser = users.find(u => u.email === email);

            if (existingUser) {
                alert("Email already registered. Redirecting to login...");
                switchPages("login");
                return;
            }

            users.push({ fullName, email, password });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Signup successful! Redirecting to login...");
            signupFormEl.reset();

            switchPages("login");
        });
    }

    // ---- LOGIN ----
    if (loginFormEl) {
        loginFormEl.addEventListener("submit", e => {
            e.preventDefault();
            const email = document.getElementById("user_email")?.value.trim();
            const password = document.getElementById("login_password")?.value;

            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (!user) return alert("Invalid email or password");

            localStorage.setItem("activeUser", JSON.stringify(user));
            window.location.href = "/dashboard.html";
        });
    }

    // ---- TOGGLE BUTTONS ----
    if (btnSignup) btnSignup.addEventListener("click", () => switchPages("signup"));
    if (btnLogin) btnLogin.addEventListener("click", () => switchPages("login"));
}

// ================== INITIALIZATION ==================
document.addEventListener("DOMContentLoaded", () => {
    const componentElements = document.querySelectorAll("[data-import]");
    renderComponents(componentElements, () => {
        switchPages("signup"); // default page
        initForms();           // initialize forms + toggle buttons
    });
});
