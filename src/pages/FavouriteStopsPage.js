import React, { useState, useEffect } from 'react';
import { Link as ReachLink } from 'react-router-dom';
import { uniqueId } from 'lodash';
import { 
    VStack,
    Grid,
    Heading,
    TableContainer,
    Table,
    Thead,
    Tr,
    Td,
    Th,
    Tbody,
    Link
} from '@chakra-ui/react';

import Nav from '../components/Nav';
import Footer from '../components/Footer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import firebaseFunctions from '../persistence/services';

const FavouriteStopsPage = () => {
    const [stops, setStops] = useState({});

    const handleDeleteFaveStop = async (e) => {
        await firebaseFunctions.removeFaveStop(e.target.parentElement.id);
        const storedStops = await firebaseFunctions.getFaveStops();
        setStops(storedStops);
    }

    useEffect(() => {
        (async() => {
            const stops = await firebaseFunctions.getFaveStops();
            setStops(stops);
        })();
    }, []);

    const renderStopInfo = () => {
        const ids = Object.keys(stops);

        return (
            ids.map((id) => {
                return (
                    <Tr key={ uniqueId() }>
                        <Td>{stops[id].stopNum}</Td>
                        <Td>{stops[id].routeNum}</Td>
                        <Td><Link as={ReachLink} to={'/routes/' + stops[id].routeNum + '-' + stops[id].stopNum }>Go</Link></Td>
                        <Td><FontAwesomeIcon className='fave-stop-icons' icon={faTrashCan} id={id} onClick={handleDeleteFaveStop}/></Td>
                    </Tr>
                );
            })
        );
    }

    return (
        <VStack pb='50px' minHeight='100vh' pos='relative'>
            <Nav />
                { (Object.keys(stops).length === 0) ?
                    (
                        <Heading as='h1' fontSize='1.5rem' align='center' pt='20px' pb='20px'>No Favourite Stops</Heading>
                    ) 
                    :
                    (
                        <Grid>
                            <Heading as='h1' fontSize='1.5rem' align='center' pt='20px' pb='20px'>Favourite Stops</Heading>
                            <TableContainer>
                                <Table variant='striped' colorScheme='gray'>
                                    <Thead>
                                        <Tr>
                                            <Th>Stop Number</Th>
                                            <Th>Route</Th>
                                            <Th>Check Info</Th>
                                            <Th>Delete Stop</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        { renderStopInfo() }
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    )
                }
            <Footer />
        </VStack>
    );
}

export default FavouriteStopsPage;