import React, { useState } from 'react';
import '../CSS/Sidebar.css';
import Meet from '../assets/meet.gif';
import Gpt from '../assets/gpt.gif';
import Review from '../assets/rating.gif';
import Model from '../assets/model.gif';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import BorderExample from '../BorderExample';

const genAI = new GoogleGenerativeAI("AIzaSyDfazWK5xqM82qJqxGTfqrWMac6PE8Cz6o");
const apiKey = "b0e9bc5a328da6304b658548035914ddd00f8ab1bc676c79";

const Sidebar = () => {
  const [ChatResponse, setChatResponse] = useState("");
  const [Input, setInput] = useState("");
  const [show, setShow] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Clicked, setClicked] = useState(false);

  const handleClose = () => {
    setShow(false);
    setClicked(false);
    setLoading(false);
    setChatResponse("");
    setInput("");
  };

  const handleShow = () => setShow(true);

  const GenerateChatResponse = async () => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `${Input}`;
      const result = await model.generateContent(prompt);
      const response = result.response;
      const realtext = JSON.stringify(response.text());
      setChatResponse(realtext);
    } catch (err) {
      alert(`${err} occurred`);
    }
  };

  const handleEvent = async (e) => {
    e.preventDefault();
    setClicked(true);
    setLoading(true);
    await GenerateChatResponse();
    setLoading(false);
  };

  return (
    <div className='sidebar-container'>
      <div className="f">
        <img src={Meet} alt="" style={{ width: '40%' }} />
        <a href="https://agrico-meet.vercel.app/" target='_blank' style={{ width: '40%', textDecoration: 'none', color: 'black' }}>Create Meet</a>
      </div>

      <div className="t">
        <img src={Model} alt="" style={{ width: '40%' }} />
        <a style={{ width: '50%', textDecoration: 'none', color: 'black' }} href='https://texttoimage-zeta.vercel.app' target='_blank'>Text to Image</a>
      </div>

      <div className="s">
        <img src={Gpt} alt="" style={{ width: '40%' }} />
        <a style={{ width: '30%', textDecoration: 'none', color: 'black', cursor: 'pointer' }} onClick={handleShow}>Ask Gpt</a>
      </div>

      {/* <div className="t">
        <img src={Review} alt="" style={{ width: '40%' }} />
        <a style={{ width: '30%', textDecoration: 'none', color: 'black' }} href='https://ml-review.vercel.app/' target='_blank'>FeedBack</a>
      </div> */}

      <div style={{ height: '20%' }}></div>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Farm GPT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ask Question..?"
                autoFocus
                value={Input}
                onChange={(e) => setInput(e.target.value)}
              />
            </Form.Group>
          </Form>
          {Clicked && (
            <>
              {Loading ? (
                <div className="text-center">
                  <Spinner animation="border" />
                  <p>Loading...</p>
                </div>
              ) : (
                ChatResponse ? (
                  <Alert variant="success">
                    <p>{ChatResponse}</p>
                  </Alert>
                ) : (
                  <Alert variant="danger">
                    <p>No response received. Please try again.</p>
                  </Alert>
                )
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEvent}>
            Ask
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Sidebar;
