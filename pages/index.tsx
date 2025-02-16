// pages/index.tsx
import { useState, useEffect } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import MonthlyChart from "../components/MonthlyChart";

interface Transaction {
  _id: string;
  amount: number;
  date: string;
  description: string;
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [monthlyData, setMonthlyData] = useState<{ month: string; total: number }[]>([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    aggregateMonthlyData();
  }, [transactions]);

  // Fetch transactions from the API
  const fetchTransactions = async () => {
    try {
      const res = await fetch("/api/transactions");
      if (!res.ok) {
        throw new Error("Failed to fetch transactions.");
      }
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // Callback to update transactions when a new one is added
  const handleTransactionAdded = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  // Handle deleting a transaction (ensure your API supports DELETE requests)
  const handleDeleteTransaction = async (id: string) => {
    try {
      const res = await fetch(`/api/transactions?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete transaction.");
      }
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  // Aggregate transactions to get monthly totals
  const aggregateMonthlyData = () => {
    const monthTotals: { [key: string]: number } = {};

    transactions.forEach((transaction) => {
      const dateObj = new Date(transaction.date);
      const month = dateObj.toLocaleString("default", { month: "long" });
      const year = dateObj.getFullYear();
      const key = `${month} ${year}`;
      monthTotals[key] = (monthTotals[key] || 0) + transaction.amount;
    });

    const aggregated = Object.entries(monthTotals).map(([month, total]) => ({
      month,
      total,
    }));
    setMonthlyData(aggregated);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Personal Finance Visualizer</h1>
      <TransactionForm onTransactionAdded={handleTransactionAdded} />
      <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
      <h2>Monthly Expenses</h2>
      <MonthlyChart data={monthlyData} />
    </div>
  );
}
