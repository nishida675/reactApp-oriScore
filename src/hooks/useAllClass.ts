/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useState } from "react";

import { Participant } from "../types/api/Participant";
import { useMessage } from "./useMessage";

export const useAllClass = () => {
  const { showMessage } = useMessage();
  const [clases, setClases] = useState<Array<Participant>>([]);
  const [loading2, setLoading2] = useState(false);

  const getClases = useCallback(async(tournamentId: number) => {
    setLoading2(true);
    try {
      //const response = await axios.get<Array<Participant>>(`http://localhost:8080/apiTournament/getClass?tournamentId=${tournamentId}`);
      const response = await axios.get<Array<Participant>>(`http://10.0.10.182:8080/apiTournament/getClass?tournamentId=${tournamentId}`);
      setClases(response.data);
      return response.data; 
    } catch (error) {
      showMessage({ title: "取得に失敗しました", status: "error" });
      throw error; 
    }finally{
      setLoading2(false);
    }
  }, []);
  return { getClases,  clases, loading2 };
};