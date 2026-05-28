import React from 'react';
import { Table, Form, Card, Badge, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import type { FoodItem } from '../types';

interface InventoryViewProps {
  items: FoodItem[];
  onToggleInventory: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

const InventoryView: React.FC<InventoryViewProps> = ({ items, onToggleInventory, onDeleteItem }) => {
  return (
    <div className="mb-5">
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h2 className="fw-bold mb-1">Inventory</h2>
          <p className="text-muted mb-0">Manage items currently in your kitchen</p>
        </div>
      </div>

      <Card className="border-0 shadow-sm overflow-hidden">
        <Table hover responsive className="mb-0">
          <thead className="bg-light">
            <tr>
              <th className="px-4 py-3 border-0 text-muted small text-uppercase fw-bold" style={{ width: '80px' }}>In Stock</th>
              <th className="px-4 py-3 border-0 text-muted small text-uppercase fw-bold">Name</th>
              <th className="px-4 py-3 border-0 text-muted small text-uppercase fw-bold">Brand</th>
              <th className="px-4 py-3 border-0 text-muted small text-uppercase fw-bold">Category</th>
              <th className="px-4 py-3 border-0 text-muted small text-uppercase fw-bold text-end">Calories</th>
              <th className="px-4 py-3 border-0 text-muted small text-uppercase fw-bold text-end">P / C / F</th>
              <th className="px-4 py-3 border-0 text-muted small text-uppercase fw-bold text-end" style={{ width: '80px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="align-middle">
                <td className="px-4 py-3">
                  <Form.Check
                    type="switch"
                    id={`switch-${item.id}`}
                    checked={item.isInInventory}
                    onChange={() => onToggleInventory(item.id)}
                  />
                </td>
                <td className="px-4 py-3 fw-medium">{item.name}</td>
                <td className="px-4 py-3 text-muted">{item.brand || '-'}</td>
                <td className="px-4 py-3">
                  <Badge bg="light" text="dark" className="border fw-normal">{item.category}</Badge>
                </td>
                <td className="px-4 py-3 text-end fw-bold">{item.nutrition.calories}</td>
                <td className="px-4 py-3 text-end text-muted small">
                  {item.nutrition.protein}g / {item.nutrition.carbohydrates}g / {item.nutrition.fat}g
                </td>
                <td className="px-4 py-3 text-end">
                  <Button
                    variant="link"
                    className="text-danger p-0"
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
                        onDeleteItem(item.id);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-5 text-muted">
                  No food items added yet. Go to "Add Food" to get started.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default InventoryView;
