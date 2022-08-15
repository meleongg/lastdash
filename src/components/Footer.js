import { 
    Box,
    Heading 
} from "@chakra-ui/react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <Box backgroundColor='black' w='100%' color='white'>
            <Heading as='h6' fontSize='1.1rem' p='10px' align='center'>
                Copyright <FontAwesomeIcon icon={faCopyright}/> at <a href='https://github.com/meleongg/lastdash' target='_blank' rel="noreferrer"> <FontAwesomeIcon icon={faGithub}/> meleong 2022</a>
            </Heading>
        </Box>
    );
}

export default Footer;