import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { FaAngleDown } from "react-icons/fa";
import Dialog from "@mui/material/Dialog";
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import Slide from "@mui/material/Slide";
import { myContext } from "../../App";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const CountryDrop = () => {
  const context = useContext(myContext);

  const [isOpen, setIsOpen] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(null);

  const [countryList, setCountryList] = useState([]);

  const [selectedCountry, setSelectedCounty] = useState("");

  useEffect(() => {
    const savedCountry = localStorage.getItem("selectedCountry");
    if (savedCountry) {
      setSelectedCounty(savedCountry);
    }
    setCountryList(context.countryList);
  }, [context, countryList]);

  const handleActive = (index, country) => {
    setSelectedIndex(index);
    setIsOpen(false);
    setSelectedCounty(country);
  };

  const searchFilter = (e) => {
    const keyWord = e.target.value.toLowerCase();

    if (keyWord !== "") {
      const list = countryList.filter((item) => {
        return item.country.toLowerCase().includes(keyWord);
      });
      setCountryList(list);
    } else {
      setCountryList(context.countryList);
    }
  };

  return (
    <>
      <Button
        className="countryDrop"
        style={{ outline: "none" }}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <div className="info d-flex flex-column">
          <span className="label">Your Location</span>
          <span className="name">
            {selectedCountry ? selectedCountry : "select a location"}
          </span>
        </div>
        <span className="ml-auto">
          <FaAngleDown />
        </span>
      </Button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="locationModel"
        TransitionComponent={Transition}
      >
        <h6>Choose your Delivery Location</h6>
        <Button className="close_" onClick={() => setIsOpen(false)}>
          <IoMdClose />
        </Button>
        <p>Enter your address and we will specify the offer for your area.</p>

        <div className="headerSearch w-100">
          <input
            type="text"
            placeholder="Search your area..."
            onChange={searchFilter}
          />
          <Button className="searchIcon">
            <IoIosSearch />
          </Button>
        </div>
        <ul className="countryList mt-3">
          {countryList?.lenght !== 0 &&
            countryList?.map((item, index) => {
              return (
                <li key={index}>
                  <Button
                    onClick={() => handleActive(index, item.country)}
                    className={`${selectedIndex === index ? "active" : ""}`}
                  >
                    {item.country}
                  </Button>
                </li>
              );
            })}
        </ul>
      </Dialog>
    </>
  );
};

export default CountryDrop;
