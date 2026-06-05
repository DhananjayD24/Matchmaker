const yesNoMaybeMap = {
  No: 0,
  Maybe: 1,
  Yes: 2,
};

const maritalStatusMap = {
  Single: 1,
  Divorced: 2,
  Widowed: 3,
};

function calculateAge(dob) {
  return new Date().getFullYear() - new Date(dob).getFullYear();
}

function stringToNumber(str = "") {
  return str
    .toLowerCase()
    .split("")
    .reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
}

function normalizeIncome(income) {
  return income / 100000;
}

function profileToVector(profile) {
  const age = calculateAge(profile.dateOfBirth);

  return [
    age,
    profile.height,
    normalizeIncome(profile.income),

    stringToNumber(profile.country),
    stringToNumber(profile.city),

    stringToNumber(profile.college),
    stringToNumber(profile.degree),

    stringToNumber(profile.currentCompany),
    stringToNumber(profile.designation),

    maritalStatusMap[profile.maritalStatus] || 0,

    profile.languagesKnown.length,

    profile.siblings,

    yesNoMaybeMap[profile.openToRelocate] || 0,
    yesNoMaybeMap[profile.openToPets] || 0,

    profile.verified === "Yes" ? 1 : 0,

    ...(profile.hobbies || []).map((hobby) => stringToNumber(hobby)),
  ];
}

function dotProduct(a, b) {
  let sum = 0;

  const len = Math.min(a.length, b.length);

  for (let i = 0; i < len; i++) {
    sum += a[i] * b[i];
  }

  return sum;
}

function magnitude(vec) {
  return Math.sqrt(vec.reduce((sum, val) => sum + val * val, 0));
}

function cosineSimilarity(v1, v2) {
  return dotProduct(v1, v2) / (magnitude(v1) * magnitude(v2));
}

function passesHardFilters(customer, candidate) {
  if (candidate.verified !== "Yes") {
    return false;
  }

  if (customer.religion !== candidate.religion) {
    return false;
  }

  if (customer.wantKids !== candidate.wantKids) {
    return false;
  }

  const sameLocation =
    customer.country === candidate.country && customer.city === candidate.city;

  const relocationAllowed =
    sameLocation ||
    customer.openToRelocate === "Yes" ||
    candidate.openToRelocate === "Yes";

  if (!relocationAllowed) {
    return false;
  }

  if (customer.gender === "Male") {
    if (candidate.gender !== "Female") {
      return false;
    }

    if (
      calculateAge(candidate.dateOfBirth) >= calculateAge(customer.dateOfBirth)
    ) {
      return false;
    }

    if (candidate.height >= customer.height) {
      return false;
    }

    if (candidate.income >= customer.income) {
      return false;
    }

    if (customer.openToRelocate !== candidate.openToRelocate && !sameLocation) {
      return false;
    }
  } else {
    if (candidate.gender !== "Male") {
      return false;
    }

    const sameProfessionOrValues =
      customer.currentCompany === candidate.currentCompany ||
      customer.designation === candidate.designation ||
      customer.degree === candidate.degree ||
      customer.college === candidate.college;

    if (!sameProfessionOrValues) {
      return false;
    }
  }

  return true;
}

function passesFallbackFilters(customer, candidate) {
  if (candidate.verified !== "Yes") {
    return false;
  }

  if (customer.gender === "Male" && candidate.gender !== "Female") {
    return false;
  }

  if (customer.gender === "Female" && candidate.gender !== "Male") {
    return false;
  }

  if (customer.religion !== candidate.religion) {
    return false;
  }

  if (customer.wantKids !== candidate.wantKids) {
    return false;
  }

  const sameLocation =
    customer.country === candidate.country && customer.city === candidate.city;

  if (
    !sameLocation &&
    customer.openToRelocate !== "Yes" &&
    candidate.openToRelocate !== "Yes"
  ) {
    return false;
  }

  return true;
}

export function getTopMatches(customer, profiles) {
  const customerVector = profileToVector(customer);

  const scoredProfiles = profiles
    .filter((profile) => profile.id !== customer.id)
    .map((profile) => {
      const profileVector = profileToVector(profile);

      const similarity = cosineSimilarity(customerVector, profileVector);

      return {
        ...profile,
        similarityScore: Number((similarity * 100).toFixed(2)),
      };
    });

  const hardMatches = scoredProfiles
    .filter((profile) => passesHardFilters(customer, profile))
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, 10);

  if (hardMatches.length > 0) {
    return hardMatches;
  }

  const fallbackMatches = scoredProfiles
    .filter((profile) => passesFallbackFilters(customer, profile))
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, 10)
    .map((profile) => ({ ...profile, fallback: true }));

  return fallbackMatches;
}
