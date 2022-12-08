import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPersonForm from './salespersonform';
import CustomerForm from './customer';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="salesperson">
            <Route path="new" element={<SalesPersonForm/>}/>
          </Route>
          <Route path="customer">
            <Route path="new" element={<CustomerForm/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
