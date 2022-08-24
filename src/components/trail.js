import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { ref, get, child } from "firebase/database";
import FirebaseStack from "../firebase-config";
import { Container } from "react-bootstrap";
import RecordLedger from "./trailRecord";
import Loader from "./loader";
// import TableContent from "react-bootstrap/TableContent";

function Ledger() {
  const [generalRecords, setGeneralRecords] = useState([]);
  const [firebaseData,setFirebaseData] =useState([]);
  // console.log(firebaseData)

  const [debitBal, setDebitBal] = useState(0)
  const [creditBal, setCreditBal] = useState(0)
  const [balance, setBalance] = useState(0)
  const [titles, setTitles] = useState()
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
        setFirebaseData(snapshot.val())
        
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

    useEffect(()=>{
            getTrailBalance()
        },[titles])
    
        const getTrailBalance = () => {
            // var balance = 0;
            firebaseData && firebaseData.map((obj) => {
                if (obj.data.type === 'debit') {
                  setBalance(balance+(Number(obj.data.amount)))
                }
                else if(obj.data.type === 'credit'){
                  setBalance(balance-(Number(obj.data.amount)))
                }
            })
            setBalance(balance)
        }
  

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

                   <Table striped bordered hover variant="dark" className="table-card mt-4">
                        <thead className="account-card">
                        <tr>
                          <th colSpan={7}>
                            <h4 className="ledger-title capitalize text-center  ">
                              Trail Balance Sheet
                            </h4>
                          </th>
                        </tr>


                        <tr>
                          <th>Date</th>
                          <th colSpan={4} >Description/Account</th>
                          <th>Debit</th>
                          <th>Credit</th>
                        </tr>
                      </thead>          
         

            {titles ? (
              titles.map((obj, key) => {
                
                let account = Object.assign({},titles)
                
                
                
                return (
                  <> 
                  
                  
                    <RecordLedger array={firebaseData} keys={key} accounts={account} bal={balance} />
                  
         
                   
                  </>
                );

              })
            ) : (
            <>
            <Loader/>
              </>
            )}

                  <tbody>
                    <tr>
                      <td></td>
                      <td colSpan={4} className="capitalize"></td> 
                      <td className="balanace">
                        debit total
                      </td> 
                      <td className="balanace">
                        credit total
                      </td>
                    </tr>
                  </tbody>  
            </Table>
      </Container>
    </>
  );
}

export default Ledger;
