import React, {useState} from 'react'

const Card = ({ data }) => {
  const [selectedID, setSelectedID] = useState([]);
  const handleSelectionId = (id) => {
      setSelectedID([...selectedID, id]);
      console.log(id);
  };
  return (
    <div className='card'>
        <h2>{data.SIM_ID}</h2>
        <p>{data.persona}</p>
        <button onClick={()  => handleSelectionId(data.SIM_ID)}> Select</button>

    </div>
  )
}

export default Card;