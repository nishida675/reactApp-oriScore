import {memo, useContext, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Spinner,
  Flex,
  WrapItem,
  Center,
  Text,
} from "@chakra-ui/react";

import { LoginUserContext } from '../../providers/LoginUserProvider';
import {useRankingAllUsers } from "../../hooks/rankingAllUsers";
import { RankingCard } from "../organisms/ranking/rankingCard";
import { User } from "../../types/api/user";

export const RankingPage = memo(() =>{
  const { loginUser, setLoginUser } = useContext(LoginUserContext);
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const { getRankings, users, loading, error } = useRankingAllUsers();


  // 自動ログアウトの時間（ミリ秒）
  const autoLogoutTime = 600000; // 10分
  //const autoLogoutTime = 10000; // 10秒

  useEffect(() => {
    const resetTimer = () => {
      // タイマーをリセット
      if (timerId.current) {
        clearTimeout(timerId.current);
      }

      // 新たなタイマーをセット
      timerId.current = setTimeout(() => {
        // ログアウト処理（例: setLoginUser(null)）
        setLoginUser(null);

        // トップページにリダイレクト
        navigate('/');
      }, autoLogoutTime);
    };

    // ユーザーがアクションを起こすたびにタイマーをリセット
    const resetTimerOnAction = () => {
      resetTimer();
    };

    // 初回実行時にタイマーをセット
    resetTimer();

    // ユーザーのアクション（例: クリック）があった場合にタイマーをリセット
    document.addEventListener('click', resetTimerOnAction);

    return () => {
      // コンポーネントがアンマウントされたときにクリア
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
      document.removeEventListener('click', resetTimerOnAction);
    };    
  }, [setLoginUser, navigate, timerId]);

   // loginUserが存在するかどうかのチェック
   useEffect(() => {
    // loginUserが存在しない場合、トップページに遷移
    if (!loginUser) {
      navigate('/');
    }
  }, [loginUser, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      getRankings();
    };
    fetchData();
  
  }, [getRankings]);
  
  return (
    <>
      <Text textAlign="center" fontSize="xl" mt={4} fontWeight="bold">
        ランキング
      </Text>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : error ? (
        <>
          <div style={{ color: "red" }}>{error}</div>
        </>
      ) : (
        <Flex direction="column" align="center" >
          {users.map((user: User) => (
            <WrapItem p={{ base: 4, md: 3 }} key={user.rank} mx="auto">
              <RankingCard rank={user.rank} userName={user.name} count={user.count} />
            </WrapItem>
          ))}
        </Flex>
      )}
    </>
  )});