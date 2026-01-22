import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  orderBy,
  query
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const ordersDiv = document.getElementById("orders");

async function loadOrders() {
  ordersDiv.innerHTML = "";

  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  let hasOrders = false;

  snapshot.forEach((d) => {
    const o = d.data();

    // ❌ HIDE PICKED UP ORDERS
    if (o.status === "PickedUp") return;

    hasOrders = true;

    const items = o.items.map(i => `${i.name} × ${i.qty}`).join(", ");

    ordersDiv.innerHTML += `
      <div class="order-card">
        <p><b>${o.name}</b></p>
        <p>${items}</p>
        <p>Total: ₹${o.totalAmount}</p>
        <p>Status: ${o.status}</p>

        <button onclick="updateStatus('${d.id}', 'Ready')">✅ Ready</button>
        <button onclick="updateStatus('${d.id}', 'Delayed')">⏰ Delayed</button>
        <button onclick="updateStatus('${d.id}', 'PickedUp')">📦 Picked Up</button>
      </div>
    `;
  });

  if (!hasOrders) {
    ordersDiv.innerHTML = "<p>🎉 No active orders</p>";
  }
}

window.updateStatus = async (id, status) => {
  await updateDoc(doc(db, "orders", id), { status });
  loadOrders();
};

loadOrders();
