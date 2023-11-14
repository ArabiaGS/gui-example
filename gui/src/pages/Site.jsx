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
import { useSelectedItems } from '../contexts/selectedItemsContext';

const Site = () => {
  const { currentColor, currentMode } = useStateContext();
  //new
  const [datadb, setDatadb] = useState([]);
  //const {simId} = useParams();
  const {data} = useContext(DataContext);

  //multi
  const {selectedItems } = useSelectedItems();
  console.log(' This are the items previously selected '+selectedItems);
  //end multiselection
  //

  useEffect(() => {
    fetchData();
    
  }, []);
  const fetchData = async () => {
    try {
      const itemIds = selectedItems; // Assuming data is an array of item IDs
      const itemDataPromises = itemIds.map(async (id) => {
        const response = await axios.get(`/api/${id}`);
        return response.data;
      });
  
      const itemData = await Promise.all(itemDataPromises);
  
      // itemData is now an array of information associated with each ID
      console.log('Item Data:', itemData);
      setDatadb(itemData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log(datadb);
  const n_ch = datadb.flatMap(innerarray => innerarray.map(item => item.N_CH));
  const tariff = datadb.flatMap(innerarray => innerarray.map(item => item.Tariff));
  const site_load = datadb.flatMap(innerarray => innerarray.map(item => item.P_Site));
  const p_pv = datadb.flatMap(innerarray => innerarray.map(item => item.P_PV));
  const p_ess = datadb.flatMap(innerarray => innerarray.map(item => item.P_ESS));

  const bordercolourbar =['#03C9D7', '#005563', '#A43D00','#FF8B42', '#B6ADF8', '#AB2B64'];
  //new
  const displaydata = selectedItems.map((selected,index) => ({
    selected,
    chargers:n_ch[index],
    color: bordercolourbar[index],


  }));
  const thStyle ={
    padding: '12px',
    textAlign: 'center',
    borderBottom:'1px solid #ddd',
  };
  const tdStyle ={
    padding: '10px',
    borderBottom:'1px solid #ddd',
  };

  //Tariff
  var datasetValue_tariff= [];

  for (var j = 0; j < tariff.length; j++) {    
    datasetValue_tariff[j] = 
        {
        //fillColor: 'rgba(220,220,220,0.5)',
        //strokeColor :'rgba(220,220,220,1)',
        borderColor: bordercolourbar[j],
        data : tariff[j],
        tension: 0.1,
        borderWidth: 3,
        pointRadius:0,
        } 
    }
  const customLabels = Array.from({ length: 240 }, (_, index) => {
    const hour = Math.floor(index / 10); // Assuming 10 data points per hour
    const minute = (index % 10) * 6; // 6 minutes interval
    const formattedHour = String(hour).padStart(2, '0');
    const formattedMinute = String(minute).padStart(2, '0');
    return `${formattedHour}:${formattedMinute}`;
  });

  const chartData_tariff = {
    labels: customLabels,
    datasets: datasetValue_tariff
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
  var datasetValue_p_site= [];

  for (var j = 0; j < site_load.length; j++) {    
    datasetValue_p_site[j] = 
        {
        //fillColor: 'rgba(220,220,220,0.5)',
        //strokeColor :'rgba(220,220,220,1)',
        borderColor: bordercolourbar[j],
        data : site_load[j],
        tension: 0.1,
        borderWidth: 3,
        pointRadius:0,
        } 
    }
  const chartData_site = {
    labels: customLabels,
    datasets: datasetValue_p_site
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
  var datasetValue_p_pv= [];

  for (var j = 0; j < p_pv.length; j++) {    
    datasetValue_p_pv[j] = 
        {
        //fillColor: 'rgba(220,220,220,0.5)',
        //strokeColor :'rgba(220,220,220,1)',
        borderColor: bordercolourbar[j],
        data : p_pv[j],
        tension: 0.1,
        borderWidth: 3,
        pointRadius:0,
        } 
    }
  const chartData_PV = {
    labels:customLabels,
    datasets: datasetValue_p_pv
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
  var datasetValue_p_ess= [];

  for (var j = 0; j < p_ess.length; j++) {    
    datasetValue_p_ess[j] = 
        {
        //fillColor: 'rgba(220,220,220,0.5)',
        //strokeColor :'rgba(220,220,220,1)',
        borderColor: bordercolourbar[j],
        data : p_ess[j],
        tension: 0.1,
        borderWidth: 3,
        pointRadius:0,
        } 
    }
  const chartData_ESS = {
    labels:customLabels,
    datasets: datasetValue_p_ess
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
      <div className='justify-center flex flex-wrap mt-10'>
        <div className="bg-white bg-center dark:text-gray-200 dark:bg-secondary-dark-bg p-6 m-3 rounded-2xl  w-900 items-center flex-center align-center justify-center">
          <table style={{ marging: 'auto', borderCollapse:'collapse'}}>
            <thead>
              <tr className="text-l cursor-pointer hover:drop-shadow-xl font-semibold rounded-lg w-1/4 bg-blue-200 py-0.5 px-2 text-gray-800 mt-10 ">
              <th style={thStyle}> </th>

                <th style={thStyle}>Sim ID</th>
                <th style={thStyle}>Number of charging stations </th>
              </tr>
            </thead>
            <tbody className='justify-centerNow'>
              {displaydata.map((row, index) => (
                <tr key={index} style={{textAlign: 'center', borderBottom: '1px solid #ddd'}}>
                  <td style={tdStyle}><div style={{
                    width:'20px',
                    height: '20px',
                    backgroundColor: row.color,
                  }}>
                    </div></td>
                  <td style={tdStyle}>{row.selected}</td>
                  <td style={tdStyle}>{row.chargers}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className=" flex justify-center ">
        <div className="md:w-1/2 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-center">
            <p className="text-xl font-semibold">Tariff profile (p/kWh)</p>
          </div>
          <div className="mt-10  justify-center flex flex-wrap ">
              <Line data={chartData_tariff} options={chartOptions_tariff}/>
          </div>
        </div>
        <div className="md:w-1/2 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-center">
            <p className="text-xl font-semibold">Site load profile (kW)</p>
          </div>
          <div className="mt-10  justify-center flex flex-wrap">
              <Line data={chartData_site} options={chartOptions_site} background={currentMode === 'Dark' ? '#33373E' : '#fff'}/>
          </div>
        </div>
      </div>

      <div className=" flex justify-center ">
        <div className="md:w-1/2 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-center">
            <p className="text-xl font-semibold">PV generation profile (kW)</p>
          </div>
          <div className="mt-10  justify-center flex flex-wrap ">
            <Line data={chartData_PV} options={chartOptions_PV} background={currentMode === 'Dark' ? '#33373E' : '#fff'}/>
          </div>
        </div>
        <div className="md:w-1/2 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-center">
            <p className="text-xl font-semibold">ESS power (kW)</p>
          </div>
          <div className="mt-10  justify-center flex flex-wrap">
            <Line data={chartData_ESS} options={chartOptions_ESS} background={currentMode === 'Dark' ? '#33373E' : '#fff'}/>
            
          </div>
        </div>
      </div>
     
  </div>
  )
}


export default Site