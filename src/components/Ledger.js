import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { ref, get, child } from "firebase/database";
import FirebaseStack from "../firebase-config";
import { Container } from "react-bootstrap";
import Record from "./record";
import RecordLedger from "./recordLedger";
// import TableContent from "react-bootstrap/TableContent";

function Ledger() {
  const [generalRecords, setGeneralRecords] = useState([]);
  const [stopData, setStopData] = useState(true);

  const dbRef = ref(FirebaseStack());
////=========================================================


  const getDataFromFirebase = async () => {
    get(child(dbRef, `record/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
        //   setFirebaseData(snapshot.val());
        //   setStopData(false);
        setGeneralRecords(snapshot.val())
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getDataFromFirebase();
  }, []);



  ////=========================================================
  return (
    <>
      <Container>
      <h2>Ledger</h2>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Description</th>
              <th>Ref</th>
              <th>Debit</th>
              <th>Credit</th>
              <th>Balance</th>
            </tr>
          </thead>

          {/* <tbody>               
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr>                
            </tbody> */}

          <tbody>
            {generalRecords ? (
              generalRecords.map((obj, key) => {
                return (
                  <>
                    <RecordLedger className='recorddivider' index={key+1} debit={obj.debit} credit={obj.credit}/>
                  </>
                );
              })
            ) : (
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
            )}
          </tbody>
        </Table>
        
      </Container>
    </>
  );
}

export default Ledger;
