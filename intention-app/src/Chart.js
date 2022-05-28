import { Pie } from 'react-chartjs-2'
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)


const Chart = ({ chartData }) => {
  const pieOptions = {
    plugins: {
      legend: {       
        align: 'center',
        display: true,
        position: 'left',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 25,
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
        <Pie className="pie-chart" data={chartData} options={pieOptions}/>
      </div>
    )
  }
 
export default Chart