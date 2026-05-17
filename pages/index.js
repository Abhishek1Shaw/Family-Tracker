import { useState, useEffect } from "react";
import { db } from "../firebase";

import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function Home() {
  const members = ["Arti", "Sujata", "Rekha", "Sangita"];
  const monthlyAmount = 1000;

  const [payments, setPayments] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const docRef = doc(db, "payments", "family");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setPayments(docSnap.data());
    }
  }

  async function togglePayment(name) {
    const updated = {
      ...payments,
      [name]: !payments[name],
    };

    setPayments(updated);

    await updateDoc(
      doc(db, "payments", "family"),
      updated
    );
  }

  const totalPaid =
    Object.values(payments).filter(Boolean).length *
    monthlyAmount;

  return (
    <div style={{ padding: 20 }}>
      <h1>Family Monthly Deposit Tracker</h1>

      {members.map((member) => (
        <div
          key={member}
          style={{
            border: "1px solid gray",
            padding: 10,
            marginBottom: 10,
            borderRadius: 10,
          }}
        >
          <h3>{member}</h3>
          <p>Deposit: ₹1000</p>

          <button
            onClick={() =>
              togglePayment(member)
            }
          >
            {payments[member]
              ? "Deposited ✅"
              : "Pending"}
          </button>
        </div>
      ))}

      <hr />

      <h2>Total ₹{totalPaid}</h2>
      <p>
        Expected ₹
        {members.length * monthlyAmount}
      </p>
    </div>
  );
}
