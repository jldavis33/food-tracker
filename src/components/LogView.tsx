import React from 'react';
import { Row, Col, Card, ListGroup, Form, Badge, Button } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faDumbbell, faBreadSlice, faDroplet, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import type { DropResult } from '@hello-pangea/dnd';
import type { FoodItem, ConsumedItem } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface LogViewProps {
  inventory: FoodItem[];
  consumed: ConsumedItem[];
  selectedDate: string;
  onDateChange: (date: string) => void;
  onAddConsumed: (item: ConsumedItem) => void;
  onUpdateConsumed: (consumedId: string, amount: number) => void;
  onRemoveConsumed: (consumedId: string) => void;
}

const FoodItemContent: React.FC<{ item: FoodItem }> = ({ item }) => (
  <div className="d-flex justify-content-between align-items-center">
    <div>
      <div className="fw-semibold">{item.name}</div>
      <small className="text-muted">{item.brand || item.category}</small>
    </div>
    <Badge bg="light" text="dark" className="border">
      {item.nutrition.calories} cal
    </Badge>
  </div>
);

const LogView: React.FC<LogViewProps> = ({
  inventory,
  consumed,
  selectedDate,
  onDateChange,
  onAddConsumed,
  onUpdateConsumed,
  onRemoveConsumed
}) => {
  const availableInventory = inventory.filter(item => item.isInInventory);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    // If dragging from inventory to today
    if (source.droppableId === 'inventory' && destination.droppableId === 'today') {
      const item = availableInventory[source.index];

      // Create a date for the selected day at the current time
      const [year, month, day] = selectedDate.split('-').map(Number);
      const consumedDate = new Date(year, month - 1, day);
      const now = new Date();
      consumedDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

      const newConsumedItem: ConsumedItem = {
        ...item,
        consumedId: uuidv4(),
        amount: 1,
        date: consumedDate.toISOString(),
      };
      onAddConsumed(newConsumedItem);
    }
  };

  const changeDate = (days: number) => {
    const [year, month, day] = selectedDate.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + days);

    const newYear = date.getFullYear();
    const newMonth = String(date.getMonth() + 1).padStart(2, '0');
    const newDay = String(date.getDate()).padStart(2, '0');
    onDateChange(`${newYear}-${newMonth}-${newDay}`);
  };

  const isToday = selectedDate === new Date().toISOString().split('T')[0];

  const getFormattedDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formattedDate = getFormattedDate(selectedDate);

  const totals = consumed.reduce((acc, item) => {
    acc.calories += item.nutrition.calories * item.amount;
    acc.fat += item.nutrition.fat * item.amount;
    acc.protein += item.nutrition.protein * item.amount;
    acc.carbs += item.nutrition.carbohydrates * item.amount;
    return acc;
  }, { calories: 0, fat: 0, protein: 0, carbs: 0 });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="d-flex align-items-center justify-content-between mb-4 bg-white p-3 rounded shadow-sm">
        <Button variant="outline-primary" onClick={() => changeDate(-1)}>
          <FontAwesomeIcon icon={faChevronLeft} className="me-2" />
          Previous
        </Button>

        <div className="text-center">
          <h3 className="mb-0 fw-bold">
            {isToday ? "Today's Log" : formattedDate}
          </h3>
          {!isToday && <small className="text-primary cursor-pointer" style={{ cursor: 'pointer' }} onClick={() => onDateChange(new Date().toISOString().split('T')[0])}>Go to Today</small>}
        </div>

        <Button variant="outline-primary" onClick={() => changeDate(1)}>
          Next
          <FontAwesomeIcon icon={faChevronRight} className="ms-2" />
        </Button>
      </div>

      <Row className="mb-5">
        <Col md={3} className="mb-3">
          <Card className="stat-card h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="stat-label text-truncate">Calories</div>
                  <div className="stat-value">{totals.calories.toFixed(0)}</div>
                </div>
                <div className="stat-icon" style={{ color: 'var(--primary-color)', opacity: 0.2 }}>
                  <FontAwesomeIcon icon={faFire} size="2x" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="stat-card h-100" style={{ borderLeftColor: '#10b981' }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="stat-label text-truncate">Protein</div>
                  <div className="stat-value">{totals.protein.toFixed(1)}<small className="fs-6 fw-normal ms-1 text-muted">g</small></div>
                </div>
                <div className="stat-icon" style={{ color: '#10b981', opacity: 0.2 }}>
                  <FontAwesomeIcon icon={faDumbbell} size="2x" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="stat-card h-100" style={{ borderLeftColor: '#f59e0b' }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="stat-label text-truncate">Carbs</div>
                  <div className="stat-value">{totals.carbs.toFixed(1)}<small className="fs-6 fw-normal ms-1 text-muted">g</small></div>
                </div>
                <div className="stat-icon" style={{ color: '#f59e0b', opacity: 0.2 }}>
                  <FontAwesomeIcon icon={faBreadSlice} size="2x" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="stat-card h-100" style={{ borderLeftColor: '#ef4444' }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="stat-label text-truncate">Fat</div>
                  <div className="stat-value">{totals.fat.toFixed(1)}<small className="fs-6 fw-normal ms-1 text-muted">g</small></div>
                </div>
                <div className="stat-icon" style={{ color: '#ef4444', opacity: 0.2 }}>
                  <FontAwesomeIcon icon={faDroplet} size="2x" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={6} className="mb-4">
          <h4 className="mb-3 fw-bold">Available Inventory</h4>
          <p className="text-muted small mb-3">Drag items from here to your log</p>
          <Card className="border-0 shadow-sm">
            <Droppable
              droppableId="inventory"
              isDropDisabled={true}
              renderClone={(provided, _snapshot, rubric) => {
                const item = availableInventory[rubric.source.index];
                return (
                  <ListGroup.Item
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="border-start-0 border-end-0 bg-light shadow-lg rounded"
                    style={provided.draggableProps.style}
                  >
                    <FoodItemContent item={item} />
                  </ListGroup.Item>
                );
              }}
            >
              {(provided, snapshot) => (
                <ListGroup
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="list-group-flush"
                  style={{ minHeight: '300px' }}
                >
                  {availableInventory.map((item, index) => (
                    <React.Fragment key={item.id}>
                      <Draggable draggableId={item.id} index={index}>
                        {(provided, draggableSnapshot) => (
                          <ListGroup.Item
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`border-start-0 border-end-0 ${draggableSnapshot.isDragging ? 'd-none' : ''}`}
                          >
                            <FoodItemContent item={item} />
                          </ListGroup.Item>
                        )}
                      </Draggable>
                      {snapshot.draggingFromThisWith === item.id && (
                        <ListGroup.Item className="border-start-0 border-end-0 opacity-50 bg-light">
                          <FoodItemContent item={item} />
                        </ListGroup.Item>
                      )}
                    </React.Fragment>
                  ))}
                  {provided.placeholder}
                  {availableInventory.length === 0 && (
                    <ListGroup.Item className="text-center py-5 text-muted">
                      No items available in inventory.
                    </ListGroup.Item>
                  )}
                </ListGroup>
              )}
            </Droppable>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <h4 className="mb-3 fw-bold">{isToday ? "Today's Log" : "Daily Log"}</h4>
          <p className="text-muted small mb-3">Your intake for {isToday ? "today" : formattedDate}</p>
          <Card className="border-0 shadow-sm">
            <Droppable droppableId="today">
              {(provided, snapshot) => (
                <ListGroup
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`list-group-flush ${snapshot.isDraggingOver ? 'bg-light' : ''}`}
                  style={{ minHeight: '300px' }}
                >
                  {consumed.map((item) => (
                    <ListGroup.Item key={item.consumedId} className="border-start-0 border-end-0">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <div className="fw-bold">{item.name}</div>
                          <small className="text-muted">{item.brand}</small>
                        </div>
                        <Button
                          variant="link"
                          className="text-danger p-0 text-decoration-none fs-4"
                          onClick={() => onRemoveConsumed(item.consumedId)}
                        >
                          ×
                        </Button>
                      </div>
                      <div className="d-flex align-items-center bg-light p-2 rounded">
                        <div className="flex-grow-1 d-flex align-items-center">
                          <Form.Label className="me-2 mb-0 small fw-medium">Servings:</Form.Label>
                          <Form.Control
                            type="number"
                            size="sm"
                            style={{ width: '70px' }}
                            value={item.amount}
                            min="0.1"
                            step="0.1"
                            onChange={(e) => onUpdateConsumed(item.consumedId, Number(e.target.value))}
                          />
                          <span className="ms-2 text-muted small">
                            × {item.servingSize} {item.servingUnit}
                          </span>
                        </div>
                        <div className="text-end fw-bold text-primary">
                          {(item.nutrition.calories * item.amount).toFixed(0)} cal
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                  {provided.placeholder}
                  {consumed.length === 0 && (
                    <ListGroup.Item className="text-center py-5 text-muted">
                      <div className="mb-2">Empty Log</div>
                      <small>Drop items here to track {isToday ? "today's" : "this day's"} intake.</small>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              )}
            </Droppable>
          </Card>
        </Col>
      </Row>
    </DragDropContext>
  );
};

export default LogView;
