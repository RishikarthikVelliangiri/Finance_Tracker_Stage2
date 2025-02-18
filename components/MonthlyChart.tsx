// components/MonthlyChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import styles from './MonthlyChart.module.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface MonthlyChartProps {
  data: { month: string; total: number }[];
}

const MonthlyChart: React.FC<MonthlyChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Total Expenses',
        data: data.map(item => item.total),
        backgroundColor: '#4f46e5'
      }
    ]
  };

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.chartTitle}>Monthly Expenses</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default MonthlyChart;
