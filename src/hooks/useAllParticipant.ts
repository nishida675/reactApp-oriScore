/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useState } from "react";

import { Participant } from "../types/api/Participant";
import { useMessage } from "./useMessage";

export const useAllParticipant = () => {
  const { showMessage } = useMessage();
  const [users1, setUsers1] = useState<Array<Participant>>([]);
  const [users2, setUsers2] = useState<Array<Participant>>([]);
  const [users3, setUsers3] = useState<Array<Participant>>([]);
  const [users4, setUsers4] = useState<Array<Participant>>([]);
  const [reregistration, setReregistration] = useState<boolean>(false);

  const getUsers = useCallback((userId:number, tournamentId: number, classes: string[]) => {
    const [className1, className2] = classes;
    setUsers3([]);
    setUsers4([]);

    axios
      //.get<{ [key: string]: Participant[] }>(`http://localhost:8080/apiTournament/getParticipant?userId=${userId}&tournamentId=${tournamentId}&className1=${className1}&className2=${className2}`)
      .get<{ [key: string]: Participant[] }>(`https://nabyss-totomoni.com/apiTournament/getParticipant?userId=${userId}&tournamentId=${tournamentId}&className1=${className1}&className2=${className2}`)
      .then((res) => {
        //console.log("API Response:", res.data);
        const usersArray1 = res.data[className1] || [];
        const usersArray2 = res.data[className2] || [];
        const usersArray3 = res.data["expected1"] || [];
        const usersArray4 = res.data["expected2"] || [];
        const reregistrationValue = res.data["reregistration"][0]?.reregistration === false ? false : true;
    //console.log("確認", reregistrationValue);
        setUsers1(usersArray1);
        setUsers2(usersArray2);
        setUsers3(usersArray3);
        setUsers4(usersArray4);
        setReregistration(reregistrationValue); 
      })
      .catch(() => {
        showMessage({ title: "参加者取得に失敗しました", status: "error" });
        const usersArray1: Participant[] = []; 
        setUsers1(usersArray1);
        const usersArray2: Participant[] = []; 
        setUsers2(usersArray2);
        const reregistrationValue = true;
        setReregistration(reregistrationValue); 
      })
  }, []);
  return { getUsers, users1, users2, users3, users4, reregistration };
};