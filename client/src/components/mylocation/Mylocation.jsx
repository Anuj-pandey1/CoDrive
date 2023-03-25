import React, { Component, useState,useEffect } from 'react';
import axios from 'axios';

export const Mylocation = ({setStr, setEnd,setDriving, str, end})=> {
    
      // states for starting location
      const [staddress, stsetAddress] = useState("");
      const [stsuggestions, stsetSuggestions] = useState([]);
    
      // states for distination
      const [deaddress, desetAddress] = useState("");
      const [desuggestions, desetSuggestions] = useState([]);
    
      //handling changes in starting location
      const sthandleInputChange = (event) => {
        const value = event.target.value;
        stsetAddress(value);
        axios
          .get(
            `https://nominatim.openstreetmap.org/search?q=${value}&format=json&addressdetails=1`
          )
          .then((response) => {
            stsetSuggestions(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };
    
      const sthandleSelect = (suggestion) => {
        stsetAddress(suggestion.display_name);
        // setData({ ...data, start: { lat: suggestion.lat, lon: suggestion.lon } });
        setStr( { lat: suggestion.lat, lng: suggestion.lon })
        console.log(str);
        stsetSuggestions([]);
      };
    
      //handling changes in destination
      const dehandleInputChange = (event) => {
        const value = event.target.value;
        desetAddress(value);
        axios
          .get(
            `https://nominatim.openstreetmap.org/search?q=${value}&format=json&addressdetails=1`
          )
          .then((response) => {
            desetSuggestions(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };
    
      const dehandleSelect = (suggestion) => {
        desetAddress(suggestion.display_name);
        // setData({
        //   ...data,
        //   destination: { lat: suggestion.lat, lon: suggestion.lon },
        // });
        setEnd( { lat: suggestion.lat, lng: suggestion.lon })
        console.log(end);
        desetSuggestions([]);
      };
    
      //handling option change for radio buttons
      // const onOptionChange = (e) => {
      //   setData({
      //     ...data,
      //     travel_type: e.target.value,
      //   });
      //   // console.log(data);
      // };
    
      //sending fetch post request to backend
      const handleSubmit = (event) => {
        event.preventDefault(); 
        console.log(str, end);
        setDriving(0);
      };

    return (
            <div class="d-flex align-items-center justify-content-center vh-100 ">
      <form class="border border-dark p-5" onSubmit={handleSubmit}>
        <h1>Want to carpool from</h1>


        <div class="mb-3">
          Start Location:
          <div className="address-dropdown">
            <input
              type="text"
              value={staddress}
              onChange={sthandleInputChange}
            />
            <ul className="address-dropdown__suggestions">
              {stsuggestions.map((suggestion, index) => (
                <li key={index} onClick={() => sthandleSelect(suggestion)}>
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div class="mb-3">
          Destination:
          <div className="address-dropdown">
            <input
              type="text"
              value={deaddress}
              onChange={dehandleInputChange}
            />
            <ul className="address-dropdown__suggestions">
              {desuggestions.map((suggestion, index) => (
                <li key={index} onClick={() => dehandleSelect(suggestion)}>
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
            </div>
        );
  
}

export default Mylocation;


 
