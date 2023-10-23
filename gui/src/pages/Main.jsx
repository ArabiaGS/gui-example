import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DataContext } from '../contexts/DataContext';
import { useContext } from 'react';

const Main= () =>  {
  const [datadb, setDatadb] = useState([]);
  const [name, setname] = useState('')
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

  return (
    <div>
    {datadb && datadb.map((item, index) => (
      <div>
      <h2> Data for {item.SIM_ID}</h2>

      </div>
    ))}
    </div>

  )
}

export default Main

/*    <div>

        {datadb && (
          <div>
            <h2> Data for {data} </h2>
            <p>{datadb}</p>
            <pre>{datastring}</pre>
          </div>
        )}
    </div>*/