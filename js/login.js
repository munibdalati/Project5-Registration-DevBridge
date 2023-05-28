const form = document.querySelector("form");
const emailField = document.querySelector(".email-field");
const emailError = document.querySelector(".email-error");
const inputEmail = document.getElementById("inputEmail");
const passField = document.querySelector(".password-field");
const inputPass = document.getElementById("inputPassword");
const errorField = document.querySelector(".email-pass-field");
const emailPassError = document.querySelector(".email-pass-error");

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
      let list = JSON.parse(localStorage.getItem(inputEmail.value));
      if (list.password != inputPass.value) {
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

// btnSignOut.addEventListener("click", function () {
//   let list = JSON.parse(localStorage.getItem(email));
//   let currentObj = { ...list };
//   currentObj.status = "logout";
//   console.log(currentObj);
//   localStorage.setItem(email, JSON.stringify(currentObj));
//   // console.log(list.status);
//   // localStorage.setItem(email, JSON.stringify(list));
//   window.location.reload;
//   btnSignIn.style.display = "block";
//   btnSignUp.style.display = "block";
//   btnSignOut.classList.add("d-none");
// });

// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   if (localStorage.getItem(inputEmail.value) === null) {
//     let arr = [{ email: inputEmail.value, password: inputPass.value }];
//     localStorage.setItem(inputEmail.value, JSON.stringify(arr));
//     console.log(localStorage.getItem(inputEmail.value));

//     const newArr1 = arr.map((v) => ({ ...v, isActive: true }));
//     localStorage.setItem(inputEmail.value, JSON.stringify(newArr1));
//     console.log(localStorage.getItem(inputEmail.value));
//     // console.log(JSON.parse(localStorage.getItem(inputEmail.value)));
//   } else {
//     // alert("user ");
//   }
// });

// let list = JSON.parse(localStorage.getItem(inputEmail.value));
// console.log(list[0].password);

// check email in localStorage

// if (localStorage.getItem(inputEmail.value) === null) {
//   errorField.textContent = notExistEmail;
//   passField.classList.add("invalid");
// } else {
//   passField.classList.remove("invalid");
// }
