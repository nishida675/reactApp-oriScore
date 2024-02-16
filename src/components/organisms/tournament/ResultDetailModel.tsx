import {
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormLabel,
  FormControl,
  Center,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { memo } from "react";

import { tournament } from "../../../types/api/tournament";
import { Participant } from "../../../types/api/Participant";

type Props = {
  userId: number | undefined;
  isOpen: boolean;
  onClose: () => void;
  usersR1: Array<Participant>;
  usersR2: Array<Participant>;
  usersR3: Array<Participant>;
  usersR4: Array<Participant>;
  unacquired: Array<Participant>;
  check: Array<Participant>;
  clases: Array<Participant>;
  selectedReTournament: tournament | null;
};

export const ResultDetailModal = memo((props: Props) => {
  const { isOpen, onClose, usersR1, usersR2, usersR3, usersR4, unacquired, check, clases } = props;

  const [loading, setLoading] = useState(true);
  const [className1, className2] = clases;

  useEffect(() => {
    setLoading(false);
    //console.log("usersR1:", usersR1); // usersR1をコンソールに出力
  }, [usersR1, usersR2]);


  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent pb={2}>
        {check && check.length > 0 && check[0].Check === 0 ? (
          <ModalHeader>全体予想順位</ModalHeader>
        ) : check && check.length > 0 && check[0].Check === 1 ? (
          <ModalHeader>結果</ModalHeader>
        ) : null}
        <ModalCloseButton />
        <ModalBody mx={2}>
          {loading ? (
            <Center h="100vh">
              <Spinner />
            </Center>
          ) : unacquired && unacquired.length > 0 && unacquired[0].resultNotFound === 777 ? (
            <div>只今、集計中です。</div>
          ) : unacquired && unacquired.length > 0 && unacquired[0].preResultNotFound === 404 ? (
            <div>誰も予想していません。</div>
          ) : (
            <Stack spacing={4}>
              {usersR1.length !== 0 && (
                <>
                  <FormControl>
                    {className1 && className1.className && (
                      <FormLabel>{String(className1.className)}</FormLabel>
                    )}
                    <Stack direction="row" align="center">
                      <FormLabel>1位</FormLabel>
                      <FormLabel>
                        {usersR1.find(user => user.number === "1") ?
                          `${usersR1.find(user => user.number === "1")!.participantName} - ${usersR1.find(user => user.number === "1")!.affiliation}` : ''}
                      </FormLabel>
                      {usersR1.find(user => user.number === "1" &&
                        usersR3.find(otherUser => otherUser.number === "1" &&
                          otherUser.participantName === user.participantName &&
                          otherUser.affiliation === user.affiliation)) ?
                        <img src="/images/hit.png" alt="画像" width="40px" height="40px" style={{ marginTop: "-20px" }} /> : ''}
                    </Stack>
                  </FormControl>
                  <FormControl>
                    <Stack direction="row" align="center">
                      <FormLabel>2位</FormLabel>
                      <FormLabel>
                        {usersR1.find(user => user.number === "2") ?
                          `${usersR1.find(user => user.number === "2")!.participantName} - ${usersR1.find(user => user.number === "2")!.affiliation}` : ''}
                      </FormLabel>
                      {usersR1.find(user => user.number === "2" &&
                        usersR3.find(otherUser => otherUser.number === "2" &&
                          otherUser.participantName === user.participantName &&
                          otherUser.affiliation === user.affiliation)) ?
                        <img src="/images/hit.png" alt="画像" width="40px" height="40px" style={{ marginTop: "-20px" }} /> : ''}
                    </Stack>
                  </FormControl>
                  <FormControl>
                    <Stack direction="row" align="center">
                      <FormLabel>3位</FormLabel>
                      <FormLabel>
                        {usersR1.find(user => user.number === "3") ?
                          `${usersR1.find(user => user.number === "3")!.participantName} - ${usersR1.find(user => user.number === "3")!.affiliation}` : ''}
                      </FormLabel>
                      {usersR1.find(user => user.number === "3" &&
                        usersR3.find(otherUser => otherUser.number === "3" &&
                          otherUser.participantName === user.participantName &&
                          otherUser.affiliation === user.affiliation)) ?
                        <img src="/images/hit.png" alt="画像" width="40px" height="40px" style={{ marginTop: "-20px" }} /> : ''}
                    </Stack>
                  </FormControl>
                </>
              )}
              {usersR2.length !== 0 && (
                <>
                  <FormControl>
                    {className2 && className2.className && (
                      <FormLabel>{String(className2.className)}</FormLabel>
                    )}
                    <Stack direction="row" align="center">
                      <FormLabel>1位</FormLabel>
                      <FormLabel>
                        {usersR2.find(user => user.number === "1") ?
                          `${usersR2.find(user => user.number === "1")!.participantName} - ${usersR2.find(user => user.number === "1")!.affiliation}` : ''}
                      </FormLabel>
                      {usersR2.find(user => user.number === "1" &&
                        usersR4.find(otherUser => otherUser.number === "1" &&
                          otherUser.participantName === user.participantName &&
                          otherUser.affiliation === user.affiliation)) ?
                        <img src="/images/hit.png" alt="画像" width="40px" height="40px" style={{ marginTop: "-20px" }} /> : ''}
                    </Stack>
                  </FormControl>
                  <FormControl>
                    <Stack direction="row" align="center">
                      <FormLabel>2位</FormLabel>
                      <FormLabel>
                        {usersR2.find(user => user.number === "2") ?
                          `${usersR2.find(user => user.number === "2")!.participantName} - ${usersR2.find(user => user.number === "2")!.affiliation}` : ''}
                      </FormLabel>
                      {usersR2.find(user => user.number === "2" &&
                        usersR4.find(otherUser => otherUser.number === "2" &&
                          otherUser.participantName === user.participantName &&
                          otherUser.affiliation === user.affiliation)) ?
                        <img src="/images/hit.png" alt="画像" width="40px" height="40px" style={{ marginTop: "-20px" }} /> : ''}
                    </Stack>
                  </FormControl>
                  <FormControl>
                    <Stack direction="row" align="center">
                      <FormLabel>3位</FormLabel>
                      <FormLabel>
                        {usersR2.find(user => user.number === "3") ?
                          `${usersR2.find(user => user.number === "3")!.participantName} - ${usersR2.find(user => user.number === "3")!.affiliation}` : ''}
                      </FormLabel>
                      {usersR2.find(user => user.number === "3" &&
                        usersR4.find(otherUser => otherUser.number === "3" &&
                          otherUser.participantName === user.participantName &&
                          otherUser.affiliation === user.affiliation)) ?
                        <img src="/images/hit.png" alt="画像" width="40px" height="40px" style={{ marginTop: "-20px" }} /> : ''}
                    </Stack>
                  </FormControl>
                </>
              )}
            </Stack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});