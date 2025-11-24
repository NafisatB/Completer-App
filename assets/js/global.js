// Returns all element descendants of node that match selectors ([data-import])
// this returns an array like element that can be looped through
// const componentElements =document.querySelectorAll("[data-import]");
function renderComponent(elements, callback) {
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
        .then(component => {
            element.innerHTML = component;
            loadComponentScripts(element);

            const subElements = element.querySelectorAll("[data-import]");
            renderComponent(subElements, () => {
                pending--;
                if (pending === 0) callback && callback();
            });
        })
        .catch(() => {
            element.innerHTML = `<h4>Component not found</h4>`;
            pending--;
            if (pending === 0) callback && callback();
        });
    }
}




const componentElements = document.querySelectorAll("[data-import]");
renderComponent(componentElements, initUI);

function initUI() {
    let page = "signup"
    const loginBtn = document.querySelector("#btnLogin");
    const signupBtn = document.querySelector("#btnSignup");
    const signupForm = document.querySelector("#signup")
    const loginForm = document.querySelector("#login")
    const heroHeader = document.querySelector("#hero-header")
     const heroParag = document.querySelector("#hero-parag")
    console.log(loginBtn,signupForm,loginForm);
    
      switchPages(page,signupForm,loginForm,heroHeader,heroParag)
    
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            loginBtn.classList.add('active')
            signupBtn.classList.remove('active')
            page = "login"
            switchPages(page,signupForm,loginForm,heroHeader,heroParag)
        });
    }
     if (signupBtn) {
        signupBtn.addEventListener("click", () => {
            signupBtn.classList.add('active')
            loginBtn.classList.remove('active')
            page = "signup"
            switchPages(page,signupForm,loginForm,heroHeader,heroParag)
        });
    }
}

function switchPages (page,signupForm,loginForm,heroHeader,heroParag){
       switch(page){
        case "signup" :
           signupForm.classList.remove("hidden");
           signupForm.classList.add("signup");

        // Hide login
           loginForm.classList.add("hidden");
           loginForm.classList.remove("login");

           heroHeader.textContent = 'Join TaskMaster'
           heroParag.textContent = 'Create an account to boost your productivity'
            break;
        
        case "login" :
            loginForm.classList.remove("hidden");
            loginForm.classList.add("login");

        // Hide signup
            signupForm.classList.add("hidden");
            signupForm.classList.remove("signup");

            heroHeader.textContent = 'Welcome Back!'
           heroParag.textContent = 'Enter your details to access your account'
            break;   
    }
    
}


function loadComponentScripts(element){
    const scripts = element.querySelectorAll("script");
    for(let script of scripts){
        const newScript = document.createElement("script");
        if(script.src){
            newScript.src = script.src;
        }
        if(script.textContent){
            newScript.textContent = script.textContent;
        }
        script.remove()

        element.appendChild(newScript)
    }
}