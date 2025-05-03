/** @format */
let usersData = JSON.parse(localStorage.getItem("usersData")) || [];

function addUserData(e) {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirm").value;
  let errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = "";

  if (name.trim() === "") {
    errorMessage.textContent = "Name is required.";
    return false;
  }
  if (password.length < 8) {
    errorMessage.textContent = "Password must be at least 8 characters long.";
    return false;
  }
  if (password !== confirmPassword) {
    errorMessage.textContent = "Passwords do not match.";
    return false;
  }
  let userData = {
    Name: name,
    Email: email,
    Password: password,
  };

  let emailExists = usersData.some(function (user) {
    return user.Email === email;
  });

  if (emailExists) {
    swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: "Email already exists",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    });
    return false;
  } else {
    usersData.push(userData);
    localStorage.setItem("usersData", JSON.stringify(usersData));
    swal
      .fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Registration successful",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      })
      .then(() => {
        window.location.href = "quiz.html";
      });
  }
}

function loginData(event) {
  event.preventDefault();
  const password = document.getElementById("Password").value;
  const email = document.getElementById("email").value;

  const check = usersData.find(
    (user) => user.Email === email && user.Password === password
  );

  if (check) {
    swal
      .fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Login successful",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      })
      .then(() => {
        window.location.href = "quiz.html";
      });
  } else {
    swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: "Login Failed",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", loginData);
  }

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", addUserData);
  }
});
