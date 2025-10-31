localStorage.setItem(
  "customerInfo",
  JSON.stringify({
    name: "Jane Tester",
    email: "jane@example.com",
  })
);

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
      event.preventDefault();
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

  phoneInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      savePhoneNumber();
    }
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const addressInput = document.getElementById("addressInput");

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

// Display items in cart
function displayCartItems() {
  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = "";

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");

    itemElement.innerHTML = `
      <h3>${item.name}</h3>
      <p>Price: $${parseFloat(item.price).toFixed(2)}</p>
      <input type="number" value="${item.quantity}" class="quantity" data-id="${
      item.id
    }" />
      <button class="remove-item" data-id="${item.id}">Remove</button>
    `;

    cartContainer.appendChild(itemElement);
  });

  updateTotalPrice();
}

displayCartItems();

// Adjust quantity
document.getElementById("cart-items").addEventListener("change", (event) => {
  if (event.target.classList.contains("quantity")) {
    const itemId = event.target.getAttribute("data-id");
    const newQuantity = parseInt(event.target.value);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find((item) => item.id === itemId);
    if (item) {
      item.quantity = newQuantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCartItems();
    }
  }
});

// Remove item from cart
document.getElementById("cart-items").addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-item")) {
    const itemId = event.target.getAttribute("data-id");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = cart.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      cart.splice(index, 1); // Remove the item from the array

      localStorage.setItem("cart", JSON.stringify(cart));

      displayCartItems();
      updateTotalPrice();
    }
  }
});

// Update total price
const updateTotalPrice = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.textContent = `Total: ${totalPrice.toFixed(2)}`;
};

updateTotalPrice();

function PlaceOrder() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const name = localStorage.getItem("firstName");
  const phone = localStorage.getItem("phoneNumber");
  const address = localStorage.getItem("address");

  if (cart.length === 0) {
    alert(
      "Your cart is empty. Please add some items before placing your order."
    );
    return;
  }

  if (!name || !phone || !address) {
    alert(
      "Please complete your customer information before placing your order."
    );
    return;
  }

  alert(`Thanks, ${name}! Your order has been placed successfully.`);
}
