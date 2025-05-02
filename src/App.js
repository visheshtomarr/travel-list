import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  // The main goal is to render an updated list of items rather 
  // than updating the state of a single item. That's why we perform operation
  // on the whole 'items' array at the same time.
  const handleAddItems = (item) => {
    setItems(items => [...items, item]);
  }

  const handleDeleteItem = (id) => {
    setItems(items => items.filter(item => item.id !== id));
  }

  const handleToggleItem = (id) => {
    setItems(items => items.map(item =>
      item.id === id ? { ...item, packed: !item.packed } : item
    ))
  }

  const handleClearItems = () => {
    const confirm = window.confirm('Are you sure you want to delete all items ?');
    if (confirm) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        handleClearItems={handleClearItems}
      />
      <Stats items={items} />
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
    console.log(newItem);
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

function PackingList({ items, onDeleteItem, onToggleItem, handleClearItems }) {
  const [sortBy, setSortBy] = useState('input');
  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description") {
    sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "packed") {
    sortedItems = items.slice().sort((a, b) => Number(b.packed) - Number(a.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map(item =>
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        )}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={handleClearItems}>Clear list</button>
      </div>
    </div>
  )
}

function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>
          Start adding some items to your packing list!
        </em>
      </p>
    )
  }

  const numItems = items.length;
  const numPackedItems = items.filter(item => item.packed).length;
  const percentage = Math.round(numPackedItems / numItems * 100);

  return (
    <footer className="stats">
      <em>
        {percentage !== 100
          ? `You have ${numItems} items on your list, and already packed ${numPackedItems} (${percentage}%)`
          : 'You packed everything! Ready to go ✈️'
        }
      </em>
    </footer>
  )
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  )
}

export default App;
