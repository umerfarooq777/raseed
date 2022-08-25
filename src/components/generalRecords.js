import React, { useEffect, useState } from "react";
import {Table,Row} from "react-bootstrap";
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


{generalRecords && generalRecords?



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
              null
            )}
          </tbody> 
        </Table>
        :
        
        <>
        <Row>
        <Loader/>
        </Row>
        </>
        
        }
        
      </Container>
    </>
  );
}

export default GeneralRecords;
