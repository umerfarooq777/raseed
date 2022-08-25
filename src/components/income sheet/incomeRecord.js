import React, { useEffect, useState } from "react";
// import TableContentSub from './TableContentSub'

import FirebaseStack from "../../firebase-config";
import { ref, get, child } from "firebase/database";

const RecordLedger = ({ array, keys, accounts, bal }) => {
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

  var arrObj = [];
  array &&
    array.map((obj) => {
      arrObj.push(obj.data);
    });

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

  useEffect(() => {
    getTrailBalance();
    getTotal();
  }, [filtered]);

  const getTrailBalance = () => {
    var balance = 0;
    filtered &&
      filtered.map((obj) => {
        // console.log("🚀 ~ file: incomeRecord.js ~ line 90 ~ filtered.map ~ obj", obj)
        if (obj.type === `debit`) {
          balance = balance + Number(obj.amount);
          setBalance(balance);
        } else if (obj.type === "credit") {
          balance = Number(obj.amount) + balance;
          setBalance(balance);
        }
      });
  };


  const getTotal = () => {
    var total = 0;
    filtered &&
      filtered.map((obj) => {
        // console.log("🚀 ~ file: incomeRecord.js ~ line 90 ~ filtered.map ~ obj", obj)
        if (obj.type === "debit") {
          total = total + Number(obj.amount);
          // setBalance(balance);
          console.log(total)
        } else if (obj.type === "credit") {
          total = Number(obj.amount) - total;
          // setBalance(balance);
        }
      });
  };

  return (
    <>
     

      {filtered ? (
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
                      obj.type === "debit" ? "debit-text" : "credit-text"
                    }
                  >
                    {obj.type === "debit" ? obj.amount : null}
                  </td>
                  <td
                    className={
                      obj.type === "credit" ? "credit-text" : "debit-text"
                    }
                  >
                    {obj.type === "credit" ? obj.amount : null}
                  </td>
                  <td>
                    {/* {obj.data.type==='debit'?
                            setBalance(balance+Number(obj.data.amount)):
                            setBalance(balance-Number(obj.data.amount))} */}
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
      )}

      <tbody>
        <tr>
          <td colSpan={5}></td>
          <td className="balanace">
            {/* {obj.data.type==='debit'?
                            setBalance(balance+Number(obj.data.amount)):
                            setBalance(balance-Number(obj.data.amount))} */}
            {balance}
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default RecordLedger;
