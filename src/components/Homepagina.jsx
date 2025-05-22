import { Link } from 'react-router-dom'

const Homepagina = () => {
  return (
    <>
      <header className='home-title-container'>
        <h1 className='centered-title'>Welkom bij de Max Verstappen Race-Ervaring!</h1>
      </header>
      <main>
        <h2 className='centered-subtitle'>Boek jouw rit, beleef de snelheid en ervaar hoe het is om in de schoenen van een<span className='highlight-text'>&nbsp;wereldkampioen&nbsp;</span>te staan.</h2>
        <div className='f1-btn-container'>
          <a href="http://localhost:3001"><button className='f1-btn'>Boek nu je rit!</button></a>
        </div>
      </main>
    </>
  )
}

export default Homepagina
