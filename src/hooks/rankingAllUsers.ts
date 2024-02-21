/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useState } from "react";
import { useMessage } from "./useMessage";
import { User } from "../types/api/user";

export const useRankingAllUsers = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<Array<User>>([]);
  const [error, setError] = useState<string | null>(null);

  const getRankings = useCallback(() => {
    setLoading(true);
    axios
      //.get<Array<User>>("http://localhost:8080/api/ranking")
      .get<Array<User>>("http://18.182.187.244:8080/api/ranking")
      .then((res) => setUsers(res.data))
      .catch(() => {
        showMessage({ title: "ユーザー取得に失敗しました", status: "error" });
        setError("ユーザーの取得に失敗しました");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { getRankings, loading, users, error };
};