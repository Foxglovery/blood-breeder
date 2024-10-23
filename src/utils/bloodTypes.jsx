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
// Output could be ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
export const determineOffspringBloodType = (parent1ABO, parent1Rh, parent2ABO, parent2Rh) => {
    const bloodTypeMap = {
        'AA': 'A', 'AO': 'A', 'OA': 'A',
        'BB': 'B', 'BO': 'B', 'OB': 'B',
        'AB': 'AB', 'BA': 'AB',
        'OO': 'O'
    };

    const combinationsABO = [];
    const combinationsRh = [];

    // Generate all combinations of ABO alleles from parents
    for (let i = 0; i < parent1ABO.length; i++) {
        for (let j = 0; j < parent2ABO.length; j++) {
            const allelePair = [parent1ABO[i], parent2ABO[j]].sort().join('');
            combinationsABO.push(bloodTypeMap[allelePair]);
        }
    }

    // Generate all combinations of Rh alleles from parents
    for (let i = 0; i < parent1Rh.length; i++) {
        for (let j = 0; j < parent2Rh.length; j++) {
            const rhCombination = parent1Rh[i] + parent2Rh[j];
            if (rhCombination.includes('+')) {
                combinationsRh.push('+'); // If at least one + is present, Rh+ is possible
            } else {
                combinationsRh.push('-');
            }
        }
    }

    // Use Set to get unique blood types and Rh factors
    const possibleBloodTypes = [...new Set(combinationsABO)];
    const possibleRhTypes = [...new Set(combinationsRh)];

    // Combine ABO and Rh to get the complete blood type possibilities
    const result = [];
    possibleBloodTypes.forEach(abo => {
        possibleRhTypes.forEach(rh => {
            result.push(`${abo}${rh}`);
        });
    });

    return result;
}