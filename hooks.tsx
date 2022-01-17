import { useState, useEffect } from "react";
import * as api from "./api";
import { Group } from "./types";

export const useViewGroups = (getGroups = api.getGroups) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        const response = await getGroups();
        const data = response.data;

        const newGroups: Group[] = data.groups.map((group: any) => ({
          id: group._id,
          name: group.name,
          category: group.category,
          summary: group.summary,
          latitude: group.latitude,
          longitude: group.longitude,
        }));

        setGroups(newGroups);
        setTotal(data.total);
        setError("");
      } catch (err: any) {
        console.log(err?.response);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  return { groups, total, loading, error };
};
