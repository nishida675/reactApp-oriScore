import styled from 'styled-components';
import {memo, useState, ChangeEvent, useEffect} from "react";
import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";
import { useLoginUser } from "../../hooks/useLoginUser";

const StyledTopPage = styled.div`
  background-image: url('https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
`;

export const TopPage = memo(() => {
  const { login, loading } = useAuth();
  const [userId, setUserId] = useState("");
  const [userPass, setUserPass] = useState("");
  const navigate = useNavigate();
  const { setLoginUser } = useLoginUser();

  useEffect(() => {
    setLoginUser(null);
  }, [setLoginUser]);

  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };
  const onChangeUserPass = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPass(e.target.value);
  };
  const onClickLogin = () => login(userId, userPass);

  const UserCreateMove = () => {
    navigate('/userCreate');
  }
  return (
    <StyledTopPage>
     <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          おりScore
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} px={10}>
          <Input
            id="username"
            name="username"
            placeholder="ユーザー名"
            value={userId}
            onChange={onChangeUserId}
          />
          <Input
          id="userPass"
          name="userPass"
            placeholder="パスワード"
            value={userPass}
            onChange={onChangeUserPass}
          />
          <PrimaryButton
            disabled={userId === "" || userPass === ""}
            loading={loading}
            onClick={onClickLogin}
          >
            ログイン
          </PrimaryButton>
          <PrimaryButton onClick={UserCreateMove}>ユーザー登録</PrimaryButton>
        </Stack>
      </Box>
    </Flex>
    </StyledTopPage>
  );
});
