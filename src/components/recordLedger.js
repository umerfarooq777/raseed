import React, { useEffect, useState } from 'react';
// import TableContentSub from './TableContentSub'

const RecordLedger = ({ index,debit, credit }) => {

    // const [keyData, setKeyData] = useState(key)
    const [debitData, setDebitData] = useState(debit)
    // console.log("🚀 ~ file: TableContent.js ~ line 7 ~ TableContent ~ debitData", debitData)
    const [creditData, setCreditData] = useState(credit)
    // console.log("🚀 ~ file: TableContent.js ~ line 9 ~ TableContent ~ creditData", creditData)
    

    var today = new Date();
    var date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    
    return (
        <>
        
            {
            


            debitData && debitData.map((obj, key) => {
                return (
                <>
             
                    {/* <div className='recorddivider'></div> */}
                    
                    if(obj.title === "cash")
                    {
                            <>
                            
                            {/* <h1 className='text-dark'>{obj.title}</h1> */}
                            <tr>
                                
                                <th>#</th>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Ref</th>
                                <th>Debit</th>
                                <th>Credit</th>
                                <th>Balance</th>
                                
                            </tr>
                            <tr>
                            <td>{index}</td>
                            <td>DD/MM/YYYY</td>
                            <td>{obj.title}</td>
                            <td>XXX</td>
                            <td className={obj.type == "debit"? 'debit-text' : ''}>{obj.type == "debit" ? obj.amount : null}</td>
                            <td className={obj.type == "credit"? 'credit-text' : ''}>{obj.type == "credit" ? obj.amount : null}</td>
                            <td>00.00</td>
                            </tr>
                           
                            </>
                    }    
                    else 
                   
                    
                    {/* <tr>
                        <td>{index}</td>
                        <td>DD/MM/YYYY</td>
                        <td>{obj.title == "cash" ? obj.title : null}</td>
                        <td>XXX</td>
                        <td>{obj.type == "debit" ? obj.amount : null}</td>
                        <td>{obj.type == "credit" ? obj.amount : null}</td>
                        <td>00.00</td>
                    </tr> */}
                   
                    </>
                )
            })



            }
            {creditData && creditData.map((obj2, key) => {
                return (
<>
                    {/* <div className='recorddivider'></div> */}
                    
                    if(obj2.title === "cash")
                        {   <>
                            <tr>
                            <td></td>
                            <td>DD/MM/YYYY</td>
                            <td>{obj2.title}</td>
                            <td>XXX</td>
                            <td className={obj2.type == "debit"? 'debit-text' : ''}>{obj2.type == "debit" ? obj2.amount : null}</td>
                            <td className={obj2.type == "credit"? 'credit-text' : ''}>{obj2.type == "credit" ? obj2.amount : null}</td>
                            <td>00.00</td>
                            </tr>
                            </>
                    }    
                    else
                    
                    
                    {/* <tr>
                        <td>{index}</td>
                        <td>DD/MM/YYYY</td>
                        <td>{obj.title == "cash" ? obj.title : null}</td>
                        <td>XXX</td>
                        <td>{obj.type == "debit" ? obj.amount : null}</td>
                        <td>{obj.type == "credit" ? obj.amount : null}</td>
                        <td>00.00</td>
                    </tr> */}
                    </>
                )
            })}
           
        </>
    )
}

export default RecordLedger