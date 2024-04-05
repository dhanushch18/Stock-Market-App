import './App.css';
import { useState } from 'react';

function App() {
  const [trades, setTrades] = useState([]);
  const [tradeDataTime, setTradeDataTime] = useState('');
  const [stockName, setStockName] = useState('');
  const [listingPrice, setListingPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [editingTradeId, setEditingTradeId] = useState(null);

  const handleAddTrade = () => {
    if (!tradeDataTime || !stockName || !listingPrice || !quantity || !type || !pricePerUnit) {
      alert('Please fill in all fields');
      return;
    }
    if (editingTradeId !== null) {
      // Edit existing trade
      const updatedTrades = trades.map((trade) => {
        if (trade.id === editingTradeId) {
          return {
            ...trade,
            tradeDataTime,
            stockName,
            listingPrice,
            quantity,
            type,
            pricePerUnit,
          };
        }
        return trade;
      });
      setTrades(updatedTrades);
      setEditingTradeId(null);
    } else {
      // Add new trade
      setTrades((prevTrades) => [
        ...prevTrades,
        {
          id: Date.now(),
          tradeDataTime,
          stockName,
          listingPrice,
          quantity,
          type,
          pricePerUnit,
        },
      ]);
    }
    // Clear input fields
    setTradeDataTime('');
    setStockName('');
    setListingPrice('');
    setQuantity('');
    setType('');
    setPricePerUnit('');
  };

  const handleDeleteTrade = (tradeId) => {
    setTrades((prevTrades) => prevTrades.filter((trade) => trade.id !== tradeId));
  };

  const handleEditTrade = (tradeId) => {
    const tradeToEdit = trades.find((trade) => trade.id === tradeId);
    if (tradeToEdit) {
      setTradeDataTime(tradeToEdit.tradeDataTime);
      setStockName(tradeToEdit.stockName);
      setListingPrice(tradeToEdit.listingPrice);
      setQuantity(tradeToEdit.quantity);
      setType(tradeToEdit.type);
      setPricePerUnit(tradeToEdit.pricePerUnit);
      setEditingTradeId(tradeId);
    }
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>Stock Trading Application</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Add New Trade</h2>
      </div>
      <div className="input">
        <input
          value={tradeDataTime}
          onChange={(e) => setTradeDataTime(e.target.value)}
          type="datetime-local"
          placeholder="Trade Date/Time"
        />
        <input
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
          type="text"
          placeholder="Stock Name (Symbol)"
        />
        <input
          value={listingPrice}
          onChange={(e) => setListingPrice(e.target.value)}
          type="number"
          placeholder="Listing Price"
        />
        <input
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          type="number"
          placeholder="Quantity"
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select Type</option>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <input
          value={pricePerUnit}
          onChange={(e) => setPricePerUnit(e.target.value)}
          type="number"
          placeholder="Price Per Unit"
        />
        <button onClick={handleAddTrade}>{editingTradeId !== null ? 'Save Trade' : 'Add Trade'}</button>
      </div>

      
      <div className="tradeTable">
        <h1>Trade Details</h1>
        <table>
          <thead>
            <tr>
              <th>Trade Date / Time</th>
              <th>Stock Name </th>
              <th>Listing Price</th>
              <th>Quantity</th>
              <th>Type (Buy/Sell)</th>
              <th>Price Per Unit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade.id}>
                <td>{trade.tradeDataTime}</td>
                <td>{trade.stockName}</td>
                <td>{trade.listingPrice}</td>
                <td>{trade.quantity}</td>
                <td>{trade.type}</td>
                <td>{trade.pricePerUnit}</td>
                <td>
                  <button onClick={() => handleEditTrade(trade.id)}>Edit</button> / 
                  <button onClick={() => handleDeleteTrade(trade.id)}> Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;