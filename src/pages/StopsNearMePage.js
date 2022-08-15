import React, { useState, useEffect } from 'react';
import { 
    VStack,
    Grid,
    Flex,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    FormHelperText,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box
} from '@chakra-ui/react';

import { uniqueId } from 'lodash';
import firebaseFunctions from '../persistence/services';
import apiServices from '../persistence/apiServices';

import Nav from '../components/Nav';

const StopsNearMePage = () => {
    const [address, setAddress] = useState('');
    const [radius, setRadius] = useState(500);
    const [isFromHomePage, setIsFromHomePage] = useState(false);
    const [submittedAddress, setSubmittedAddress] = useState(false);
    const [stops, setStops] = useState([]);

    const handleApiCalls = async (address) => {
        const geoCode = await apiServices.getGeoCode(address);
        const apiStops = await apiServices.getStops(radius, geoCode[0], geoCode[1]);
        setStops(apiStops);
    }

    const checkIsFromHomePage = async () => {
        const addressInfo = await firebaseFunctions.getAddressFromHomePage();
        setIsFromHomePage(!(addressInfo.value === ''));
        setAddress(addressInfo.value);

        if (!(addressInfo.value === '')) {
            handleApiCalls(addressInfo.value);
            setRadius(addressInfo.radius);
        }
    }
    
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }

    const handleRadiusChange = (e) => {
        setRadius(e.target.value);
    }

    const handleAddressSubmit = async (e) => {
        setAddress(e.target.value);
        await handleApiCalls(address);
        await firebaseFunctions.setAddressFromHomePage('', 0);
        setSubmittedAddress(true);
    }

    const renderStops = () => {
        const checkWheelchairAccess = (bool) => {
            return (bool === 1) ? 'True' : 'False';
        }

        return (
            stops.map((stop) => {
                return (
                    <Tr key={ uniqueId() }>
                        <Td>{stop.StopNo}</Td>
                        <Td>{stop.Name}</Td>
                        <Td>{stop.Routes}</Td>
                        <Td>{stop.Distance}</Td>
                        <Td>{checkWheelchairAccess(stop.WheelchairAccess)}</Td>
                    </Tr>
                );
            })
        );
    }

    useEffect(() => {
        checkIsFromHomePage();
    }, [])

    useEffect(() => {
        if (isFromHomePage || submittedAddress) {
            const caption = document.getElementsByClassName('stops-table-caption')[0];

            if (stops.length > 1) {
                caption.innerHTML = `Stops are ${radius} meters away from ${address}`;
            } else {
                caption.innerHTML = `Stop is ${radius} meters away from ${address}`;
            }
        }
    }, [stops, submittedAddress, isFromHomePage, radius, address]);

    return (
        <VStack>
            <Nav />
            { (!isFromHomePage && !submittedAddress)
                ?
                    (<Box w='50%' pt='30px' pb='30px'>
                        <FormControl>
                            <VStack spacing='10px' align='left'>
                                <FormLabel>Enter your full address</FormLabel>
                                <Input type='address' color='#333' value={address} onChange={handleAddressChange}/>
                                <FormHelperText color='#333'>Ex. 419 E 24th Ave, Vancouver, BC V5V 2A2</FormHelperText>
                                <FormLabel>Enter a radius</FormLabel>
                                <Input type='number' color='#333' value={radius} onChange={handleRadiusChange}></Input>
                                <Flex justifyContent='center' alignItems='center' width='100%'>
                                    <Button onClick={handleAddressSubmit} className='go-button' size='sm' bg='#005DAA' width='50px' color='#FFF'>
                                        Go
                                    </Button>
                                </Flex>
                            </VStack>
                        </FormControl>
                    </Box>)
                : 
                    (<Grid>
                        <Heading fontSize='1.5rem' align='center' pt='20px' pb='20px'>Nearby Stops</Heading>
                        <TableContainer>
                            <Table variant='striped' colorScheme='gray'>
                                <TableCaption className='stops-table-caption'></TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>Stop Number</Th>
                                        <Th>Stop Name</Th>
                                        <Th>Routes</Th>
                                        <Th>Distance (m)</Th>
                                        <Th>Wheelchair Accessible</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    { renderStops() }
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Grid>)
            }
        </VStack>
    );
}

export default StopsNearMePage;