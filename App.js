import React, { useState } from 'react';
import Modal from 'react-modal';
import Calculator from './Calculator';
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
      <div className={styles.icon} onClick={() => openApp('Text Editor')}>
        <img src='/text.png' alt='text editor icon' />
        <p>Text Editor</p>
      </div>
      <div className={styles.icon} onClick={() => openApp('Calculator')}>
        <img src='/calc.png' alt='calculator icon' />
        <p>Calculator</p>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        contentLabel="Example Modal"
      >
        <h2>{activeApp} <button onClick={closeModal}>Close</button></h2>
        {activeApp === 'Text Editor' && <textarea />}
        {activeApp === 'Calculator' && <Calculator />}
      </Modal>
    </div>
  );
}

export default App;
