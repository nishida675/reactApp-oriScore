/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useState } from "react";

import { useMessage } from "./useMessage";
import { Participant } from "../types/api/Participant";

export const useAllResult = () => {
  const { showMessage } = useMessage();
  const [usersR1, setUsers1] = useState<Array<Participant>>([]);
  const [usersR2, setUsers2] = useState<Array<Participant>>([]);
  const [usersR3, setUsersR3] = useState<Array<Participant>>([]);
  const [usersR4, setUsersR4] = useState<Array<Participant>>([]);
  const [unacquired, setUnacquired] = useState<Array<Participant>>([]);
  const [check, setCheck] = useState<Array<Participant>>([]);

  const getResults = useCallback((userId:number, tournamentId: number, classes: string[]) => {
    const [className1, className2] = classes;
    setUsersR3([]);
    setUsersR4([]);

    axios
      //.get<{ [key: string]: Participant[]}>(`http://localhost:8080/apiTournament/getpreResult?userId=${userId}&tournamentId=${tournamentId}&className1=${className1}&className2=${className2}`)
      .get<{ [key: string]: Participant[]}>(`https://nabyss-totomoni.com:8080/apiTournament/getpreResult?userId=${userId}&tournamentId=${tournamentId}&className1=${className1}&className2=${className2}`)
      .then((res) => {
        //console.log("API Response:", res.data);
        const usersArray1 = res.data[className1] || [];
        const usersArray2 = res.data[className2] || [];
        const usersArray3 = res.data["expected1"] || [];
        const usersArray4 = res.data["expected2"] || [];
        const Unacquired = res.data.error || [];
        const Check = res.data.check || [];

        setUsers1(usersArray1);
        setUsers2(usersArray2);
        setUsersR3(usersArray3);
        setUsersR4(usersArray4);
        setUnacquired(Unacquired);
        setCheck(Check);

      })
      .catch(() => {
        showMessage({ title: "参加者取得に失敗しました", status: "error" });
        const usersArray1: Participant[] = []; 
        setUsers1(usersArray1);
        const usersArray2: Participant[] = []; 
        setUsers2(usersArray2);
      })
  }, []);
  return { getResults, usersR1, usersR2, usersR3, usersR4, unacquired, check };
};