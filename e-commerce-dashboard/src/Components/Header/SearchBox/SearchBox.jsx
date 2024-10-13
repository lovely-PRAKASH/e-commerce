import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const SearchBox = () => {
  const [keyWord, setKeyWord]=useState('');
  const navigate=useNavigate();

  const searchHandler=()=>{
    navigate('/search?keyword='+keyWord)
  }
  return (
    <>
      <div className="headerSearch ml-3 mr-3">
        <input type="text" placeholder="Search for products..." onBlur={searchHandler} onChange={(e)=>setKeyWord(e.target.value)}/>
        <Button className="searchIcon" onClick={searchHandler}>
{/*           search icon */}
          <IoIosSearch />
        </Button>
      </div>
    </>
  );
};

export default SearchBox;
