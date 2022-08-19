import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { ref, get, child } from "firebase/database";
import FirebaseStack from "../firebase-config";
import { Container } from "react-bootstrap";
import Record from "./record";
import Loader from "./loader";
// import TableContent from "react-bootstrap/TableContent";

function GeneralRecords() {
  const [generalRecords, setGeneralRecords] = useState([]);
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
      <h2> </h2>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th colSpan={6}>

            <h4 className="ledger-title capitalize text-center  ">General Journal </h4>
              </th>
            </tr>
            <tr>
              <th>#</th>
              <th>Account Name</th>
              <th>Amount</th>
              <th>Code</th>
              <th>type</th>
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
                return (
                  <>
                    <Record className='recorddivider' index={key+1} debit={obj.debit} credit={obj.credit}/>
                  </>
                );
              })
            ) : (
              <>
              <Loader/>
              </>
            )}
          </tbody>
        </Table>
        
      </Container>
    </>
  );
}

export default GeneralRecords;
