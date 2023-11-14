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
import { useSelectedItems } from '../contexts/selectedItemsContext';


const colorList = ({ id, color }) => {
  console.log(id);
  console.log(color);
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      {id.map((item, index) => (
        <div key={index} style={{marginRight:'10px'}}>
        <span style={{ marginRight: '5px'}}> {item}</span>
        <div
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: color[index],
            display: 'inline-block',
          }}
        />
        </div>
      ))}
    </div>
  )

};
const Results = () => {
  const { currentMode } = useStateContext();
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
  
  const cost = datadb.flatMap(innerarray => innerarray.map(item => item.Cost));
  const cost_cum = datadb.flatMap(innerarray => innerarray.map(item => item.Cost_CUM));
  const energy = datadb.flatMap(innerarray => innerarray.map(item => item.Energy));
  const energy_cum = datadb.flatMap(innerarray => innerarray.map(item => item.Energy_CUM));

  const bordercolourbar =['#03C9D7', '#005563', '#A43D00','#FF8B42', '#B6ADF8', '#AB2B64'];

  const displaydata = selectedItems.map((selected,index) => ({
    selected,
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
  //const cost = datadb[0]  ? datadb[0][0].Cost : [];
  //const cost_cum = datadb[0]  ? datadb[0][0].Cost_CUM : [];
  //const energy = datadb[0]  ? datadb[0][0].Energy : [];
  //const energy_cum = datadb[0]  ? datadb[0][0].Energy_CUM : [];

  
  //end file
  const customLabels = Array.from({ length: 24 }, (_, index) => {
    const hour = Math.floor(index); // Assuming 4 data points per hour
    const formattedHour = String(hour).padStart(2, '0');
    return `${formattedHour}:00`;
  });


  //cost line

  var datasetValue_cost = [];

  for (var j = 0; j < cost.length; j++) {    
    datasetValue_cost[j] = 
        {
          backgroundColor: bordercolourbar[j],
          //strokeColor :'rgba(220,220,220,1)',
          borderColor: bordercolourbar[j],
          data : cost[j],
          fill:true,
          tension: 0.1,
          borderWidth: 3,
          pointRadius:0,

        } 
    }
  const chartData_cost = {
    labels:customLabels,
    datasets: datasetValue_cost
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
  var datasetValue_costcum = [];

  for (var j = 0; j < cost_cum.length; j++) {    
    datasetValue_costcum[j] = 
        {
        //fillColor: 'rgba(220,220,220,0.5)',
        //strokeColor :'rgba(220,220,220,1)',
        borderColor: bordercolourbar[j],
        title :'2013',
        data : cost_cum[j],
        tension: 0.1,
        borderWidth: 3,
        pointRadius:0,
        } 
    }
  const chartData_costcum = {
    labels:customLabels,
    datasets: datasetValue_costcum
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
  var datasetValue_energy = [];

  for (var j = 0; j < energy.length; j++) {    
    datasetValue_energy[j] = 
        {
          backgroundColor: bordercolourbar[j],
        //fillColor: 'rgba(220,220,220,0.5)',
        //strokeColor :'rgba(220,220,220,1)',
        borderColor: bordercolourbar[j],
        title :'2013',
        data : energy[j],
        tension: 0.1,
        borderWidth: 3,
        pointRadius:0,
        } 
    }
  const chartData_enery = {
    labels:customLabels,
    datasets: datasetValue_energy
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
  var datasetValue_energycum = [];

  for (var j = 0; j < energy_cum.length; j++) {    
    datasetValue_energycum[j] = 
        {
        //fillColor: 'rgba(220,220,220,0.5)',
        //strokeColor :'rgba(220,220,220,1)',
        borderColor: bordercolourbar[j],
        title :'2013',
        data : energy_cum[j],
        tension: 0.1,
        borderWidth: 3,
        pointRadius:0,
        } 
    }
  const chartData_energycum = {
    labels:cost_cum.map((_,index) => index),
    datasets:datasetValue_energycum
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
      <div className='flex flex-wrap justify-center mt-10 bg-white bg-center dark:text-gray-200 dark:bg-secondary-dark-bg p-6 m-3 rounded-2xl  w-900 items-center flex-center align-center'
      style={{ overflowX: 'auto'}}>
      <div  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      {selectedItems.map((item, index) => (
        <div key={index} style={{marginRight:'10px'}}>
        
        <div
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: bordercolourbar[index],
            display: 'inline-block',
          }}
        />
        <span style={{ marginRight: '5px'}}> {item}</span>
        </div>

      ))}
    </div>
    </div>
      
      <div className=" flex justify-center ">
        <div className="md:w-1/2 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-center">
            <p className="text-xl font-semibold">Network connection import/export (kWh)</p>
          </div>
          <div className="mt-10  justify-center flex flex-wrap ">
          <Bar data={chartData_enery} options={chartOptions_energy} background={currentMode === 'Dark' ? '#33373E' : '#fff'}/>
          </div>
        </div>
        <div className="md:w-1/2 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-center">
            <p className="text-xl font-semibold">Cummulative network connection import/export (MWh)</p>
          </div>
          <div className="mt-10  justify-center flex flex-wrap">
          <Line data={chartData_energycum} options={chartOptions_energycum} background={currentMode === 'Dark' ? '#33373E' : '#fff'}/>
            
          </div>
        </div>
      </div>

      <div className=" flex justify-center ">
        <div className="md:w-1/2 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-center">
            <p className="text-xl font-semibold">Energy cost per hour (£)</p>
          </div>
          <div className="mt-10  justify-center flex flex-wrap ">
          <Bar data={chartData_cost} options={chartOptions_cost} background={currentMode === 'Dark' ? '#33373E' : '#fff'}/>
          </div>
        </div>
        <div className="md:w-1/2 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-center">
            <p className="text-xl font-semibold">Cummulative energy cost (£)</p>
          </div>
          <div className="mt-10  justify-center flex flex-wrap">
          <Line data={chartData_costcum} options={chartOptions_costcum} />
            
          </div>
        </div>
      </div>

  </div>
  )
}


export default Results