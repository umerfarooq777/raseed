import React,{useState} from 'react'
import BalanceSheet from '../components/balanceSheet';
import NavbarApp from '../components/navbar';
import { IncomeContext } from '../context/incomeContext';

function BalanceSheetP() {


  const [IncomeArray, setIncomeArray] = useState([]);
  const [EquityArray, setEquityArray] = useState([]);
  const [EquityTotal, setEquityTotal] = useState(0);


  const [AssetArray, setAssetArray] = useState([]);
  const [LiabilityArray, setLiabilityArray] = useState([]);




  
  return (<>
    <NavbarApp/>
    <IncomeContext.Provider value={{IncomeArray,setIncomeArray,EquityArray,setEquityArray,EquityTotal,setEquityTotal,AssetArray,LiabilityArray}}>
    <BalanceSheet/>
    </IncomeContext.Provider>
  </>
  );
}

export default BalanceSheetP;