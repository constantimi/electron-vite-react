const isDobValid = (dob: string): boolean => {
  const dobDate = new Date(dob);

  // Check if the date is invalid (e.g., not a date)
  if (Number.isNaN(dobDate.getTime())) {
    return false;
  }

  // Additional checks can be added here (e.g., age range)
  const today = new Date();

  // Check if the date of birth is in the future
  if (dobDate > today) {
    return false;
  }

  return true;
};

export default isDobValid;
