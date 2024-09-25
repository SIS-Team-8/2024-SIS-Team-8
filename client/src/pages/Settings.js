import React, { useState } from 'react';
import styles from './pages.module.css';

const CheckboxRow = ({ title, checkboxes }) => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckedItems((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <div  className={styles.body} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', font: 'Poppins'}}>
      <h2 style={{ margin: '0', fontSize: '18px', marginRight: '20px' }}>{title}</h2>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {checkboxes.map((checkbox) => (
          <div key={checkbox.id} style={{ marginLeft: '0px', display: 'flex', alignItems: 'left' }}>
            <input
              type="checkbox"
              id={checkbox.id}
              checked={checkedItems[checkbox.id] || false}
              onChange={handleCheckboxChange}
            />
            <label style={{ marginLeft: '5px' }}>{checkbox.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const firstCheckboxes = [
    { id: 'checkbox1', label: 'Daily' },
    { id: 'checkbox2', label: 'Weekly' },
    { id: 'checkbox3', label: 'Monthly' },
    { id: 'checkbox4', label: 'Custom' },
  ];

  const secondCheckboxes = [
    { id: 'checkbox5', label: 'Light Mode' },
    { id: 'checkbox6', label: 'Dark Mode' },
  ];

  const languages = ['English', 'Spanish', 'French', 'German'];

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Settings Screen</h1>

      <div style={{ margin: '0 auto', maxWidth: '400px', textAlign: 'left' }}>
        <CheckboxRow title="Frequency of Reminders" checkboxes={firstCheckboxes} />
        <CheckboxRow title="Notification Preferences" checkboxes={secondCheckboxes} />

        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', justifyContent: 'space-between' }}>
          <h2 style={{ margin: '0', fontSize: '18px', marginRight: '10px' }}>Language Preferences</h2>
          <select style={{ padding: '5px', fontSize: '16px' }}>
            {languages.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '20px', justifyContent: 'space-between' }}>
          <h2 style={{ margin: '0', fontSize: '18px', marginRight: '10px' }}>Privacy Settings</h2>
          <div style={{ textAlign: 'left' }}>
            <p style={{ margin: '0', fontSize: '14px' }}>First Line of Text</p>
            <p style={{ margin: '0', fontSize: '14px' }}>Second Line of Text</p>
            <p style={{ margin: '0', fontSize: '14px' }}>Third Line of Text</p>
          </div>
        </div>

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>Home Page</button>
        </div>
      </div>
    </div>
  );
};

export default App;