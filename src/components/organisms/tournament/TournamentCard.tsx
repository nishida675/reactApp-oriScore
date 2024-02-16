import { Box, Stack, Text } from "@chakra-ui/react";
import { memo, ReactNode } from "react";

type Props = {
  tournamentName: string;
  eventDate2: string;
  children?: ReactNode;
};

export const TournamentCard = memo((props: Props) => {
  const { tournamentName, eventDate2, children} = props;
  return (
    <Box
      w="260px"
      h="260px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
    >
      <Stack textAlign="center" align="center" spacing={4}>
        <Text fontSize="lg" fontWeight="bold">
          {tournamentName}
        </Text>
        <Text fontSize="sm" color="gray">
          {eventDate2}
        </Text>
        {children}
      </Stack>
    </Box>
  );
});