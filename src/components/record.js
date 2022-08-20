import React, { useEffect, useState } from 'react';
// import TableContentSub from './TableContentSub'

const Record = ({ index,debit, credit }) => {

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
                        <td className='capitalize'>{obj.title}</td>
                        <td>{obj.amount}</td>
                        <td className='capitalize'>{obj.category}</td>
                         <td className={obj.type == "debit"? 'debit-text' : 'credit-text'}>{obj.type == "debit" ? 'debit' : 'credit'}</td>
                        <td>{obj.date}</td>
                    </tr>
                    </>
                )
            })
            }
            {creditData && creditData.map((obj2, key) => {
                return (
                    <tr>
                        <td></td>
                        <td className='capitalize'>{obj2.title}</td>
                        <td>{obj2.amount}</td>
                        <td className='capitalize'>{obj2.category}</td>
                        <td className={obj2.type == "debit"? 'debit-text' : 'credit-text'}>{obj2.type == "debit" ? 'debit' : 'credit'}</td>
                        <td>{obj2.date}</td>
                    </tr>
                )
            })}
            {
                // data ? data.map((obj, key) => {
                //     if (obj.debit) {

                //         return (
                //             <TableContentSub objectDebit={obj.debit} />
                //         )
                //     }
                //     else if (obj.credit) {
                //         // console.log("🚀 ~ file: TableContent.js ~ line 10 ~ data?data.map ~ obj.debit", obj.credit)
                //         obj.credit.map((temp,key)=>{
                //         // console.log("🚀 ~ file: TableContent.js ~ line 18 ~ obj.credit.map ~ temp", temp)

                //         })
                //         return (
                //             <TableContentSub objectCredit={obj.credit} />
                //         )
                //     }

                // }) :
                //     <tr>
                //         <td>1</td>
                //         <td>Mark</td>
                //         <td>Otto</td>
                //         <td>@mdo</td>
                //         <td>@mdo</td>
                //         <td>@mdo</td>
                //         <td>@mdo</td>
                //     </tr>
            }
        </>
    )
}

export default Record