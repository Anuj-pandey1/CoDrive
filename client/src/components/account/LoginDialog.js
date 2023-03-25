import { Dialog,Typography,Box,List,ListItem,styled} from "@mui/material"
import { qrCodeImage } from "../../constants/data.js";
import { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider.js";
import {GoogleLogin} from '@react-oauth/google'
import jwt_decode from 'jwt-decode';
import { addUser } from "../../service/api.js";
const Component=styled(Box)`
display:flex;
`;

const Container = styled(Box)`
padding:56px 0 56px 56px;
`;

const QRCode=styled('img')`
height:264;
width:264;
margin:50px 0 0 50px;
`
const Title = styled(Typography)`
  font-size: 26px;
  margin-bottom: 25px;
  color: #525252;
  font-family: Segoe UI, Helvetica Neue, Helvetica, Lucida Grande, Arial, Ubuntu,
    Cantarell, Fira Sans, sans-serif;
  font-weight: 300;
`;

const StyledList = styled(List)`
  & > li {
    padding: 0;
    margin-top: 15px;
    font-size: 18px;
    line-height: 28px;
    color: #4a4a4a;
  }
`;

const dialogStyle = {
  marginTop: "12%",
  height: "95%",
  width: "60%",
  maxWidth: "100",
  maxHeight: "100%",
  borderRadius: 0,
  boxShadow: "none",
  overflow: "hidden",
};

export const LoginDialog=()=>{
   
    const {setAccount}=useContext(AccountContext);



    const onLoginSuccess=async (res)=>{
     const decoded =jwt_decode(res.credential);
     localStorage.setItem('user', JSON.stringify(decoded));
     setAccount(decoded);
     console.log(JSON.stringify(decoded));

     await addUser(decoded);
    }

    const onLoginError=(res)=>{
     console.log('Login Failed',res);
    }
    return (
      <Dialog open={true} PaperProps={{ sx: dialogStyle }}>
        <Component>
          <Container>
            <Title>To us WhatsApp on Your Computer</Title>
            <StyledList>
              <ListItem>1. Open WhatsApp on your phone</ListItem>
              <ListItem>2. Tap Menu Settings and select WhatsApp Web</ListItem>
              <ListItem>
                3. Point your phone to this screen to capture the code
              </ListItem>
            </StyledList>
          </Container>
          <Box>
            <QRCode src={qrCodeImage} alt='qr-code'></QRCode>
            <Box>
            const userString = localStorage.getItem('user');
            console.log(userString);
                <GoogleLogin 
                onSuccess={onLoginSuccess}
                onError={onLoginError}
                />
            </Box>
          </Box>
        </Component>
      </Dialog>
    );
} 