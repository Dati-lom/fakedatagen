import React, { useContext, useEffect, useState } from 'react';
import GenerateRecord from './GenerateRecord';
import SeedSelect from './SeedSelect';
import { fakerEN_US, fakerKA_GE, fakerPL } from "@faker-js/faker";
import FakerContext from '../Context/FakerContext';
import InfiniteScroll from "react-infinite-scroll-component"
import CreateError from '../Functions/CreateError';


const sampleuser = {id: 'cdfcdcbc9de896d1f58abbba', fName: 'Leila  Wróbel', address: 'al. Komorowski 97c m. 288', phone: '55-784-57-61'}
function Table() {
  const {seed, setSeed,faker,setFaker} = useContext(FakerContext);
  const [reg, setReg] = useState('PL');
  const [error,setError] = useState(0.0);
  const [users, setUsers] = useState([]);
  const [visibleUsers,setVisibleUsers] = useState([])
  
  useEffect(()=>{
    faker.seed(seed)
  },[seed])

  useEffect(() => {
    generateData();
  }, [seed,reg]);


  useEffect(()=>{
    if(users.length > 0){
      const newUsers = [...users.map((e)=> CreateError(error,e,faker,reg))]
      setVisibleUsers(newUsers);
      console.log(visibleUsers)
    }
    
},[error,seed])
 

  


  const generateData = () => {
    let newUsers = [];
    for (let i = 0; i < 20; i++) {
      newUsers.push(GenerateRecord(faker,reg));
    }
    setVisibleUsers(newUsers)
    setUsers(newUsers);
  };
  const newGenerateData = () => {
    let newUsers = [];
    for (let i = 0; i < 20; i++) {
        newUsers.push(GenerateRecord(faker, reg));
    }
    setUsers(users => [...users, ...newUsers]);
    
};


  return (
    <div className="container-fluid">
      <InfiniteScroll
      dataLength={users.length}
      next={newGenerateData}
      hasMore={true}
      loader={<p className="text-center">Loading...</p>}
      >
    <div className="row mt-3">
      <div className="col-md-12">
        <SeedSelect setReg ={setReg} setError={setError} error={error}/>
      </div>
    </div>
    <div className="row mt-3">
      <div className="col-md-12">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Index</th>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {visibleUsers.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.id}</td>
                <td>{user.fName}</td>
                <td>{user.address}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </InfiniteScroll>
  </div>
  );
}

export default Table;
