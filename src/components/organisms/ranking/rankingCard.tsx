import { Box, Stack, Text } from "@chakra-ui/react";
import { memo } from "react";

type Props = {
  rank: number;
  userName: string;
  count: number;
};

export const RankingCard = memo((props: Props) => {
  const { rank, userName, count } = props;
  return (
    <Box
      w="260px"
      h="60px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={4}
    >
       <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Text fontSize="lg" fontWeight="bold">
          {rank}位
        </Text>
        <Text fontSize="lg" fontWeight="bold">
          {userName} さん
        </Text>
        <Text fontSize="sm" color="gray">
          {count}回
        </Text>
      </Stack>
    </Box>
  );
});