import axios from "axios";
import { useCallback, useState } from "react";

import { Participant } from "../types/api/Participant";
import { useMessage } from "./useMessage";

export const useInnsertExpected = () => {
  const { showMessage } = useMessage();
  const [loading2, setLoading2] = useState(false);

  const innsertExpected = useCallback(async (userId: number, tournamentId: number, classId1:number, classId2:number, number1: string, number2: string, number3: string, number4: string, number5: string, number6: string) => {
    setLoading2(true);
    try {
      // リクエストのデータをオブジェクトにまとめる
      const requestData = {
        userId,
        tournamentId,
        classId1,
        classId2,
        number1,
        number2,
        number3,
        number4,
        number5,
        number6,
      };

      // axios.post の第二引数にデータを渡す
      //const response = await axios.post<Array<Participant>>(`http://localhost:8080/apiTournament/expected`, requestData);
      const response = await axios.post<Array<Participant>>(`https://18.182.187.244:8080/apiTournament/expected`, requestData);
      showMessage({ title: "登録しました", status: "success" });
      return response.data;
    } catch (error) {
      showMessage({ title: "取得に失敗しました", status: "error" });
      throw error;
    } finally {
      setLoading2(false);
    }
  }, [showMessage]);

  return { innsertExpected, loading2 };
};
