import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from './pages/Home';
import ViewCountryInformation  from './pages/ViewCountryInformation';


const clientQuery = new QueryClient();

function App() {
  
  return (
    <>
    <div style={{
      width: '100%',
      height: '50px',
      background: 'red',
      margin: 0,
      left: 0,
      right: 0,
      top: 0,
      position: 'fixed',
      display: 'flex',
      alignItems: 'center'
    }}>
    </div>

    <div style={{
      width: '100%',
      padding: '40px 10px 10px 10px',
      boxSizing: 'border-box'
    }}>
      <QueryClientProvider client={clientQuery}>
        <BrowserRouter>
            <Routes>
              <Route path="/"  element={<Home />}/>
              <Route path="/ViewCountry/:id" element={<ViewCountryInformation />} />
            </Routes>
          </BrowserRouter>
      </QueryClientProvider>
    </div>
    
    </>
  )
}

export default App
