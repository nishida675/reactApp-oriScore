
import {memo} from "react";
import React, { useCallback } from 'react';
import { Flex, Heading, Box, Link,  useDisclosure} from '@chakra-ui/react';
import { useNavigate  } from "react-router-dom";

import {MenuIconButton} from "../../atoms/button/MenuIconButton";
import {MenuDrawer} from "../../molecules/MenuDrawer";

export const Header= memo(() => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const history = useNavigate();

    const onClickVote = useCallback(() => history("/vote"), [history]);
    const onClickRanking = useCallback(() => history("/ranking"), [history]);

  return (
    <>
    <Flex 
    as="nav"
    bg="teal.500"
    color="gray.50"
    align="center"
    justify="space-between"
    padding={{base: 3, md: 5}}
    >
        <Flex align="center" as="a" mr={8} _hover={{cursor: "pointer"}}>
        <Heading as="h1" fontSize={{base: "md", md: "lg"}}>
            おりScore
        </Heading>
        </Flex>
        <Flex
          align="center"
          fontSize="sm"
          flexGrow={2}
          display={{base: "none", md: "flex"}}
        >
            <Box pr={4}>
                <Link onClick={onClickVote}>大会</Link>
             </Box>
             <Link onClick={onClickRanking}>ランキング</Link>
        </Flex>
       <MenuIconButton onOpen={onOpen}/>
    </Flex>
    <MenuDrawer onClose={onClose} isOpen={isOpen} onClickVote={onClickVote} onClickRanking={onClickRanking}/>
    </>
  );
});