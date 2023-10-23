import React from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Line } from "react-chartjs-2";

import { Stacked, Pie, Button, LineChartESS, LineChartTariff, LineChartPV, SparkLine, Header, LineChartData } from '../components';
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import product9 from '../data/product9.jpg';
import Table1 from '../components/Tables/Table1';
import { DataContext } from '../contexts/DataContext';
import { useContext } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Site = () => {
  const { currentColor, currentMode } = useStateContext();
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
  const n_ch = datadb[0] ? datadb[0].N_CH : [];
  const tariff = datadb[0] ? datadb[0].Tariff : [];
  const site_load = datadb[0] ? datadb[0].P_Site : [];
  const p_pv= datadb[0] ? datadb[0].P_PV : [];
  const p_ess= datadb[0] ? datadb[0].P_ESS : [];
  //new


  //Tariff
  const customLabels = Array.from({ length: 240 }, (_, index) => {
    const hour = Math.floor(index / 10); // Assuming 10 data points per hour
    const minute = (index % 10) * 6; // 6 minutes interval
    const formattedHour = String(hour).padStart(2, '0');
    const formattedMinute = String(minute).padStart(2, '0');
    return `${formattedHour}:${formattedMinute}`;
  });

  const chartData_tariff = {
    labels: customLabels,
    datasets: [
      {
        label: 'Tariff Data',
        data: tariff,
        borderColor: '#03C9D7',
        fill:false,
        tension: 0.1,
        borderWidth: 3,
        pointRadius:0,
      },
    ],
  };

  const chartOptions_tariff = {
    scales: {
      x: {
        title: {
          display: true, 
          text: 'Time [h]',            
        },
        type: 'category',
        labels: customLabels,
        position: 'bottom',
        beginAtZero: true,
        grid: {
          display: false, // hides lines in background
          drawBorder: false,
        },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          callback: function (value, index) {
            // Display only specific labels
            if (index % 60 === 0 || index === 239) {
              const hour = Math.floor(index / 10); // Assuming 10 data points per hour
              const minute = (index % 10) * 6; // 6 minutes interval
              const formattedHour = String(hour).padStart(2, '0');
              const formattedMinute = String(minute).padStart(2, '0');
              return `${formattedHour}:${formattedMinute}`;
            } else {
              return '';
            }
          },
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
                text: 'Tariff [pence/kWh]',
            },
        },
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };
  //end tariff


  //p_site line
  const chartData_site = {
    labels: customLabels,
    datasets: [
        {
            label:'',
            data: site_load,
            borderColor: '#03C9D7',
            fill:false,
            tension: 0.1,
            borderWidth: 3,
            pointRadius:0,
        },
    ],
  };
  const chartOptions_site = {
    scales: {
      x: {
        title: {
          display: true, 
          text: 'Time [h]',            
        },
        type: 'category',
        labels: customLabels,
        position: 'bottom',
        beginAtZero: true,
        grid: {
          display: false, // hides lines in background
          drawBorder: false,
        },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          callback: function (value, index) {
            // Display only specific labels
            if (index % 60 === 0 || index === 239) {
              const hour = Math.floor(index / 10); // Assuming 10 data points per hour
              const minute = (index % 10) * 6; // 6 minutes interval
              const formattedHour = String(hour).padStart(2, '0');
              const formattedMinute = String(minute).padStart(2, '0');
              return `${formattedHour}:${formattedMinute}`;
            } else {
              return '';
            }
          },
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
                  text: 'Site [kW]',
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
  //P_PV line
  const chartData_PV = {
    labels:customLabels,
    datasets: [
        {
            label:'PV',
            data: p_pv,
            borderColor: '#03C9D7',
            fill:false,
            tension: 0.1,
            borderWidth: 3,
            pointRadius:0,
        },
    ],
  };
  const chartOptions_PV = {
    scales: {
      x: {
        title: {
          display: true, 
          text: 'Time [h]',            
        },
        type: 'category',
        labels: customLabels,
        position: 'bottom',
        beginAtZero: true,
        grid: {
          display: false, // hides lines in background
          drawBorder: false,
        },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          callback: function (value, index) {
            // Display only specific labels
            if (index % 60 === 0 || index === 239) {
              const hour = Math.floor(index / 10); // Assuming 10 data points per hour
              const minute = (index % 10) * 6; // 6 minutes interval
              const formattedHour = String(hour).padStart(2, '0');
              const formattedMinute = String(minute).padStart(2, '0');
              return `${formattedHour}:${formattedMinute}`;
            } else {
              return '';
            }
          },
        },
      },
      y: {
        grid: {
          display: false, // hides lines in background
          drawBorder: false,
        },
            title: {
                display: true,
                text: 'PV [kW]',
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
  //P_ESS line
  const chartData_ESS = {
    labels:customLabels,
    datasets: [
        {
            label:'ESS',
            data: p_ess,
            borderColor: '#03C9D7',
            fill:false,
            tension: 0.1,
            borderWidth: 3,
            pointRadius:0,
        },
    ],
  };
  const chartOptions_ESS = {
    scales: {
      x: {
        title: {
          display: true, 
          text: 'Time [h]',            
        },
        type: 'category',
        labels: customLabels,
        position: 'bottom',
        beginAtZero: true,
        grid: {
          display: false, // hides lines in background
          drawBorder: false,
        },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          callback: function (value, index) {
            // Display only specific labels
            if (index % 60 === 0 || index === 239) {
              const hour = Math.floor(index / 10); // Assuming 10 data points per hour
              const minute = (index % 10) * 6; // 6 minutes interval
              const formattedHour = String(hour).padStart(2, '0');
              const formattedMinute = String(minute).padStart(2, '0');
              return `${formattedHour}:${formattedMinute}`;
            } else {
              return '';
            }
          },
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
                text: 'ESS [kW]',
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
        <h1 className='font-bold text-3xl '>Site Information</h1>
      </div>
      <div className="flex flex-wrap justify-center ">
        <div className=" mt-10 w-800 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className='flex justify-between'>
            <p className="text-xl font-semibold">Number of charging stations: {n_ch}</p>
          </div>       
          <div className="mt-1 ">
            <div className='text-s text-gray-500'>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center ">
        <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Tariff profile (p/kWh)</p>
          </div>
          <div className="mt-10 ">
            <div className="mt-4">
              <Line data={chartData_tariff} options={chartOptions_tariff}/>
            </div>
          </div>
        </div>
        <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Site load profile (kW)</p>
          </div>
          <div className="mt-10 ">
            <div className="mt-4">
              <Line data={chartData_site} options={chartOptions_site} background={currentMode === 'Dark' ? '#33373E' : '#fff'}/>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">PV generation profile (kW)</p>
          </div>
          <div className="mt-10 ">
            <div className="mt-4">
              <Line data={chartData_PV} options={chartOptions_PV} background={currentMode === 'Dark' ? '#33373E' : '#fff'}/>
            </div>
          </div>
        </div>
        <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">ESS power (kW)</p>
          </div>
          <div className="mt-10 ">
            <div className='mt-4'>
              <Line data={chartData_ESS} options={chartOptions_ESS} background={currentMode === 'Dark' ? '#33373E' : '#fff'}/>
            </div>
          </div>  
        </div>
    </div>
  </div>
  )
}


export default Site