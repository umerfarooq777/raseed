import React, { useEffect, useState,useContext } from "react";
// import TableContentSub from './TableContentSub'

import FirebaseStack from "../firebase-config";
import { ref, get, child } from "firebase/database";
import { IncomeContext } from "../context/incomeContext";

const BalanceSheetRecords1 = ({ array, keys, accounts, bal }) => {
  const { LiabilityArray, setLiabilityArray} = useContext(IncomeContext);

  const dbRef = ref(FirebaseStack());
  const [balance, setBalance] = useState(0);
  const [titles, setTitles] = useState();

  useEffect(() => {
    getAccountsFromFirebase();
  }, []);

  const getAccountsFromFirebase = async () => {
    get(child(dbRef, `accounts/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          //   setFirebaseData(snapshot.val());
          //   setStopData(false);
          // setGeneralRecords(snapshot.val())
          setTitles(snapshot.val());
          // console.log(firebaseData)
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const entry = [];

  var today = new Date();
  var date = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;


  var arrObj = []
  array && array.map((obj)=>{
    arrObj.push(obj)
  })


  const getValue = (value) =>
  typeof value === "string" ? value.toUpperCase() : value;
  
  function filterPlainArray(array, filters) {
    const filterKeys = Object.keys(filters);
    return array.filter((item) => {
        return filterKeys.some((key) => {
            if (!filters[key].length) return true;
        return filters[key].find(
          (filter) => getValue(filter) === getValue(item[key])
        );
      });
    });
}


// const propertyCategory = Array(["asset"]);
const propertyValues = Array(accounts[keys]);
// console.log("🚀 ~ file: recordLedger.js ~ line 101 ~ RecordLedger ~ propertyValues", propertyValues)


const filters = {    
title: propertyValues,
    // category:propertyCategory,
};

const filtered = filterPlainArray(arrObj, filters);
//   console.log("🚀 ~ file: recordLedger.js ~ line 109 ~ RecordLedger ~ filtered", filtered)
//   console.log("🚀 ~ file: recordLedger.js ~ line 108 ~ RecordLedger ~ filtered", filtered)
//   console.log("🚀 ~ file: recordLedger.js ~ line 96 ~ RecordLedger ~ array", array)


  useEffect(()=>{
      getTrailBalance()
  },[filtered])

  const getTrailBalance = () => {
      var balance = 0;
      filtered && filtered.map((obj) => {
          if (obj.type === `debit`) {
              balance = (Number(obj.amount)+balance)
              setBalance(balance)
          }
          else if(obj.type === 'credit'){
              balance = (balance-(Number(obj.amount)))
              setBalance(balance)
          }
      })
      
  }


  if(balance===0){

  }else{ 
    var arrAcc = accounts[keys];
    // console.log("🚀 ~ file: balanceSheetRecords1.js ~ line 110 ~ BalanceSheetRecords1 ~ arrAcc", arrAcc)
    LiabilityArray.push({arrAcc,bal:balance})
  }
  
  return (
    <>
{
  balance===0?null
  :
                <tbody>
                    <tr>
                      <td colSpan={5} className="capitalize">{accounts[keys]}</td> 
                      <td></td>
                      <td >
                        {/* {obj.data.type==='debit'?
                            setBalance(balance+Number(obj.data.amount)):
                          setBalance(balance-Number(obj.data.amount))} */}
                        {-(balance)}
                      </td>
                    </tr>
                          </tbody>       
}
    </>
  );
};

export default BalanceSheetRecords1;
