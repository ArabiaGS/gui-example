import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Card } from '../components';
import { Link, NavLink } from 'react-router-dom';
import { DataContext } from './../contexts/DataContext'; 
import { useStateContext } from '../contexts/ContextProvider';


function List() {
    const [datadb, setDatadb] = useState([]);
    const { setData } = useContext(DataContext);
    const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
    const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';
    const [linkstate, setactivelink] = useState(false);
    const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

    const [selectedid, setselectedid] = useState(null);

    //search
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    //end search

    useEffect(() => {
        getData();
    }, []);

    //fetch specific sim di
/*
    const fetchDatabySIM = async (simValue) => {
        try {
            const response = await axios.get(`/api/${simValue}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };
    const simValue ='CIDT_SH_20V_20231017_821';
    fetchDatabySIM(simValue)
    .then((data) => {
        if (data) {
        console.log('Data based on SIM: ', data);
    }})
    .catch((error) => {console.error('Error:', error);});
    */
    // Function to fetch data from the database
    const getData = () => {
        axios.get('/api')
        .then((res) => {
            setDatadb(res.data.reverse());
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    };
    const handleSelectionId = (SIM_ID) => {
        setData(SIM_ID);
        setselectedid(SIM_ID);
        console.log(SIM_ID);
    };
    //search
    const filterPrompts = (searchtext) => {
        const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
        return datadb.filter(
          (item) =>
            regex.test(item.SIM_ID)
        );
      };
    
      const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);
    
        // debounce method
        setSearchTimeout(
          setTimeout(() => {
            const searchResult = filterPrompts(e.target.value);
            setSearchedResults(searchResult);
          }, 500)
        );
      };
    //end search

    return (
    <div className='mt-5 px-10 flex flex-wrap justify-center'>
        <div className='flex flex-wrap justify-center'>
            <h1 className='font-bold text-3xl'>Simulation IDs</h1>
        </div>

        <form className='relative w-full flex  justify-center'>
        <input
          type='text'
          placeholder='Search'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='w-1/2 mt-8 rounded-md border border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0 peer'
        />
      </form>

        {searchText ? (
                    <div className='w-1/3 mt-8 '>
                    {searchedResults.map((item, index) => (
        
                        <div 
                        style={{backgroundColor: selectedid === item.SIM_ID ? currentColor : 'inherit', 
                            color: selectedid === item.SIM_ID ? 'white' :'inherit',
                            cursor:'pointer'}}
                            className= 'pl-4 justify-center flex pt-1 pb-1 text-l font-semibold  border-1 border-gray ' 
                            onClick={()  => handleSelectionId(item.SIM_ID)}>
                                {item.SIM_ID}
                        </div>
                ))}
        
                </div>
        ) : 
        <div className='w-1/3 mt-8 '>
            {datadb.map((item, index) => (

                <div 
                style={{backgroundColor: selectedid === item.SIM_ID ? currentColor : 'inherit', 
                    color: selectedid === item.SIM_ID ? 'white' :'inherit',
                    cursor:'pointer'}}
                    className= 'pl-4 justify-center flex pt-1 pb-1 text-l font-semibold  border-1 border-gray ' 
                    onClick={()  => handleSelectionId(item.SIM_ID)}>
                        {item.SIM_ID}
                </div>
        ))}
    <button type='button' style={{backgroundColor: currentColor, color:'white'}} className='mt-8 flex  justify-center border-2 rounded-md pl-4 pr-4 '>Load</button>

        </div>
}

    </div>
    );
}

export default List;

/* with the link

        <li key={item}>
            <Link to={`/main/${item.SIM_ID}`}>{item.SIM_ID}</Link>
        </li>

                {datadb.map((item, index) => (
            <div className= 'justify-left flex-wrap mt-5 border w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-4 text-l font-semibold' onClick={()  => handleSelectionId(item.SIM_ID)}>{item.SIM_ID}</div>
        ))}
*/

/*
class List extends React.Component {
    constructor(props: Props) { 
        super(props);
        this.state = { 
            data: [],
        }
    }
    componentDidMount() {
        this.getData();
    }

    //read from the databsse
    getData(){
        axios.get('/api').then((res) => {
            console.log(res)
            this.state.data = res.data;
            this.setState({
                data: res.data
            })
        })
    };

    render() {
            return (
        <div>
            {this.state.data.map((item, index) => (
                <Card key={index} data={item} />
            ))}
        </div>
    )
    }
}

export default List
*/