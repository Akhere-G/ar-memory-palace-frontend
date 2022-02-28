import {
  Note,
  CreateGroupData,
  CreateNoteData,
  SignIntoGroupData,
} from "./types";

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

export const areTheseCoordsClose = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  minDist: number
) => {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres

  return d < minDist;
};

export const getCloseNotes = (
  notes: Note[],
  lat: number,
  lon: number,
  minDist: number
) => {
  return notes.filter((note) =>
    areTheseCoordsClose(note.latitude, note.longitude, lat, lon, minDist)
  );
};
