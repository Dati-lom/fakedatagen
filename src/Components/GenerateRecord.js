import { faker as chosen } from "@faker-js/faker";
import { fakerEN_US, fakerKA_GE, fakerPL } from "@faker-js/faker";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import fakerContext from "../Context/FakerContext";

function generateRandomAddress(faker){
    return faker.helpers.arrayElement([
      faker.location.streetAddress(),
      faker.location.streetAddress(true),
    ]);
  }
  
function GenerateRecord(faker,reg) {
   
  return {
    id: faker.database.mongodbObjectId(),
    fName: `${faker.person.firstName()} ${reg=="EN"?faker.person.middleName():""} ${faker.person.lastName()}`,
    address: generateRandomAddress(faker),
    phone: faker.phone.number()
  };
}

export default GenerateRecord;
