export default function FamilyDepositTracker() {
  const members = ["Arti", "Sujata", "Rekha", "Sangita"];
  const monthlyAmount = 1000;

  const currentMonth = new Date().toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  });

  const [payments, setPayments] = React.useState(() => {
    const saved = localStorage.getItem('family-payments');
    return saved ? JSON.parse(saved) : {};
  });

  React.useEffect(() => {
    localStorage.setItem('family-payments', JSON.stringify(payments));
  }, [payments]);

  const togglePayment = (name) => {
    setPayments(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const totalPaid = Object.values(payments).filter(Boolean).length * monthlyAmount;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-2">
          Family Monthly Deposit Tracker
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Month: {currentMonth}
        </p>

        <div className="space-y-4">
          {members.map(member => (
            <div
              key={member}
              className="flex justify-between items-center p-4 border rounded-2xl"
            >
              <div>
                <h2 className="font-semibold">{member}</h2>
                <p>Deposit: ₹{monthlyAmount}</p>
              </div>

              <button
                onClick={() => togglePayment(member)}
                className={`px-4 py-2 rounded-xl text-white ${
                  payments[member]
                    ? 'bg-green-600'
                    : 'bg-red-500'
                }`}
              >
                {payments[member] ? 'Deposited' : 'Pending'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-2xl bg-gray-50">
          <h2 className="font-bold">Summary</h2>
          <p>Total collected: ₹{totalPaid}</p>
          <p>Expected total: ₹{members.length * monthlyAmount}</p>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Note: For true sharing in WhatsApp where everyone sees updates live,
          connect this app to Firebase database and deploy on Vercel.
        </p>
      </div>
    </div>
  );
}

