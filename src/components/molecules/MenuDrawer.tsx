import { memo } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay
} from "@chakra-ui/react";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  onClickVote: () => void;
  onClickRanking: () => void;
}

export const MenuDrawer = memo((props: Props) => {
  const { onClose, isOpen, onClickVote, onClickRanking } = props;

  // Vote ボタンがクリックされたときの処理
  const handleVoteClick = () => {
    onClickVote();
    onClose(); // ドロワーを閉じる
  };

  // ランキングボタンがクリックされたときの処理
  const handleRankingClick = () => {
    onClickRanking();
    onClose(); // ドロワーを閉じる
  };

  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} bg="gray.100">
            <Button w="100%" onClick={handleVoteClick}>大会</Button>
            <Button w="100%" onClick={handleRankingClick}>ランキング</Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
