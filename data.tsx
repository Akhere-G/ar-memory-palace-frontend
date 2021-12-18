export const getGroupsResponse = () => ({
  groups: [
    {
      _id: "61bb68d157d1a8b7269854df",
      name: "Ak's French class",
      category: "learning and fun",
      summary: "A French study group for level 3+4",
      latitude: -0.1359,
      longitude: 51.5233,
      __v: 0,
    },
  ],
  total: 1,
});

export const getNotesResponse = () => ({
  notes: [
    {
      _id: "61bb6a4357d1a8b7269854eb",
      title: "articles",
      groupId: "61bb68d157d1a8b7269854df",
      category: "grammar",
      text: "le, la, les, l' = the\nde, de la, des, du = some\nun, une = one",
      latitude: -0.1361,
      longitude: 51.52325,
      __v: 0,
    },
    {
      _id: "61bb6a8557d1a8b7269854ee",
      title: "verbs",
      groupId: "61bb68d157d1a8b7269854df",
      category: "vocabulary",
      text: "aller = go\nmanger = eat\nêtre = be",
      latitude: -0.1363,
      longitude: 51.52323,
      __v: 0,
    },
    {
      _id: "61bb6a8c57d1a8b7269854f1",
      title: "nouns - week 1",
      groupId: "61bb68d157d1a8b7269854df",
      category: "vocabulary",
      text: "le chien = the dog\nle chat = the cat",
      latitude: -0.13635,
      longitude: 51.52323,
      __v: 0,
    },
  ],
  total: 3,
});
