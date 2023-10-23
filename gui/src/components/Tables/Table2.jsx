import React from 'react'
const data = [
    {
        'vehicle': '1',
        'type': 'A',
        'mileage': '326',
        'drive': '6.52',
        'break': '0.75',
    },
    {
        'vehicle': '2',
        'type': 'A',
        'mileage': '302',
        'drive': '6.04',
        'break': '0.75',
    },
    {
        'vehicle': '3',
        'type': 'A',
        'mileage': '364',
        'drive': '7.28',
        'break': '0.75',
    },
    {
        'vehicle': '4',
        'type': 'B',
        'mileage': '544',
        'drive': '10.9',
        'break': '1.5',
    },
    {
        'vehicle': '5',
        'type': 'C',
        'mileage': '322',
        'drive': '6.44',
        'break': '0.75',
    },
    {
        'vehicle': '6',
        'type': 'B',
        'mileage': '580',
        'drive': '11.6',
        'break': '1.5',
    },
    {
        'vehicle': '7',
        'type': 'C',
        'mileage': '246',
        'drive': '4.92',
        'break': '0.75',
    },
    {
        'vehicle': '8',
        'type': 'C',
        'mileage': '600',
        'drive': '12',
        'break': '1.5',
    },
    {
        'vehicle': '9',
        'type': 'C',
        'mileage': '590',
        'drive': '11.8',
        'break': '1.5',
    },
    {
        'vehicle': '8',
        'type': 'C',
        'mileage': '300',
        'drive': '6',
        'break': '0.75',
    },
    
]

const Table2 = () => {
  return (
    <div  className=' justify-center align-center'>
    <p>A: depot to depot w/o charging; B: depot to depot with charging at the destination depot;  C: multi-drop</p>
      <table  cellpadding="10"cellspacing="10" text-align='center' margin-left='auto' margin-right='auto'>
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Type</th>
            <th>Mileage</th>
            <th>Drive (hours)</th>
			<th>Break (hours)</th>
            			
          </tr>
        </thead>
        <tbody>
          {data.map((value, key) => {
            return (
              <tr key={key}>
                <td>{value.vehicle}</td>
                <td>{value.type}</td>
                <td>{value.mileage}</td>
                <td>{value.drive}</td>
				<td>{value.break}</td>
				
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
  )
}

export default Table2