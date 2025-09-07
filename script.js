const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const countryCode = document.getElementById("countryCode");

function showError(input, message) {
    const formControl = input.closest(".form-control");
    formControl.className = "form-control error";
    formControl.querySelector("small").innerText = message;
}

function showSuccess(input, message) {
    const formControl = input.closest(".form-control");
    formControl.className = "form-control success";
    formControl.querySelector("small").innerText = message;
}

function validateName() {
    const name = nameInput.value.trim();
    if (name.length < 3) {
        showError(nameInput, "Name must be at least 3 characters");
        return false;
    } else {
        showSuccess(nameInput, "Looks good!");
        return true;
    }
}

function validateEmail() {
    const email = emailInput.value.trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
        showError(emailInput, "Enter a valid email address");
        return false;
    } else {
        showSuccess(emailInput, "Valid email!");
        return true;
    }
}

function validatePhone() {
    const phone = phoneInput.value.trim();

    
    const re = /^[6-9]\d{9}$/;

    if (!re.test(phone)) {
        showError(phoneInput, "Enter a valid 10-digit Indian mobile number");
        return false;
    } else {
        showSuccess(phoneInput, "Valid phone!");
        return true;
    }
}


nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
phoneInput.addEventListener("input", validatePhone);


form.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (validateName() & validateEmail() & validatePhone()) {
        document.getElementById("loader-overlay").style.display = "flex";
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        try {
            const response = await fetch("http://localhost:3000/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone })
            });
            const data = await response.json();
            if (response.ok) {
                form.reset();
                const smalls = form.querySelectorAll("small");
                smalls.forEach(small => {
                    small.textContent = "";
                });
            }
            document.getElementById("loader-overlay").style.display = "none";

        } catch (err) {
            console.error(err);
            document.getElementById("loader-overlay").style.display = "none";
            alert("Failed to submit form please submit it again");
        }
    }
});
