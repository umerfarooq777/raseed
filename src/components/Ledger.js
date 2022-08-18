import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { ref, get, child } from "firebase/database";
import FirebaseStack from "../firebase-config";
import { Container } from "react-bootstrap";
import RecordLedger from "./recordLedger";
import Loader from "./loader";
// import TableContent from "react-bootstrap/TableContent";

function Ledger() {
  const [generalRecords, setGeneralRecords] = useState([]);
  const [firebaseData,setFirebaseData] =useState([]);
  // console.log(firebaseData)

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
  


const loop = generalRecords.length


  // console.log(generalRecords[0].debit)

  ////=========================================================
  return (
    <>
      <Container>
    
      {/* for(i=0;  i =< generalRecords.length ; i++){
        <p>{i}</p>
      } */}
  

      <h2 className="text-center">LEDGER</h2>
        <Table striped bordered hover variant="dark">
            

          {/* <tbody>               
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Loading...</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>                
            </tbody> */}

          
            {titles ? (
              titles.map((obj, key) => {
                
                // console.log("🚀 ~ file: ledger.js ~ line 109 ~ titles.map ~ titles", titles)
                
                
                let account = Object.assign({},titles)
                
                
                
                return (
                  <>
                    <RecordLedger array={firebaseData} keys={key} accounts={account} />
                  </>
                );

              })
            ) : (
            <>
            <Loader/>
              </>
            )}
         
        </Table>
        
      </Container>
    </>
  );
}

export default Ledger;
