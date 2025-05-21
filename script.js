document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    // Create error message elements
    const nameError = createErrorElement('name-error');
    const emailError = createErrorElement('email-error');

    // Insert error elements after inputs
    nameInput.parentNode.insertBefore(nameError, nameInput.nextSibling);
    emailInput.parentNode.insertBefore(emailError, emailInput.nextSibling);

    form.addEventListener('submit', function(e) {
        let isValid = true;

        // Validate name (at least 2 characters, only letters and spaces)
        const nameValue = nameInput.value.trim();
        if (nameValue.length < 2 || !/^[A-Za-z\s]+$/.test(nameValue)) {
            showError(nameError, 'Name must be at least 2 characters long and contain only letters');
            isValid = false;
        } else {
            hideError(nameError);
        }

        // Validate email (more comprehensive than HTML5 validation)
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(emailValue)) {
            showError(emailError, 'Please enter a valid email address');
            isValid = false;
        } else {
            hideError(emailError);
        }

        // If form is not valid, prevent submission
        if (!isValid) {
            e.preventDefault();
        } else {
            // You could add AJAX submission here
            console.log('Form is valid! Submitting...');
        }
    });

    // Real-time validation
    nameInput.addEventListener('input', function() {
        const nameValue = this.value.trim();
        if (nameValue.length < 2 || !/^[A-Za-z\s]+$/.test(nameValue)) {
            showError(nameError, 'Name must be at least 2 characters long and contain only letters');
        } else {
            hideError(nameError);
        }
    });

    emailInput.addEventListener('input', function() {
        const emailValue = this.value.trim();
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(emailValue)) {
            showError(emailError, 'Please enter a valid email address');
        } else {
            hideError(emailError);
        }
    });
});

function createErrorElement(id) {
    const error = document.createElement('div');
    error.id = id;
    error.className = 'error-message';
    error.style.display = 'none';
    return error;
}

function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

function hideError(element) {
    element.style.display = 'none';
}
