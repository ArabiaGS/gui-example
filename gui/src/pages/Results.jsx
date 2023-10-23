import React from 'react'
//Network connection import/export (kWh)
//Cummulative network connection import/export (kWh)
//Energy cost per hour (£)
//Cummulative energy cost (£)
import { Line, Bar } from "react-chartjs-2";

import { LineChartEnergy, BarChartEnergy, LineChartCost, BarChartCost } from '../components';
import { DataContext } from '../contexts/DataContext';
import { useContext } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Results = () => {
  const { currentMode } = useStateContext();
    //new
    const [datadb, setDatadb] = useState([]);
    //const {simId} = useParams();
    const {data} = useContext(DataContext);
    useEffect(() => {
      fetchData();
      
  }, []);
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/${data}`);
        console.log('This is the response fromm axios:', response);
  
        console.log('This is the response data fromm axios:', response.data);
        setDatadb(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    console.log(datadb);
  
  
  const cost = datadb[0]  ? datadb[0] .Cost : [];
  const cost_cum = datadb[0]  ? datadb[0] .Cost_CUM : [];
  const energy = datadb[0]  ? datadb[0] .Energy : [];
  const energy_cum = datadb[0]  ? datadb[0] .Energy_CUM : [];

  
  //end file
  const customLabels = Array.from({ length: 24 }, (_, index) => {
    const hour = Math.floor(index); // Assuming 4 data points per hour
    const formattedHour = String(hour).padStart(2, '0');
    return `${formattedHour}:00`;
  });


  //cost line
  const chartData_cost = {
    labels:customLabels,
    datasets: [
        {
            label:'Cost',
            data: cost,
            borderColor: '#03C9D7',
            fill:false,
            tension: 0.1,
            borderWidth: 3,
            pointRadius:0,
        },
    ],
  };
  const chartOptions_cost = {
    scales: {
      x: {

        type: 'category',
        labels: customLabels,
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          callback: function (value, index) {
            // Display only specific labels
            if (index % 6 === 0 || index === 23) {
              const hour = Math.floor(index ); // Assuming 10 data points per hour
              const minute = '00'; // 6 minutes interval
              const formattedHour = String(hour).padStart(2, '0');
              const formattedMinute = String(minute).padStart(2, '0');
              return `${formattedHour}:${formattedMinute}`;
            } else {
              return '';
            }
          },
        },
        beginAtZero: true,
        grid: {
          display: false, // hides lines in background
          drawBorder: false,
        },
        position: 'bottom',
          title: {
              display: true, 
              text: 'Time [h]',            
            
          },
      
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false, // hides lines in background
          drawBorder: false,
        },
            title: {
                display: true,
                text: 'Cost [£]',
            },
        },
    },      plugins: {
      legend: {
        display: false
      }
    }
  };
  //
  //cost line
  const chartData_costcum = {
    labels:customLabels,
    datasets: [
        {
            label:'Cummulative Cost',
            data: cost_cum,
            borderColor: '#03C9D7',
            fill:false,
            tension: 0.1,
            borderWidth: 3,
            pointRadius:1,
        },
    ],
  };
  const chartOptions_costcum = {
    scales: {
      x: {

        type: 'category',
        labels: customLabels,
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          callback: function (value, index) {
            // Display only specific labels
            if (index % 6 === 0 || index === 23) {
              const hour = Math.floor(index ); // Assuming 10 data points per hour
              const minute = '00'; // 6 minutes interval
              const formattedHour = String(hour).padStart(2, '0');
              const formattedMinute = String(minute).padStart(2, '0');
              return `${formattedHour}:${formattedMinute}`;
            } else {
              return '';
            }
          },
        },
        beginAtZero: true,
        grid: {
          display: false, // hides lines in background
          drawBorder: false,
        },
        position: 'bottom',
          title: {
              display: true, 
              text: 'Time [h]',            
            
          },
      
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false, // hides lines in background
          drawBorder: false,
        },
          title: {
              display: true,
              text: 'Cummulative Cost [£]',
          },
      },
  },
  plugins: {
    legend: {
      display: false
    }
  }
};
  //
  //energy line
  const chartData_enery = {
    labels:customLabels,
    datasets: [
        {
            label:'Energy',
            data: energy,
            borderColor: '#03C9D7',
            fill:false,
            tension: 0.1,
            borderWidth: 3,
            pointRadius:0,
        },
    ],
  };
  const chartOptions_energy = {
    scales: {
      x: {

        type: 'category',
        labels: customLabels,
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          callback: function (value, index) {
            // Display only specific labels
            if (index % 6 === 0 || index === 23) {
              const hour = Math.floor(index ); // Assuming 10 data points per hour
              const minute = '00'; // 6 minutes interval
              const formattedHour = String(hour).padStart(2, '0');
              const formattedMinute = String(minute).padStart(2, '0');
              return `${formattedHour}:${formattedMinute}`;
            } else {
              return '';
            }
          },
        },
        beginAtZero: true,
        grid: {
          display: false, // hides lines in background
          drawBorder: false,
        },
        position: 'bottom',
          title: {
              display: true, 
              text: 'Time [h]',            
            
          },
      
      },
        y: {
          beginAtZero: true,
          grid: {
            display: false, // hides lines in background
            drawBorder: false,
          },
            title: {
                display: true,
                text: 'Energy [kWh]',
            },
        },
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };
  //
  //energy line
  const chartData_energycum = {
    labels:cost_cum.map((_,index) => index),
    datasets: [
        {
            label:'Cummulative Energy',
            data: energy_cum,
            borderColor: '#03C9D7',
            fill:false,
            tension: 0.1,
            borderWidth: 3,
            pointRadius:1,
        },
    ],
  };
  const chartOptions_energycum = {
    scales: {
      x: {

        type: 'category',
        labels: customLabels,
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          callback: function (value, index) {
            // Display only specific labels
            if (index % 6 === 0 || index === 23) {
              const hour = Math.floor(index ); // Assuming 10 data points per hour
              const minute = '00'; // 6 minutes interval
              const formattedHour = String(hour).padStart(2, '0');
              const formattedMinute = String(minute).padStart(2, '0');
              return `${formattedHour}:${formattedMinute}`;
            } else {
              return '';
            }
          },
        },
        beginAtZero: true,
        grid: {
          display: false, // hides lines in background
          drawBorder: false,
        },
        position: 'bottom',
          title: {
              display: true, 
              text: 'Time [h]',            
            
          },
      
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false, // hides lines in background
          drawBorder: false,
        },
          title: {
              display: true,
              text: 'Cummulative Energy [MWh]',
          },
      },
  },
  plugins: {
    legend: {
      display: false
    }
  }
};
  //
  return (
    <div className="mt-12 ">
      <div className='flex flex-wrap justify-center'>
        <h1 className='font-bold text-3xl'>Operational Results</h1>
      </div>

      <div className="flex flex-wrap justify-center ">
        <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Network connection import/export (kWh)</p>
          </div>
          <div className="mt-10 ">
            <div className="mt-4">
              <Bar data={chartData_enery} options={chartOptions_energy} background={currentMode === 'Dark' ? '#33373E' : '#fff'}/>
            </div>
          </div>
        </div>
        <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Cummulative network connection import/export (MWh)</p>
          </div>
          <div className="mt-10 ">
            <div className="mt-4">
            <Line data={chartData_energycum} options={chartOptions_energycum} background={currentMode === 'Dark' ? '#33373E' : '#fff'}/>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Energy cost per hour (£)</p>
          </div>
          <div className="mt-10 ">
            <div className="mt-4">
              <Bar data={chartData_cost} options={chartOptions_cost} background={currentMode === 'Dark' ? '#33373E' : '#fff'}/>
            </div>
          </div>
        </div>
        <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Cummulative energy cost (£)</p>
          </div>
          <div className="mt-10 ">
            <div className='mt-4'>
            <Line data={chartData_costcum} options={chartOptions_costcum} />
            </div>
          </div>  
        </div>
    </div>
  </div>
  )
}


export default Results