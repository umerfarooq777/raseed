import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { ref, get, child } from "firebase/database";
import FirebaseStack from "../firebase-config";
import { Container } from "react-bootstrap";
import RecordLedger from "./trailRecord";
import Loader from "./loader";
import { TrailBalanceContext } from "../context/trailBalanceContext";
// import TableContent from "react-bootstrap/TableContent";

function TrailBalanceSheet() {
  const [generalRecords, setGeneralRecords] = useState([]);
  const [firebaseData, setFirebaseData] = useState([]);
  // console.log(firebaseData)


  const [balances, setBalances] = useState([]);
  // console.log("🚀 ~ file: trail.js ~ line 18 ~ TrailBalanceSheet ~ balances", balances)


  const [debitBal, setDebitBal] = useState(0);

  // console.log("🚀 ~ file: trail.js ~ line 17 ~ Ledger ~ debitBal", debitBal)
  const [creditBal, setCreditBal] = useState(0);

  const [balance, setBalance] = useState(0);
  // console.log("🚀 ~ file: trail.js ~ line 22 ~ Ledger ~ balance", balance)
  const [titles, setTitles] = useState();
  // console.log("🚀 ~ file: ledger.js ~ line 15 ~ Ledger ~ titles", titles)
  const dbRef = ref(FirebaseStack());
  ////=========================================================

  useEffect(() => {
    getDataFromFirebase();
  }, []);

  const getDataFromFirebase = async () => {
    get(child(dbRef, `transactions/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          //   setFirebaseData(snapshot.val());
          //   setStopData(false);
          // setGeneralRecords(snapshot.val())
          setFirebaseData(snapshot.val());

          // console.log(firebaseData)
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

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

  useEffect(() => {
    getTrailBalance();
  }, [titles]);

  const getTrailBalance = () => {
    // var balance = 0;
    firebaseData &&
      firebaseData.map((obj) => {
        // console.log("🚀 ~ file: trail.js ~ line 82 ~ firebaseData&&firebaseData.map ~ obj", obj,)
        if (obj.data.type === "debit") {
          setBalance(balance + Number(obj.data.amount));
        } else if (obj.data.type === "credit") {
          setBalance(balance - Number(obj.data.amount));
        }
      });
    setBalance(balance);
  };

  ////=========================================================
  return (
    <>
      <Container>
        <TrailBalanceContext.Provider
          value={{ debitBal, setDebitBal, creditBal, setCreditBal,balances,setBalances }}
        >
          <Table
            striped
            bordered
            hover
            variant="dark"
            className="table-card mt-4"
          >
            <thead className="account-card">
              <tr>
                <th colSpan={7}>
                  <h4 className="ledger-title capitalize text-center ">
                    Trail Balance Sheet
                  </h4>
                </th>
              </tr>

              <tr>
                <th>Date</th>
                <th colSpan={4}>Description/Account</th>
                <th>Debit</th>
                <th>Credit</th>
              </tr>
            </thead>

            {titles ? (
              titles.map((obj, key) => {
                let account = Object.assign({}, titles);

                return (
                  <>
                    <RecordLedger
                      array={firebaseData}
                      keys={key}
                      accounts={account}
                      bal={balance}
                    />
                  </>
                );
              })
            ) : (
              <>
                <Loader />
              </>
            )}

            <tbody>
              <tr>
                <td></td>
                <td colSpan={4} className="capitalize"></td>
                <td className="balanace">{debitBal}</td>
                <td className="balanace">{creditBal}</td>
              </tr>
            </tbody>
          </Table>
        </TrailBalanceContext.Provider>
      </Container>
    </>
  );
}

export default TrailBalanceSheet;
