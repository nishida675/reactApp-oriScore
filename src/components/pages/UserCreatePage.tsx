
import {memo, useState, ChangeEvent } from "react";
import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useCreate } from "../../hooks/useCreate";


export const UserCreatePage = memo(() =>{
  const { create, loading } = useCreate();
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");

  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const onChangeUserPass = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPass(e.target.value);
  };
  const onClickCreate = () => create(userName, userPass);
  
  return(
    <>
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ユーザー登録
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} px={10}>
          <p>ユーザー名は10文字以内</p>
          <Input
            placeholder="ユーザー名"
            value={userName}
            onChange={onChangeUserId}
          />
          <Input
            placeholder="パスワード"
            value={userPass}
            onChange={onChangeUserPass}
          />
          <PrimaryButton
            disabled={userName === "" || userPass === ""}
            loading={loading}
            onClick={onClickCreate}
          >
            作成
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
    </>
  );
});