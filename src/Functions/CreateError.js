
import React, { useContext } from 'react'
import FakerContext from '../Context/FakerContext'

function CreateError(error,user,faker,reg) {
    
    
    const calculations = (error)=>{
        let amount = Math.floor(error)
        let prob = error - amount
        return (faker.number.int(10) < prob*10? 0:1) + amount
    }
    const returnRandCharOrNum = (reg)=>{
        let characters = '';
        if (reg === 'PL') {
            characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ąćęłńóśźżĄĆĘŁŃÓŚŹŻ';
        } else if (reg === 'EN') {
            characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        } else if (reg === 'KA') {
            characters = 'აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ';
        }
        let randint = faker.number.int(characters.length-1)
        return characters[randint];
    }

    const deleteChar = (inputString, position) => {
        return inputString.slice(0, position) + inputString.slice(position + 1);
    };
    const insertChar = (inputString, position, char) => { 
        return inputString.slice(0, position) + char + inputString.slice(position);
    };
    const swapChar = (inputString, position, char) => {
        return inputString.slice(0, position) + char + inputString.slice(position + 1);
    };

    const doError = (idx,place,string)=>{
        if(string==0)return ""
        if(idx==0){
            return deleteChar(string,place)
        }
        if(idx==1){
            return insertChar(string,place,returnRandCharOrNum(reg))
        }
        if(idx==2){
            return swapChar(string,place,returnRandCharOrNum(reg))
        }
    }

    const manipulateUserAttribute = (user, key, idx) => {
        let originalVal = user[key];
        console.log(originalVal);
        const manipulatedVal = doError(idx,originalVal>0?faker.number.int(originalVal.length - 1):0, originalVal);
        const manipulatedUser = { ...user };
        manipulatedUser[key] = manipulatedVal;

    
        return manipulatedUser;
    };
    let res = {...user}
    let keys = Object.keys(user)
    
    let totalAmount = calculations(error)
    
    for (let i = 0; i < totalAmount; i++) {
        const randomId = faker.number.int(2);
        res = manipulateUserAttribute(res, keys[faker.number.int(keys.length-1)], randomId);
    }

    
    return res
        
        
}

export default CreateError