import React from 'react';
import './App.css'; // For custom styling if needed

function App() {
  return (
    <div style={styles.container}>
      <div style={styles.column}>
        <div style={styles.box}>Column 1, Box 1</div>
        <div style={styles.box}>Column 1, Box 2</div>
        <div style={styles.box}>Column 1, Box 3</div>
      </div>
      <div style={styles.column}>
        <div style={styles.box}>Column 2, Box 1</div>
        <div style={styles.box}>Column 2, Box 2</div>
        <div style={styles.box}>Column 2, Box 3</div>
      </div>
      <button style={styles.button}>Click Me!</button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: '10px',
  },
  column: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  box: {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    textAlign: 'center',
  },
  button: {
    alignSelf: 'center',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    marginTop: '20px',
  },
};

export default App;
