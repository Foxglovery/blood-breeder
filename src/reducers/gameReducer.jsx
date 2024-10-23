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
    
}