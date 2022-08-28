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
  const [titles, setTitles] = useState([]);
  // console.log("🚀 ~ file: ledger.js ~ line 15 ~ Ledger ~ titles", titles)
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
//================================================




var arrObj = []
firebaseData && firebaseData.map((obj)=>{
  arrObj.push(obj.data)
})


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


// const propertyCategory = Array(["asset"]);
const propertyValues = Array("asset");
// console.log("🚀 ~ file: recordLedger.js ~ line 101 ~ RecordLedger ~ propertyValues", propertyValues)


const filters = {    
category: propertyValues,
  // category:propertyCategory,
};

const filtered = filterPlainArray(arrObj, filters);
    // console.log("🚀 ~ file: balanceSheet.js ~ line 109 ~ BalanceSheet ~ filtered", filtered)
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
                    <Table
                      striped
                      bordered
                      hover
                      variant="dark"
                      className="table-card"
                    ><thead className="account-card">
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
                // console.log("🚀 ~ file: balanceSheet.js ~ line 176 ~ filtered.map ~ obj", obj)
                let account = Object.assign({}, titles);
// console.log("🚀 ~ file: balanceSheet.js ~ line 198 ~ filtered.map ~ filtered", filtered)
                // console.log("🚀 ~ file: balanceSheet.js ~ line 119 ~ titles.map ~ titles", titles)
                // console.log("🚀 ~ file: balanceSheet.js ~ line 119 ~ titles.map ~ account", account)

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
                    </Table>
          </Col>

          <Col md={6}>
            {/* {titles1 ? (
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
            )} */}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default BalanceSheet;
