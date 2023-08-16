import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { fakerEN_US, fakerKA_GE, fakerPL } from "@faker-js/faker";
import FakerContext from '../Context/FakerContext';

function SeedSelect({ setReg, setError, error}) {
  const { faker, setFaker, seed, setSeed } = useContext(FakerContext);

  const handleRandomSeed = () => {
    const randomSeed = faker.number.int(1000);
    setSeed(randomSeed);
  };

  const handleSeedChange = (e) => {
    const seedValue = parseInt(e.target.value);
    setSeed(seedValue);
  };

  const handleSliderChange = (e) => {
    const sliderValue = parseFloat(e.target.value);
    setError(sliderValue);
  };

  const handleRegionChange = (e) => {
    const region = e.target.value;
    if (region === "EN") {
      setFaker(fakerEN_US);
      setReg("EN");
    } else if (region === "KA") {
      setFaker(fakerKA_GE);
      setReg("KA");
    } else if (region === "PL") {
      setFaker(fakerPL);
      setReg("PL");
    }
  };

  return (
    <div className="row mt-3">
      <div className="col-md-2">
        <div className="input-group">
          <label htmlFor="selectedRegion" className="input-group-text">
            Region
          </label>
          <select
            id="selectedRegion"
            onChange={handleRegionChange}
            className="form-select"
          >
            <option value="PL">PL</option>
            <option value="KA">KA</option>
            <option value="EN">EN</option>
          </select>
        </div>
      </div>
      <div className="col-md-4">
        <input
          type="range"
          min="0"
          max="1000"
          step="0.1"
          value={error}
          onChange = {handleSliderChange}
          className="form-range"
        />
      </div>
      <div className="col-md-1 border rounded">{error}</div>
      <div className="col-md-2">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleRandomSeed}
        >
          Random Seed
        </button>
      </div>
      <div className="col-md-3">
        <input
          type="number"
          min="0"
          max="10" 
          value={seed}
          onChange={handleSeedChange}
          className="form-control"
        />
      </div>
    </div>
  );
}

export default SeedSelect;
