import { useState, useEffect } from "react";

export default function Home() {
  const members = ["Arti", "Sujata", "Rekha", "Sangita"];
  const monthlyAmount = 1000;

  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const [payments, setPayments] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("family-payments");
    if (saved) {
      setPayments(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "family-payments",
      JSON.stringify(payments)
    );
  }, [payments]);

  const togglePayment = (name) => {
    setPayments((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const totalPaid =
    Object.values(payments).filter(Boolean).length *
    monthlyAmount;

  return (
    <div style={{ padding: 20 }}>
      <h1>Family Monthly Deposit Tracker</h1>
      <h3>{currentMonth}</h3>

      {members.map((member) => (
        <div
          key={member}
          style={{
            border: "1px solid gray",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <h3>{member}</h3>
          <p>Deposit: ₹1000</p>

          <button
            onClick={() => togglePayment(member)}
          >
            {payments[member]
              ? "Deposited"
              : "Pending"}
          </button>
        </div>
      ))}

      <hr />

      <h2>Total: ₹{totalPaid}</h2>
      <p>
        Expected: ₹
        {members.length * monthlyAmount}
      </p>
    </div>
  );
}
