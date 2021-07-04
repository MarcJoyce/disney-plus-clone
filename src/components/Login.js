import { useEffect } from 'react';

import styled from 'styled-components'

import { auth, provider } from "../firebase";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { selectUserName, setSignOutState, setUserLoginDetails } from "../features/user/userSlice"

const Login = (props) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const userName = useSelector(selectUserName);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user)
        history.push("/home");
      }
    })
  }, [userName]);

  const setUser = (user) => {
    dispatch(setUserLoginDetails({
      name: user.displayName,
      email: user.email,
      photo: user.photoURL
    })
    )
  }

  const handleAuth = () => {
    if (!userName) {
    auth
    .signInWithPopup(provider)
    .then((res) => {
      setUser(res.user);
    })
    .catch((error) => {
      alert(error.message)
    });
  }
}

  return (
    <Container>
      <Content>
      <CTA>
        <CTALogoOne src="/assets/images/cta-logo-one.svg" alt=""></CTALogoOne>
        <SignUp onClick={handleAuth}>SIGN IN</SignUp>
        <Description>Explore the greatest stories from Disney, Pixar, Marvel, Star Wars and National Geographic, as well as exclusive Disney+ Originals.</Description>
        <CTALogoTwo src="/assets/images/cta-logo-two.png" alt=""></CTALogoTwo>
      </CTA>
        <BgImage />
      </Content>
    </Container>
  )
}

const Container = styled.section`
overflow: hidden;
height: 100vh;
`;

const Content = styled.div`
margin-bottom: 10vw;
width: 100%;
position: relative;
height: 100%;
box-sizing: border-box;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
padding: 80px 40px;
`;

const BgImage = styled.div`
background-image: url("/assets/images/login-background.jpg");
height: 100%;
background-position: top;
background-size: cover;
background-repeat: no-repeat;
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
z-index: -1;
`;

const CTA = styled.div`
max-width: 650px;
width: 100%;
display: flex;
align-items: center;
flex-direction: column;
`;

const CTALogoOne = styled.img`
margin-bottom: 12px;
max-width: 600px;
min-height: 1px;
display: block;
width: 100%;
`;

const SignUp = styled.a`
font-weight: bold;
color: #F9F9F9;
background-color: #0063E5;
margin-bottom: 12px;
width: 100%;
letter-spacing: 1.5px;
font-size: 18px;
padding: 16.5px 0;
text-align: center;
border: 1px solid transparent;
border-radius: 4px;
cursor: pointer;

&:hover {
  background-color: #0483EE;
}
`;

const Description = styled.p`
text-align: center;
color: hsla(0, 0%, 95.3%, 1.0);
font-size: 11px;
letter-spacing: 1.5px;
margin: 4px 0 24px;
line-height: 1.5;
`;

const CTALogoTwo = styled.img`
max-width: 600px;
width: 100%;
margin: 0 0 20px;
display: inline-block;
vertical-align: bottom;
`;

export default Login;