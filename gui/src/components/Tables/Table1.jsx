import React from 'react'
const data = [
  {  
    'vehicle': '1',  
    'type': 'A',
    'one': '1',
    'two': '1',
    'three': '1',
    'four': '0',
    'five': '0',
    'six': '0',
    'seven': '0',
    'eight': '0',
    'nine': '0',
    'ten': '0',
    'eleven': '0',
    'twelve': '1',
    'thirteen': '1',
    'fourteen': '1',
    'fifteen': '1',
    'sixteen': '1',
    'seventeen': '1',
    'eighteen': '1',
    'nineteen': '1',
    'twenty': '1',
    'twentyone': '1',
    'twentytwo': '1',
    'twentythree': '1',
    'twentyfour': '1'
  },
  {  
    'vehicle': '2',  
  'type': 'A',
'one': '1',
'two': '1',
'three': '1',
'four': '1',
'five': '1',
'six': '1',
'seven': '1',
'eight': '1',
'nine': '0',
'ten': '0',
'eleven': '0',
'twelve': '0',
  'thirteen': '0',
'fourteen': '0',
'fifteen': '0',
'sixteen': '1',
'seventeen': '1',
'eighteen': '1',
'nineteen': '1',
'twenty': '1',
'twentyone': '1',
'twentytwo': '1',
'twentythree': '1',
'twentyfour': '1'
  },{  
'vehicle': '3',  
  'type': 'A',
'one': '1',
'two': '1',
'three': '1',
'four': '1',
'five': '1',
'six': '1',
'seven': '1',
'eight': '0',
'nine': '0',
'ten': '0',
'eleven': '0',
'twelve': '0',
  'thirteen': '0',
'fourteen': '0',
'fifteen': '0',
'sixteen': '0',
'seventeen': '1',
'eighteen': '1',
'nineteen': '1',
'twenty': '1',
'twentyone': '1',
'twentytwo': '1',
'twentythree': '1',
'twentyfour': '1'
  },{  
'vehicle': '4',  
  'type': 'A',
  'one': '1',
  'two': '1',
  'three': '1',
  'four': '1',
  'five': '1',
  'six': '0',
  'seven': '0',
  'eight': '0',
  'nine': '0',
  'ten': '0',
  'eleven': '0',
  'twelve': '0',
    'thirteen': '0',
  'fourteen': '0',
  'fifteen': '0',
  'sixteen': '0',
  'seventeen': '0',
  'eighteen': '0',
  'nineteen': '1',
  'twenty': '1',
  'twentyone': '1',
  'twentytwo': '1',
  'twentythree': '1',
  'twentyfour': '1'
  },{  
'vehicle': '5',  
  'type': 'B',
  'one': '1',
  'two': '1',
  'three': '1',
  'four': '1',
  'five': '1',
  'six': '0',
  'seven': '0',
  'eight': '0',
  'nine': '0',
  'ten': '0',
  'eleven': '0',
  'twelve': '0',
    'thirteen': '0',
  'fourteen': '0',
  'fifteen': '0',
  'sixteen': '0',
  'seventeen': '0',
  'eighteen': '0',
  'nineteen': '0',
  'twenty': '1',
  'twentyone': '1',
  'twentytwo': '1',
  'twentythree': '1',
  'twentyfour': '1' 
  },{  
'vehicle': '6',  
  'type': 'C',
  'one': '1',
  'two': '1',
  'three': '1',
  'four': '1',
  'five': '0',
  'six': '0',
  'seven': '0',
  'eight': '0',
  'nine': '0',
  'ten': '0',
  'eleven': '0',
  'twelve': '0',
    'thirteen': '0',
  'fourteen': '0',
  'fifteen': '0',
  'sixteen': '0',
  'seventeen': '0',
  'eighteen': '0',
  'nineteen': '1',
  'twenty': '1',
  'twentyone': '1',
  'twentytwo': '1',
  'twentythree': '1',
  'twentyfour': '1'
},{  
'vehicle': '7',  
  'type': 'C',
'one': '1',
'two': '1',
'three': '1',
'four': '1',
'five': '1',
'six': '1',
'seven': '1',
'eight': '0',
'nine': '0',
'ten': '0',
'eleven': '0',
'twelve': '0',
  'thirteen': '0',
'fourteen': '0',
'fifteen': '0',
'sixteen': '0',
'seventeen': '1',
'eighteen': '1',
'nineteen': '1',
'twenty': '1',
'twentyone': '1',
'twentytwo': '1',
'twentythree': '1',
'twentyfour': '1' 
},{  
'vehicle': '8',  
  'type': 'C',
'one': '1',
'two': '1',
'three': '1',
'four': '1',
'five': '1',
'six': '1',
'seven': '1',
'eight': '1',
'nine': '0',
'ten': '0',
'eleven': '0',
'twelve': '1',
  'thirteen': '1',
'fourteen': '0',
'fifteen': '0',
'sixteen': '0',
'seventeen': '1',
'eighteen': '1',
'nineteen': '1',
'twenty': '1',
'twentyone': '1',
'twentytwo': '1',
'twentythree': '1',
'twentyfour': '1' 
},{  
'vehicle': '9',  
  'type': 'C',
'one': '1',
'two': '1',
'three': '1',
'four': '1',
'five': '0',
'six': '0',
'seven': '0',
'eight': '0',
'nine': '0',
'ten': '0',
'eleven': '0',
'twelve': '0',
  'thirteen': '0',
'fourteen': '0',
'fifteen': '1',
'sixteen': '0',
'seventeen': '0',
'eighteen': '0',
'nineteen': '0',
'twenty': '0',
'twentyone': '1',
'twentytwo': '1',
'twentythree': '1',
'twentyfour': '1'
},{  
'vehicle': '10',  
  'type': 'C',
'one': '1',
'two': '1',
'three': '1',
'four': '1',
'five': '1',
'six': '1',
'seven': '1',
'eight': '0',
'nine': '0',
'ten': '0',
'eleven': '1',
'twelve': '1',
  'thirteen': '0',
'fourteen': '0',
'fifteen': '0',
'sixteen': '1',
'seventeen': '1',
'eighteen': '0',
'nineteen': '0',
'twenty': '0',
'twentyone': '1',
'twentytwo': '1',
'twentythree': '1',
'twentyfour': '1'
  }]  

const Table1 = () => {
  return (
    <div className=' justify-center'>
    <p>1: vehicle in depot – available for charging, 							0: vehicle out of depot – not available for depot charging								</p>
      <table cellpadding="3"cellspacing="3" text-align='center'>
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Type</th>
            <th>1am</th>
            <th>2am</th>
			<th>3am</th>
            <th>4am</th>
            <th>5am</th>
            <th>6am</th>
            <th>7am</th>
            <th>8am</th>
            <th>9am</th>
            <th>10am</th>
            <th>11am</th>
            <th>12pm</th>
            <th>1pm</th>
            <th>2pm</th>
            <th>3pm</th>
            <th>4pm</th>
            <th>5pm</th>
            <th>6pm</th>
            <th>7pm</th>
            <th>8pm</th>
            <th>9pm</th>
            <th>10pm</th>
            <th>11pm</th>
            <th>12am</th>			
          </tr>
        </thead>
        <tbody>
          {data.map((value, key) => {
            return (
              <tr key={key}>
                <td>{value.vehicle}</td>
                <td>{value.type}</td>
                <td>{value.one}</td>
                <td>{value.two}</td>
				<td>{value.three}</td>
				<td>{value.four}</td>
				<td>{value.five}</td>
				<td>{value.six}</td>
				<td>{value.seven}</td>
				<td>{value.eight}</td>
				<td>{value.nine}</td>
				<td>{value.ten}</td>
				<td>{value.eleven}</td>
				<td>{value.twelve}</td>
				<td>{value.thirteen}</td>
				<td>{value.fourteen}</td>
				<td>{value.fifteen}</td>
				<td>{value.sixteen}</td>
				<td>{value.seventeen}</td>
				<td>{value.eighteen}</td>
				<td>{value.nineteen}</td>
				<td>{value.twenty}</td>
				<td>{value.twentyone}</td>
				<td>{value.twentytwo}</td>
				<td>{value.twentythree}</td>
				<td>{value.twentyfour}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
  )
}

export default Table1