// components/CategoryPieChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import styles from './CategoryPieChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

interface CategoryPieChartProps {
  data: { category: string; total: number }[];
}

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        data: data.map(item => item.total),
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4caf50', '#9966ff']
      }
    ]
  };

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.chartTitle}>Spending by Category</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default CategoryPieChart;
