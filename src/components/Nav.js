import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { 
    HStack,
    Flex,
    Box, 
    Spacer,
    Link, 
    Text,
    Show,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton
 } from '@chakra-ui/react';

import { HamburgerIcon } from '@chakra-ui/icons';

const Nav = () => {
    return (
        <HStack w='100%' bg='#005DAA' color='#FFF'>
            <Flex minWidth='max-content' w='100%' alignItems='center' gap='2'>
                <a href='/lastdash'>
                    <Box p='4'>
                        <Text fontSize='lg' fontWeight='bold'>
                            LastDash
                        </Text>
                    </Box>
                </a>
                <Spacer />
                <Show breakpoint='(max-width: 700px)'>
                    <Box pr='20px'>
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                icon={<HamburgerIcon />}
                                variant='outline'
                            />
                            <MenuList color='#333'>
                                <MenuItem>
                                    <Link as={ReactLink} to='/stops-near-me'>
                                        Stops Near Me
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link as={ReactLink} to='/favourite-stops'>
                                        Favourite Stops
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link as={ReactLink} to='/recent-queries'>
                                        Recent Queries
                                    </Link>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>
                </Show>
                <Show breakpoint='(min-width: 700px)'>
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
                </Show>
            </Flex>
        </HStack>
    );
}

export default Nav; 