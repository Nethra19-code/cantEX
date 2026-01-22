import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let cart = [];

window.addToCart = function (name, price) {
  const item = cart.find(i => i.name === name);
  if (item) item.qty++;
  else cart.push({ name, price, qty: 1 });
  renderCart();
};

window.removeItem = function (i) {
  cart.splice(i, 1);
  renderCart();
};

function renderCart() {
  const body = document.getElementById("cartItems");
  const totalSpan = document.getElementById("totalAmount");
  body.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    body.innerHTML = `<tr><td colspan="4">No items</td></tr>`;
    totalSpan.textContent = "0";
    return;
  }

  cart.forEach((item, i) => {
    const amt = item.price * item.qty;
    total += amt;
    body.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>₹${amt}</td>
        <td><button onclick="removeItem(${i})">❌</button></td>
      </tr>`;
  });

  totalSpan.textContent = total;
}

window.placeOrder = async function () {
  const name = studentName.value;
  const time = pickupTime.value;
  const payment = paymentMethod.value;

  if (!name || !time || !payment || cart.length === 0) {
    alert("Fill all details");
    return;
  }

  const totalAmount = cart.reduce(
    (s, i) => s + i.price * i.qty, 0
  );

  await addDoc(collection(db, "orders"), {
    name,
    items: cart,
    totalAmount,
    pickupTime: time,
    payment,
    status: "Pending",
    createdAt: serverTimestamp()
  });

  alert("✅ Order placed");
  cart = [];
  renderCart();
};
