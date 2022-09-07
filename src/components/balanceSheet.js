import React, { useEffect, useState, useContext } from "react";
import Table from "react-bootstrap/Table";
import { ref, get, child } from "firebase/database";
import FirebaseStack from "../firebase-config";
import { Container, Col, Row } from "react-bootstrap";
import Loader from "./loader";
import BalanceSheetRecords from "./balanceSheetRecords";
import BalanceSheetRecords1 from "./balanceSheetRecords1";
import IncomeSheet from "./income sheet/incomeSheet";
import { IncomeContext } from "../context/incomeContext";
// import TableContent from "react-bootstrap/TableContent";

function BalanceSheet() { 
  const { EquityTotal, AssetArray, LiabilityArray } = useContext(IncomeContext);
  // console.log("🚀 ~ file: balanceSheet.js ~ line 15 ~ BalanceSheet ~ AssetArray", AssetArray)
  const [firebaseData, setFirebaseData] = useState([]);
 
  const [debitBal, setDebitBal] = useState(0);
  const [creditBal, setCreditBal] = useState(0);
  const [balance, setBalance] = useState(0);
  const [titles, setTitles] = useState([]);
  const [titles1, setTitles1] = useState(["liability", "equity"]);
  const dbRef = ref(FirebaseStack());
  ////=========================================================

  useEffect(() => {
    getDataFromFirebase();
  }, []);

  const getDataFromFirebase = async () => {
    get(child(dbRef, `transactions/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setFirebaseData(snapshot.val());
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
          setTitles(snapshot.val());

        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //================================================

  var arrObj = [];
  firebaseData &&
    firebaseData.map((obj) => {
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

  const propertyValues = Array("asset");
  const propertyValues1 = Array("liability");

  const filters = {
    category: propertyValues,
  };
  const filters1 = {
    category: propertyValues1,
  };
  const filtered = filterPlainArray(arrObj, filters);
  const filtered1 = filterPlainArray(arrObj, filters1);

  let AssetArrayFiltered = AssetArray.filter(
    (ele, ind) =>
      ind ===
      AssetArray.findIndex(
        (elem) => elem.acc === ele.acc && elem.bal === ele.bal
      )
  );
  // console.log("🚀 ~ file: balanceSheet.js ~ line 102 ~ BalanceSheet ~ AssetArrayFiltered", AssetArrayFiltered)

  // console.log("🚀 ~ file: balanceSheet.js ~ line 106 ~ AssetTotal ~ AssetTotal", AssetTotal)
  
  let LiabilityArrayFiltered = LiabilityArray.filter(
    (ele, ind) =>
    ind ===
    LiabilityArray.findIndex(
      (elem) => elem.acc === ele.acc && elem.bal === ele.bal
      )
      );
      
      var AssetTotal = AssetArrayFiltered.reduce((accumulator, object) => {
        return accumulator + object.bal;
      }, 0);



  var LiabilityTotal = -(LiabilityArrayFiltered.reduce((accumulator, object) => {
    return accumulator + object.bal;
  }, 0));  
  // console.log("🚀 ~ file: balanceSheet.js ~ line 118 ~ LiabilityTotal ~ LiabilityTotal", LiabilityTotal)

// useEffect(() => {
//   calRes();
// }, [ LiabilityArrayFiltered ]);


//   function calRes() {
//     var AssetTotal = AssetArrayFiltered.reduce((accumulator, object) => {
//     return accumulator + object.bal;
//   }, 0);



// var LiabilityTotal = -(LiabilityArrayFiltered.reduce((accumulator, object) => {
// return accumulator + object.bal;
// }, 0));
// console.log("clicked")
//   } 


// useEffect(() => {
//   const timer = setTimeout(() => {
//     console.log('This will run after 1 second!')
//   }, 5000);
//   return () => clearTimeout(timer);
// }, [AssetArrayFiltered]); 

  ////=========================================================
  return (
    <>
      <Container>
        {}
     
        <IncomeSheet /> 

        <h1 className="text-center">Balance Sheet</h1>

        <Row>
          <Col md={6}>
            <Table striped bordered hover variant="dark" className="table-card">
              <thead className="account-card">
                <tr>
                  <th colSpan={7}>
                    <h4 className="ledger-title capitalize text-center  ">
                      Assets
                    </h4>
                  </th>
                </tr>
                <tr>
                  <th colSpan={5}>Description/Account</th>
                  <th></th>
                  <th>Total Balance</th>
                </tr>   
              </thead>   
              {filtered ? (
                filtered.map((obj, key) => {
                  let account = Object.assign({}, titles);
                  // console.log("🚀 ~ file: balanceSheet.js ~ line 183 ~ filtered.map ~ account", account)
                  // console.log("🚀 ~ file: balanceSheet.js ~ line 195 ~ filtered.map ~ filtered", key)
                  // console.log("🚀 ~ file: balanceSheet.js ~ line 196 ~ filtered.map ~ filtered", filtered)

                  return (
                    <>
                      <BalanceSheetRecords
                        array={filtered}
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
                  <td
                    colSpan={5}
                    className={
                      AssetTotal === LiabilityTotal + EquityTotal
                        ? "capitalize balance-total-debit"
                        : "capitalize balance-total-credit"
                    } 
                  > 
                    Total
                  </td>
                  <td></td>
                  <td
                    className={
                      AssetTotal === LiabilityTotal + EquityTotal
                        ? "text-center capitalize balance-total-debit"
                        : "text-center capitalize balance-total-credit"
                    }
                  >
                    {AssetTotal}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>

          <Col md={6}>
            <Table striped bordered hover variant="dark" className="table-card">
              <thead className="account-card">
                <tr>
                  <th colSpan={7}>
                    <h4 className="ledger-title capitalize text-center  ">
                      Equity And Liabilities
                    </h4>
                  </th>
                </tr>
                <tr>
                  <th colSpan={5}>Description/Account</th>
                  <th></th>
                  <th>Total Balance</th>
                </tr>
              </thead>
              {filtered ? (
                filtered.map((obj, key) => {
                  let account = Object.assign({}, titles);

                  return (
                    <>
                      <BalanceSheetRecords1 
                        array={filtered1}
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
                  <td colSpan={5} className="capitalize">
                    =============Total Liability
                  </td>
                  <td></td>
                  <td>{LiabilityTotal}</td>
                </tr>
                <tr>
                  <td colSpan={5} className="capitalize">
                    ============= Ending Capital
                  </td>
                  <td></td>
                  <td>{EquityTotal}</td>
                </tr>

                <tr>
                  <td
                    colSpan={5}
                    className={
                      AssetTotal === LiabilityTotal + EquityTotal
                        ? "capitalize balance-total-debit"
                        : "capitalize balance-total-credit"
                    }
                  >
                    Total
                  </td>
                  <td></td>
                  <td
                    className={
                      AssetTotal === LiabilityTotal + EquityTotal
                        ? "text-center capitalize balance-total-debit"
                        : "text-center capitalize balance-total-credit"
                    }
                  > 
                    {LiabilityTotal + EquityTotal}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <h1
            className={
              AssetTotal === LiabilityTotal + EquityTotal
                ? "text-center capitalize balance-total-debit"
                : "text-center capitalize balance-total-credit"
            }
          >
            {AssetTotal === LiabilityTotal + EquityTotal
              ? "BALANCED"
              : "UNBALANCED"}
          </h1>  
        </Row>
        {/* <Row>
        <button
        >Click to reload!</button>
        </Row> */}
      </Container>
    </>
  );
}

export default BalanceSheet;
