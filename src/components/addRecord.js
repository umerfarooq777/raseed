import React, { useEffect, useState } from 'react';

import Card from 'react-bootstrap/Card';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import FirebaseStack from '../firebase-config';
import {ref,set, get, child} from "firebase/database"
import AddAccount from './addAccount';

const objData ={
    title: "",
    amount:"",
    category:"",
    type:""

}
function AddRecords() {
    const [validated, setValidated] = useState(false);
    const [recordsDataObj, setrecordsDataObj]= useState([])
    // console.log("🚀 ~ file: addRecord.js ~ line 28 ~ AddRecords ~ recordsDataObj", recordsDataObj[1].tilte)
   
   /////===========================================get Database id
    const [generalRecords, setGeneralRecords] = useState([]); 
    const [stopFeed, setStopFeed] = useState(false);   
    const dbRef = ref(FirebaseStack());

    const [datafirebase, setdatafirebase]=useState([])
    // console.log("🚀 ~ file: addRecord.js ~ line 34 ~ AddRecords ~ datafirebase", datafirebase)
    /////===========================================add accounts
    

    const [showA, setShowA] = useState(true);
    const [showB, setShowB] = useState(true);

    const [data,setData] =useState(objData)
    const [debitData, setDebitData] = useState([])
    const [creditData, setCreditData] = useState([])    

    let transactionsLen = datafirebase.length;
    console.log("🚀 ~ file: addRecord.js ~ line 46 ~ AddRecords ~ transactionsLen", transactionsLen)
 
    const db = FirebaseStack(); 
  
    const toggleShowA = () => setShowA(!showA);
    const toggleShowB = () => setShowB(!showB);

/////=========================Get id

useEffect(() => {
    getDataFromFirebase();
    getDataFromFirebaseRecords();
  }, []);
  

// const getDataFromFirebase = async () => {
//   get(child(dbRef,`transactions/`))
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         setTransactions(snapshot.val())
//         setTransactionsLen(transactionsLen.length)
//       console.log(transactions)
//       console.log(transactions.length)
//       } else {
//         console.log("No data available");
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

const getDataFromFirebase = async () => {
    get(child(dbRef, `transactions/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
        //   setFirebaseData(snapshot.val());
        //   setStopData(false);
        setdatafirebase(snapshot.val())
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };


const getDataFromFirebaseRecords = async () => {
  get(child(dbRef, `record/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
      setGeneralRecords(snapshot.val())
      } else {
        console.log("No Accounts Available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};




/////========================================

const handleAddRecord = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    
  };

const handelData =(e)=>{
    setData({...data, [e.target.name]: e.target.value});
}

const addRecord =(e)=>{
    e.preventDefault();
    
    setrecordsDataObj([...recordsDataObj,data]);
    if (data.type === 'debit') {
        setDebitData([...debitData, data])
    }
    else {
        setCreditData([...creditData, data])
    }

    set(ref(dbRef, 'transactions/'+transactionsLen), {
        data
    });
}


const submitRecords=(e)=>{
    // e.preventDefault();
    var today = new Date();
    var date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

        var data01 = []
        const obj = { 'debit': debitData }
        const obj1 = { 'credit': creditData }
        // data01.push(`${date} ${time}`)
        data01.push(obj)
        data01.push(obj1)

        var submitableData = recordsDataObj;
        
        set(ref(db,'record/' + generalRecords.length),{   
            'credit': creditData,
            'debit': debitData
        });
        setrecordsDataObj([]);
        setData('')

    }








  return (
    <Container>
      <Row className='debit-form mt-5'>
        <Col>
        <AddAccount/>

        {/* =================Add Record Form =================== */}
        <Form noValidate validated={validated} onSubmit={handleAddRecord}>

        <h2>Add Records</h2>
       
          <Form.Select aria-label="Floating label select example"  className="mb-3" onChange={(e)=>{handelData(e)} } name='title'>
            <option>Select Account</option>
            <option value="cash">Cash</option>
            <option value="capital">Capital</option>
            <option value="building">Building</option>
            <option value="officeEquipment">Office Equipment</option>
            <option value="notesPayable">Notes Payable</option>
            <option value="accountsPayable">Accounts Payable</option>
          </Form.Select>
        

        <FloatingLabel controlId="floatingInputGrid" label="Amount" className="mb-3">
          <Form.Control type="number" placeholder="name@example.com" onChange={(e)=>{handelData(e)}} name='amount' />
        </FloatingLabel>

        <Col md>
        <Form.Select aria-label="Floating label select example"  className="mb-3" onChange={(e)=>{handelData(e)}} name='category'>
            <option>Transaction Category</option>
            <option value="asset">Asset</option>
            <option value="liability">Liability</option>
            <option value="equity">Equity</option>
            <option value="revenue">Revenue</option>
          </Form.Select>

          <Form.Select aria-label="Floating label select example" onChange={(e)=>{handelData(e)}} name='type'>
            <option>Transaction Type</option>
            <option value="debit">Debit</option>
            <option value="credit">Credit</option>
          </Form.Select>
        </Col>

        <Button variant="outline-primary" type="submit" className='mt-3 record-submit' onClick={addRecord}>Add Record</Button>
        </Form>


        
        {/* =================Submit Records Form =================== */}
        <Form>      


            <div className='record-details'>
        {[
        'Danger'
      ].map((variant) => (
        <Card 
          bg={variant.toLowerCase()}
          key={variant}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '18rem' }}
          className="mb-2 mt-3"
        >
          <Card.Header>Total Credit Amount</Card.Header>
          <Card.Body>
            <Card.Title>$ 00.00 </Card.Title>
          </Card.Body>
        </Card>
      ))} 
      {[
        'Success'
      ].map((variant) => (
        <Card 
          bg={variant.toLowerCase()}
          key={variant}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '18rem' }}
          className="mb-2 mt-3"
        >
          <Card.Header>Total Debit Amount</Card.Header>
          <Card.Body>
            <Card.Title>$ 00.00 </Card.Title>
          </Card.Body>
        </Card>
      ))}</div>

        <Button variant="success" type="submit" className='mt-3 record-submit' onClick={submitRecords}>Submit Records</Button>
        </Form>

        
        

        </Col>

        <Col className='Entries'>
            
        <h2>Records</h2>
       
    {
        recordsDataObj && recordsDataObj.map((obj, key)=>{
            return(
                <>
                <Toast show={showA} className={obj.type == "debit"? 'debit Toast' : 'credit Toast'}>        
          <Toast.Header>
            <strong className="me-auto">{obj.title}</strong>
            <small>{obj.category}{key}</small>
          </Toast.Header>
          <Toast.Body>$ {obj.amount}</Toast.Body>
        </Toast>
        </>
        )
        })
    }


       




        </Col>
      </Row>
    </Container>
  );
}

export default AddRecords;