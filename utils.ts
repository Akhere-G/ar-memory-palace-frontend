import { CreateGroupData, CreateNoteData, SignIntoGroupData } from "./types";

const validateString = (name: string, value: string, maxLength = 30) => {
  if (!value.trim()) {
    return `${name} is required`;
  } else if (value.trim().length < 6) {
    return `${name} is too short`;
  } else if (value.trim().length > maxLength) {
    return `${name} is too long`;
  }
  return "";
};

export const validateCreateGroupData = (formData: CreateGroupData) => {
  const { name, summary, password, confirmPassword, latitude, longitude } =
    formData;
  const nameError = validateString("name", name);
  const summaryError = validateString("summary", summary, 200);
  const passwordError = validateString("password", password);
  const confirmPasswordError = validateString(
    "confirm password",
    confirmPassword
  );

  if (longitude === "" || latitude === "") {
    return "Location is required";
  }
  return nameError || summaryError || passwordError || confirmPasswordError;
};

export const validateSignIntoGroupData = (formData: SignIntoGroupData) => {
  const { name, password } = formData;
  const nameError = validateString("name", name);
  const passwordError = validateString("password", password);
  return nameError || passwordError;
};

export const validateCreateNoteData = (formData: CreateNoteData) => {
  const { groupToken, latitude, longitude, text, title } = formData;
  const groupTokenError = validateString(
    "the group of the note",
    groupToken,
    40000
  );
  const titleError = validateString("Title", title, 50);
  const textError = validateString("Text", text, 600);
  if (longitude === "" || latitude === "") {
    return "Location is required";
  }
  return groupTokenError || titleError || textError;
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
  return errorObj.message || defaultMessage;
};
