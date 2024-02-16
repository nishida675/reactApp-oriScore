import { memo, ReactNode } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  loading?: boolean;
  onClick: (tournamentId: number) => void;
  tournamentId: number;
};

export const BaseButton = memo((props: Props) => {
  const { children, loading = false, onClick, tournamentId } = props;
  return (
    <Button
      bg="teal.400"
      color="white"
      _hover={{ opacity: 0.8 }}
      disabled={loading}
      isLoading={loading}
      onClick={() => onClick(tournamentId)}
    >
      {children}
    </Button>
  );
});