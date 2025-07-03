import React from 'react';
import { Bar } from 'react-chartjs-2';
import { BarElement, CategoryScale, LinearScale, Chart,  Tooltip, Legend } from 'chart.js';

Chart.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

const GraphCard = () => {
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
    datasets: [
      {
        label: 'Cerveza',
      data: [10, 10, 20, 40],
      borderColor: 'rgb(255, 99, 132)', // Color del borde
      backgroundColor: 'rgba(255, 99, 132, 0.2)', // Color de fondo con transparencia
    },
    {
        label: 'Coca Cola',
      data: [5, 15, 10, 30],
      backgroundColor: 'rgba(255, 99, 132, 0.2)', // Color de fondo con transparencia

    }
    ]
  }

  const options = {
    
  };

  return (
    <Bar data={data} options={options} />
  );
};

export default GraphCard;
