import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    VStack, 
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Image,
    Box,
    Heading,
    Button,
    Grid,
    Flex
} from '@chakra-ui/react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

import firebaseFunctions from '../persistence/services';

import Vancouver from '../images/vancouver.jpeg';
import BlueBus from '../images/blue-bus.jpeg';
import NineNineBus from '../images/99-bus.jpeg';

import AOS from 'aos';
import 'aos/dist/aos.css';

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
        await firebaseFunctions.addRecentAddress(address, radius);
        await firebaseFunctions.setAddress(address, radius);
        navigateToStopsNearMe();
    }

    useEffect(() => {
        AOS.init(
        { duration: 2000,
            once: false, // whether animation should happen only once - while scrolling down
            mirror: true, // whether elements should animate out while scrolling past them
        });
        AOS.refresh();
    }, []);

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
                <Grid className='center-in-image' position='absolute' top='50%' left='50%' color='#FFF' gap={['10px', '20px', '30px', '40px', '50px']}>
                    <Heading className='hero-heading' as='h1' fontSize={['1rem', '1.5rem', '3rem', '4rem', '5rem']}>
                        Perfect for last-minute dashers
                    </Heading>
                    <FormControl>
                        <VStack spacing='10px' align='left'>
                            <FormLabel>Enter your full address</FormLabel>
                            <Input type='address' color='#FFF' value={address} onChange={handleAddressChange}/>
                            <FormHelperText color='#FFF'>Ex. 419 E 24th Ave, Vancouver, BC V5V 2A2</FormHelperText>
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
            <VStack pt={10} pb={10} spacing='100px'>
                <Grid templateColumns='1fr 1.25fr' gap={14} justifyContent='center' alignItems='center' w='90%'>
                    <Image 
                        src={BlueBus}
                        objectFit='cover'
                        alt='Picture of multiple blue Vancouver transit buses'
                        borderRadius="25%"
                        data-aos="fade-right"
                    />
                    <Heading as='h2' fontSize='1.5rem' align='center' data-aos="fade-left">
                        Get real-time bus information at stops near you
                    </Heading>
                </Grid>
                <Grid templateColumns='1.5fr 1fr' gap={14} justifyContent='center' alignItems='center' w='90%'>
                    <Heading as='h2' fontSize='1.5rem' align='center' data-aos="fade-right">
                        Check when buses arrive at your favourite stops
                    </Heading>
                    <Image 
                        src={NineNineBus}
                        objectFit='cover'
                        alt='Picture of the Vancouver 99 transit bus'
                        borderRadius="25%"
                        data-aos="fade-left"
                    />
                </Grid>
            </VStack>
            <Footer />
        </VStack>
    );
}

export default HomePage;