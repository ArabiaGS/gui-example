import React, { useContext, useState, useEffect } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Line, Bar } from "react-chartjs-2";
import { Stacked, Pie, Button, LineChartData, LineChartHGV, Table2, SparkLine, Header } from '../components';
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import product9 from '../data/product9.jpg';
import Table1 from '../components/Tables/Table1';
import { DataContext } from './../contexts/DataContext'; 
import axios from 'axios';

const FleetInfo = () => {
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

  
  const n_vehicles = datadb[0] ? datadb[0].N_VH : [];
  const w_vehicles = datadb[0] ? datadb[0].W_VH : [];
  const e_vehicles =datadb[0] ? datadb[0].E_VH : [];
  const d_vehicles = datadb[0] ? datadb[0].D_VH : [];
  const p_hgv = datadb[0] ? datadb[0].P_HGV : [];
  const persona = datadb[0] ? datadb[0].Persona : [];
  //new

  const customLabels = Array.from({ length: 240 }, (_, index) => {
    const hour = Math.floor(index / 10); // Assuming 10 data points per hour
    const minute = (index % 10) * 6; // 6 minutes interval
    const formattedHour = String(hour).padStart(2, '0');
    const formattedMinute = String(minute).padStart(2, '0');
    return `${formattedHour}:${formattedMinute}`;
  });

  //line chart
  const ChartData_HGV = {
    labels:customLabels,
    datasets: [
        {
            label:'HGV',
            data: p_hgv,
            borderColor: '#03C9D7',
            fill:false,
            tension: 0.1,
            borderWidth: 3,
            pointRadius:0,
        },
    ],
 
  };
  const chartOptions_HGV = {
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
                  text: 'HGV [MW]',
              },
          },
      },
      plugins: {
        legend: {
          display: false
        }
      }
      
  };
  //end line chart
  //barchart
  
  const chartData_DVH = {
    labels:  d_vehicles?.map((_,index) =>index+1),
    datasets: [
        {
            label:'Vehicle distance (km) (individual vehicles)',
            data: d_vehicles,
            borderColor: '#03C9D7',
            fill:false,
            tension: 0.1,
            borderWidth: 3,
            pointRadius:0,
        },
    ],
  };
  const chartOptions_DVH = {
    scales: {
        x: {
            type: 'linear',
            position: 'bottom',
            beginAtZero: false,
            grid: {
              display: false, // hides lines in background
              drawBorder: false,
            },
            position: 'bottom',
              title: {
                  display: true, 
                  text: 'Vehicles',            
                
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
                text: 'Vehicle distance [km]',
            },
        },
        
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };
  

  return (
    <div className="mt-12 ">
      <div className='flex flex-wrap justify-center'>
        <h1 className='font-bold text-3xl'>Fleet Information</h1>
      </div>
      <div className='justify-center flex flex-wrap mt-10'>
        <div className="bg-white bg-center dark:text-gray-200 dark:bg-secondary-dark-bg p-6 m-3 rounded-2xl  w-800 items-center flex-center align-center justify-center">
              <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
              <p className="text-2xl font-semibold">Persona</p>
              </div>
              <p className="text-xl cursor-pointer hover:drop-shadow-xl font-semibold rounded-lg w-1/4 bg-blue-400 py-0.5 px-2 text-gray-200 mt-10">
          {persona}
          </p>
          <div>
            
          </div>
          <div className="flex justify-between border-b-1 border-color mt-6">
            
              <div className="pr-4 pb-2">
                <p className="text-s text-gray-500">Number of vehicles</p>
                <p className="text-sm">{n_vehicles}</p>
              </div>
              <div className="pr-4 pb-2">
                <p className="text-s text-gray-500">Vehicle weight</p>
                <p className="text-sm">{w_vehicles} tonnes</p>
              </div>
              <div className="pr-4 pb-2">
                <p className="text-s text-gray-500">Vehicle battery capacity </p>
                <p className="text-sm">{e_vehicles} kWh</p>
              </div>

            
            
          </div>
            </div>
      </div>
      <div className="flex flex-wrap justify-center ">

        <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Vehicle charging profile required power (MW) (total of all vehicles)</p>
          </div>
          <div className="md:w-full  items-center overflow-auto mt-10">
            <Line data={ChartData_HGV} options={chartOptions_HGV} background={currentMode === 'Dark' ? '#33373E' : '#fff'} />
        </div>

        </div>
        <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Vehicle distance (km) (individual vehicles)</p>
          </div>
          <div className="md:w-full  items-center overflow-auto mt-10">
            <Bar data={chartData_DVH} options={chartOptions_DVH} background={currentMode === 'Dark' ? '#33373E' : '#fff'} />
        </div>

        </div>
        
    </div>

    </div>
  )
}
  

export default FleetInfo 