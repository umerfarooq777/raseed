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


  const [debitBal, setDebitBal] = useState("");
  const [creditBal, setCreditBal] = useState("");


  const [mode, setMode] = useState(false);

  
  const [DrArray, setDrArray] = useState([]);
  let DrArrayFiltered = DrArray.filter( (ele, ind) => ind === DrArray.findIndex( elem => elem.acc === ele.acc && elem.bal === ele.bal))
  //console.log("🚀 ~ file: trail.js ~ line 27 ~ TrailBalanceSheet ~ DrArrayFiltered", DrArrayFiltered)
  
  







  const [CrArray, setCrArray] = useState([]);
 let CrArrayFiltered = CrArray.filter( (ele, ind) => ind === CrArray.findIndex( elem => elem.acc === ele.acc && elem.bal === ele.bal))








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
    getTotal();
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


  useEffect(() => {
    getTotal();
  }, []);

  const getTotal = () => {


    
    
    let countDr=0;
    let countCr=0;
    
    if(DrArrayFiltered){
      for (let index = 0; index < DrArrayFiltered.length; index++) {
        countDr=countDr+DrArrayFiltered[index].bal        
      }
      setDebitBal(countDr) 
      setMode(true)
      console.log("🚀", countDr)

    } 
    else{
      console.log("no data");
    }
    
    
    if(CrArrayFiltered){
        for (let index = 0; index < CrArrayFiltered.length; index++) {
          countCr=countCr+CrArrayFiltered[index].bal        
        }
        setCreditBal(countCr)
        setMode(true) 
        console.log("🚀", countCr)
      }
      else{
        console.log("no data");
      }
      
    };
// setDebitBal(countDr)
// setCreditBal(countCr)   

  ////=========================================================
  return (
    <>
      <Container>
        <TrailBalanceContext.Provider
          value={{DrArray,setDrArray,CrArray,setCrArray }}
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
                <th>#</th>
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
{
  mode===true? 
  
  
            <tbody>
              <tr>
                <td></td>
                <td colSpan={4} className="capitalize"></td>
                <td className="balanace">{debitBal>0? debitBal:"--"}</td>
                <td className="balanace">{creditBal>0? creditBal :"--"}</td>
              </tr>
               
              <tr>
                <td colSpan={7} className="capitalize text-center">{debitBal===creditBal?"BALANCED":"UNBALANCED"}</td>
              </tr>
            </tbody>
  :
  <p>{mode}</p>
}
          </Table>
        </TrailBalanceContext.Provider>
      </Container>
    </>
  );
}

export default TrailBalanceSheet;
