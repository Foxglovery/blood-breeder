import { determineOffspringBloodType } from "../utils/bloodTypes";

const initialState = {
    donors: [
        { id: 1, name: 'Donor 1', bloodType: 'A+', donationCount: 0, alive: true },
        { id: 2, name: 'Donor 2', bloodType: 'A-', donationCount: 0, alive: true },
        { id: 3, name: 'Donor 3', bloodType: 'AB+', donationCount: 0, alive: true },
        { id: 4, name: 'Donor 4', bloodType: 'AB-', donationCount: 0, alive: true },
        { id: 5, name: 'Donor 5', bloodType: 'B+', donationCount: 0, alive: true },
        { id: 6, name: 'Donor 6', bloodType: 'B-', donationCount: 0, alive: true },
        { id: 7, name: 'Donor 7', bloodType: 'O-', donationCount: 0, alive: true },
        { id: 8, name: 'Donor 8', bloodType: 'O+', donationCount: 0, alive: true },
    ],
    phase: 'breeding',
    selectedDonors: [],
    donorsNeedingBlood: []
}

const gameReducer = (state, action) => {
    switch (action.type) {
      case 'SELECT_DONOR':
        return { ...state, selectedDonors: [...state.selectedDonors, action.payload] };
      case 'BREED_DONORS':
        { const offspring = {
          id: state.donors.length + 1,
          name: `Offspring ${state.donors.length + 1}`,
          bloodType: determineOffspringBloodType(state.selectedDonors[0].bloodType, state.selectedDonors[1].bloodType),
          donationCount: 0,
          alive: true,
        };
        return { ...state, donors: [...state.donors, offspring], selectedDonors: [] }; }
      case 'START_TRANSFUSION':
        return { ...state, phase: 'transfusion' };
      case 'LOSE_BLOOD':
        return { ...state, donorsNeedingBlood: action.payload };
      case 'DONATE_BLOOD':
        return {
          ...state,
          donors: state.donors.map(donor =>
            donor.id === action.payload.donorId ? { ...donor, donationCount: donor.donationCount + 1 } : donor
          ),
        };
      case 'DONOR_DIES':
        return {
          ...state,
          donors: state.donors.map(donor =>
            donor.id === action.payload.donorId ? { ...donor, alive: false } : donor
          ),
        };
      default:
        return state;
    }
  };
  
  export { initialState, gameReducer };