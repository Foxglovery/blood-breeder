import { determineOffspringBloodType } from "../utils/bloodTypes";

const initialState = {
    donors: [
        { id: 1, name: 'Donor 1', bloodType: 'A+', donationCount: 0, alive: true, isOffspring: false },
        { id: 2, name: 'Donor 2', bloodType: 'A-', donationCount: 0, alive: true, isOffspring: false },
        { id: 3, name: 'Donor 3', bloodType: 'AB+', donationCount: 0, alive: true, isOffspring: false },
        { id: 4, name: 'Donor 4', bloodType: 'AB-', donationCount: 0, alive: true, isOffspring: false },
        { id: 5, name: 'Donor 5', bloodType: 'B+', donationCount: 0, alive: true, isOffspring: false },
        { id: 6, name: 'Donor 6', bloodType: 'B-', donationCount: 0, alive: true, isOffspring: false },
        { id: 7, name: 'Donor 7', bloodType: 'O-', donationCount: 0, alive: true, isOffspring: false },
        { id: 8, name: 'Donor 8', bloodType: 'O+', donationCount: 0, alive: true, isOffspring: false },
    ],
    phase: 'breeding',
    selectedDonors: [],
    donorsNeedingBlood: []
};

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'SELECT_DONOR':
            // Check if donor is already selected to avoid duplicates
            if (state.selectedDonors.find(d => d.id === action.payload.id)) {
                return state; // No duplicate additions
            }
            return { ...state, selectedDonors: [...state.selectedDonors, action.payload] };

        case 'BREED_DONORS':
            // Ensure we have exactly 2 donors selected
            { if (state.selectedDonors.length !== 2) {
                console.error("Two donors must be selected for breeding.");
                return state;
            }

            const [donor1, donor2] = state.selectedDonors;
            if (!donor1 || !donor2) {
                console.error("One or both selected donors could not be found.");
                return state;
            }

            const offspring = {
                id: state.donors.length + 1,
                name: `Offspring ${state.donors.length + 1}`,
                bloodType: determineOffspringBloodType(donor1.bloodType, donor2.bloodType),
                donationCount: 0,
                alive: true,
                isOffspring: true
                
            };

            return {
                ...state,
                donors: [...state.donors, offspring],
                selectedDonors: [], // Reset selection
            }; }

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
