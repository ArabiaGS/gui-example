import React, { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { DataContext } from './../contexts/DataContext'; 
//get the names of files in cards tipe and display them and then allow the user to select the name that the user wants
export function Upload({ children }) {
  const [files, setFiles] = useState("");

  const { setData } = useContext(DataContext);



  const handleChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        const jsonData = JSON.parse(e.target.result);
        setData(jsonData);
      };
      reader.readAsText(file);
    }
  };
  return (
    <div className="mt-12 ">
    <div className='flex flex-wrap justify-center'>
      <h1 className='font-bold text-3xl'>Upload your file</h1>
    </div>
      <div className='justify-center flex flex-wrap mt-10'>
      <input type="file" accept='.json' onChange={handleChange} />
      <br />
      </div>

    </div>
  );
}
//      {"uploaded file content -- " + files}

export default Upload