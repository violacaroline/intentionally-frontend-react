import { Pie } from 'react-chartjs-2'
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export const data = {
  labels: ['Joy', 'Fear', 'Sadness', 'Anger', 'Disgust'],
  datasets: [
    {
      data: [4,7,10,2,6],
      backgroundColor: [
        'rgba(255, 206, 86, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 206, 86, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 0.9,
    },
  ],
}

const Chart = ({ chartData }) => {
  const pieOptions = {
    plugins: {
      legend: {       
        align: 'center',
        display: true,
        labels: {
          padding: 10,
          font: {
            size: 12,
            family: 'Domine',
          },
        },
      },
    },
  }

    return (
      <div className="chart">
        <Pie className="pie-chart" data={data} options={pieOptions}/>
      </div>
    )
  }
 
export default Chart