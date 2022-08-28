import React, { useEffect, useState,useContext } from "react";
// import TableContentSub from './TableContentSub'

import FirebaseStack from "../../firebase-config";
import { ref, get, child } from "firebase/database";
import { IncomeContext } from "../../context/incomeContext";

const RecordLedger1 = ({ array, keys, accounts, bal }) => {



  
  const { EquityArray,setEquityArray,EquityTotal} = useContext(IncomeContext);
  // console.log("🚀 ~ file: capitalRec.js ~ line 14 ~ RecordLedger1 ~ EquityTotal", EquityTotal)
// console.log("🚀 ~ file: incomeRecord.js ~ line 8 ~ RecordLedger ~ array", array)
// console.log("🚀 ~ file: recordLedger.js ~ line 8 ~ RecordLedger ~ accounts", accounts)
  // console.log("🚀 ~ file: recordLedger.js ~ line 10 ~ RecordLedger ~ accounts", accounts,keys)

  // console.log(array)

  const dbRef = ref(FirebaseStack());
  const [balance, setBalance] = useState(0);
  const [final, setFinal] = useState(0);
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
  

  // var today = new Date();
  // var date = `${today.getFullYear()}-${
  //   today.getMonth() + 1
  // }-${today.getDate()}`;
  // var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;


  var arrObj = []
  array && array.map((obj)=>{
    arrObj.push(obj.data)
  })


  const getValue = (value) =>
  typeof value === "string" ? value.toUpperCase() : value;
  
  function filterPlainArray(array, filters) {
    const filterKeys = Object.keys(filters);
    // console.log("🚀 ~ file: incomeRecord.js ~ line 59 ~ filterPlainArray ~ filterKeys", filterKeys)


    return array.filter((item) => {
        return filterKeys.some((key) => {
            if (!filters[key].length) return true;
        return filters[key].find(
          (filter) => getValue(filter) === getValue(item[key])
        );
      });
    });
}


const propertyValues = Array(accounts[keys]);
// console.log("🚀 ~ file: recordLedger.js ~ line 101 ~ RecordLedger ~ propertyValues", propertyValues)


const filters = {
    category: propertyValues,
};

const filtered = filterPlainArray(arrObj, filters);
  // console.log("🚀 ~ file: recordLedger.js ~ line 109 ~ RecordLedger ~ filtered", filtered)
//   console.log("🚀 ~ file: recordLedger.js ~ line 108 ~ RecordLedger ~ filtered", filtered)
//   console.log("🚀 ~ file: recordLedger.js ~ line 96 ~ RecordLedger ~ array", array)


  useEffect(()=>{
      getTrailBalance()
    
  },[filtered])

  const getTrailBalance = () => {
      var balance = 0;
      filtered && filtered.map((obj) => {
          if (obj.type === `debit`) {
            balance = (balance-(Number(obj.amount)))
              setBalance(balance)
          }
          else if(obj.type === 'credit'){
            balance = (Number(obj.amount)+balance)
              setBalance(balance)
          }
      })
      
  }




  var arrAcc = accounts[keys];
  EquityArray.push({arrAcc,bal:balance})





  return (
    <>
      {
        // console.log(entry)
      }

      {/* <thead className="account-card">
        <tr>
          <th colSpan={6}>
            <h4 className="ledger-title capitalize text-center  ">
              {accounts[keys]}
            </h4>
          </th>
        </tr>
        <tr>
          <th>Date</th>
          <th>Description/Account</th>
          <th>Ref</th>
          <th>Debit</th>
          <th>Credit</th>
          <th>Total</th>
        </tr>
      </thead> */}

      {/* {filtered ? (
        filtered.map((obj, key) => {

          return (
            <>
                  <tbody>
                    <tr className="">
                      <td>{obj.date}</td>
                      <td className="capitalize">{obj.title}</td>
                      <td>--</td>
                      <td
                        className={
                          obj.type === "debit"
                            ? "credit-text"
                            : "debit-text"
                        }
                      >
                        {obj.type === "debit" ? obj.amount : null}
                      </td>
                      <td
                        className={
                          obj.type === "credit"
                            ? "debit-text"
                            : "credit-text"
                        }
                      >
                        {obj.type === "credit" ? obj.amount : null}
                      </td>
                      <td>
                        
                       
                      </td>
                    </tr>
                  </tbody>
                  
                
              
            </>
          );
        })
      ) : (
        <>
          <p>No data mapping</p>
        </>
      )} */}


                    <tr >
                      <td colSpan={3} className="capitalize">{accounts[keys]}</td> 
                      <td className={balance < 0 ? "credit-text" : "debit-text"}>{balance<0?balance:null}</td>
                      <td className={balance < 0 ? "credit-text" : "debit-text"}>{balance>0?balance:null}</td> 
                      <td className="balanace">
                      </td>
                    </tr>
                     
    </>
  );
};

export default RecordLedger1;
