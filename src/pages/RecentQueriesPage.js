import React, { useState, useEffect } from 'react';
import { useNavigate, Link as ReachLink } from 'react-router-dom';
import { uniqueId } from 'lodash';
import { 
    VStack,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Heading,
    Button,
    TableContainer,
    Table,
    Thead,
    Tr,
    Td,
    Th,
    Tbody,
    Grid,
    Link
} from '@chakra-ui/react';

import firebaseFunctions from '../persistence/services';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const RecentQueriesPage = () => {
    const [routes, setRoutes] = useState({});
    const [addresses, setAddresses] = useState({});

    const navigate = useNavigate();

    const navigateToStopsNearMe = () => {
        navigate('/stops-near-me');
    }

    const handleClearAllAddresses = async (e) => {
        await firebaseFunctions.clearRecentAddresses();
        const storedAddresses = await firebaseFunctions.getRecentAddresses();
        setAddresses(storedAddresses);
    }
    
    const handleClearAllStops = async (e) => {
        await firebaseFunctions.clearRecentRoutes();
        const storedRoutes = await firebaseFunctions.getRecentRoutes();
        setRoutes(storedRoutes);
    }

    const handleChangeAddress = async (e) => {
        const addressRadius = e.target.id.split('-');
        const address = addressRadius[0];
        const radius = addressRadius[1];

        await firebaseFunctions.setAddress(address, radius);
        navigateToStopsNearMe();
    }

    const renderRecentAddresses = () => {
        const ids = Object.keys(addresses);

        return (
            ids.map((id) => {
                const addressInfo = addresses[id];

                return (
                    <Tr key={ uniqueId() }>
                        <Td>{addressInfo.address}</Td>
                        <Td>{addressInfo.radius}</Td>
                        <Td><Link id={addressInfo.address + '-' + addressInfo.radius} onClick={handleChangeAddress}>Check Address</Link></Td>
                    </Tr>
                );
            })
        );
    }

    const renderRecentRoutes = () => {
        const ids = Object.keys(routes);

        return (
            ids.map((id) => {
                const stopInfo = routes[id];

                return (
                    <Tr key={ uniqueId() }>
                        <Td>{stopInfo.stopNum}</Td>
                        <Td>{stopInfo.routeNum}</Td>
                        <Td><Link as={ReachLink} to={'/routes/' + stopInfo.routeNum + '-' + stopInfo.stopNum }>Go</Link></Td>
                    </Tr>
                );
            })
        );
    }

    useEffect(() => {
        // GET API for Firebase to get recent routes and addresses 
        (async() => {
            const storedRoutes = await firebaseFunctions.getRecentRoutes();
            const storedAddresses = await firebaseFunctions.getRecentAddresses();
            setRoutes(storedRoutes);
            setAddresses(storedAddresses);
        })();
    }, []);
    
    return (
        <VStack pb='50px' minHeight='100vh' pos='relative'>
            <Nav />
            <Accordion w='70%' allowMultiple allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left'>
                            Recent Addresses
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} id='addresses-panel'>
                    { (Object.keys(addresses).length === 0) ? 
                        (
                            <Heading as='h1' fontSize='1.5rem' align='center' pt='20px' pb='20px'>No Recent Addresses</Heading>
                        )
                        : 
                        (
                            <Grid>
                                <Heading as='h1' fontSize='1.5rem' align='center' pt='20px' pb='20px'>Recent Addresses</Heading>
                                <Button onClick={handleClearAllAddresses} className='clear-button' size='sm' colorScheme='gray' width='150px'>
                                    Clear Addresses
                                </Button>
                                <TableContainer>
                                    <Table variant='striped' colorScheme='gray'>
                                        <Thead>
                                            <Tr>
                                                <Th>Address</Th>
                                                <Th>Radius</Th>
                                                <Th>Check Address</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            { renderRecentAddresses() }
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        )
                    }
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left'>
                            Recent Routes
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    { (Object.keys(routes).length === 0) ? 
                        (
                            <Heading as='h1' fontSize='1.5rem' align='center' pt='20px' pb='20px'>No Recent Routes</Heading>
                        )
                        : 
                        (
                            <Grid>
                                <Heading as='h1' fontSize='1.5rem' align='center' pt='20px' pb='20px'>Recent Stops</Heading>
                                <Button onClick={handleClearAllStops} className='clear-button' size='sm' colorScheme='gray' width='150px'>
                                    Clear Stops
                                </Button>
                                <TableContainer>
                                    <Table variant='striped' colorScheme='gray'>
                                        <Thead>
                                            <Tr>
                                                <Th>Stop Number</Th>
                                                <Th>Route Number</Th>
                                                <Th>Check Info</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            { renderRecentRoutes() }
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        )
                    }
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            <Footer />
        </VStack>
    );
}

export default RecentQueriesPage; 