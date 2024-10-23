import React, { useReducer } from 'react';
import { initialState, gameReducer } from './reducers/gameReducer';
import BreedingPanel from './components/BreedingPanel';

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const handleBreeding = () => {
    if (state.selectedDonors.length === 2) {
      dispatch({ type: 'BREED_DONORS' });
    }
  };

  const handleBreedDonors = (donor1Id, donor2Id) => {
    dispatch({ type: 'BREED_DONORS', payload: { donor1Id, donor2Id } });
  };

  const handleStartTransfusion = () => {
    dispatch({ type: 'START_TRANSFUSION' });
  };

  return (
    <div>
      <h1>Blood Donor Game</h1>
     
      {state.phase === 'breeding' && (
  <BreedingPanel donors={state.donors} onBreed={handleBreedDonors} />
)}
      {state.phase === 'transfusion' && (
        <div>
          {/* Transfusion UI */}
          <button onClick={handleStartTransfusion}>Start Transfusion</button>
        </div>
      )}
    </div>
  );
}

export default App;
