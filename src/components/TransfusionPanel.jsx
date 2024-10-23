import React, { useState } from 'react';

const TransfusionPanel = ({ donors, onTransfusion }) => {
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState(null);

  const handleDonate = () => {
    if (selectedDonor && selectedRecipient) {
      onTransfusion(selectedDonor, selectedRecipient);
      setSelectedDonor(null);
      setSelectedRecipient(null);
    }
  };

  return (
    <div>
      <h2>Transfusion Phase</h2>
      <div>
        <h3>Select Donor to Give Blood:</h3>
        {donors
          .filter(d => d.alive && d.donationCount < 4) // Only show donors who can donate
          .map(donor => (
            <button
              key={donor.id}
              onClick={() => setSelectedDonor(donor.id)}
              style={{
                backgroundColor: selectedDonor === donor.id ? 'lightgreen' : 'white',
                margin: '5px'
              }}
            >
              {donor.name} ({donor.bloodType})
            </button>
          ))}
      </div>

      <div>
        <h3>Select Recipient to Receive Blood:</h3>
        {donors
          .filter(d => d.alive && d !== selectedDonor) // Only show potential recipients
          .map(recipient => (
            <button
              key={recipient.id}
              onClick={() => setSelectedRecipient(recipient.id)}
              style={{
                backgroundColor: selectedRecipient === recipient.id ? 'lightcoral' : 'white',
                margin: '5px'
              }}
            >
              {recipient.name} ({recipient.bloodType})
            </button>
          ))}
      </div>

      <button onClick={handleDonate} disabled={!selectedDonor || !selectedRecipient}>
        Donate Blood
      </button>
    </div>
  );
};

export default TransfusionPanel;
