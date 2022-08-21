import {Button,Modal,Form,FloatingLabel} from 'react-bootstrap';
import React ,{useState,useEffect} from 'react';
import FirebaseStack from '../firebase-config';
import {ref,set, get, child} from "firebase/database"

function AddAccount() {
    
    const [accounts, setAccounts] = useState([]);
    // console.log("🚀 ~ file: addAccount.js ~ line 9 ~ AddAccount ~ accounts", accounts.length)
    
    const [accountMode, setAccountMode] = useState(false);
    const [newAccounts, setNewAccounts] = useState(null);
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
            setAccountMode(true)
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
      // setAccounts({...accounts,e.target.value});
      setNewAccounts(e.target.value)
    }
    
    
    const addAccount=(e)=>{
      setAccounts(accounts => [...accounts, newAccounts])
      // console.log("🚀 ~ file: addAccount.js ~ line 63 ~ addAccount ~ accounts", accounts,accounts.length)
        // setNewAccounts([...newAccounts,accounts])
        const index = accounts.length;
        set(ref(db,'accounts/'+index), 
        newAccounts
        );
      }

      function refreshPage() {
        window.location.reload(false);
      }
      // console.log("🚀 ~ file: addAccount.js ~ line 57 ~ handelData ~ accounts", accounts)
        // console.log(accounts)
        // console.log(newAccounts)
  return (
   <>
        <Form noValidate validated={validated} onSubmit={handleAddRecord}>
          {/* <p>       {JSON.stringify(accounts)} </p> */}
        <FloatingLabel controlId="floatingInputGrid" label="New Account Name">
          <Form.Control type="text" placeholder="Enter New Account Title" onChange={(e)=>{handelData(e)} } name='account'/>
        </FloatingLabel>
{
  accountMode===true?
  
  <Button variant="primary" className='mt-3 record-submit' onClick={(e)=>{addAccount(e);refreshPage();} } >Add New Account</Button>
  :
  <Button variant="primary" className='mt-3 record-submit' disabled>Add New Account</Button>
}

        </Form>
        </> 
  );
}

export default AddAccount;