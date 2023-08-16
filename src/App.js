import {faker} from "@faker-js/faker"
import { useState } from "react";
import './App.css';
import SeedSelect from "./Components/SeedSelect";
import Table from "./Components/Table";
import { fakerEN_US, fakerKA_GE, fakerPL } from "@faker-js/faker";
import FakerContext from "./Context/FakerContext";

function App() {
  const [seed,setSeed] = useState(0);
  const [faker,setFaker] = useState(fakerPL);

  return (
    <FakerContext.Provider value={{seed,setSeed,faker,setFaker}}>
    <Table></Table>
    </FakerContext.Provider>
  );
}

export default App;
