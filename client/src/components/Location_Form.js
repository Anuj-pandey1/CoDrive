import React from "react";
import { useState } from "react";
import "../css/address_dropdown.css";
import axios from "axios";

const Location_Form = () => {
  const [data, setData] = useState({
    travel_type: "",
    start: { lat: 0, lon: 0 },
    destination: { lat: 0, lon: 0 },
  });

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
    setData({ ...data, start: { lat: suggestion.lat, lon: suggestion.lon } });
    // console.log(data);
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
    setData({
      ...data,
      destination: { lat: suggestion.lat, lon: suggestion.lon },
    });
    // console.log(data);
    desetSuggestions([]);
  };

  //handling option change for radio buttons
  const onOptionChange = (e) => {
    setData({
      ...data,
      travel_type: e.target.value,
    });
    // console.log(data);
  };

  //sending fetch post request to backend
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8100/location_form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };
  return (
    <div class="d-flex align-items-center justify-content-center vh-100 ">
      <form class="border border-dark p-5" onSubmit={handleSubmit}>
        <h1>Fill out these details</h1>
        <br />
        <label for="exampleInputPassword1" class="form-label">
          You are travelling as a:
        </label>

        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            value="Driver"
            checked={data.travel_type === "Driver"}
            onChange={onOptionChange}
          ></input>
          <label class="form-check-label" for="flexRadioDefault1">
            Driver
          </label>
        </div>

        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            value="Passenger"
            checked={data.travel_type === "Passenger"}
            onChange={onOptionChange}
          ></input>
          <label class="form-check-label" for="flexRadioDefault2">
            Passenger
          </label>
        </div>
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
};

export default Location_Form;
