import {Button,Modal,Form,FloatingLabel} from 'react-bootstrap';
import React ,{useState,useEffect} from 'react';
import FirebaseStack from '../firebase-config';
import {ref,set, get, child} from "firebase/database"

function AddAccount() {
    
    const [accounts, setAccounts] = useState([]);
    console.log("🚀 ~ file: addAccount.js ~ line 9 ~ AddAccount ~ accounts", accounts)
    
    const [newAccounts, setNewAccounts] = useState();
    // console.log("🚀 ~ file: addAccount.js ~ line 12 ~ AddAccount ~ newAccounts", newAccounts)
    const [validated, setValidated] = useState(false);

    const dbRef = ref(FirebaseStack());
    const db = FirebaseStack();
    ///////////////===================================

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
            setAccounts(snapshot.val());
            // console.log(firebaseData)
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }


    ////============================================
    const handleAddRecord = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
        
      };
    

    const handelData =(e)=>{
        setAccounts({...accounts, [e.target.name]: e.target.value});
    }
    

    const addAccount=()=>{
        setNewAccounts([...newAccounts,accounts])
        
            set(ref(db,'accounts/'+newAccounts.length), 
            newAccounts
            );
            setAccounts([])
        }
        // console.log(accounts)

        // console.log(newAccounts)

  return (
   <>
        <Form noValidate validated={validated} onSubmit={handleAddRecord}>
          <p>{accounts}          </p>
        <FloatingLabel controlId="floatingInputGrid" label="New Account Name">
          <Form.Control type="text" placeholder="Enter New Account Title" onChange={(e)=>{handelData(e)} } name='account'/>
        </FloatingLabel>


        <Button variant="outline-primary" className='mt-3 record-submit' onClick={addAccount} >Add Account</Button>
        </Form>
        </> 
  );
}

export default AddAccount;