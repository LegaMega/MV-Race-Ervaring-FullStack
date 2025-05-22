import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepagina from './components/Homepagina'
import Boekingpagina from './components/Boekingpagina'
import Info from './components/InfoPagina/Info'

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Homepagina />} />
      <Route path="/Boekingpagina" element={<Boekingpagina />} />
      <Route path="/Info" element={<Info />} />
    </Routes>
    </>
  )
}

export default App