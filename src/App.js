import React, { useState } from 'react';
import './App.css';

function App() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState('');
  const [children, setChildren] = useState('');
  const [showDetails, setShowDetails] = useState(false);


  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };


  const getAdultLabel = (num) => {
    if (num === 1) return '1 Adult';
    return `${num} Adults`;
  };

 
  const getChildrenLabel = (num) => {
    if (num === 1) return '1 Child';
    return `${num} Children`;
  };


  const formatAdultDetails = (num) => {
    const adultCount = parseInt(num, 10);
    return adultCount === 1 ? 'Adult: 1' : `Adults: ${adultCount}`;
  };

 
  const formatChildrenDetails = (num) => {
    const childrenCount = parseInt(num, 10);
    return childrenCount === 1 ? 'Child: 1' : `Children: ${childrenCount}`;
  };

  
  const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDetails(true);
  };

 
  const handleReturnDateChange = (e) => {
    const newReturnDate = e.target.value;
    if (newReturnDate < departureDate) {
      setReturnDate('');
    } else {
      setReturnDate(newReturnDate);
    }
  };

  return (
    <div id="flight-search-widget">
      <h1>Flight Search</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Where from?"
            />
          </div>
          <div>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Where to?"
            />
          </div>
        </div>
        <div className="date-group">
          <div>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              placeholder="Departure date"
              min={getTodayDate()}
            />
          </div>
          <div>
            <input
              type="date"
              value={returnDate}
              onChange={handleReturnDateChange}
              placeholder="Return date"
              min={departureDate || getTodayDate()}
            />
          </div>
        </div>
        <div className="passenger-group">
          <div>
            <select
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              placeholder="Select adults"
            >
              <option value="">Select Adults</option>
              {[...Array(4).keys()].map(i => (
                <option key={i} value={i + 1}>{getAdultLabel(i + 1)}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={children}
              onChange={(e) => setChildren(e.target.value)}
              placeholder="Select children"
            >
              <option value="">Select Children</option>
              {[...Array(4).keys()].map(i => (
                <option key={i} value={i + 1}>{getChildrenLabel(i + 1)}</option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit">Search flights</button>
      </form>

      {showDetails && (
        <div id="search-details">
          <h2>Search Details:</h2>
          <ul>
            <li><strong>From:</strong> {from}</li>
            <li><strong>To:</strong> {to}</li>
            <li><strong>Departure date:</strong> {formatDate(departureDate)}</li>
            <li><strong>Return date:</strong> {formatDate(returnDate)}</li>
            <li><strong>Adult{adults !== '1' ? 's' : ''}:</strong> {adults}</li>
            <li><strong>Child{children !== '1' ? 'ren' : ''}:</strong> {children}</li>
          </ul>
          <p>Results will be displayed here (API integration required).</p>
        </div>
      )}
    </div>
  );
}

export default App;
