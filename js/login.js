const form = document.querySelector("form");
const emailField = document.querySelector(".email-field");
const emailError = document.querySelector(".email-error");
const inputEmail = document.getElementById("inputEmail");
const passField = document.querySelector(".password-field");
const inputPass = document.getElementById("inputPassword");
const errorField = document.querySelector(".email-pass-field");
const emailPassError = document.querySelector(".email-pass-error");
const forgePass = document.querySelector(".forget__pass");

window.localStorage;

// Message Error
const invalidEmail = "Please enter a valid email";
const Incorrect = "Incorrect email or password";

// Email Validation
function checkEmail() {
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (inputEmail.value.match(emailPattern)) {
    emailField.classList.remove("invalid");
  } else {
    emailError.textContent = invalidEmail;
    emailField.classList.add("invalid");
  }
}
// Password Validation
function checkPass() {
  if (inputPass.value == "") {
    return passField.classList.add("invalid");
  }
  passField.classList.remove("invalid");
}

// check Email And Password In LocalStorage
function checkEmailAndPassInLocalStorage() {
  if (
    !emailField.classList.contains("invalid") &&
    !passField.classList.contains("invalid")
  ) {
    // check email in localStorage
    if (localStorage.getItem(inputEmail.value) === null) {
      emailPassError.textContent = Incorrect;
      errorField.classList.add("invalid");
    } else {
      // convert json to object
      let list = JSON.parse(localStorage.getItem(inputEmail.value));
      const encryptionKey = "encryptionKey123";
      let pass = decryptPassword(list.password, encryptionKey);
      if (pass != inputPass.value) {
        emailPassError.textContent = Incorrect;
        errorField.classList.add("invalid");
      } else {
        emailPassError.textContent = "";
        errorField.classList.remove("invalid");
      }
    }
    // let list = [{ email: inputEmail.value, password: inputPass.value }];
    // localStorage.setItem(inputEmail.value, JSON.stringify(list));
  }
}
// Calling Function on Form Submit
form.addEventListener("submit", (e) => {
  e.preventDefault(); //preventing form submitting
  checkEmail();
  checkPass();
  checkEmailAndPassInLocalStorage();
  //calling function on key up
  inputEmail.addEventListener("keyup", checkEmail);
  inputPass.addEventListener("keyup", checkPass);
  form.addEventListener("click", checkEmailAndPassInLocalStorage);

  if (
    !emailField.classList.contains("invalid") &&
    !passField.classList.contains("invalid") &&
    !errorField.classList.contains("invalid")
  ) {
    let list = JSON.parse(localStorage.getItem(inputEmail.value));
    let currentObj = { ...list };
    currentObj.status = "login";
    localStorage.setItem(inputEmail.value, JSON.stringify(currentObj));

    if (currentObj.submit == "submitted") {
      window.location.href = "../pages/report.html";
    } else if (currentObj.joinNow == "joined") {
      window.location.href = "../pages/registration_page.html";
    } else {
      location.href = form.getAttribute("action");
    }
  }
});

// Decrypt the password
function decryptPassword(encryptedPassword, encryptionKey) {
  const decryptedData = sjcl.decrypt(encryptionKey, encryptedPassword);
  return decryptedData;
}

forgePass.addEventListener("click", function () {
  window.location.href = "../pages/forget_password.html";
});

// Get the current date and time

// Calculate the time difference in milliseconds
const getEmail = window.sessionStorage.getItem("emailRest");
let data = JSON.parse(localStorage.getItem(getEmail));
var date1 = new Date(data.changePassDate);
var date2 = new Date(); // Assuming current date and time

// Calculate the time difference in milliseconds
var timeDifference = Math.abs(date2 - date1);

// Calculate the number of days
var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

// Calculate the number of hours
var hours = Math.floor(
  (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
);

// Calculate the number of minutes
var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

console.log(
  "Difference: " + days + " days, " + hours + " hours, " + minutes + " minutes"
);
