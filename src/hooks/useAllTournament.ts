/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useState } from "react";

import { tournament } from "../types/api/tournament";
import { useMessage } from "./useMessage";

export const useAllTournament = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [tournaments, setTournaments] = useState<Array<tournament>>([]);

  const getTournaments = useCallback(() => {
    setLoading(true);
    axios
      //.get<Array<tournament>>("http://localhost:8080/apiTournament/get")
      .get<Array<tournament>>("http://10.0.10.182:8080/apiTournament/get")
      .then((res) => setTournaments(res.data))
      .catch(() => {
        showMessage({ title: "大会取得に失敗しました", status: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return { getTournaments, loading, tournaments };
};