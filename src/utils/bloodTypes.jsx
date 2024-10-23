// (donor: recipient) key values
export const bloodCompatibility = {
    'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    'O+': ['O+', 'A+', 'B+', 'AB+'],
    'A-': ['A-', 'A+', 'AB-', 'AB+'],
    'A+': ['A+', 'AB+'],
    'B-': ['B-', 'B+', 'AB-', 'AB+'],
    'B+': ['B+', 'AB+'],
    'AB-': ['AB-', 'AB+'],
    'AB+': ['AB+']
}

// returns true if donor can donate
export const canDonateTo = (donorType, recipientType) => {
    return bloodCompatibility[donorType].includes(recipientType);
}

// Function to determine offspring blood types
export const determineOffspringType = (parent1, parent2) => {
    if (parent1 == '')
}