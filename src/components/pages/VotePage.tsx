import { memo, useCallback, useContext, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Spinner,
  Wrap,
  WrapItem,
  Center,
  useDisclosure,
} from "@chakra-ui/react";

import { LoginUserContext } from '../../providers/LoginUserProvider';
import { useAllTournament } from "../../hooks/useAllTournament";
import { TournamentCard } from "../organisms/tournament/TournamentCard";
import { useSelectTournament } from "../../hooks/useSelectTournament";
import { useSelectReTournament } from "../../hooks/useSelectReTournament";
import { TournamentDetailModal } from "../organisms/tournament/TournamentDetailModel";
import { ResultDetailModal } from "../organisms/tournament/ResultDetailModel";
import { BaseButton } from "../atoms/button/BaseButton";
import { useAllParticipant } from "../../hooks/useAllParticipant";
import { useAllResult } from "../../hooks/useAllResult";
import { useAllClass } from "../../hooks/useAllClass";
import { useLoginUser } from "../../hooks/useLoginUser";

export const VotePage = memo(() => {

  const navigate = useNavigate();
  const { setLoginUser } = useContext(LoginUserContext);
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const { getTournaments, tournaments, loading } = useAllTournament();
  const { onSelectTournament, selectedTournament } = useSelectTournament();
  const { onSelectReTournament, selectedReTournament } = useSelectReTournament();
  const { isOpen: isTournamentDetailOpen, onOpen: onTournamentDetailOpen, onClose: onTournamentDetailClose } = useDisclosure();
  const { getUsers, users1, users2, users3, users4, reregistration } = useAllParticipant();
  const { getResults, usersR1, usersR2, usersR3, usersR4, unacquired, check } = useAllResult();
  const { getClases, clases, loading2 } = useAllClass();
  const { isOpen: isResultOpen, onOpen: onResultOpen, onClose: onResultClose } = useDisclosure();
  const { loginUser } = useLoginUser();

  //const usersR1String = usersR1.map(item => item.split(': ')[1]);
  //const usersR2String = usersR2.map(item => item.split(': ')[1]);


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

  useEffect(() => getTournaments(), [getTournaments]);

  const onClickTournament = useCallback(
    async (tournamentId: number) => {
      const userId = Array.isArray(loginUser) ? loginUser[0].id : loginUser?.id;
      try {
        // getClasesを実行
        const newClases = await getClases(tournamentId);

        // 取得したデータを使用してgetUsersを実行
        const stringClasses = newClases.map(participant => participant.className);
        await getUsers(userId, tournamentId, stringClasses);

        // 適切なデータが揃った後にトーナメントの選択処理を実行
        onSelectTournament({ tournamentId, tournaments, onTournamentDetailOpen });
      } catch (error) {
        // エラーハンドリング（必要に応じて）
        console.error("Error during onClickTournament:", error);
      }
    },
    [tournaments, onSelectTournament, onTournamentDetailOpen, getClases, getUsers, loginUser]
  );

  const onClickResult = useCallback(
    async (tournamentId: number) => {
      const userId = Array.isArray(loginUser) ? loginUser[0].id : loginUser?.id;
      try {
        // getClasesを実行
        const newClases = await getClases(tournamentId);

        // 取得したデータを使用してgetUsersを実行
        const stringClasses = newClases.map(participant => participant.className);
        await getResults(userId, tournamentId, stringClasses);

        // 適切なデータが揃った後にトーナメントの選択処理を実行
        onSelectReTournament({ tournamentId, tournaments, onResultOpen });
      } catch (error) {
        // エラーハンドリング（必要に応じて）
        console.error("Error during onClickTournament:", error);
      }
    },
    [tournaments, onSelectReTournament, onResultOpen, getClases, getResults, loginUser]
  );

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {tournaments.map((tournament) => (
            <WrapItem key={tournament.tournamentId} mx="auto">
              <TournamentCard
                tournamentName={tournament.tournamentName}
                eventDate2={tournament.eventDate2}
              >
                <BaseButton
                  tournamentId={tournament.tournamentId}
                  loading={loading2}
                  onClick={onClickTournament}
                >
                  予想する
                </BaseButton>
                <BaseButton
                  tournamentId={tournament.tournamentId}
                  loading={loading2}
                  onClick={onClickResult}
                >
                  結果見る
                </BaseButton>
              </TournamentCard>
            </WrapItem>
          ))}
        </Wrap>
      )}
      <TournamentDetailModal
        userId={Array.isArray(loginUser) ? loginUser[0].id : loginUser?.id}
        selectedTournament={selectedTournament}
        users1={users1}
        users2={users2}
        users3={users3}
        users4={users4}
        reregistration={reregistration}
        clases={clases}
        isOpen={isTournamentDetailOpen}
        onClose={onTournamentDetailClose}
      />
      <ResultDetailModal
        userId={Array.isArray(loginUser) ? loginUser[0].id : loginUser?.id}
        selectedReTournament={selectedReTournament}
        usersR1={usersR1} 
        usersR2={usersR2} 
        usersR3={usersR3} 
        usersR4={usersR4} 
        unacquired={unacquired}
        check={check}
        clases={clases}
        isOpen={isResultOpen}
        onClose={onResultClose}
      />
    </>
  );
});
