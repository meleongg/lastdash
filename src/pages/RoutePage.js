import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { uniqueId } from 'lodash';

import { 
    VStack, 
    Grid,
    Heading,
    Table,
    TableContainer, 
    Thead,
    Tr,
    Th,
    Td,
    Tbody
} from '@chakra-ui/react';

import Nav from '../components/Nav';
import Footer from '../components/Footer';
import apiServices from '../persistence/apiServices';
import firebaseFunctions from '../persistence/services';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const RoutePage = () => {
    const [times, setTimes] = useState({});

    // id in the form of routeNum-stopNum
    let { id } = useParams();
    
    const getRouteStop = (str) => {
        return str.split('-'); 
    }
    
    let routeNum = getRouteStop(id)[0];
    let stopNum = getRouteStop(id)[1];

    const renderStopInfo = () => {
        const keys = Object.keys(times);

        return (
            keys.map((key) => {
                const buses = times[key];

                return (
                    buses.map((bus) => {
                        return (
                            <Tr key={ uniqueId() }>
                                <Td>{bus.Destination}</Td>
                                <Td>{bus.ExpectedLeaveTime}</Td>
                                <Td>{bus.ExpectedCountdown}</Td>
                            </Tr>
                        )
                    })
                );
            })
        );
    }

    const handleAddFaveStopClick = async (e) => {
        await firebaseFunctions.addFaveStop(routeNum, stopNum);
    }
    
    useEffect(() => {
        // GET request for Transit API for the next bus time data
        (async () => {
            let data = await apiServices.getStopTimes(routeNum, stopNum);
            let tempTimes = data[0].Schedules;
            let seenDestinations = [];
            let splitTimes = {}; 

            for (let i=0; i<tempTimes.length; i++) {
                if (!seenDestinations.includes(tempTimes[i].Destination)) {
                    seenDestinations.push(tempTimes[i].Destination);
                    splitTimes[tempTimes[i].Destination] = [tempTimes[i]]; 
                } else {
                    splitTimes[tempTimes[i].Destination] = [...splitTimes[tempTimes[i].Destination], tempTimes[i]];
                }
            }

            setTimes(splitTimes);
        })();

    }, []);

    return (
        <VStack pb='50px' minHeight='100vh' pos='relative'>
            <Nav />
                <Grid>
                    <Heading as='h1' fontSize='1.5rem' align='center' pt='20px' pb='20px'>Times for Route {routeNum} at Stop {stopNum}</Heading>
                    <Heading as='h2' fontSize='1rem' align='center' pt='20px' pb='20px'>Add to favourite stops <FontAwesomeIcon id='add-to-fave-stop-icon' className='fave-stop-icons' icon={faCirclePlus} size='lg' onClick={handleAddFaveStopClick}/></Heading>
                    <TableContainer>
                        <Table variant='striped' colorScheme='gray'>
                            <Thead>
                                <Tr>
                                    <Th>Destination</Th>
                                    <Th>Expected Arrival Time</Th>
                                    <Th>Expected Departure Time (min)</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                { renderStopInfo() }
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Grid>
            <Footer />
        </VStack>
    );
}

export default RoutePage; 