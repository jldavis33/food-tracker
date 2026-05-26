import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import type { FoodItem, FoodCategory, MeasurementUnit } from '../types';

interface FoodFormProps {
  onAdd: (item: FoodItem) => void;
}

const FoodForm: React.FC<FoodFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState<FoodCategory>('Pantry');
  const [unit, setUnit] = useState<MeasurementUnit>('g');
  const [servingSize, setServingSize] = useState<number>(1);
  const [servingUnit, setServingUnit] = useState('');
  const [calories, setCalories] = useState<number>(0);
  const [fat, setFat] = useState<number>(0);
  const [protein, setProtein] = useState<number>(0);
  const [carbs, setCarbs] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newItem: FoodItem = {
      id: uuidv4(),
      name,
      brand: brand || undefined,
      category,
      unit,
      servingSize,
      servingUnit: servingUnit || unit,
      nutrition: {
        calories,
        fat,
        protein,
        carbohydrates: carbs,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isInInventory: true,
    };

    onAdd(newItem);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setBrand('');
    setCategory('Pantry');
    setUnit('g');
    setServingSize(1);
    setServingUnit('');
    setCalories(0);
    setFat(0);
    setProtein(0);
    setCarbs(0);
  };

  return (
    <div className="mx-auto" style={{ maxWidth: '800px' }}>
      <div className="mb-4 text-center">
        <h2 className="fw-bold mb-1">Add Food Item</h2>
        <p className="text-muted">Enter nutritional information for a new food item or ingredient.</p>
      </div>

      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-medium">Food Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    placeholder="e.g. Greek Yogurt"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-medium">Brand (Optional)</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={brand} 
                    onChange={(e) => setBrand(e.target.value)} 
                    placeholder="e.g. Chobani"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="mb-4">
              <h5 className="border-bottom pb-2 mb-3 fw-bold">Categorization & Serving</h5>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium text-muted small uppercase">Category</Form.Label>
                    <Form.Select 
                      value={category} 
                      onChange={(e) => setCategory(e.target.value as FoodCategory)}
                    >
                      <option value="Produce">Produce</option>
                      <option value="Dairy & Eggs">Dairy & Eggs</option>
                      <option value="Meat & Seafood">Meat & Seafood</option>
                      <option value="Bakery">Bakery</option>
                      <option value="Pantry">Pantry</option>
                      <option value="Frozen">Frozen</option>
                      <option value="Beverages">Beverages</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium text-muted small uppercase">Serving Size</Form.Label>
                    <Form.Control 
                      type="number" 
                      value={servingSize} 
                      onChange={(e) => setServingSize(Number(e.target.value))} 
                      required 
                      min="0.1"
                      step="0.1"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium text-muted small uppercase">Serving Unit</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={servingUnit} 
                      onChange={(e) => setServingUnit(e.target.value)} 
                      placeholder="e.g. cup, tbsp, g"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>

            <div className="mb-4">
              <h5 className="border-bottom pb-2 mb-3 fw-bold">Nutritional Facts (per serving)</h5>
              <Row>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium text-muted small uppercase">Calories</Form.Label>
                    <Form.Control 
                      type="number" 
                      value={calories} 
                      onChange={(e) => setCalories(Number(e.target.value))} 
                      required 
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium text-muted small uppercase">Protein (g)</Form.Label>
                    <Form.Control 
                      type="number" 
                      value={protein} 
                      onChange={(e) => setProtein(Number(e.target.value))} 
                      required 
                      step="0.1"
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium text-muted small uppercase">Carbs (g)</Form.Label>
                    <Form.Control 
                      type="number" 
                      value={carbs} 
                      onChange={(e) => setCarbs(Number(e.target.value))} 
                      required 
                      step="0.1"
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium text-muted small uppercase">Fat (g)</Form.Label>
                    <Form.Control 
                      type="number" 
                      value={fat} 
                      onChange={(e) => setFat(Number(e.target.value))} 
                      required 
                      step="0.1"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
              <Button variant="light" type="button" onClick={resetForm} className="me-md-2 px-4">
                Clear Form
              </Button>
              <Button variant="primary" type="submit" className="px-5">
                Save Food Item
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FoodForm;
