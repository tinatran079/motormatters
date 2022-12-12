import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPersonForm from './salespersonform';
import CustomerForm from './customer';
import SaleRecordForm from './sale_record';
import SalesList from './listsales';
import SalesPersonHistory from './salespersonhistory';

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
          <Route path="salesrecord">
            <Route path="new" element={<SaleRecordForm/>}/>
          </Route>
          <Route path="saleslist">
            <Route path="new" element={<SalesList/>}/>
          </Route>
          <Route path="salespersonhistory">
            <Route path="new" element={<SalesPersonHistory/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
