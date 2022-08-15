import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddRecords from './components/addRecord';
import GeneralRecords from './components/generalRecords';
import NavbarApp from './components/navbar';

function App() {
  return (
    <div className="App">
            
      <NavbarApp/>
      <AddRecords/>
      {/* <GeneralRecords/> */}
    </div>
  );
}

export default App;
