export type Note = {
  id: string;
  title: string;
  groupId: string;
  text: string;
  latitude: Number;
  longitude: Number;
};

export type Group = {
  id: string;
  name: string;
  category: string;
  summary: string;
  latitude: Number;
  longitude: Number;
};

export type CreateGroupData = {
  name: string;
  summary: string;
  latitude: string;
  longitude: string;
  password: string;
  confirmPassword: string;
};

export type SignIntoGroupData = {
  name: string;
  password: string;
};

export type Coordinates = {
  latitude: string;
  longitude: string;
};

export type CreateNoteData = {
  title: string;
  groupToken: string;
  text: string;
  latitude: string;
  longitude: string;
};
