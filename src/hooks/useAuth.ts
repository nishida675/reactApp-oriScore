import { useCallback, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { User } from "../types/api/user";
import { useMessage } from "./useMessage";
import { useLoginUser } from "../hooks/useLoginUser";


export const useAuth = () => {
  const history = useNavigate();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();
  //const apiUrl = "http://localhost:8080/api/authLogin";
  const apiUrl = "http://18.182.187.244:8080/api/authLogin";

  const [loading, setLoading] = useState(false);
  const login = useCallback(
    (name: string, pass: string) => {
      setLoading(true);
      axios
        .post<User | User[]>(apiUrl, {
          name: name,
          pass: pass
        })
        .then((res) => {
          if (Array.isArray(res.data) && res.data.length > 0) {
            const isAdmin = res.data[0].id === 1 ? true : false;
            setLoginUser({
              id: res.data[0]?.id,
              name: res.data[0]?.name,
              pass: res.data[0]?.pass,
              count: res.data[0]?.count,
              rank: res.data[0]?.rank,
              isAdmin: isAdmin
            });
            showMessage({ title: "ログインしました", status: "success" });
            history("/vote");
          } else if (!Array.isArray(res.data) && res.data) {
            // res.data が配列でなく、かつ存在する場合
            const isAdmin = res.data.id === 1 ? true : false;
            setLoginUser({
              id: res.data.id,
              name: res.data.name,
              pass: res.data.pass,
              count: res.data.count,
              rank: res.data.rank,
              isAdmin: isAdmin
            });
            showMessage({ title: "ログインしました", status: "success" });
            history("/vote");
          } else {
            showMessage({ title: "ユーザーが見つかりません", status: "error" });
            setLoading(false);
          }
        })
        .catch(() => {
          showMessage({ title: "ログインできません", status: "error" });
          setLoading(false);
        });
    },
    [history, showMessage, setLoginUser]
  );
  return { login, loading };
};