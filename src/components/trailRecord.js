import React, { useEffect, useState, useContext } from "react";
// import TableContentSub from './TableContentSub'

import FirebaseStack from "../firebase-config";
import { ref, get, child, set } from "firebase/database";
import { TrailBalanceContext } from "../context/trailBalanceContext";
// import TrailSet from "./trailSet";

const balObj = {
  account: "",
  bal: "",
};

const RecordLedger = ({ array, keys, accounts }) => {
  // console.log("🚀 ~ file: trailRecord.js ~ line 10 ~ RecordLedger ~ array", array)
  // console.log("🚀 ~ file: trailRecord.js ~ line 10 ~ RecordLedger ~ accounts", accounts)
  // console.log("🚀 ~ file: trailRecord.js ~ line 10 ~ RecordLedger ~ keys", keys)
  // console.log("🚀 ~ file: recordLedger.js ~ line 8 ~ RecordLedger ~ accounts", accounts)
  // console.log("🚀 ~ file: recordLedger.js ~ line 10 ~ RecordLedger ~ accounts", accounts,keys)

  // console.log(array)

  const dbRef = ref(FirebaseStack());
  const [balance, setBalance] = useState(0);
  const [titles, setTitles] = useState();
  // console.log("🚀 ~ file: trailRecord.js ~ line 26 ~ RecordLedger ~ titles", titles)
  const [data, setData] = useState([]);
  // console.log("🚀 ~ file: trailRecord.js ~ line 27 ~ RecordLedger ~ data", data)
  
  var arrDr = [];

  const [debitDemo, setDebitDemo] = useState(0);
  // console.log("🚀 ~ file: trailRecord.js ~ line 20 ~ RecordLedger ~ debitDemo", debitDemo)

  const {
    DrArray,
    setDrArray,
    CrArray,
    setCrArray,
  } = useContext(TrailBalanceContext);
  // console.log("🚀 ~ file: trailRecord.js ~ line 39 ~ RecordLedger ~ balances", balances)

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

  // const entry = [];

  var today = new Date();
  var date = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

  var arrObj = [];
  array &&
    array.map((obj) => {
      arrObj.push(obj.data);
    });

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

  const propertyValues = Array(accounts[keys]);
  // console.log("🚀 ~ file: recordLedger.js ~ line 101 ~ RecordLedger ~ propertyValues", propertyValues)

  const filters = {
    title: propertyValues,
  };

  const filtered = filterPlainArray(arrObj, filters);

  // setData(filtered)
  //   console.log("🚀 ~ file: recordLedger.js ~ line 109 ~ RecordLedger ~ filtered", filtered)
  //   console.log("🚀 ~ file: recordLedger.js ~ line 108 ~ RecordLedger ~ filtered", filtered)
  //   console.log("🚀 ~ file: recordLedger.js ~ line 96 ~ RecordLedger ~ array", array)

  useEffect(() => {
    getTrailBalance();
  }, [filtered]);

  const getTrailBalance = () => {
    var bal = 0;
    var Dr = 0;
    var Cr = 0;
    filtered &&
      filtered.map((obj) => {
        if (obj.type === `debit`) {
          bal = Number(obj.amount) + bal;
          setBalance(bal);
        } else if (obj.type === "credit") {
          bal = bal - Number(obj.amount);
          setBalance(bal);
        }
      });
    // if (balance>0) {
    //   setDebitBal(current=>current+balance)
    // } else if (balance<0) {
    //   setCreditBal(current=>current+balance)
    // }
  };

  const loop = array.length;

  useEffect(() => {
  }, [filtered]);
  
  const getTotal = () => {
    // var balance = 0;
    var Dr = 0;
    var Cr = 0;

    filtered &&
      filtered.map((obj) => {
        if (balance > 0) {
          Dr = Dr + balance;
          DrArray.push({acc:obj.title,bal:balance})
          // console.log("🚀 ~ file: trailRecord.js ~ line 154 ~ filtered.map ~ DrArray", DrArray)
          // setDebitBal(balance)
          // setBalance(0)
          // console.log(Dr, Cr, balance);
        } else if (balance < 0) {
          Cr = Cr + balance;
          CrArray.push({acc:obj.title,bal:Math.abs(balance)})
          // console.log("🚀 ~ file: trailRecord.js ~ line 161 ~ filtered.map ~ CrArray", CrArray)
          // setCreditBal(balance)
          // console.log(Dr, Cr, balance);
        }
      });
    };
    
    getTotal();
  return (
    <>
      {balance === 0 ? null : (
        <tbody>
          <tr>
            <td>{keys+1}</td>
            <td colSpan={4} className="capitalize">
              {accounts[keys]}
            </td>
            <td className={balance > 0 ? "debit-text" : "credit-text"}>
              {balance > 0 ? "$ " + balance : null}
            </td>
            <td className={balance < 0 ? "credit-text" : "debit-text"}>
              {balance < 0 ? "$ " + Math.abs(balance) : null}
            </td>
          </tr>
          {/* <TrailSet data={balance} loop={loop} /> */}
        </tbody>
      )}
    </>
  );
};

export default RecordLedger;
