// components/TransactionList.tsx
import React from 'react';
import styles from './TransactionList.module.css';

interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  return (
    <div className={styles.listContainer}>
      {transactions.map((transaction) => (
        <div key={transaction.id} className={styles.transactionItem}>
          <div className={styles.transactionInfo}>
            <p><strong>{transaction.description}</strong></p>
            <p>₹{transaction.amount} - {transaction.date} ({transaction.category})</p>
          </div>
          <button className={styles.deleteButton} onClick={() => onDelete(transaction.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
