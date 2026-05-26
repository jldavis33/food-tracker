import { useState, useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import FoodForm from './components/FoodForm';
import InventoryView from './components/InventoryView';
import TodayView from './components/TodayView';
import type { FoodItem, ConsumedItem } from './types';
import { storageService } from './services/storage';

type View = 'today' | 'inventory' | 'add';

function App() {
  const [view, setView] = useState<View>('today');
  const [foodItems, setFoodItems] = useState<FoodItem[]>(() => storageService.getFoodItems());
  const [consumedItems, setConsumedItems] = useState<ConsumedItem[]>(() => storageService.getConsumedItems());

  // Save data on changes
  useEffect(() => {
    storageService.saveFoodItems(foodItems);
  }, [foodItems]);

  useEffect(() => {
    storageService.saveConsumedItems(consumedItems);
  }, [consumedItems]);

  const handleAddFoodItem = (newItem: FoodItem) => {
    setFoodItems(prev => [...prev, newItem]);
    setView('inventory');
  };

  const handleToggleInventory = (id: string) => {
    setFoodItems(prev => prev.map(item =>
      item.id === id ? { ...item, isInInventory: !item.isInInventory } : item
    ));
  };

  const handleAddConsumed = (item: ConsumedItem) => {
    setConsumedItems(prev => [...prev, item]);
  };

  const handleUpdateConsumed = (consumedId: string, amount: number) => {
    setConsumedItems(prev => prev.map(item =>
      item.consumedId === consumedId ? { ...item, amount } : item
    ));
  };

  const handleRemoveConsumed = (consumedId: string) => {
    setConsumedItems(prev => prev.filter(item => item.consumedId !== consumedId));
  };

  return (
    <div className="App">
      <Navbar bg="white" variant="light" expand="lg" className="mb-5 py-3 border-bottom sticky-top">
        <Container>
          <Navbar.Brand href="#" className="text-primary fs-3">
            <span className="fw-bold">Food</span>Tracker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                className={`px-3 ${view === 'today' ? 'fw-bold text-primary' : ''}`}
                active={view === 'today'}
                onClick={() => setView('today')}
              >
                Today's Log
              </Nav.Link>
              <Nav.Link
                className={`px-3 ${view === 'inventory' ? 'fw-bold text-primary' : ''}`}
                active={view === 'inventory'}
                onClick={() => setView('inventory')}
              >
                Inventory
              </Nav.Link>
              <Nav.Link
                className={`px-3 ${view === 'add' ? 'fw-bold text-primary' : ''}`}
                active={view === 'add'}
                onClick={() => setView('add')}
              >
                Add Food
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        {view === 'today' && (
          <TodayView
            inventory={foodItems}
            consumed={consumedItems}
            onAddConsumed={handleAddConsumed}
            onUpdateConsumed={handleUpdateConsumed}
            onRemoveConsumed={handleRemoveConsumed}
          />
        )}

        {view === 'inventory' && (
          <InventoryView
            items={foodItems}
            onToggleInventory={handleToggleInventory}
          />
        )}

        {view === 'add' && (
          <FoodForm onAdd={handleAddFoodItem} />
        )}
      </Container>
    </div>
  );
}

export default App;
