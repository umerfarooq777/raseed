import React, { useState } from 'react';

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
import {ref,set} from "firebase/database"

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


    const [showA, setShowA] = useState(true);
    const [showB, setShowB] = useState(true);

    const [data,setData] =useState(objData)
    console.log("🚀 ~ file: addRecord.js ~ line 28 ~ AddRecords ~ data", data)
    const [debitData, setDebitData] = useState([])
    const [creditData, setCreditData] = useState([])    

    
    const [counter, setCounter] = useState(0)

    const db = FirebaseStack();
  
    const toggleShowA = () => setShowA(!showA);
    const toggleShowB = () => setShowB(!showB);

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
    console.log("🚀 ~ file: addRecord.js ~ line 62 ~ addRecord ~ records", recordsDataObj)
    if (data.type === 'debit') {
        setDebitData([...debitData, data])
    }
    else {
        setCreditData([...creditData, data])
    }
}


const submitRecords=(e)=>{
    e.preventDefault();
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
        
        set(ref(db,'record/' + counter),{
            'credit': creditData,
            'debit': debitData
        });
        setrecordsDataObj([]);
        setData('')

        setCounter(counter + 1)
    }

const removeRecord=(key)=>{
   delete recordsDataObj[key];

}













  return (
    <Container>
      <Row className='debit-form mt-5'>
        <Col>

        {/* =================Add Record Form =================== */}
        <Form noValidate validated={validated} onSubmit={handleAddRecord}>
        <h2>Add Records</h2>
        <FloatingLabel controlId="floatingInputGrid" label="Account Title" className="mb-3">
          <Form.Control type="text" placeholder="name@example.com" onChange={(e)=>{handelData(e)} } name='title'/>
        </FloatingLabel>

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
            console.log("🚀 ~ file: addRecord.js ~ line 164 ~ records.map ~ obj", obj)
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