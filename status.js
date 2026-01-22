import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  orderBy,
  query
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const statusDiv = document.getElementById("status");

async function loadStatus() {
  statusDiv.innerHTML = "";

  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  let hasActive = false;

  snapshot.forEach(doc => {
    const o = doc.data();

    // ❌ HIDE PICKED UP ORDERS
    if (o.status === "PickedUp") return;

    hasActive = true;

    const items = o.items.map(i => `${i.name} × ${i.qty}`).join(", ");

    statusDiv.innerHTML += `
      <div class="order-card">
        <p><b>${o.name}</b></p>
        <p>${items}</p>
        <p>Total: ₹${o.totalAmount}</p>
        <p>
          Status:
          <b style="color:${
            o.status === "Ready" ? "green" :
            o.status === "Delayed" ? "red" : "orange"
          }">
            ${o.status}
          </b>
        </p>
        ${
          o.status === "Ready"
          ? "<p>✅ Please collect your order</p>"
          : ""
        }
      </div>
    `;
  });

  if (!hasActive) {
    statusDiv.innerHTML = "<p>✅ No active orders</p>";
  }
}

loadStatus();
