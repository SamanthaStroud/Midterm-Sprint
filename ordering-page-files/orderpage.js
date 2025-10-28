const menuButton = document.getElementById("menubtn");
menuButton.addEventListener("click", function () {
  window.location.href = "../menu-page-files/menupage.html";
});

//
const homeButton = document.getElementById("homebtn");
homeButton.addEventListener("click", function () {
  window.location.href = "../main-page-files/index.html";
});

// Function to save the input value
function saveFirstName() {
  const input = document.getElementById("firstNameInput").value;
  if (input.trim() === "") {
    alert("Please enter your first name.");
    return;
  }
  localStorage.setItem("firstName", input);
  alert("First name saved successfully!");
}

// Save when Enter is pressed in the input field
document
  .getElementById("firstNameInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission or page reload
      saveFirstName();
    }
  });

window.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.getElementById("phoneNumberInput");
  const saveButton = document.getElementById("savePhoneButton");

  // validate phone number format (XXX-XXX-XXXX)
  function isValidPhoneNumber(number) {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(number);
  }

  // save phone number
  function savePhoneNumber() {
    const number = phoneInput.value.trim();

    if (!number) {
      alert("Please enter your phone number.");
      return;
    }

    if (!isValidPhoneNumber(number)) {
      alert("Invalid format. Please use XXX-XXX-XXXX.");
      return;
    }

    localStorage.setItem("phoneNumber", number);
    alert("Phone number saved successfully!");
  }

  // Attach savePhoneNumber to saveButton click event
  phoneInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      savePhoneNumber();
    }
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const addressInput = document.getElementById("addressInput");
  // ✅ Function to save address
  function saveAddress() {
    const address = addressInput.value.trim();

    if (!address) {
      alert("Please enter your address.");
      return;
    }

    localStorage.setItem("address", address);
    alert("Address saved successfully!");
  }

  addressInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      saveAddress();
    }
  });
});
