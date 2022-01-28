import { CreateGroupData, SignIntoGroupData } from "./types";

const validateString = (name: string, value: string, maxLength = 30) => {
  if (!value.trim()) {
    return `${name} is required`;
  } else if (value.trim().length < 6) {
    return `${name} is too short`;
  } else if (value.trim().length > maxLength) {
    return `${name} is too long`;
  }
};

const validateNumber = (name: string, value: string) => {
  const numericalValue = Number(value);
  if (value.trim() === "") {
    return `${name} is required`;
  }
  if (isNaN(numericalValue)) {
    return `${name} must be a number`;
  }
};

export const validateCreateGroupData = (formData: CreateGroupData) => {
  const { name, summary, latitude, longitude, password, confirmPassword } =
    formData;
  const nameError = validateString("name", name);
  const summaryError = validateString("summary", summary, 200);
  const passwordError = validateString("password", password);
  const confirmPasswordError = validateString(
    "confirm password",
    confirmPassword
  );
  const latitudeError = validateNumber("latitude", latitude);
  const longitudeError = validateNumber("longitude", longitude);

  return (
    nameError ||
    summaryError ||
    passwordError ||
    confirmPasswordError ||
    latitudeError ||
    longitudeError
  );
};

export const validateSignIntoGroupData = (formData: SignIntoGroupData) => {
  const { name, password } = formData;
  const nameError = validateString("name", name);
  const passwordError = validateString("password", password);
  return nameError || passwordError;
};

export const handleError = (
  errorObj: any,
  defaultMessage = "An error occured"
) => {
  if (typeof errorObj !== "object") {
    return defaultMessage;
  }
  if (errorObj.isAxiosError) {
    const message = errorObj?.response?.data?.message || errorObj.message;
    return message || defaultMessage;
  }
  return defaultMessage;
};
