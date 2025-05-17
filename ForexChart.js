import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const ForexChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
	const fetchData = async () => {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 6);

    const formatDate = (date) => date.toISOString().split('T')[0];
    const url = `https://api.frankfurter.app/${formatDate(startDate)}..${formatDate(endDate)}?from=EUR&to=USD`;

    const response = await axios.get(url);
    const rates = response.data.rates;

    const labels = Object.keys(rates).sort();
    const prices = labels.map(date => rates[date].USD);

    setChartData({
      labels,
      datasets: [
        {
          label: 'EUR/USD',
          data: prices,
          borderColor: '#ffffff',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          tension: 0.4,
        },
      ],
    });
  } catch (error) {
    console.error('Error fetching exchange data:', error);
  }
};

    fetchData();
  }, []);

  if (!chartData) return <p style={{ color: 'white' }}>Завантаження даних...</p>;

  return (
    <div style={{ width: '90%', maxWidth: '800px', margin: '0 auto', paddingTop: '50px' }}>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: 'white',
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: 'white',
              },
            },
            y: {
              ticks: {
                color: 'white',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default ForexChart;
