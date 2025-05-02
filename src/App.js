import { useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

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

export default App;
