import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { 
    HStack,
    Flex,
    Box, 
    Spacer,
    Link, 
    Text
 } from '@chakra-ui/react';

const Nav = () => {
    // TODO: track mobile view via state

    return (
        <HStack w='100%' bg='#005DAA' color='#FFF'>
            <Flex minWidth='max-content' w='100%' alignItems='center' gap='2'>
                <a href='/'>
                    <Box p='4'>
                        <Text fontSize='lg' fontWeight='bold'>
                            LastDash
                        </Text>
                    </Box>
                </a>
                <Spacer />
                <HStack p='4' spacing='28px'>
                    <Link as={ReactLink} to='/stops-near-me'>
                        Stops Near Me
                    </Link>
                    <Link as={ReactLink} to='/favourite-stops'>
                        Favourite Stops
                    </Link>
                    <Link as={ReactLink} to='/recent-queries'>
                        Recent Queries
                    </Link>
                </HStack>
            </Flex>
        </HStack>
    );
}

export default Nav; 