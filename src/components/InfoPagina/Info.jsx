import './Info.css'
import { useEffect, useState } from 'react';
const Info = () => {
  const [countdown, setCountdown] = useState('');

useEffect(() => {
  const eventDate = new Date('2025-06-15T13:00:00');

  const updateCountdown = () => {
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
      setCountdown('Het event is begonnen!');
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    setCountdown(`${days}d ${hours}u ${minutes}m ${seconds}s`);
  };

  const interval = setInterval(updateCountdown, 1000);
  return () => clearInterval(interval);
}, []);


        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Over Max Verstappen</h2>
          <p className="text-gray-700">
            Max Verstappen is een Nederlandse Formule 1-coureur die rijdt voor Red Bull Racing. Hij werd geboren op 30 september 1997
            in België en is de zoon van voormalig F1-coureur Jos Verstappen. Max staat bekend om zijn agressieve rijstijl en
            indrukwekkende prestaties. Hij won zijn eerste wereldtitel in 2021 en heeft sindsdien meerdere titels behaald.
          </p>
        </section>
  return (
    <>
      <header className ='info-title-container'>
      </header>
      <body id='info-page-body'>
        
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h1 className="InfoTitel">Max Verstappen</h1>
      
      <section className="mb-6">
        <h2>Over Max Verstappen</h2>
        <p className="text-gray-700">
          Max Verstappen is een Nederlandse Formule 1-coureur die rijdt voor het team van Red Bull Racing.
          Hij werd geboren op 30 september 1997 in België en is de zoon van voormalig F1-coureur Jos Verstappen.
          Max staat bekend om zijn agressieve rijstijl en indrukwekkende raceprestaties. Hij won zijn eerste wereldtitel in 2021
          en heeft sindsdien meerdere titels op zijn naam staan.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Meet & Greet</h2>
        <p className="text-gray-700">
          Fans van Max Verstappen krijgen de unieke kans om hem persoonlijk te ontmoeten tijdens een exclusieve Meet & Greet!
          Het evenement vindt plaats op <strong>zaterdag 15 juni 2025</strong> in het Circuit Zandvoort. Tijdens deze dag kun je
          handtekeningen scoren, met Max op de foto en zelfs vragen stellen tijdens een korte Q&A sessie.
        </p>
        <div className="text-center mt-10 mb-6">
  <h3 className="countdownTitle">⏳ Countdown tot het event:</h3>
  <p className="countdownText">{countdown}</p>
</div>
  <>
    <section className="countdownTitle">
      {/* bestaande tekst */}
    </section>
  </>
  
        <div className="mt-4 p-4 bg-red-100 rounded-lg border border-red-300">
          <p className="text-red-800 font-medium">
            📍 Locatie: Circuit Zandvoort<br />
            📅 Datum: 15 juni 2025<br />
            🕑 Tijd: 13:00 - 16:00 uur
          </p>
        </div>
      </section>
    </div>
      </body>
      <footer>
  <p>Contact: info@maxevent.nl | © 2025 Max Verstappen Event</p>
</footer>

    </>
  )
}

export default Info 
