import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AddRecords from './components/addRecord';
import GeneralRecords from './components/generalRecords';
import NavbarApp from './components/navbar';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <NavbarApp/>
      <AddRecords/>
      <GeneralRecords/>
    </div>
  );
}

export default App;
