// -------------------------------------------------------------------------------------

// function validateAndSubmit() {
//     let isValid = true;
//     const submitButton = document.getElementById("submitButton");

//     // Name Validation
//     const name = document.getElementById("name").value;
//     const nameError = document.getElementById("nameError");
//     if (name === "") {
//         nameError.textContent = "Name is required";
//         isValid = false;
//     } else if (name.length < 4) {
//         nameError.textContent = "Name must be at least 4 characters long";
//         isValid = false;
//     } else {
//         nameError.textContent = "";
//     }

//     // Email Validation
//     const email = document.getElementById("email").value;
//     const emailError = document.getElementById("emailError");
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (email === "") {
//         emailError.textContent = "Email is required";
//         isValid = false;
//     } else if (!emailPattern.test(email)) {
//         emailError.textContent = "Invalid email format";
//         isValid = false;
//     } else {
//         emailError.textContent = "";
//     }

//     // Mobile Validation (minimum 10 digits)
//     const mobile = document.getElementById("mobile").value;
//     const mobileError = document.getElementById("mobileError");
//     const mobilePattern = /^[0-9]{10,}$/; // Minimum 10 digits
//     if (mobile === "") {
//         mobileError.textContent = "Mobile number is required";
//         isValid = false;
//     } else if (!mobilePattern.test(mobile)) {
//         mobileError.textContent = "Mobile number must be at least 10 digits";
//         isValid = false;
//     } else {
//         mobileError.textContent = "";
//     }

//     // Message Validation
//     const message = document.getElementById("message").value;
//     const messageError = document.getElementById("messageError");
//     if (message === "") {
//         messageError.textContent = "Message is required";
//         isValid = false;
//     } else if (message.length < 15) {
//         messageError.textContent = "Message must be at least 15 characters long";
//         isValid = false;
//     } else {
//         messageError.textContent = "";
//     }

//     // If all inputs are valid, start button animation and send the form data
//     if (isValid) {
//         startButtonAnimation(submitButton);  // Start animation
//         SendMail();  // Trigger mail sending
//     }
// }

// // Start loading animation inside the submit button
// function startButtonAnimation(button) {
//     button.disabled = true;  // Disable the button to prevent multiple submissions
//     button.innerHTML = '<span class="spinner"></span> &#10240; Sending...';  // Add a spinner or loading text
// }

// // Stop animation and show success/error based on the outcome
// function stopButtonAnimation(button, success) {
//     if (success) {
//         button.innerHTML = '✔️ Success';  // Show success icon and text
//         button.style.backgroundColor = "#28a745";  // Change button color to green
//     } else {
//         button.innerHTML = '❌ Error';  // Show error icon and text
//         button.style.backgroundColor = "#dc3545";  // Change button color to red
//     }
//     setTimeout(function() {
//         button.disabled = false;  // Re-enable the button after a delay
//         button.innerHTML = 'Submit';  // Reset the button text
//         button.style.backgroundColor = "";  // Reset button color
//     }, 2000);  // Delay before resetting
// }

// Send email using EmailJS and trigger SweetAlert
// function SendMail() {
//   var contform = {
//     name: document.getElementById("name").value,
//     email: document.getElementById("email").value,
//     mobile: document.getElementById("mobile").value,
//     message: document.getElementById("message").value
//   };

//   emailjs.send("service_yvmy5ui", "template_bz3qs6s", contform).then(function (res) {
//     swal("Success!", "Form submitted and email sent successfully.", "success");
//     stopButtonAnimation(document.getElementById("submitButton"), true);  // Success animation
//     clearFields(); // Clear fields after success
//   }, function (error) {
//     swal("Error!", "Failed to send the form. Please try again.", "error");
//     stopButtonAnimation(document.getElementById("submitButton"), false);  // Error animation
//   });
// }

// // Clear form fields
// function clearFields() {
//   document.getElementById("name").value = "";
//   document.getElementById("email").value = "";
//   document.getElementById("mobile").value = "";
//   document.getElementById("message").value = "";
// }

function validateAndSubmit() {
  let isValid = true;

  // Name Validation
  const name = document.getElementById("name").value;
  const nameError = document.getElementById("nameError");
  if (name === "") {
    nameError.textContent = "Name is required";
    isValid = false;
  } else if (name.length < 4) {
    nameError.textContent = "Name must be at least 4 characters long";
    // document.getElementById("name").style.border="2px solid red";
    isValid = false;
  } else {
    nameError.textContent = "";
  }

  // Email Validation
  const email = document.getElementById("email").value;
  const emailError = document.getElementById("emailError");
  // More comprehensive regex for email validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (email === "") {
    emailError.textContent = "Email is required";
    isValid = false;
  } else if (!emailPattern.test(email)) {
    emailError.textContent = "Invalid email format";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  // ------------------------------------------------------------

  // Mobile Input Field - Restricting input to digits only (0-9), essential keys, and max 12 digits
  document.getElementById("mobile").addEventListener("keydown", function (e) {
    const mobileInput = e.target;
    // Allow only number keys (0-9), Backspace, Tab, Delete, and Arrow keys
    if (
      (e.key >= "0" && e.key <= "9") || // Allow numbers 0-9
      e.key === "Backspace" || // Allow backspace
      e.key === "Tab" || // Allow tab
      e.key === "Delete" || // Allow delete
      e.key === "ArrowLeft" || // Allow left arrow
      e.key === "ArrowRight" || // Allow right arrow
      e.key === "ArrowUp" || // Allow up arrow
      e.key === "ArrowDown" // Allow down arrow
    ) {
      // Check if input already has 12 digits and prevent more input
      if (mobileInput.value.length >= 12 && e.key >= "0" && e.key <= "9") {
        e.preventDefault();
      }
    } else {
      // Prevent default action for all other keys
      e.preventDefault();
    }
  });

  // Mobile Input Field - Restrict non-numeric input and limit length to 12 digits
  document.getElementById("mobile").addEventListener("input", function (e) {
    const mobileInput = e.target;

    // Replace any non-numeric characters immediately (if pasted or typed incorrectly)
    mobileInput.value = mobileInput.value.replace(/\D/g, "");

    // Limit the value to 12 digits max
    if (mobileInput.value.length > 12) {
      mobileInput.value = mobileInput.value.slice(0, 12);
    }
  });

  // Mobile Validation (minimum 10 digits, maximum 12 digits)
  const mobile = document.getElementById("mobile").value;
  const mobileError = document.getElementById("mobileError");
  // Regex allows only numbers, between 10 and 12 digits
  const mobilePattern = /^[0-9]{10,12}$/;

  if (mobile === "") {
    mobileError.textContent = "Mobile number is required";
    isValid = false;
  } else if (!mobilePattern.test(mobile)) {
    mobileError.textContent = "Mobile number must be between 10 and 12 digits";
    isValid = false;
  } else {
    mobileError.textContent = "";
  }

  // Message Validation
  const message = document.getElementById("message").value;
  const messageError = document.getElementById("messageError");
  if (message === "") {
    messageError.textContent = "Message is required";
    isValid = false;
  } else if (message.length < 15) {
    messageError.textContent = "Message must be at least 15 characters long";
    isValid = false;
  } else {
    messageError.textContent = "";
  }

  // If all inputs are valid, send the form data and show SweetAlert success message
  if (isValid) {
    showSpinner(); // Show spinner animation
    SendMail(); // Trigger mail sending
  }
}

// Show spinner inside the submit button
function showSpinner() {
  const submitButton = document.getElementById("submitButton");
  submitButton.disabled = true; // Disable the button while processing
  submitButton.innerHTML = `<div class="spinner"></div> &#10240; Sending...`;
}

// Hide spinner and display success or error message inside the submit button
function hideSpinner(isSuccess) {
  const submitButton = document.getElementById("submitButton");
  if (isSuccess) {
    submitButton.innerHTML = `✔️ Success!`;
    submitButton.style.backgroundColor = "green"; // Change button color to indicate success
  } else {
    submitButton.innerHTML = `❌ Error! Try Again`;
    submitButton.style.backgroundColor = "red"; // Change button color to indicate error
  }
  setTimeout(() => {
    resetButton(); // Reset the button after 3 seconds
  }, 3000);
}

// Reset the submit button to its original state
function resetButton() {
  const submitButton = document.getElementById("submitButton");
  submitButton.disabled = false;
  submitButton.innerHTML = `Submit`;
  submitButton.style.backgroundColor = ""; // Reset button color
}

// Send email using EmailJS and trigger SweetAlert
function SendMail() {
  var contform = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    mobile: document.getElementById("mobile").value,
    message: document.getElementById("message").value,
  };

  emailjs.send("service_yvmy5ui", "template_bz3qs6s", contform).then(
    function (res) {
      swal("Success!", "Form Submitted and Sent Successfully", "success");
      hideSpinner(true); // Success, stop spinner and show success
      clearFields(); // Clear fields after success
    },
    function (error) {
      swal("Error!", "Failed to Send the Form. Please Try Again.", "error", {
        dangerMode: true,
      });
      hideSpinner(false); // Error, stop spinner and show error
    }
  );
}

// Clear form fields
function clearFields() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("mobile").value = "";
  document.getElementById("message").value = "";
}


