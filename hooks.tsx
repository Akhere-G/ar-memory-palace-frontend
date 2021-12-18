import { useState, useEffect } from "react";
import { getGroupsResponse } from "./data";
import { Group } from "./types";

export const useViewGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const response = getGroupsResponse();
    const newGroups: Group[] = response.groups.map((group: any) => ({
      id: group._id,
      name: group.name,
      category: group.category,
      summary: group.summary,
      latitude: group.latitude,
      longitude: group.longitude,
    }));

    setGroups(newGroups);
    setTotal(response.total);
  }, []);

  return { groups, total };
};
