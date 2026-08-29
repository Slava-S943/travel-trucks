export const validateName = (value: string) => {
  if (!value.trim()) {
    return "Please enter your name.";
  }

  return undefined;
};

export const validateEmail = (value: string) => {
  const email = value.trim();

  if (!email) {
    return "Please enter your email.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Please enter your email.";
  }

  return undefined;
};
