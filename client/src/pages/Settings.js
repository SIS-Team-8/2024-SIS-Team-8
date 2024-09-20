import React, { useState } from 'react';

const CheckboxRow = ({ title, checkboxes }) => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckedItems((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px' }}>
      <h1 style={{ margin: '0', fontSize: '16px', marginRight: '20px', textAlign: 'left' }}>{title}</h1>
      {checkboxes.map((checkbox) => (
        <div key={checkbox.id} style={{ marginLeft: '10px' }}>
          <label>
            <input
              type="checkbox"
              id={checkbox.id}
              checked={checkedItems[checkbox.id] || false}
              onChange={handleCheckboxChange}
            />
            {checkbox.label}
          </label>
        </div>
      ))}
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
    <div style={{ padding: '20px', textAlign: 'left' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>Settings Screen</h1>

      <div style={{ margin: '0 auto', maxWidth: '400px' }}>
        <CheckboxRow title="Frequency of Reminders" checkboxes={firstCheckboxes} />
        <CheckboxRow title="Notification Preferences" checkboxes={secondCheckboxes} />

        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', justifyContent: 'flex-start' }}>
          <h1 style={{ margin: '0', fontSize: '16px', marginRight: '20px', marginLeft: '10px' }}>Language Preferences</h1>
          <select style={{ padding: '5px', fontSize: '16px', marginLeft: '20px' }}>
            {languages.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '20px', justifyContent: 'flex-start' }}>
          <h1 style={{ margin: '0', fontSize: '16px', marginRight: '10px', marginLeft: '10px' }}>Privacy Settings</h1>
          <div style={{ textAlign: 'left', marginLeft: '20px' }}>
            <p style={{ margin: '0', fontSize: '14px' }}>First Line of Text</p>
            <p style={{ margin: '0', fontSize: '14px' }}>Second Line of Text</p>
            <p style={{ margin: '0', fontSize: '14px' }}>Third Line of Text</p>
          </div>
        </div>

        {/* Button Added Here */}
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <button style={{ padding: '10px 20px', fontSize: '16px' }}>Home Page</button>
        </div>
      </div>
    </div>
  );
};

export default App;
