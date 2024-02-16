import { useCallback, useState } from "react";

import { tournament } from "../types/api/tournament";

type Props = {
  tournamentId: number;
  tournaments: Array<tournament>;
  onResultOpen: () => void;
};

// 選択した大会情報を特定しモーダルを表示するカスタムフック
export const useSelectReTournament = () => {
  const [selectedReTournament, setSelectedTournament] = useState<tournament | null>(null);

  const onSelectReTournament = useCallback((props: Props) => {
    const { tournamentId, tournaments, onResultOpen } = props;
    const targetTournament = tournaments.find((tournament) => tournament.tournamentId === tournamentId);
    setSelectedTournament(targetTournament!);
    onResultOpen();
  }, []);

  return { onSelectReTournament, selectedReTournament };
};
