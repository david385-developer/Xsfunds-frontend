// ===== Mobile Menu Toggle =====
const navToggle = document.querySelector(".nav-toggle");
const mobileMenu = document.querySelector("#mobileMenu");

navToggle.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("active");
  navToggle.setAttribute("aria-expanded", isOpen);
});

// ===== Form Validation =====
const form = document.querySelector("#contactForm");
const nameInput = document.querySelector("#clientName");
const emailInput = document.querySelector("#clientEmail");
const phoneInput = document.querySelector("#clientPhone");
const successMessage = document.querySelector("#formSuccess");

function showError(input, message) {
  const error = input.nextElementSibling;
  error.textContent = message;
  input.classList.add("error");
}
function clearError(input) {
  const error = input.nextElementSibling;
  error.textContent = "";
  input.classList.remove("error");
}
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
}
function isValidPhone(phone) {
  return /^[0-9]{10}$/.test(phone);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  if (nameInput.value.trim() === "") {
    showError(nameInput, "Please enter your name");
    valid = false;
  } else { clearError(nameInput); }

  if (emailInput.value.trim() === "") {
    showError(emailInput, "Please enter your email");
    valid = false;
  } else if (!isValidEmail(emailInput.value)) {
    showError(emailInput, "Please enter a valid email");
    valid = false;
  } else { clearError(emailInput); }

  if (phoneInput.value.trim() === "") {
    showError(phoneInput, "Please enter your mobile number");
    valid = false;
  } else if (!isValidPhone(phoneInput.value)) {
    showError(phoneInput, "Please enter a valid 10-digit number");
    valid = false;
  } else { clearError(phoneInput); }

  if (valid) {
    successMessage.textContent = "✅ Thank you! Your message has been sent.";
    form.reset();
    setTimeout(() => successMessage.textContent = "", 4000);
  }
});
