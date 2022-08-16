import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddRecords from './components/addRecord';
import GeneralRecords from './components/generalRecords';
import Ledger from './components/Ledger';
import NavbarApp from './components/navbar';

function App() {
  return (
    <div className="App">
            
      <NavbarApp/>
      <AddRecords/>
      {/* <GeneralRecords/> */}
      <Ledger/>
    </div>
  );
}

export default App;
