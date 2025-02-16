// components/TransactionList.tsx
import React from "react";

interface Transaction {
  _id: string;
  amount: number;
  date: string;
  description: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return <p>No transactions available.</p>;
  }

  return (
    <div>
      <h2>Transactions</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {transactions.map((transaction) => (
          <li key={transaction._id} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc", paddingBottom: "0.5rem" }}>
            <div>
              <strong>{transaction.description}</strong> - ${transaction.amount} on{" "}
              {new Date(transaction.date).toLocaleDateString()}
            </div>
            <button onClick={() => onDelete(transaction._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
