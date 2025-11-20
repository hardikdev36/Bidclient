import { Container } from '@mui/material';
import { ColorRing } from 'react-loader-spinner';
import {blue} from "@mui/material/colors";

const Loader = () => {
    return (
        <Container
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <ColorRing
                visible={true}
                height="100"
                width="100"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#2563eb","#2563eb","#2563eb","#2563eb","#2563eb"]}
            />
        </Container>
    );
};

export default Loader;