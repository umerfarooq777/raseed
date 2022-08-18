import React, { useEffect, useState } from 'react';
// import TableContentSub from './TableContentSub'

import FirebaseStack from "../firebase-config";
import { ref, get, child } from "firebase/database";



const RecordLedger = ({array,keys,accounts}) => {
    
    
// console.log("🚀 ~ file: recordLedger.js ~ line 10 ~ RecordLedger ~ accounts", accounts,keys)

// console.log(array)


    const dbRef = ref(FirebaseStack()); 
    const [balance, setBalance] = useState(0)
    const [index, setIndex] = useState(0)
    // console.log("🚀 ~ file: recordLedger.js ~ line 17 ~ RecordLedger ~ index", index)
    // const [keyData, setKeyData] = useState(key)
    const [titles, setTitles] = useState()
    const [filterTitles, setFilterTitles] = useState([])
    // console.log("🚀 ~ file: recordLedger.js ~ line 13 ~ RecordLedger ~ filterTitles", filterTitles)
    // console.log( titles)
    //console.log("🚀 ~ file: TableContent.js ~ line 7 ~ TableContent ~ debitData", debitData)
    const [Entries, setEntries] = useState()
    // console.log("🚀 ~ file: recordLedger.js ~ line 23 ~ RecordLedger ~ Entries", Entries)
    // console.log("🚀 ~ file: TableContent.js ~ line 9 ~ TableContent ~ creditData", creditData)
    

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
              setTitles(snapshot.val())
              // console.log(firebaseData) 
              } else {
                console.log("No data available");
              }
            })
            .catch((error) => {
              console.error(error); 
            });
        };
      

    
  const entry = []

    var today = new Date();
    var date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;


    
    
    return (
        <>
        
            {
                
            // console.log(entry)
           }

            <thead>                
            <h1 className="ledger-title">{accounts[keys]} </h1>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Description/Account</th>
              <th>Ref</th>
              <th>Debit</th>
              <th>Credit</th>
              <th>Balance</th>
            </tr>
            </thead>


            
{/* 
            {
array ? (
    array.map((obj, key) => {
    console.log("line 92 ~ array.map ~ obj", obj[key].data.title)
      
        return (
            <> 
        </>
      );
      
  })
  ) : (
      <>
  <p>No data mapping</p>
  
  </>)

} */}


{
    






                
                array ? (
              array.map((obj, key) => {
                  //   console.log("🚀 ~ file: recordLedger.js ~ line 75 ~ array.map ~ obj", obj.data.title)
                  
                  // console.log(obj.data.title)
                  return (
                      <> 
                      {accounts[keys]===obj.data.title?(

                          <tbody>
                        <tr className=''>
                        <td></td>
                        <td>DD/MM</td>
                        <td>{obj.data.title}</td>
                        <td>--</td>
                        <td className={obj.data.type == "debit"? 'debit-text' : 'credit-text'}>{obj.data.type=='debit'?obj.data.amount:null}</td>
                        <td className={obj.data.type == "credit"? 'credit-text' : 'debit-text'}>{obj.data.type=='credit'?obj.data.amount:null}</td>
                        <td>{balance}</td>
                        </tr>
                        
                    </tbody>
                        )
                        :("hhhhh")}
                  </>
                );
                
            })
            ) : (
                <>
            <p>No data mapping</p>
            
            </>)
            
            
            
            
            
            
            
            
            
            }

                   

           
        </>
    )
}

export default RecordLedger