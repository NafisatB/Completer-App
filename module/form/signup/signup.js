const textBox = document.getElementById("toggleText");
const signupBtn = document.getElementById("btnSignup");
const loginBtn = document.getElementById("btnLogin");

function setActive(button) {
    signupBtn.classList.remove("active");
    loginBtn.classList.remove("active");

    button.classList.add("active");
}

// Default (signup active)
setActive(signupBtn);

signupBtn.addEventListener("click", () => {
    setActive(signupBtn);

    textBox.innerHTML = `
        <h1>Join TaskMaster</h1>
        <p>Create an account to boost your productivity</p>
    `;
});

loginBtn.addEventListener("click", () => {
    setActive(loginBtn);

    textBox.innerHTML = `
        <h1>Welcome Back!</h1>
        <p>Enter your details to access your account</p>
    `;
});