import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { ref, get, child } from "firebase/database";
import FirebaseStack from "../firebase-config";
import { Container } from "react-bootstrap";
// import TableContent from "react-bootstrap/TableContent";

function GeneralRecords() {
  const [generalRecords, setGeneralRecords] = useState([]);
  const [stopData, setStopData] = useState(true);

  const dbRef = ref(FirebaseStack());

  // const getDataFromFirebase = async () => {
  //     get(child(dbRef, `record/`)).then((snapshot) => {
  //         if (snapshot.exists()) {

  //             setGeneralRecords(snapshot.val())
  //             console.log("🚀 ~ file: generalRecords.js ~ line 22 ~ get ~ snapshot", snapshot)
  //             console.log("🚀 ~ file: generalRecords.js ~ line 11 ~ GeneralRecords ~ generalRecords", generalRecords)
  //             setStopData(false)

  //         } else {
  //             console.log("No data available");
  //         }
  //     }).catch((error) => {
  //         console.error(error);
  //     });
  // }

  // useEffect(() => {
  //     getDataFromFirebase()
  // }, [])

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
                console.log("🚀 ~ file: generalRecords.js ~ line 85 ~ generalRecords.map ~ obj", obj)
                return (
                  <>
                    <tr key={key} debit={obj.debit} credit={obj.credit}>
                      <td>1</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>@mdo</td>
                      <td>@mdo</td>
                      <td>@mdo</td>
                    </tr>
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
