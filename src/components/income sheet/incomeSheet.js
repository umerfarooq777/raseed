import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { ref, get, child } from "firebase/database";
import FirebaseStack from "../../firebase-config";
import { Container, Row, Col } from "react-bootstrap";
import RecordLedger from "./incomeRecord";
import RecordLedger1 from "./capitalRec";
import Loader from "../loader";
// import TableContent from "react-bootstrap/TableContent";

function IncomeSheet() {
  const [generalRecords, setGeneralRecords] = useState([]);
  const [firebaseData, setFirebaseData] = useState([]);
  // console.log(firebaseData)

  const [debitBal, setDebitBal] = useState(0);
  const [creditBal, setCreditBal] = useState(0);
  const [balance, setBalance] = useState(0);
  const [titles, setTitles] = useState(["revenue", "expense"]);
  const [titles1, setTitles1] = useState(["equity", "drawing"]);
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

  // useEffect(() => {
  //   getAccountsFromFirebase();
  // }, []);

  //   const getAccountsFromFirebase = async () => {
  //     get(child(dbRef, `accounts/`))
  //       .then((snapshot) => {
  //         if (snapshot.exists()) {
  //         //   setFirebaseData(snapshot.val());
  //         //   setStopData(false);
  //         // setGeneralRecords(snapshot.val())
  //         setTitles(snapshot.val())

  //         // console.log(firebaseData)
  //         } else {
  //           console.log("No data available");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   };

  // useEffect(()=>{
  //         getTrailBalance()
  //     },[titles])

  //     const getTrailBalance = () => {
  //         // var balance = 0;
  //         firebaseData && firebaseData.map((obj) => {
  //             if (obj.data.type === 'debit') {
  //               setBalance(balance+(Number(obj.data.amount)))
  //             }
  //             else if(obj.data.type === 'credit'){
  //               setBalance(balance-(Number(obj.data.amount)))
  //             }
  //         })
  //         setBalance(balance)
  //     }

  // for (let index = 0; index < firebaseData.length; index++) {
  //   // console.log("🚀 ~ file: ledger.js ~ line 104 ~ titles.map ~ obj", firebaseData[index].data.title)

  //     if(obj == firebaseData[index].data.title){
  //       setBalance(balance+Number(firebaseData[index].data.amount))
  //   }else{
  //       setBalance(balance-Number(firebaseData[index].data.amount))
  //   }
  // }

  // console.log(generalRecords[0].debit)

  ////=========================================================
  return (
    <>
      <Container>
        <Row className="d-flex">
          <Col>
            {/* <h2 className="text-center">Income Statement</h2> */}
            <Table
              striped
              bordered
              hover
              variant="dark"
              className="table-card mt-4"
            >
              <thead className="account-card">
                <tr>
                  <th colSpan={6}>
                    <h4 className="ledger-title capitalize text-center  ">
                      Income Statement
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
                  <td colSpan={5}>Net Income/Net Loss</td>
                  <td className="balanace">{balance}</td>
                </tr>
              </tbody>
            </Table>
          </Col>

          <Col>
            <Table
              striped
              bordered
              hover
              variant="dark"
              className="table-card mt-4"
            >
              <thead className="account-card">
                <tr>
                  <th colSpan={6}>
                    <h4 className="ledger-title capitalize text-center  ">
                      Owner's Equity And Capital
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
              </thead>
              {titles1 ? (
                titles1.map((obj, key) => {
                  // console.log("🚀 ~ file: incomeSheet.js ~ line 163 ~ titles1.map ~ titles1", titles1)
                  let account = Object.assign({}, titles1);
                  // console.log("🚀 ~ file: incomeSheet.js ~ line 144 ~ titles1.map ~ account", account)

                  return (
                    <>
                      <RecordLedger1
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
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default IncomeSheet;
