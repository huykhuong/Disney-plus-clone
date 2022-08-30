import React, { useEffect } from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserEmail,
  selectUserName,
  selectUserPhoto,
} from "../features/userSlice";
import { setUserLoginState, setUserSignOut } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: #090b13;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding 0 36px;
    letter-spacing: 16px;
    z-index: 3;
  `;

  const Logo = styled.a`
    padding: 0;
    width: 80px;
    max-height: 70px;
    margin-top: 4px;
    font-size: 0;

    img {
      display: block;
      width: 100%;
    }
  `;

  const NavMenu = styled.div`
    display: flex;
    align-items: center;
    flex-flow: row nowrap;

    margin: 0px;
    padding: 0px;
    position: relative;
    margin-right: auto;
    margin-left: 25px;

    @media (max-width: 768px) {
      display: none;
    }

    a {
      display: flex;
      align-items: center;
      padding: 0 12px;

      img {
        height: 20px;
        min-width: 20px;
        width: 20px;
      }

      span {
        color: rgb(249, 249, 249);
        font-size: 13px;
        letter-spacing: 1.42px;
        line-height: 1.08;
        padding: 2px 0px;
        white-space: nowrap;
        position: relative;

        &:before {
          background-color: rgb(249, 249, 249);
          border-radius: 0 0 4px 4px;
          position: absolute;
          left: 0px;
          right: 0px;
          bottom: -6px;
          content: "";
          opacity: 0;
          transform-origin: left center;
          transform: scaleX(0);
          transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
          visibility: hidden;
          height: 2px;
          width: auto;
        }
      }

      &:hover {
        span:before {
          transform: scaleX(1);
          visibility: visible;
          opacity: 1 !important;
        }
      }
    }
  `;

  const Login = styled.a`
    background-color: rgba(0, 0, 0, 0.6);
    padding: 8px 16px;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    text-transform: uppercase;
    transition: all 0.2s ease 0s;

    &:hover {
      background-color: #f9f9f9;
      color: #000;
      border=color: transparent;
    }
  `;

  const UserImg = styled.img`
    height: 100%;
  `;

  const DropDown = styled.div`
    position: absolute;
    top: 48px;
    right: 0px;
    background: rgb(19, 19, 19);
    border: 1px solid rgba(151, 151, 151, 0.34);
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 14px;
    letter-spacing: 3px;
    width: 100px;
    opacity: 0;
  `;

  const SignOut = styled.div`
    position: relative;
    height: 48px;
    width: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

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

  const dispatch = useDispatch();
  const username = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        navigate("/home");
      }
    });
  }, [username]);

  const setUser = (user) => {
    dispatch(
      setUserLoginState({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  const handleAuth = () => {
    if (!username) {
      signInWithPopup(auth, provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => alert(error.message));
    } else if (username) {
      signOut(auth)
        .then(() => {
          dispatch(setUserSignOut());
          navigate("/");
        })
        .catch((error) => console.log(error.message));
    }
  };

  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="Disney" />
      </Logo>

      {!username ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <NavMenu>
            <a href="/home">
              <img src="/images/home-icon.svg" alt="HOME" />
              <span>HOME</span>
            </a>
            <a href="/home">
              <img src="/images/search-icon.svg" alt="SEARCH" />
              <span>SEARCH</span>
            </a>
            <a href="/home">
              <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
              <span>WATCHLIST</span>
            </a>
            <a href="/home">
              <img src="/images/original-icon.svg" alt="ORIGINALS" />
              <span>ORIGINALS</span>
            </a>
            <a href="/home">
              <img src="/images/movie-icon.svg" alt="MOVIES" />
              <span>MOVIES</span>
            </a>
            <a href="/home">
              <img src="/images/series-icon.svg" alt="SERIES" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImg src={userPhoto} alt={userPhoto} />
            <DropDown>
              <span onClick={handleAuth}>Sign out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

export default Header;
