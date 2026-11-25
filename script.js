document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailGroup = document.getElementById('emailGroup');
  const passwordGroup = document.getElementById('passwordGroup');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const togglePasswordBtn = document.getElementById('togglePasswordBtn');
  const eyeIcon = document.getElementById('eyeIcon');
  const eyeOffIcon = document.getElementById('eyeOffIcon');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnSpinner = submitBtn.querySelector('.btn-spinner');
  const statusMessage = document.getElementById('statusMessage');

  // Regex for basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /**
   * Toggle Password Visibility
   */
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      togglePasswordBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
      togglePasswordBtn.setAttribute('title', isPassword ? 'Hide password' : 'Show password');

      if (isPassword) {
        eyeIcon.style.display = 'none';
        eyeOffIcon.style.display = 'block';
      } else {
        eyeIcon.style.display = 'block';
        eyeOffIcon.style.display = 'none';
      }
    });
  }

  /**
   * Display status alert banner
   */
  function showStatusBanner(message, type = 'error') {
    statusMessage.textContent = message;
    statusMessage.className = `status-banner ${type}`;
    statusMessage.removeAttribute('hidden');
  }

  function hideStatusBanner() {
    statusMessage.textContent = '';
    statusMessage.className = 'status-banner';
    statusMessage.setAttribute('hidden', '');
  }

  /**
   * Set field error state
   */
  function setFieldError(group, errorSpan, message) {
    group.classList.add('has-error');
    errorSpan.textContent = message;
  }

  /**
   * Clear field error state
   */
  function clearFieldError(group, errorSpan) {
    group.classList.remove('has-error');
    errorSpan.textContent = '';
  }

  /**
   * Validate Email / Username field
   */
  function validateEmail() {
    const value = emailInput.value.trim();
    if (!value) {
      setFieldError(emailGroup, emailError, 'Email or username is required.');
      return false;
    }
    // If it includes '@', check email format
    if (value.includes('@') && !emailRegex.test(value)) {
      setFieldError(emailGroup, emailError, 'Please enter a valid email address.');
      return false;
    }
    clearFieldError(emailGroup, emailError);
    return true;
  }

  /**
   * Validate Password field
   */
  function validatePassword() {
    const value = passwordInput.value;
    if (!value) {
      setFieldError(passwordGroup, passwordError, 'Password is required.');
      return false;
    }
    if (value.length < 6) {
      setFieldError(passwordGroup, passwordError, 'Password must be at least 6 characters.');
      return false;
    }
    clearFieldError(passwordGroup, passwordError);
    return true;
  }

  // Clear errors on input
  emailInput.addEventListener('input', () => {
    if (emailGroup.classList.contains('has-error')) {
      validateEmail();
    }
    hideStatusBanner();
  });

  passwordInput.addEventListener('input', () => {
    if (passwordGroup.classList.contains('has-error')) {
      validatePassword();
    }
    hideStatusBanner();
  });

  /**
   * Form Submission Handler
   */
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    hideStatusBanner();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    // Set loading state
    submitBtn.disabled = true;
    btnText.textContent = 'Signing in...';
    btnSpinner.removeAttribute('hidden');

    // Simulate authentication API call
    setTimeout(() => {
      submitBtn.disabled = false;
      btnText.textContent = 'Sign In';
      btnSpinner.setAttribute('hidden', '');

      const emailVal = emailInput.value.trim();
      const passwordVal = passwordInput.value;

      // Mock check: demo credentials
      if (passwordVal === 'wrongpass') {
        showStatusBanner('Invalid email or password. Please try again.', 'error');
      } else {
        showStatusBanner(`Welcome back, ${emailVal}! You have successfully signed in.`, 'success');
        loginForm.reset();
      }
    }, 1000);
  });
});
