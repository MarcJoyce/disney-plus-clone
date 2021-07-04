import { useEffect } from 'react';

import styled from "styled-components";
import { auth, provider } from "../firebase";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import { selectUserName, selectUserPhoto, setSignOutState, setUserLoginDetails } from "../features/user/userSlice"


const Navbar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

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
  } else if (userName) {
    auth
    .signOut()
    .then(() => {
      dispatch(setSignOutState());
      history.push("/");
    })
    .catch((error) => {
      alert(error.message)
    })
  }
}
  return (
    <Nav>
      <Logo>
        <Link to="/">
          <img src="/assets/images/logo.svg" alt="Disney+ Logo" />
        </Link>
      </Logo>

      {
        !userName ? 
        <Login onClick={handleAuth}>LOGIN</Login> 
         : 
         <>
          <Navmenu>
          <a href="/home">
            <img src="/assets/images/home-icon.svg" alt="Home" />
            <span>HOME</span>
          </a>
          <a>
            <img src="/assets/images/search-icon.svg" alt="Search" />
            <span>SEARCH</span>
          </a>
          <a>
            <img src="/assets/images/watchlist-icon.svg" alt="Watchlist" />
            <span>WATCHLIST</span>
          </a>
          <a>
            <img src="/assets/images/original-icon.svg" alt="originals" />
            <span>ORIGINALS</span>
          </a>
          <a>
            <img src="/assets/images/movie-icon.svg" alt="Movie" />
            <span>MOVIES</span>
          </a>
          <a>
            <img src="/assets/images/series-icon.svg" alt="Series" />
            <span>SERIES</span>
          </a>
        </Navmenu>
        <SignOut>
          <UserImg src={userPhoto} alt={userName} />
          <DropDown>
            <span onClick={handleAuth}>Sign out</span>
          </DropDown>
        </SignOut>
        
        </>
        }
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #090b13;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  cursor: pointer;
  img {
    display: block;
    width: 100%;
  }
`;

const Navmenu = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-flow: row nowrap;
  height: 100%;
  padding: 0;
  position: relative;
  margin: 0 auto 0 25px;
  
  overflow-x: hidden;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgba(249, 249, 249, 1);
      font-size: 13px;
      letter-spacing: 1.5px;
      padding: 2px 2px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgba(249, 249, 249, 1);
        border-radius: 0 0 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        opacity: 0;
        position: absolute;
        left: 0;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 0.25s cubic-bezier(0.25, 0.45, 0.45, 0.95) 0s;
        width: 100%;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }

  @media (min-width: 768px) {
    max-width: 475px; 
  }

  @media (min-width: 820px) {
    max-width: 590px;
  }

  @media (min-width: 920px) {
    max-width: 100%
  }
`;

const Login = styled.a`
background-color: rgba(0, 0, 0, 0.6);
padding: 8px 16px;
letter-spacing: 1.5px;
border: 1px solid #F9F9F9;
border-radius: 4px;
text-transform: uppercase;
transition: all .2s ease 0s;
cursor: pointer;

&:hover {
  background-color: #F9F9F9;
  color: #000000;
  border-color: transparent;
}
`;

const UserImg = styled.img`
height: 100%;
`;

const DropDown = styled.div`
position: absolute;
top: 50px;
right: 0;
background: rgba(19, 19, 19, 1);
border: 1px solid rgba(151, 151, 151, 0.35);
border-radius: 4px;
padding: 10px;
font-size: 14px;
width: 100px;
letter-spacing: 3px;
opacity: 0;
cursor: pointer;
`;

const SignOut = styled.div`
height: 50px;
width: 50px;
position: absolute;
display: flex;
justify-content: center;
align-items: center;
right: 50px;

${UserImg} {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}

&:hover {
  ${DropDown} {
    opacity: 1;
    transition-duration: 1s;
  }
}
`;


export default Navbar;
