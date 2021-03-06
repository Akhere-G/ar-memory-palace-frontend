import {
  Note,
  Group,
  CreateGroupData,
  NoteData,
  SignIntoGroupData,
  NotesByGroup,
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
  const { name, summary, password, confirmPassword } = formData;
  const nameError = validateString("name", name);
  const summaryError = validateString("summary", summary, 200);
  const passwordError = validateString("password", password);
  const confirmPasswordError = validateString(
    "confirm password",
    confirmPassword
  );

  return nameError || summaryError || passwordError || confirmPasswordError;
};

export const validateSignIntoGroupData = (formData: SignIntoGroupData) => {
  const { name, password } = formData;
  const nameError = validateString("name", name);
  const passwordError = validateString("password", password);
  return nameError || passwordError;
};

export const validateCreateNoteData = (formData: NoteData) => {
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

export const validateUpdateNoteData = (formData: NoteData) => {
  const { latitude, longitude, text, title } = formData;
  const titleError = validateString("Title", title, 50);
  const textError = validateString("Text", text, 600);
  if (longitude === "" || latitude === "") {
    return "Location is required";
  }
  return titleError || textError;
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
  const ??1 = (lat1 * Math.PI) / 180; // ??, ?? in radians
  const ??2 = (lat2 * Math.PI) / 180;
  const ???? = ((lat2 - lat1) * Math.PI) / 180;
  const ???? = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(???? / 2) * Math.sin(???? / 2) +
    Math.cos(??1) * Math.cos(??2) * Math.sin(???? / 2) * Math.sin(???? / 2);
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

const sortNotesByGroup = (notes: Note[], groups: Group[]) => {
  const initial: NotesByGroup = {};
  return notes.reduce((acc, note) => {
    const groupId = note.groupId;
    if (groupId) {
      if (acc[groupId]) {
        acc[groupId].push(note);
      } else {
        acc[groupId] = [note];
      }
    }
    return acc;
  }, initial);
};

export const sectionNotesByGroup = (notes: Note[], groups: Group[]) => {
  const notesByGroupId = sortNotesByGroup(notes, groups);
  return Object.entries(notesByGroupId).map((entry) => {
    const [groupId, notes] = entry;
    const groupName = groups.find((group) => group.id === groupId)?.name || "";
    return { title: groupName, data: notes };
  });
};
