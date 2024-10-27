import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BreedingPanel = ({ donors, onBreed }) => {
  const [selectedDonors, setSelectedDonors] = useState([]);

  // Function to handle selecting a donor
  const handleSelectDonor = (donorId) => {
    if (selectedDonors.includes(donorId)) {
      setSelectedDonors(selectedDonors.filter(id => id !== donorId));
    } else if (selectedDonors.length < 2) {
      setSelectedDonors([...selectedDonors, donorId]);
    }
  };

  // Function to breed the selected donors
  const handleBreed = () => {
    if (selectedDonors.length === 2) {
      const [donor1Id, donor2Id] = selectedDonors;
      const donor1 = donors.find(donor => donor.id === donor1Id);
      const donor2 = donors.find(donor => donor.id === donor2Id);

      if (donor1 && donor2) {
        console.log("Selected donors for breeding:", donor1, donor2); // Debugging log
        onBreed(donor1, donor2);
      }

      setSelectedDonors([]); // Reset the selection after breeding
    } else {
      console.warn("Two donors must be selected to breed."); // Additional check
    }
  };

  // Function to reset the selection
  const handleReset = () => {
    setSelectedDonors([]);
  };

  return (
    <div>
      <h2>Breeding Phase</h2>
      <p>Select two donors to breed:</p>

      {/* Display all donors */}
      <div>
        {donors.map(donor => (
          <button
            key={donor.id}
            onClick={() => handleSelectDonor(donor.id)}
            style={{
              backgroundColor: selectedDonors.includes(donor.id) ? 'lightblue' : 'white',
              margin: '5px',
              padding: '10px',
            }}
          >
            {donor.name} ({donor.bloodType})
          </button>
        ))}
      </div>

      {/* Breeding controls */}
      <div>
        <button onClick={handleBreed} disabled={selectedDonors.length !== 2}>
          Breed Selected Donors
        </button>
        <button onClick={handleReset}>
          Reset Selection
        </button>
      </div>
    </div>
  );
};

// PropTypes for validation
BreedingPanel.propTypes = {
  donors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      bloodType: PropTypes.string.isRequired,
      donationCount: PropTypes.number,
      alive: PropTypes.bool,
    })
  ).isRequired,
  onBreed: PropTypes.func.isRequired,
};

export default BreedingPanel;
