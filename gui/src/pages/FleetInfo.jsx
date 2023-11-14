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
import { useSelectedItems } from '../contexts/selectedItemsContext';

const FleetInfo = () => {
  const { currentColor, currentMode } = useStateContext();


  //multiselection
  const {selectedItems } = useSelectedItems();
  console.log(' This are the items previously selected '+selectedItems);
  //end multiselection
  //new
  const [datadb, setDatadb] = useState([]);
  //const {simId} = useParams();
  const {data} = useContext(DataContext);
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

  //construct the arrays for the data

  const n_vehicles = datadb.flatMap(innerarray => innerarray.map(item => item.N_VH));
  const w_vehicles = datadb.flatMap(innerarray => innerarray.map(item => item.W_VH));
  const e_vehicles =datadb.flatMap(innerarray => innerarray.map(item => item.E_VH));
  const d_vehicles = datadb.flatMap(innerarray => innerarray.map(item => item.D_VH));
  const p_hgv = datadb.flatMap(innerarray => innerarray.map(item => item.P_HGV));
  const persona = datadb.flatMap(innerarray => innerarray.map(item => item.Persona));

  console.log('n_vh: ' + n_vehicles);
  console.log('w_vh: ' + w_vehicles);
  console.log('e_vh: ' + e_vehicles);
  console.log('d_vh: ' + d_vehicles);
  console.log('p_hgv: ' + p_hgv);
  console.log('persona: ' + persona);
  const bordercolourbar =['#03C9D7', '#005563', '#A43D00','#FF8B42', '#B6ADF8', '#AB2B64'];


  //arrays constructed 

  const displaydata = selectedItems.map((selected,index) => ({
    selected,
    p:persona[index],
    n_vh: n_vehicles[index],
    w_vh: w_vehicles[index],
    e_vh: e_vehicles[index],
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

  //add custom labels to the graphs

  const customLabels = Array.from({ length: 240 }, (_, index) => {
    const hour = Math.floor(index / 10); // Assuming 10 data points per hour
    const minute = (index % 10) * 6; // 6 minutes interval
    const formattedHour = String(hour).padStart(2, '0');
    const formattedMinute = String(minute).padStart(2, '0');
    return `${formattedHour}:${formattedMinute}`;
  });

  //p_hgv work in progress

  var datasetValue_phgv = [];

  for (var j = 0; j < d_vehicles.length; j++) {    
    datasetValue_phgv[j] = 
        {
        borderColor: bordercolourbar[j],
        title :'2013',
        data : p_hgv[j],
        tension: 0.1,
        borderWidth: 3,
        pointRadius:0,
        }
    }


  //line chart
  const ChartData_HGV = {
    labels:customLabels,
    datasets: datasetValue_phgv
 
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
  console.log('d_vh2: ' + d_vehicles);
  var datasetValue_dvh = [];

  for (var j = 0; j < d_vehicles.length; j++) {    
    datasetValue_dvh[j] = 
        {
        backgroundColor: bordercolourbar[j],
        //strokeColor :'rgba(220,220,220,1)',
        borderColor: bordercolourbar[j],
        data : d_vehicles[j],
        fill:true,
        tension: 0.1,
        borderWidth: 3,
        pointRadius:0,
        }
    }
  const chartData_DVH = {
    labels:  d_vehicles[0]?.map((_,index) =>index+1),
    datasets: datasetValue_dvh

      /*
      [
        {
            label:'Vehicle distance (km) (individual vehicles)',
            data: d_vehicles[0],
            borderColor: '#03C9D7',
            fill:false,
            tension: 0.1,
            borderWidth: 3,
            pointRadius:0,
        },
        {
          label:'Vehicle distance (km) (individual vehicles)',
          data: d_vehicles[1],
          borderColor: '#03C8D7',
          fill:false,
          tension: 0.1,
          borderWidth: 3,
          pointRadius:0,
      },
      
    ], */
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
        <div className="bg-white bg-center dark:text-gray-200 dark:bg-secondary-dark-bg p-6 m-3 rounded-2xl  w-900 items-center flex-center align-center justify-center">
          <table style={{ marging: 'auto', borderCollapse:'collapse'}}>
            <thead>
              <tr className="text-l cursor-pointer hover:drop-shadow-xl font-semibold rounded-lg w-1/4 bg-blue-200 py-0.5 px-2 text-gray-800 mt-10 ">
                <th style={thStyle}> </th>
                <th style={thStyle}>Sim ID</th>
                <th style={thStyle}>Persona </th>
                <th style={thStyle}>Number of vehicles</th>
                <th style={thStyle}>Vehicle weight [tonnes]</th>
                <th style={thStyle}>Vehicle battery capacity [kWh]</th>
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
                  <td style={tdStyle}>{row.p}</td>
                  <td style={tdStyle}>{row.n_vh}</td>
                  <td style={tdStyle}>{row.w_vh}</td>
                  <td style={tdStyle}>{row.e_vh}</td>

                </tr>
              ))}
            </tbody>
          </table>
          
          
          

        </div>
      </div>

      <div className=" flex justify-center ">
        <div className="md:w-1/2 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-center">
            <p className="text-xl font-semibold">Vehicle charging profile required power (MW) (total of all vehicles)</p>
          </div>
          <div className="mt-10 justify-center flex">
            <Line data={ChartData_HGV} options={chartOptions_HGV} background={currentMode === 'Dark' ? '#33373E' : '#fff'} />
          </div>
        </div>
        <div className="md:w-1/2 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-center">
            <p className="text-xl font-semibold">Vehicle distance (km) (individual vehicles)</p>
            <p></p>
          </div>
          <div className="mt-10 justify-center flex flex-wrap">
            <Bar data={chartData_DVH} options={chartOptions_DVH} background={currentMode === 'Dark' ? '#33373E' : '#fff'} />
          </div>
        </div>
      </div>


    </div>
  )
}
  

export default FleetInfo 