export type Note = {
  id: string;
  title: string;
  groupId: string;
  groupName: string;
  groupToken: string;
  text: string;
  latitude: number;
  longitude: number;
};

export type Group = {
  id: string;
  name: string;
  category: string;
  summary: string;
};

export type CreateGroupData = {
  name: string;
  summary: string;
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

export type NoteData = {
  title: string;
  groupToken: string;
  text: string;
  latitude: string;
  longitude: string;
};
