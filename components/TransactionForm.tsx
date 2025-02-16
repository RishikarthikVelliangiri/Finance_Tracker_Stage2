// components/TransactionForm.tsx
import { useState, FormEvent } from "react";

interface TransactionFormProps {
  onTransactionAdded: (transaction: any) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onTransactionAdded }) => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (!amount || !date || !description) {
      setError("All fields are required.");
      return;
    }
    setError("");

    const transaction = {
      amount: parseFloat(amount),
      date,
      description,
    };

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

      if (!res.ok) {
        throw new Error("Failed to add transaction.");
      }

      const data = await res.json();
      // Clear form fields after successful submission
      setAmount("");
      setDate("");
      setDescription("");
      onTransactionAdded(data);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Amount:</label>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
