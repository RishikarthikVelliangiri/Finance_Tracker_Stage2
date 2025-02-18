// components/TransactionForm.tsx
import { useState, FormEvent } from 'react';
import styles from './TransactionForm.module.css';

interface TransactionFormProps {
  onTransactionAdded: (transaction: any) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onTransactionAdded }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!amount || !date || !description || !category) {
      setError('All fields are required.');
      return;
    }
    setError('');
    const transaction = {
      amount: parseFloat(amount),
      date,
      description,
      category
    };

    await onTransactionAdded(transaction);
    // Clear fields
    setAmount('');
    setDate('');
    setDescription('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      {error && <p className={styles.error}>{error}</p>}
      <label className={styles.label}>Amount:</label>
      <input
        type="number"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className={styles.inputField}
      />
      <label className={styles.label}>Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={styles.inputField}
      />
      <label className={styles.label}>Description:</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description"
        className={styles.inputField}
      />
      <label className={styles.label}>Category:</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={styles.inputField}
      >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Transportation">Transportation</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Utilities">Utilities</option>
        <option value="Others">Others</option>
      </select>
      <button type="submit" className={styles.button}>Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
