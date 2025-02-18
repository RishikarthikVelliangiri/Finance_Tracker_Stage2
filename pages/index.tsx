// pages/index.tsx
import { useEffect, useState } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import MonthlyChart from '../components/MonthlyChart';
import CategoryPieChart from '../components/CategoryPieChart';
import styles from './index.module.css';

export default function Home() {
  const [transactions, setTransactions] = useState<any[]>([]);

  // Fetch transactions from the API
  const fetchTransactions = async () => {
    try {
      const res = await fetch('/api/transactions');
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const addTransaction = async (transaction: any) => {
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
      });
      const data = await res.json();
      setTransactions([...transactions, data]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await fetch(`/api/transactions?id=${id}`, { method: 'DELETE' });
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Aggregate monthly data
  const monthlyData = Object.values(transactions.reduce((acc, t) => {
    const date = new Date(t.date);
    const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    if (!acc[month]) acc[month] = { month, total: 0 };
    acc[month].total += t.amount;
    return acc;
  }, {} as Record<string, { month: string; total: number }>));

  // Aggregate category data
  const categoryData = Object.values(transactions.reduce((acc, t) => {
    if (!acc[t.category]) acc[t.category] = { category: t.category, total: 0 };
    acc[t.category].total += t.amount;
    return acc;
  }, {} as Record<string, { category: string; total: number }>));

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Expense Tracker</h1>
      <TransactionForm onTransactionAdded={addTransaction} />
      <TransactionList transactions={transactions} onDelete={deleteTransaction} />
      <MonthlyChart data={monthlyData} />
      <CategoryPieChart data={categoryData} />
    </div>
  );
}
