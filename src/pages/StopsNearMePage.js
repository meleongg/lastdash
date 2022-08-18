import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    Box,
} from '@chakra-ui/react';

import { uniqueId } from 'lodash';
import firebaseFunctions from '../persistence/services';
import apiServices from '../persistence/apiServices';

import Nav from '../components/Nav';
import Footer from '../components/Footer';

const StopsNearMePage = () => {
    const [address, setAddress] = useState('');
    const [radius, setRadius] = useState(500);
    const [isSubmittedAddress, setIsSubmittedAddress] = useState(false);
    const [stops, setStops] = useState([]);

    // TODO: remove is submitted from this page, meaning all addresses have to be submitted from the home page, since this allows for page persistence

    const handleApiCalls = async (address) => {
        const geoCode = await apiServices.getGeoCode(address);
        const apiStops = await apiServices.getStops(radius, geoCode[0], geoCode[1]);
        setStops(apiStops);
    }
    
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }

    const handleRadiusChange = (e) => {
        setRadius(e.target.value);
    }

    const handleAddressSubmit = async (e) => {
        setAddress(e.target.parentElement.parentElement.children[1].value);
        setRadius(e.target.parentElement.parentElement.children[4].value);
        await handleApiCalls(address);
        await firebaseFunctions.setAddress(address, radius);

        let res = await firebaseFunctions.checkAddressExistsInRecentAddresses(address, radius);
        if (!res) {
            await firebaseFunctions.addRecentAddress(address, radius);
        }
        

        setIsSubmittedAddress(true);
    }

    const renderRoutes = (stopNo, routes) => {
        return (
            routes.map((route) => {
                return (
                    <Link key={uniqueId()} to={'/routes/' + route + '-' + stopNo }>{route} </Link>
                );
            })
        );
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
                        <Td>{renderRoutes(stop.StopNo, stop.Routes.split(', '))}</Td>
                        <Td>{stop.Distance}</Td>
                        <Td>{checkWheelchairAccess(stop.WheelchairAccess)}</Td>
                    </Tr>
                );
            })
        );
    }

    useEffect(() => {
        // GET Request to Firebase to check if address has already been entered
        (async() => {
            const addressInfo = await firebaseFunctions.getAddress();
            const address = addressInfo.value; 
            setIsSubmittedAddress(address !== '');
            
            if (isSubmittedAddress) {
                await handleApiCalls(addressInfo.value);
                setAddress(addressInfo.value);
                setRadius(addressInfo.radius);
            }
        })();
    }, [isSubmittedAddress]);

    useEffect(() => {
        if (isSubmittedAddress) {
            const caption = document.getElementsByClassName('stops-table-caption')[0];

            const chooseAddress = () => {
                return (address === '') ? 'your location' : address; 
            }

            if (stops.length > 1) {
                caption.innerHTML = `Stops are ${radius} meters away from ${chooseAddress()}`;
            } else {
                caption.innerHTML = `Stop is ${radius} meters away from ${chooseAddress()}`;
            }
        }
    }, [stops, isSubmittedAddress, radius, address]);

    return (
        <VStack pb='50px' minHeight='100vh' pos='relative'>
            <Nav />
                <Box w='50%' pt='30px' pb='30px'>
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
                </Box>
                { isSubmittedAddress &&
                    <Grid>
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
                    </Grid>
                }
            <Footer />
        </VStack>
    );
}

export default StopsNearMePage;