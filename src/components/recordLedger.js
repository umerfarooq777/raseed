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
        
            {debitData && debitData.map((obj, key) => {
                return (<>
                    {/* <div className='recorddivider'></div> */}
                    <tr className='recorddivider'>
                        <td>{index}</td>
                        <td>DD/MM/YYYY</td>
                        <td>{obj.title}</td>
                        <td>XXX</td>
                        <td>{obj.type == "debit" ? obj.amount : null}</td>
                        <td>{obj.type == "credit" ? obj.amount : null}</td>
                        <td>00.00</td>
                    </tr>
                    </>
                )
            })
            }
            {creditData && creditData.map((obj2, key) => {
                return (
                    <tr>
                        <td></td>
                        <td>DD/MM/YYYY</td>
                        <td>{obj2.title}</td>
                        <td>XXX</td>
                        <td>{obj2.type == "debit" ? obj2.amount : null}</td>
                        <td>{obj2.type == "credit" ? obj2.amount : null}</td>
                        <td>00.00</td>
                    </tr>
                )
            })}
           
        </>
    )
}

export default RecordLedger