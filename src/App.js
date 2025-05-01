import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Shirts", quantity: 4, packed: false },
// ];

function App() {
  const [items, setItems] = useState([]);

  const handleAddItems = (item) => {
    // Without mutating the original 'items' array,
    // we added a new item.
    // In React, one should never change the any state directly. 
    setItems(items => [...items, item]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Let's Pack</h1>
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Adding guard clause.
    if (!description) return;

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false
    }

    onAddItems(newItem);

    setDescription('');
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {/* Creating an array of length 20 */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map
          (num => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  )
}

function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map(item =>
          <Item item={item} key={item.id} />
        )}
      </ul>
    </div>
  )
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and already packed X (X%)</em>
    </footer>
  )
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  )
}

export default App;
