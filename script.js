document.addEventListener('DOMContentLoaded', function () {
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
    };
    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach((fader) => {
        appearOnScroll.observe(fader);
    });


    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
        const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true' || false;
        mobileMenuBtn.setAttribute('aria-expanded', !expanded);
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('open');

        if (mobileMenu.classList.contains('active')) {
            mobileMenu.querySelectorAll('a').forEach(a => a.setAttribute('tabindex', '0'));
        } else {
            mobileMenu.querySelectorAll('a').forEach(a => a.setAttribute('tabindex', '-1'));
        }
    });

    document.body.style.opacity = '1';
});
const form = document.getElementById('contact-form');

function validateName(name) {
  return name.trim().length >= 2;
}

function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

function validatePhone(phone) {
  return /^[0-9]{10}$/.test(phone);
}

function validateField(input) {
  let valid = true;
  const value = input.value;
  const errorElem = input.nextElementSibling;
  
  if (input.id === 'name') {
    valid = validateName(value);
    errorElem.textContent = valid ? '' : 'Please enter a valid name (at least 2 characters)';
  } else if (input.id === 'email') {
    valid = validateEmail(value);
    errorElem.textContent = valid ? '' : 'Please enter a valid email address';
  } else if (input.id === 'phone') {
    valid = validatePhone(value);
    errorElem.textContent = valid ? '' : 'Please enter a 10-digit mobile number';
  }
  return valid;
}

// Add input event listeners for real-time validation
form.name.addEventListener('input', () => validateField(form.name));
form.email.addEventListener('input', () => validateField(form.email));
form.phone.addEventListener('input', () => validateField(form.phone));


form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Clear previous errors
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(s => s.textContent = '');

    // Read values
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;

    // Validate
    let valid = true;

    if (!validateName(name)) {
        form.name.nextElementSibling.textContent = 'Please enter a valid name (at least 2 characters)';
        valid = false;
    }
    if (!validateEmail(email)) {
        form.email.nextElementSibling.textContent = 'Please enter a valid email address';
        valid = false;
    }
    if (!validatePhone(phone)) {
        form.phone.nextElementSibling.textContent = 'Please enter a 10-digit mobile number';
        valid = false;
    }

    if (!valid) return; // Stop if invalid

    // Show loading
    document.getElementById("loader-overlay").style.display = "block";

    try {
        const response = await fetch("https://xsfunds.onrender.com/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, phone })
        });
        const data = await response.json();
        if (response.ok) {
            form.reset();
            errorMessages.forEach(s => s.textContent = '');
            alert('Message sent successfully!');
        } else {
            alert(data.message || 'Submission failed, please try again.');
        }
    } catch (err) {
        console.error(err);
        alert("Failed to submit form, please submit it again");
    } finally {
        document.getElementById("loader-overlay").style.display = "none";
    }
});