import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { ref, get, child } from "firebase/database";
import FirebaseStack from "../firebase-config";
import { Container } from "react-bootstrap";
import Record from "./record";
// import TableContent from "react-bootstrap/TableContent";

function GeneralRecords() {
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
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Account Name</th>
              <th>Amount</th>
              <th>Code</th>
              <th>Debit</th>
              <th>Credit</th>
              <th>Date</th>
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
                var index=key;
                console.log("🚀 ~ file: generalRecords.js ~ line 86 ~ generalRecords.map ~ obj", obj)
                return (
                  <>
                    <Record key={key} debit={obj.debit} credit={obj.credit}/>
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

export default GeneralRecords;
