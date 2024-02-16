import { useCallback, useState } from "react";

import { tournament } from "../types/api/tournament";

type Props = {
  tournamentId: number;
  tournaments: Array<tournament>;
  onTournamentDetailOpen: () => void;
};

// 選択した大会情報を特定しモーダルを表示するカスタムフック
export const useSelectTournament = () => {
  const [selectedTournament, setSelectedTournament] = useState<tournament | null>(null);

  const onSelectTournament = useCallback((props: Props) => {
    const { tournamentId, tournaments, onTournamentDetailOpen } = props;
    const targetTournament = tournaments.find((tournament) => tournament.tournamentId === tournamentId);
    setSelectedTournament(targetTournament!);
    onTournamentDetailOpen();
  }, []);

  return { onSelectTournament, selectedTournament };
};
