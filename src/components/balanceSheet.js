import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { ref, get, child } from "firebase/database";
import FirebaseStack from "../firebase-config";
import { Container, Col, Row } from "react-bootstrap";
import RecordLedger from "./recordLedger";
import Loader from "./loader";
import BalanceSheetRecords from "./balanceSheetRecords";
import IncomeSheet from "./income sheet/incomeSheet";
// import TableContent from "react-bootstrap/TableContent";

function BalanceSheet() {
  const [generalRecords, setGeneralRecords] = useState([]);
  const [firebaseData, setFirebaseData] = useState([]);
  // console.log(firebaseData)

  const [debitBal, setDebitBal] = useState(0);
  const [creditBal, setCreditBal] = useState(0);
  const [balance, setBalance] = useState(0);
  const [titles, setTitles] = useState(["Assets"]);
  const [titles1, setTitles1] = useState(["Liabilities", "Equity"]);
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

  // useEffect(() => {
  //   getTrailBalance();
  // }, [titles]);

  // const getTrailBalance = () => {
  //   // var balance = 0;
  //   firebaseData &&
  //     firebaseData.map((obj) => {
  //       if (obj.data.type === "debit") {
  //         setBalance(balance + Number(obj.data.amount));
  //       } else if (obj.data.type === "credit") {
  //         setBalance(balance - Number(obj.data.amount));
  //       }
  //     });
  //   setBalance(balance);
  // };

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
        {}

   
        <IncomeSheet/>
        
 
        <h1 className="text-center">Balance Sheet</h1>


        <Row>
          <Col md={6}>
            {titles ? (
              titles.map((obj, key) => {
                let account = Object.assign({}, titles);

                return (
                  <>




                    <Table
                      striped
                      bordered
                      hover
                      variant="dark"
                      className="table-card"
                    >
                      <BalanceSheetRecords
                        array={firebaseData}
                        keys={key}
                        accounts={account}
                        bal={balance}
                      />
                    </Table>
                  </>
                );
              })
            ) : (
              <>
                <Loader />
              </>
            )}
          </Col>

          <Col md={6}>
            {titles1 ? (
              titles1.map((obj, key) => {
                let account = Object.assign({}, titles1);

                return (
                  <>
                    <Table
                      striped
                      bordered
                      hover
                      variant="dark"
                      className="table-card"
                    >
                      <BalanceSheetRecords
                        array={firebaseData}
                        keys={key}
                        accounts={account}
                        bal={balance}
                      />
                    </Table>
                  </>
                );
              })
            ) : (
              <>
                <Loader />
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default BalanceSheet;
