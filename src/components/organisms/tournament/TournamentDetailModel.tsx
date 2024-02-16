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
  ModalFooter,
  Select,
  Center,
  Spinner,
} from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { memo } from "react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { tournament } from "../../../types/api/tournament";
import { Participant } from "../../../types/api/Participant";
import { useInnsertExpected } from "../../../hooks/useInnsertExpected";

type Props = {
  userId: number | undefined;
  isOpen: boolean;
  onClose: () => void;
  users1: Array<Participant>;
  users2: Array<Participant>;
  users3: Array<Participant>;
  users4: Array<Participant>;
  reregistration: boolean;
  clases: Array<Participant>;
  selectedTournament: tournament | null;
};

export const TournamentDetailModal = memo((props: Props) => {
  const { userId, isOpen, onClose, users1, users2, users3, users4, clases, reregistration, selectedTournament } = props;

  const [loading, setLoading] = useState(true);
  const { innsertExpected } = useInnsertExpected();
  const [className1, className2] = clases;
  const [expected3, setExpected3] = useState<Array<Participant>>([]);
  const [expected4, setExpected4] = useState<Array<Participant>>([]);
  const [selectedOptions, setSelectedOptions] = useState({
    number1: "",
    number2: "",
    number3: "",
    number4: "",
    number5: "",
    number6: "",
  });
  // selectedOptions の初期値を設定する
  const initialSelectedOptions = () => {
    let selectedOptions = {
      number1: "",
      number2: "",
      number3: "",
      number4: "",
      number5: "",
      number6: ""
    };

    if (users3 && users3.length > 0) {
      const prevParticipantId1 = users3.find(user => user.number === 1)?.participantId;
      const prevParticipantId2 = users3.find(user => user.number === 2)?.participantId;
      const prevParticipantId3 = users3.find(user => user.number === 3)?.participantId;

      selectedOptions.number1 = prevParticipantId1 ? String(prevParticipantId1) : "";
      selectedOptions.number2 = prevParticipantId2 ? String(prevParticipantId2) : "";
      selectedOptions.number3 = prevParticipantId3 ? String(prevParticipantId3) : "";
    }

    if (users4 && users4.length > 0) {
      const prevParticipantId4 = users4.find(user => user.number === 1)?.participantId;
      const prevParticipantId5 = users4.find(user => user.number === 2)?.participantId;
      const prevParticipantId6 = users4.find(user => user.number === 3)?.participantId;

      selectedOptions.number4 = prevParticipantId4 ? String(prevParticipantId4) : "";
      selectedOptions.number5 = prevParticipantId5 ? String(prevParticipantId5) : "";
      selectedOptions.number6 = prevParticipantId6 ? String(prevParticipantId6) : "";
    }

    return selectedOptions;
  };
  useEffect(() => {
    // マウント時に expected3 と expected4 を更新
    setSelectedOptions(initialSelectedOptions());
    setExpected3([...users3]);
    setExpected4([...users4]);
  }, [users3, users4]);

  const onCloseModal = () => {
    // モーダルが閉じられたときにselectedOptionsを初期化
    setSelectedOptions({
      number1: "",
      number2: "",
      number3: "",
      number4: "",
      number5: "",
      number6: "",
    });

    onClose();
  };

  useEffect(() => {
    // モーダルが表示された時点でローディングを開始
    setLoading(true);

    // 1秒後にローディングを終了
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [isOpen]);  // isOpen が変更されたときに再実行  

  const onChangeNumber1 = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOptions((prevOptions) => {

      // 更新後の selectedOptions を計算
      const updatedOptions1 = {
        ...prevOptions,
        number1: value,
        // Exclude the selected option from number2 and number3
        number2: value === prevOptions.number2 ? '' : prevOptions.number2,
        number3: value === prevOptions.number3 ? '' : prevOptions.number3,
      };
      // フィルタリングに更新後の selectedOptions の値を使用
      let filteredData21 = [...expected3];
      if (expected3.length === 1 && expected3[0].number === 2) {
        filteredData21 = []; // expected3が1つのデータしかない場合は空にする
      } else {
        filteredData21 = filteredData21.filter(item => item.number !== 2);
      }

      if (expected3.length === 1 && expected3[0].number === 3) {
        filteredData21 = []; // expected3が1つのデータしかない場合は空にする
      } else {
        filteredData21 = filteredData21.filter(item => item.number !== 3);
      }
      // 更新後の selectedOptions をセット
      setExpected3(filteredData21);

      return updatedOptions1; // setSelectedOptions の返り値として更新後の selectedOptions を返す
    });
  };
  const onChangeNumber2 = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOptions((prevOptions) => {
      // 更新後の selectedOptions を計算
      const updatedOptions2 = {
        ...prevOptions,
        number2: value,
        // Exclude the selected option from number1 and number3
        number1: value === prevOptions.number1 ? '' : prevOptions.number1,
        number3: value === prevOptions.number3 ? '' : prevOptions.number3,
      };

      // フィルタリングに更新後の selectedOptions の値を使用
      let filteredData21 = [...expected3];
      if (expected3.length === 1 && expected3[0].number === 1) {
        filteredData21 = []; // expected3が1つのデータしかない場合は空にする
      } else {
        filteredData21 = filteredData21.filter(item => item.number !== 1);
      }

      if (expected3.length === 1 && expected3[0].number === 3) {
        filteredData21 = []; // expected3が1つのデータしかない場合は空にする
      } else {
        filteredData21 = filteredData21.filter(item => item.number !== 3);
      }
      // 更新後の selectedOptions をセット
      setExpected3(filteredData21);

      return updatedOptions2; // setSelectedOptions の返り値として更新後の selectedOptions を返す
    });
  };

  const onChangeNumber3 = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOptions((prevOptions) => {

      // 更新後の selectedOptions を計算
      const updatedOptions3 = {
        ...prevOptions,
        number3: value,
        // Exclude the selected option from number1 and number2
        number1: value === prevOptions.number1 ? '' : prevOptions.number1,
        number2: value === prevOptions.number2 ? '' : prevOptions.number2,
      };
      // フィルタリングに更新後の selectedOptions の値を使用
      let filteredData21 = [...expected3];
      if (expected3.length === 1 && expected3[0].number === 1) {
        filteredData21 = []; // expected3が1つのデータしかない場合は空にする
      } else {
        filteredData21 = filteredData21.filter(item => item.number !== 1);
      }

      if (expected3.length === 1 && expected3[0].number === 2) {
        filteredData21 = []; // expected3が1つのデータしかない場合は空にする
      } else {
        filteredData21 = filteredData21.filter(item => item.number !== 2);
      }
      // 更新後の selectedOptions をセット
      setExpected3(filteredData21);

      return updatedOptions3; // setSelectedOptions の返り値として更新後の selectedOptions を返す
    });
  };

  const onChangeNumber4 = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      number4: value,
      // Exclude the selected option from number5 and number6
      number5: value === prevOptions.number5 ? '' : prevOptions.number5,
      number6: value === prevOptions.number6 ? '' : prevOptions.number6,
    }));
    // フィルタリングに更新後の selectedOptions の値を使用
    let filteredData4 = [...expected4];
    if (expected4.length === 1 && expected4[0].number === 2) {
      filteredData4 = []; // expected4が1つのデータしかない場合は空にする
    } else {
      filteredData4 = filteredData4.filter(item => item.number !== 2);
    }

    if (expected4.length === 1 && expected4[0].number === 3) {
      filteredData4 = []; // expected4が1つのデータしかない場合は空にする
    } else {
      filteredData4 = filteredData4.filter(item => item.number !== 3);
    }
    // 更新後の expected4 をセット
    setExpected4(filteredData4);
  };

  const onChangeNumber5 = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      number5: value,
      // Exclude the selected option from number4 and number6
      number4: value === prevOptions.number4 ? '' : prevOptions.number4,
      number6: value === prevOptions.number6 ? '' : prevOptions.number6,
    }));
    // フィルタリングに更新後の selectedOptions の値を使用
    let filteredData5 = [...expected4];
    if (expected4.length === 1 && expected4[0].number === 1) {
      filteredData5 = []; // expected4が1つのデータしかない場合は空にする
    } else {
      filteredData5 = filteredData5.filter(item => item.number !== 1);
    }

    if (expected4.length === 1 && expected4[0].number === 3) {
      filteredData5 = []; // expected4が1つのデータしかない場合は空にする
    } else {
      filteredData5 = filteredData5.filter(item => item.number !== 3);
    }
    // 更新後の expected4 をセット
    setExpected4(filteredData5);
  };

  const onChangeNumber6 = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      number6: value,
      // Exclude the selected option from number4 and number5
      number4: value === prevOptions.number4 ? '' : prevOptions.number4,
      number5: value === prevOptions.number5 ? '' : prevOptions.number5,
    }));
    // フィルタリングに更新後の selectedOptions の値を使用
    let filteredData6 = [...expected4];
    if (expected4.length === 1 && expected4[0].number === 1) {
      filteredData6 = []; // expected4が1つのデータしかない場合は空にする
    } else {
      filteredData6 = filteredData6.filter(item => item.number !== 1);
    }

    if (expected4.length === 1 && expected4[0].number === 2) {
      filteredData6 = []; // expected4が1つのデータしかない場合は空にする
    } else {
      filteredData6 = filteredData6.filter(item => item.number !== 2);
    }
    // 更新後の expected4 をセット
    setExpected4(filteredData6);
  };

  const onClickUpdate = () => {
    if (selectedTournament && selectedTournament.tournamentId && userId) {
      console.log("あああ" + userId);
      const { number1, number2, number3, number4, number5, number6 } = selectedOptions;
      innsertExpected(
        userId,
        selectedTournament.tournamentId,
        className1.classId,
        className2.classId,
        String(number1),
        String(number2),
        String(number3),
        String(number4),
        String(number5),
        String(number6)
      );
    } else {
      console.error("トーナメントが選択されていないかユーザーがログインしていません");
    }
    onCloseModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseModal}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent pb={2}>
        {reregistration ? (
          // reregistrationがtrueの場合の処理
          <>
            <ModalHeader>あなたの予想</ModalHeader>
            <ModalCloseButton />
            <ModalBody mx={4}>
              {loading ? (
                <Center h="100vh">
                  <Spinner />
                </Center>
              ) : users1.length === 0 && users2.length === 0 ? (
                <div>参加者がいない、又は不都合が発生しました</div>
              ) : (
                <Stack spacing={4}>
                  {users1.length !== 0 && (
                    <>
                      <FormControl>
                        {className1 && className1.className && (
                          <FormLabel>{String(className1.className)}</FormLabel>
                        )}
                        <FormLabel>1位</FormLabel>
                        <Select value={selectedOptions.number1} onChange={onChangeNumber1}>
                          {expected3 && expected3.length > 0 ? (
                            expected3.map((expected3, index) => (
                              expected3.number === 1 ? (
                                <option key={`user3-${index}`} value={expected3.participantId}>
                                  {`${expected3.participantName} - ${expected3.affiliation}`}
                                </option>
                              ) : <option value="" disabled hidden>
                                選択してください
                              </option>
                            ))
                          ) : (
                            <option value="" disabled hidden>
                              選択してください
                            </option>
                          )}
                          {(users1 as Array<Participant>)
                            .filter(user => user.className === className1?.className)
                            .map((filteredUser, index) => (
                              <option key={`user1-${index}`} value={filteredUser.participantId}>
                                {`${filteredUser.participantName} - ${filteredUser.affiliation}`}
                              </option>
                            ))}
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel>2位</FormLabel>
                        <Select value={selectedOptions.number2} onChange={onChangeNumber2}>
                          {expected3 && expected3.length > 0 ? (
                            expected3.map((user3, index) => (
                              user3.number === 2 ? (
                                <option key={`user3-${index}`} value={user3.participantId}>
                                  {`${user3.participantName} - ${user3.affiliation}`}
                                </option>
                              ) : <option value="" disabled hidden>
                                選択してください
                              </option>
                            ))
                          ) : (
                            <option value="" disabled hidden>
                              選択してください
                            </option>
                          )}
                          {(users1 as Array<Participant>)
                            .filter(user => user.className === className1?.className)
                            .map((filteredUser, index) => (
                              <option key={`user1-${index}`} value={filteredUser.participantId}>
                                {`${filteredUser.participantName} - ${filteredUser.affiliation}`}
                              </option>
                            ))}
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel>3位</FormLabel>
                        <Select value={selectedOptions.number3} onChange={onChangeNumber3}>
                          {expected3 && expected3.length > 0 ? (
                            expected3.map((user3, index) => (
                              user3.number === 3 ? (
                                <option key={`user3-${index}`} value={user3.participantId}>
                                  {`${user3.participantName} - ${user3.affiliation}`}
                                </option>
                              ) : <option value="" disabled hidden>
                                選択してください
                              </option>
                            ))
                          ) : (
                            <option value="" disabled hidden>
                              選択してください
                            </option>
                          )}
                          {(users1 as Array<Participant>)
                            .filter(user => user.className === className1?.className)
                            .map((filteredUser, index) => (
                              <option key={`user1-${index}`} value={filteredUser.participantId}>
                                {`${filteredUser.participantName} - ${filteredUser.affiliation}`}
                              </option>
                            ))}
                        </Select>
                      </FormControl>
                    </>
                  )}
                  {users2.length !== 0 && (
                    <>
                      <FormControl>
                        {className2 && className2.className && (
                          <FormLabel>{String(className2.className)}</FormLabel>
                        )}
                        <FormLabel>1位</FormLabel>
                        <Select value={selectedOptions.number4} onChange={onChangeNumber4}>
                          {expected4 && expected4.length > 0 ? (
                            expected4.map((user3, index) => (
                              user3.number === 1 ? (
                                <option key={`user3-${index}`} value={user3.participantId}>
                                  {`${user3.participantName} - ${user3.affiliation}`}
                                </option>
                              ) : <option value="" disabled hidden>
                                選択してください
                              </option>
                            ))
                          ) : (
                            <option value="" disabled hidden>
                              選択してください
                            </option>
                          )}
                          {(users2 as Array<Participant>)
                            .filter(user => user.className === className2?.className)
                            .map((filteredUser, index) => (
                              <option key={`user1-${index}`} value={filteredUser.participantId}>
                                {`${filteredUser.participantName} - ${filteredUser.affiliation}`}
                              </option>
                            ))}
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel>2位</FormLabel>
                        <Select value={selectedOptions.number5} onChange={onChangeNumber5}>
                          {expected4 && expected4.length > 0 ? (
                            expected4.map((user3, index) => (
                              user3.number === 2 ? (
                                <option key={`user3-${index}`} value={user3.participantId}>
                                  {`${user3.participantName} - ${user3.affiliation}`}
                                </option>
                              ) : <option value="" disabled hidden>
                                選択してください
                              </option>
                            ))
                          ) : (
                            <option value="" disabled hidden>
                              選択してください
                            </option>
                          )}
                          {(users2 as Array<Participant>)
                            .filter(user => user.className === className2?.className)
                            .map((filteredUser, index) => (
                              <option key={`user1-${index}`} value={filteredUser.participantId}>
                                {`${filteredUser.participantName} - ${filteredUser.affiliation}`}
                              </option>
                            ))}
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel>3位</FormLabel>
                        <Select value={selectedOptions.number6} onChange={onChangeNumber6}>
                          {expected4 && expected4.length > 0 ? (
                            expected4.map((user3, index) => (
                              user3.number === 3 ? (
                                <option key={`user3-${index}`} value={user3.participantId}>
                                  {`${user3.participantName} - ${user3.affiliation}`}
                                </option>
                              ) : <option value="" disabled hidden>
                                選択してください
                              </option>
                            ))
                          ) : (
                            <option value="" disabled hidden>
                              選択してください
                            </option>
                          )}
                          {(users2 as Array<Participant>)
                            .filter(user => user.className === className2?.className)
                            .map((filteredUser, index) => (
                              <option key={`user1-${index}`} value={filteredUser.participantId}>
                                {`${filteredUser.participantName} - ${filteredUser.affiliation}`}
                              </option>
                            ))}
                        </Select>
                      </FormControl>
                    </>
                  )}
                </Stack>
              )}
            </ModalBody>
            {(users1.length !== 0 || users2.length !== 0) && (
              <ModalFooter>
                <PrimaryButton onClick={onClickUpdate}>登録</PrimaryButton>
              </ModalFooter>
            )}
          </>
        ) : (
          // reregistrationがfalseの場合の処理
          <>
            <ModalHeader>あなたの予想</ModalHeader>
            <ModalCloseButton />
            <ModalBody mx={4}>
              {loading ? (
                <Center h="100vh">
                  <Spinner />
                </Center>
              ) : expected3.length === 0 && expected4.length === 0 ? (
                <div>大会当日、又は過ぎてしまっているため予想することはできません。</div>
              ) : (
                <Stack spacing={4}>

                  <>
                    <FormControl>
                      {className1 && className1.className && (
                        <FormLabel>{String(className1.className)}</FormLabel>
                      )}
                      <FormLabel>1位</FormLabel>
                      {expected3 && expected3.length > 0 && (
                        expected3.map((expected3, index) => (
                          expected3.number === 1 && (
                            <div key={`user3-${index}`}>
                              {`${expected3.participantName} - ${expected3.affiliation}`}
                            </div>
                          )
                        ))
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel>2位</FormLabel>
                      {expected3 && expected3.length > 0 && (
                        expected3.map((expected3, index) => (
                          expected3.number === 2 && (
                            <div key={`user3-${index}`}>
                              {`${expected3.participantName} - ${expected3.affiliation}`}
                            </div>
                          )
                        ))
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel>3位</FormLabel>
                      {expected3 && expected3.length > 0 && (
                        expected3.map((expected3, index) => (
                          expected3.number === 3 && (
                            <div key={`user3-${index}`}>
                              {`${expected3.participantName} - ${expected3.affiliation}`}
                            </div>
                          )
                        ))
                      )}
                    </FormControl>
                  </>
                  {users2.length !== 0 && (
                    <>
                      <FormControl>
                        {className2 && className2.className && (
                          <FormLabel>{String(className2.className)}</FormLabel>
                        )}
                        <FormLabel>1位</FormLabel>
                        {expected4 && expected4.length > 0 && (
                        expected4.map((expected4, index) => (
                          expected4.number === 1 && (
                            <div key={`user4-${index}`}>
                              {`${expected4.participantName} - ${expected4.affiliation}`}
                            </div>
                          )
                        ))
                      )}
                      </FormControl>
                      <FormControl>
                        <FormLabel>2位</FormLabel>
                        {expected4 && expected4.length > 0 && (
                        expected4.map((expected4, index) => (
                          expected4.number === 2 && (
                            <div key={`user4-${index}`}>
                              {`${expected4.participantName} - ${expected4.affiliation}`}
                            </div>
                          )
                        ))
                      )}
                      </FormControl>
                      <FormControl>
                        <FormLabel>3位</FormLabel>
                        {expected4 && expected4.length > 0 && (
                        expected4.map((expected4, index) => (
                          expected4.number === 3 && (
                            <div key={`user4-${index}`}>
                              {`${expected4.participantName} - ${expected4.affiliation}`}
                            </div>
                          )
                        ))
                      )}
                      </FormControl>
                    </>
                  )}
                </Stack>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
});