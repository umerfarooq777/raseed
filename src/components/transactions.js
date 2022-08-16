import React, { useEffect, useState } from 'react';
import FirebaseStack from '../firebase-config';
import {ref,set, get, child} from "firebase/database"


export default function Transactions() {
    



    const [transactions, setTransactions] = useState([])
    const [transactionsLen, setTransactionsLen] = useState("0")
 
    const dbRef = ref(FirebaseStack());


useEffect(() => {
    getDataFromFirebase();
  }, []);
  
  
const getDataFromFirebase = async () => {
  get(child(dbRef,`transactions/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setTransactions(snapshot.val())
        setTransactionsLen(transactionsLen.length)
      console.log(transactions)
      console.log(transactions.length)
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

return(<>

<p>{transactions}</p>

</>);




}