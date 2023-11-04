/* eslint-disable react/prop-types */
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { formatReadableDate } from '../utils';
import Button from 'react-bootstrap/esm/Button';
import { deleteItem, updateItem } from '../services';
import { useShoppingCart } from '../ContextProvider';

function Item({ item }) {
  const {
    fireEvent,
    setFireEvent,
  } = useShoppingCart();
  return (
    <Card >
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>{item.description}</Card.Text>
        <ListGroup variant="flush" >
          <ListGroup.Item className='justify-content-between'>
            <Form>
              <Form.Check
                type="switch"
                id="custom-switch"
                checked={item.is_completed}
                label={item.is_completed ? "Completed" : "To Do"}
                onChange={() => updateItem(item)}
              />
            </Form>
          </ListGroup.Item>
          <ListGroup.Item className='justify-content-between'>
            <p>Created At:</p>
            <p>{formatReadableDate(item.created_at)}</p>
          </ListGroup.Item>
          <ListGroup.Item className='justify-content-between'>
            <p>Updated At:</p>
            <p>{formatReadableDate(item.updated_at)}</p>
          </ListGroup.Item>
        </ListGroup>
        <Button onClick={() => { deleteItem(item.id); setFireEvent(!fireEvent) }} size="sm" variant="outline-danger">DELETE</Button>
      </Card.Body>
    </Card>
  );
}
export default Item;
