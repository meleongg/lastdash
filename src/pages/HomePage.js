import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    VStack, 
    HStack,
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Image,
    Box,
    Heading,
    Button,
    Grid,
    Flex,
    Hide
} from '@chakra-ui/react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

import firebaseFunctions from '../persistence/services';

import Vancouver from '../images/vancouver.jpeg';
import BlueBus from '../images/blue-bus.jpeg';
import NineNineBus from '../images/99-bus.jpeg';

const HomePage = () => {
    const [address, setAddress] = useState('');
    const [radius, setRadius] = useState(500);

    const navigate = useNavigate();

    const navigateToStopsNearMe = () => {
        navigate('/stops-near-me');
    }

    const handleRadiusChange = (e) => {
        setRadius(e.target.value);
    }
    
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }

    const handleAddressSubmit = async (e) => {
        setAddress(e.target.parentElement.parentElement.children[1].value);
        setRadius(e.target.parentElement.parentElement.children[4].value);

        let res = await firebaseFunctions.checkAddressExistsInRecentAddresses(address, radius);
        if (!res) {
            await firebaseFunctions.addRecentAddress(address, radius);
        }
        
        await firebaseFunctions.setAddress(address, radius);
        navigateToStopsNearMe();
    }

    return (
        <VStack spacing='0' pb='50px' minHeight='100vh' pos='relative'>
            <Nav />
            <Box w='100%' backgroundColor='#333' pos='relative'>
                <Image
                    src={Vancouver}
                    objectFit='cover'
                    alt='Picture of Vancouver, BC skyline'
                    opacity='60%'
                    w='100%'
                />
                <Grid className='center-in-image' position='absolute' top='50%' left='50%' color='#FFF' gap={['10px', '20px', '30px', '40px', '50px']} w={['90%', '70%', '70%', '70%', '70%']}>
                    <Hide breakpoint='(max-width: 500px)'>
                        <Heading className='hero-heading' as='h1' fontSize={['1rem', '1.5rem', '3rem', '4rem', '5rem']}>
                            Perfect for last-minute dashers
                        </Heading>
                    </Hide>
                    <FormControl>
                        <VStack spacing='10px' align='left'>
                            <FormLabel>Enter your full address</FormLabel>
                            <Input type='address' color='#FFF' value={address} onChange={handleAddressChange}/>
                            <Hide breakpoint='(max-width: 500px)'>
                                <FormHelperText color='#FFF'>Ex. 419 E 24th Ave, Vancouver, BC V5V 2A2</FormHelperText>
                            </Hide>
                            <FormLabel>Enter a radius</FormLabel>
                            <Input type='number' color='#FFF' value={radius} onChange={handleRadiusChange}></Input>
                            <Flex justifyContent='center' alignItems='center' width='100%'>
                                <Button onClick={handleAddressSubmit} className='go-button' size='sm' bg='#005DAA' width='50px'>
                                    Go
                                </Button>
                            </Flex>
                        </VStack>
                    </FormControl>
                </Grid>
            </Box>
            <VStack pt='20px' pb='20px' spacing={['40px', '60px', '80px', '100px', '100px']}>
                <HStack spacing={['20px', '40px', '40px', '40px', '40px']} minWidth='60%' maxWidth='90%' justifyContent='center' alignItems='center'>
                    <Image
                        src={BlueBus}
                        alt='Picture of multiple blue Vancouver transit buses'
                        borderRadius="25%"
                        objectFit="cover"
                        width='40%'
                    />
                    <Heading as='h2' fontSize={['1rem', '1.5rem', '1.5rem', '1.5rem', '1.5rem']} align='center'>
                        Get real-time bus information at stops near you
                    </Heading>
                </HStack>
                <HStack spacing={['20px', '40px', '40px', '40px', '40px']} minWidth='60%' maxWidth='90%' justifyContent='center' alignItems='center'>
                    <Heading as='h2' fontSize={['1rem', '1.5rem', '1.5rem', '1.5rem', '1.5rem']} align='center'>
                        Check when buses arrive at your favourite stops
                    </Heading>
                    <Image 
                        src={NineNineBus}
                        alt='Picture of the Vancouver 99 transit bus'
                        borderRadius="25%"
                        objectFit="cover"
                        width='40%'
                    />
                </HStack>
            </VStack>
            <Footer />
        </VStack>
    );
}

export default HomePage;