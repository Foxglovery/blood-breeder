import React, { useState } from 'react';

const BreedingPanel = ({ donors, onBreed }) => {
  const [selectedDonors, setSelectedDonors] = useState([]);

  const handleSelectDonor = (donorId) => {
    if (selectedDonors.includes(donorId)) {
      setSelectedDonors(selectedDonors.filter(id => id !== donorId));
    } else if (selectedDonors.length < 2) {
      setSelectedDonors([...selectedDonors, donorId]);
    }
  };

  const handleBreed = () => {
    if (selectedDonors.length === 2) {
      onBreed(selectedDonors[0], selectedDonors[1]);
      setSelectedDonors([]); // Clear selection after breeding
    }
  };

  return (
    <div>
      <h2>Breeding Phase</h2>
      <div>
        {donors.map(donor => (
          <button
            key={donor.id}
            onClick={() => handleSelectDonor(donor.id)}
            style={{
              backgroundColor: selectedDonors.includes(donor.id) ? 'lightblue' : 'white',
              margin: '5px'
            }}
          >
            {donor.name} ({donor.bloodType})
          </button>
        ))}
      </div>
      <button onClick={handleBreed} disabled={selectedDonors.length !== 2}>
        Breed Selected Donors
      </button>
    </div>
  );
};

export default BreedingPanel;
