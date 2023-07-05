import React, { useState } from 'react';
import Modal from 'react-modal';
import Calculator from './Calculator';
import TextEditor from './TextEditor';
import WeatherWidget from './WeatherWidget';
import Toolbar from './Toolbar';
import styles from './App.module.css';
import osBG from './osBG.jpg';

Modal.setAppElement('#root');

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeApp, setActiveApp] = useState('');

  function openApp(app) {
    setActiveApp(app);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className={styles.app} style={{ backgroundImage: `url(${osBG})` }}>
      <WeatherWidget className={styles.weatherWidget} />
      
      <Toolbar openApp={openApp} />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        contentLabel="Example Modal"
      >
        <h2>{activeApp} <button onClick={closeModal}>Close</button></h2>
        {activeApp === 'Text Editor' && <TextEditor />}
        {activeApp === 'Calculator' && <Calculator />}
      </Modal>
    </div>
  );
}

export default App;
