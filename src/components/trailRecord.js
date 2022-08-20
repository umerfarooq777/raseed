import React, { useEffect, useState } from "react";
// import TableContentSub from './TableContentSub'

import FirebaseStack from "../firebase-config";
import { ref, get, child } from "firebase/database";

const TrailRecord = ({ array, keys, accounts, bal }) => {
  // console.log("🚀 ~ file: recordLedger.js ~ line 8 ~ RecordLedger ~ accounts", accounts)
  // console.log("🚀 ~ file: recordLedger.js ~ line 10 ~ RecordLedger ~ accounts", accounts,keys)

  // console.log(array)

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
  //   console.log("🚀 ~ file: recordLedger.js ~ line 109 ~ RecordLedger ~ filtered", filtered)
  //   console.log("🚀 ~ file: recordLedger.js ~ line 108 ~ RecordLedger ~ filtered", filtered)
  //   console.log("🚀 ~ file: recordLedger.js ~ line 96 ~ RecordLedger ~ array", array)

  useEffect(() => {
    getTrailBalance();
  }, [filtered]);

  const getTrailBalance = () => {
    var balance = 0;
    filtered &&
      filtered.map((obj) => {
        if (obj.type === `debit`) {
          balance = Number(obj.amount) + balance;
          setBalance(balance);
        } else if (obj.type === "credit") {
          balance = balance - Number(obj.amount);
          setBalance(balance);
        }
      });
  };

  return (
    <>
      {
        // console.log(entry)
      }

      <thead className="account-card">
        {/* <tr>
          <th colSpan={6}>
            <h4 className="ledger-title capitalize text-center  ">
              {accounts[keys]}
            </h4>
          </th>
        </tr> */}
        <tr>
          <th colSpan={4}>Account</th>
          <th className="text-center">Debit</th>
          <th className="text-center">Credit</th>
        </tr>
      </thead>

      <tbody>
        <tr className="">
          <td className="capitalize">
            {/* {obj.title} */}
            </td>
          <td></td>
          <td></td>
          <td></td>
          <td
            // className={
            //   obj.type === "debit" ? "debit-text text-center" : "credit-text"
            // }
          >
            {/* {obj.type === "debit" ? obj.amount : null} */}
          </td>
          <td
            // className={
              // obj.type === "credit" ? "credit-text text-center" : "debit-text"
            // }
          >
            {/* {obj.type === "credit" ? obj.amount : null} */}
          </td>
        </tr>
      </tbody>

{/* =========================================================Total */}
      <tbody>
        <tr>
          <td colSpan={4}></td>
          <td className="balanace text-center">
            {/* {balance} */}00.00
            </td>
          <td className="balanace text-center">
            {/* {balance} */}00.00
            </td>
        </tr>
      </tbody>
    </>
  );
};

export default TrailRecord;
