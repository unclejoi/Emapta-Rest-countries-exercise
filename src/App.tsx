import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home/Home';


const clientQuery = new QueryClient();

function App() {
  
  return (
    <>
      <div className='globalWrapper'>
        <QueryClientProvider client={clientQuery}>
            <Home />
        </QueryClientProvider>
      </div>
    </>
  )
}

export default App
