import {useQuery,QueryClient,QueryClientProvider} from '@tanstack/react-query'

import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./components/home.jsx"


function App() {

  const client = new QueryClient();

  return (
    <>

    <QueryClientProvider client={client}>
      

    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
    </Router>





    </QueryClientProvider>
    
    
    
    </>
  )
}

export default App;
