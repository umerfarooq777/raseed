import React, { useEffect, useState,useContext } from "react";
import Table from "react-bootstrap/Table";
import { ref, get, child } from "firebase/database";
import FirebaseStack from "../../firebase-config";
import { Container, Row, Col } from "react-bootstrap";
import RecordLedger from "./incomeRecord";
import RecordLedger1 from "./capitalRec";
import Loader from "../loader";
import { IncomeContext } from "../../context/incomeContext";
// import TableContent from "react-bootstrap/TableContent";

function IncomeSheet() {
  const [generalRecords, setGeneralRecords] = useState([]);
  const [firebaseData, setFirebaseData] = useState([]);
  // console.log(firebaseData)

  
  const { IncomeArray,EquityArray,EquityTotal,setEquityTotal} = useContext(IncomeContext);
  
  let IncomeArrayFiltered = IncomeArray.filter(
    (ele, ind) =>
      ind ===
      IncomeArray.findIndex((elem) => elem.acc === ele.acc && elem.bal === ele.bal)
  );
  // console.log("🚀 ~ file: incomeSheet.js ~ line 25 ~ IncomeSheet ~ IncomeArrayFiltered", IncomeArrayFiltered)
  // console.log("🚀 ~ file: incomeSheet.js ~ line 18 ~ IncomeSheet ~ IncomeArray", IncomeArray)


  // console.log("🚀 ~ file: incomeSheet.js ~ line 30 ~ IncomeSheet ~ EquityArray", EquityArray)
  
  
  let EquityArrayFiltered = EquityArray.filter(
    (ele, ind) =>
      ind ===
      EquityArray.findIndex((elem) => elem.acc === ele.acc && elem.bal === ele.bal)
  );
  // console.log("🚀 ~ file: incomeSheet.js ~ line 38 ~ IncomeSheet ~ EquityArrayFiltered", EquityArrayFiltered)
 


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













  var IncomeTotal = -(IncomeArrayFiltered.reduce((accumulator, object) => {
    return accumulator + object.bal;
  }, 0))


  var Equity = EquityArrayFiltered.reduce((accumulator, object) => {
    return accumulator + object.bal;
  }, 0); 

  setEquityTotal((Equity+IncomeTotal)) 
  // EquityTotal = Equity+IncomeTotal;
  useEffect(()=>{
      setEquityTotal((Equity+IncomeTotal))

    },[EquityTotal])



  ////=========================================================
  return (
    <>
      <Container>
        
        <Row className="d-flex">
          <Col>
            {/* ============================================================== Income Statement */}
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
                  <td colSpan={5} className={IncomeTotal >= 0 ? "balance-total-debit" : "balance-total-credit"}>{IncomeTotal >= 0 ? "Net Income" : "Net Loss"}</td>
                  <td className={IncomeTotal >= 0 ? "balance-total-debit" : "balance-total-credit"}>{IncomeTotal}</td>
                </tr>
              </tbody>
            </Table>
          </Col>

          {/* ==============================================================Owner's Equity And Capital */}
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
                     Capital And Drawings
                    </h4>
                  </th>
                </tr>
                <tr>
                  <th colSpan={3}>Description/Account</th>
                  <th>Debit</th>
                  <th>Credit</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                  {
                    IncomeTotal>=0
                    ?
                    <tr>
                        <td colSpan={3} className="capitalize">{IncomeTotal >= 0 ? "Net Income from Income Statement" : "Net Loss from Income Statement"}</td> 
                        <td className={IncomeTotal < 0 ? "credit-text" : "debit-text"}>{IncomeTotal>=0?IncomeTotal:null}</td>
                        <td className={IncomeTotal < 0 ? "credit-text" : "debit-text"}>{IncomeTotal<0?IncomeTotal:null}</td>
                        <td className="balanace"></td>
                      </tr>
                    :
                    null
                  }



                      
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


                  {
                    IncomeTotal<0
                    ?
                    <tr className='recorddivider'>
                    <td colSpan={3} className="capitalize">{IncomeTotal > 0 ? "Net Income from Income Statement" : "Net Loss from Income Statement"}</td> 
                        <td className={IncomeTotal < 0 ? "credit-text" : "debit-text"}>{IncomeTotal>0?IncomeTotal:null}</td>
                        <td className={IncomeTotal < 0 ? "credit-text" : "debit-text"}>{IncomeTotal<0?IncomeTotal:null}</td>
                        <td className="balanace"></td>
                      </tr>
                    :
                    null
                  }


                <tr>
                  <td colSpan={5} className={EquityTotal >= 0 ? "balance-total-debit" : "balance-total-credit"}>Owner's Total Equity</td>
                  <td className={EquityTotal >= 0 ? "balance-total-debit" : "balance-total-credit"}>{EquityTotal}</td>
                </tr>
                    
              </tbody>
            </Table>
          </Col>
        </Row>

        
      </Container>
    </>
  );
}

export default IncomeSheet;
