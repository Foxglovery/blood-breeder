import React, { useReducer } from 'react';
import { initialState, gameReducer } from './reducers/gameReducer';
import BreedingPanel from './components/BreedingPanel';
import './App.css'
import TransfusionPanel from './components/TransfusionPanel';

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const handleBreeding = () => {
    if (state.selectedDonors.length === 2) {
      dispatch({ type: 'BREED_DONORS' });
    }
  };

  const handleBreedDonors = (donor1, donor2) => {
    dispatch({ type: 'SELECT_DONOR', payload: donor1 });
    dispatch({ type: 'SELECT_DONOR', payload: donor2 });
    // We should wait until both are added before calling the breed action.
    dispatch({ type: 'BREED_DONORS' });
    handleStartTransfusion();
  };

  const handleStartTransfusion = () => {
    dispatch({ type: 'START_TRANSFUSION' });
  };

  const handleDonateBlood = (donorId) => {
    dispatch({ type: 'DONATE_BLOOD', payload: { donorId } });
  };

  return (
    <div>
      <h1>Blood Donor Game</h1>
     
      {state.phase === 'breeding' && (
  <BreedingPanel donors={state.donors} onBreed={handleBreedDonors} />

)}

{state.phase === 'transfusion' && (
        <TransfusionPanel 
          donors={state.donors} 
          donorsNeedingBlood={state.donorsNeedingBlood} 
          onDonateBlood={handleDonateBlood} 
        />
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
