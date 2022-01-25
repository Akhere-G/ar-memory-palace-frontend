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
