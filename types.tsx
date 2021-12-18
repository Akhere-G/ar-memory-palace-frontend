export type Note = {
  id: String;
  title: String;
  groupId: String;
  category: String;
  text: String;
  latitude: Number;
  longitude: Number;
};

export type Group = {
  id: string;
  name: String;
  category: string;
  summary: String;
  latitude: Number;
  longitude: Number;
};
