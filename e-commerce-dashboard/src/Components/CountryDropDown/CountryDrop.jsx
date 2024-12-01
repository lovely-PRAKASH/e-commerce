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
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedIso3, setSelectedIso3] = useState("");
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("");
  const [selectedCurrencySymbol, setSelectedCurrencySymbol] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedCountry = localStorage.getItem("selectedCountry");
    const savedIso3 = localStorage.getItem("selectedIso3");
    const savedCurrency = localStorage.getItem("selectedCurrency");
    const savedCurrencySymbol = localStorage.getItem("selectedSymbol");

    if (savedCountry) setSelectedCountry(savedCountry);
    if (savedIso3) setSelectedIso3(savedIso3);
    if (savedCurrency) setSelectedCurrencyCode(savedCurrency);
    if (savedCurrencySymbol) setSelectedCurrencySymbol(savedCurrencySymbol);

    if (context.countryList?.length > 0) {
      const processedCountryList = context.countryList.map((country) => {
        const currencyKey = country.currency?.code || "N/A";
        const currencySymbol = country.currency?.symbol || "N/A";
        return {
          country: country.name || "Unknown Country",
          iso3: country.cca3 || "",
          currency_code: currencyKey,
          currency_symbol: currencySymbol,
        };
      });
      setCountryList(processedCountryList);
    } else {
      console.error("Country list is empty or not available.");
    }
  }, [context]);

  const handleActive = (index, country, iso3, currency, symbol) => {
    setSelectedIndex(index);
    setIsOpen(false);
    setSelectedCountry(country);
    setSelectedIso3(iso3);
    setSelectedCurrencyCode(currency);
    setSelectedCurrencySymbol(symbol);

    localStorage.setItem("selectedCountry", country);
    localStorage.setItem("selectedIso3", iso3);
    localStorage.setItem("selectedCurrency", currency);
    localStorage.setItem("selectedSymbol", symbol);

    window.location.reload();
  };

  const searchFilter = (e) => {
    const keyWord = e.target.value.toLowerCase();
    setSearchTerm(keyWord);

    if (keyWord) {
      const filteredList = countryList.filter((item) =>
        item.country.toLowerCase().includes(keyWord)
      );
      setCountryList(filteredList);
    } else {
      setCountryList(
        context.countryList.map((country) => {
          const currencyKey = country.currency?.code || "N/A";
          const currencySymbol = country.currency?.symbol || "N/A";
          return {
            country: country.name || "Unknown Country",
            iso3: country.cca3 || "",
            currency_code: currencyKey,
            currency_symbol: currencySymbol,
          };
        })
      );
    }
  };

  return (
    <>
      <Button
        className="countryDrop"
        style={{ outline: "none" }}
        onClick={() => setIsOpen(true)}
      >
        <div className="info d-flex flex-column">
          <span className="label">Your Location</span>
          <span className="name">
            {selectedCountry ? selectedCountry : "Select a location"}
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
        <h6>Choose your Country Currency</h6>
        <Button className="close_" onClick={() => setIsOpen(false)}>
          <IoMdClose />
        </Button>
        <p>A list of <i>{countryList.length}</i> countries currencies given here</p>

        <div className="headerSearch w-100">
          <input
            type="text"
            placeholder="Search your area..."
            value={searchTerm}
            onChange={searchFilter}
          />
          <Button className="searchIcon">
            <IoIosSearch />
          </Button>
        </div>
        <ul className="countryList mt-3">
          {countryList.length > 0 ? (
            countryList.map((item, index) => (
              <li key={index}>
                <Button
                  onClick={() =>
                    handleActive(
                      index,
                      item.country,
                      item.iso3,
                      item.currency_code,
                      item.currency_symbol
                    )
                  }
                  className={`${selectedIndex === index ? "active" : ""}`}
                >
                  {item.country} ({item.currency_code} {item.currency_symbol})
                </Button>
              </li>
            ))
          ) : (
            <li className="d-flex justify-content-center text-danger">No countries found</li>
          )}
        </ul>
      </Dialog>
    </>
  );
};

export default CountryDrop;
