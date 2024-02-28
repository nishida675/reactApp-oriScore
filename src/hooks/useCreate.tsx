import { useCallback, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { User } from "../types/api/user";
import { useMessage } from "./useMessage";

export const useCreate = () => {
  const history = useNavigate();
  const { showMessage } = useMessage();
  //const apiUrl = "http://localhost:8080/api/create";
  const apiUrl = "https://nabyss-totomoni.com:8080/api/create";
  const [loading, setLoading] = useState(false);
  const create = useCallback(
    (userName: string, userPass: string) => {
      if (!userName) {
        showMessage({ title: "ユーザー名を入力してください", status: "error" });
        setLoading(false);
        return;
      }
      setLoading(true);
      axios
        .post<User>(apiUrl, {
          name: userName,
          pass: userPass
        })
        .then((res) => {
          if (res.data) {
            showMessage({ title: "新規登録できました", status: "success" });
            history("/");
          } 
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            // 409エラーの場合の処理
            showMessage({ title: "ユーザー名が既に使用されています", status: "error" });
          } else {
            // その他のエラーの場合の処理
            showMessage({ title: "登録に失敗しました", status: "error" });
          }
          setLoading(false);
        });
    },
    [history, showMessage]
  );
  return { create, loading };
};