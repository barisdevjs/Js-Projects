import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

import {  useState } from 'react';
import { useTasks } from '../ContextProvider';
import { createItem } from '../services';
import { v4 as uuidv4 } from 'uuid';
import { Formik } from 'formik';
import { schema } from '../utils';

function NavbarComponent() {
  const currentDateTimeInMs = new Date().getTime();
  const INITIAL_FORM_DATA = {
    title: '',
    description: '',
    is_completed: false,
    id: uuidv4(),
    created_at: currentDateTimeInMs,
    updated_at: '',
  };
  const { fireEvent, setFireEvent, setFilter,filter } = useTasks();
  const [show, setShow] = useState(false);
  const handleModal = () => setShow(!show);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleModalClose = () => {
    setFormData(INITIAL_FORM_DATA);
    handleModal();
  };

  const handleSaveChanges = async () => {
    await createItem(formData);
    setFireEvent(!fireEvent);
    handleModal();
    setFormData(INITIAL_FORM_DATA);
  };

  const toggleItems = (value) => {
    setFilter(value)
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary justify-content-between gap-3 py-2 px-5">
      <h3>Tasks</h3>
      <Form>
      <Form.Check 
        type="switch"
        id="custom-switch"
        label={filter ?  "Todo" : "Full items"}
        onChange={(e) => toggleItems(e.target.checked)}
      />
      </Form>
      <Button variant="primary" onClick={handleModal}>
        Add Task
      </Button>
      <Modal show={show} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            validateOnChange={true}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                await schema.validate(values, { abortEarly: false });
                await handleSaveChanges();
                resetForm();
              } catch (errors) {
                console.error(errors);
              } finally {
                setSubmitting(false);
              }
            }}
            initialValues={INITIAL_FORM_DATA}
          >
            {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="title">
                  <Form.Label column sm="3">
                    Title
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      placeholder="title goes here"
                      value={values.title}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(e);
                      }}
                      name="title"
                      isValid={touched.title && !errors.title}
                      isInvalid={touched.title && !!errors.title}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="description">
                  <Form.Label column sm="3">
                    Description
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      placeholder="description goes here"
                      value={values.description}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(e);
                      }}
                      name="description"
                      isValid={touched.description && !errors.description}
                      isInvalid={touched.description && !!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="is_completed">
                  <Form.Label column sm="3">
                    Completed
                  </Form.Label>
                  <Col sm="9">
                    <Form.Check
                      className="mt-2"
                      type={'checkbox'}
                      id={`check-api-${'checkbox'}`}
                    >
                      <Form.Check.Input
                        type={'checkbox'}
                        checked={formData.is_completed}
                        onChange={handleInputChange}
                        id="is_completed"
                      />
                      <Form.Check.Label>Check if you did already</Form.Check.Label>
                      <Form.Control.Feedback tooltip></Form.Control.Feedback>
                    </Form.Check>
                  </Col>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Save Changes
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
}

export default NavbarComponent;
