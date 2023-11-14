import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Card } from '../components';
import { Link, NavLink } from 'react-router-dom';
import { DataContext } from './../contexts/DataContext'; 
import { useStateContext } from '../contexts/ContextProvider';
import { useSelectedItems } from '../contexts/selectedItemsContext';


function Main() {
    const [datadb, setDatadb] = useState([]);
    const { setData } = useContext(DataContext);
    const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
    const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';
    const [linkstate, setactivelink] = useState(false);
    const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

    const [selectedid, setselectedid] = useState(null);

    const [selected, setSelected] = useState([]); //FOR SEVERAL SELECTION
    const [selectedItem, setselectedItem] = useState([]);

    //search
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    const {selectedItems, toggleSelection} = useSelectedItems();
    //end search

    const maxSelection =5;

    useEffect(() => {
        getData();
    }, []);

    const toggleSelectionScript = (itemId) => {
        if (selectedItems.includes(itemId))
        {
            toggleSelection(itemId);
        } else {
            if(selectedItems.length < maxSelection) {
                toggleSelection(itemId)
            } else {
                alert('Maximum reached')
            }
        }

    };

    const clearSelectedItems = () => {
        // Clear the selected items
        selectedItems.forEach((item) => {
          toggleSelection(item);
        });
      };

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
                    <button backgroundColor= {currentColor} className=' justify-center mt-8 rounded-md border border-gray-200 py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0 peer' onClick={clearSelectedItems}>Clear </button>

        </form>
        {searchText ? (
                    <div className='w-1/3 mt-8 '>
                    {searchedResults.map((item, index) => (
                        <div 
                        style={{backgroundColor: selectedItems.includes(item.SIM_ID) ? currentColor : 'inherit', 
                            color:  selectedItems.includes(item.SIM_ID) ? 'white' :'inherit',
                            cursor:'pointer'}}
                            className= 'pl-4 justify-center flex pt-1 pb-1 text-l font-semibold  border-1 border-gray ' 
                            onClick={() => toggleSelectionScript(item.SIM_ID)}>
                                {item.SIM_ID}
                        </div>
                ))}
        
                </div>
        ) : 
        <div className='w-1/3 mt-8 '>
            {datadb.map((item, index) => (

                <div 
                style={{backgroundColor: selectedItems.includes(item.SIM_ID) ? currentColor : 'inherit', 
                    color:  selectedItems.includes(item.SIM_ID) ? 'white' :'inherit',
                    cursor:'pointer'}}
                    className= 'pl-4 justify-center flex pt-1 pb-1 text-l font-semibold  border-1 border-gray ' 
                    onClick={() => toggleSelectionScript(item.SIM_ID)}>
                        {item.SIM_ID}
                </div>
        ))}


        </div>
}

    </div>
    );
}

export default Main;
