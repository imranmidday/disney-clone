import React, { useEffect } from 'react'
import { auth, provider} from "../firebase"
import styled from 'styled-components'
import {
    selectUserName,
    selectUserPhoto,
    setUserLogin,
    setSignOut
} from "../features/user/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
function Header() {
    const dispatch = useDispatch();
    const History = useHistory()
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(()=>{
        auth.onAuthStateChanged(async (user)=>{
            if(user){
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }))
                History.push("/")    
            }
        })  
    },[])

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            let user = result.user
            dispatch(setUserLogin({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            }))
            History.push("/")
        })
    }

    const signOut = () => {
        auth.signOut()
        .then(()=>{
            dispatch(setSignOut());
            History.push("/login")
        })
    }

    return (
        <Nav>
            <a href="/">
            <Logo src="/images/logo.svg"/>
            </a>
            { !userName ? (
                <LoginConatiner>
                    <Login onClick={signIn}>Login</Login>
                </LoginConatiner>
                ):
                <>
                    <NavMenu>
                        <a>
                            <img src="/images/home-icon.svg"/>
                            <span>HOME</span>
                        </a>
                        <a>
                            <img src="/images/search-icon.svg"/>
                            <span>SEARCH</span>
                        </a>
                        <a>
                            <img src="/images/watchlist-icon.svg"/>
                            <span>WATCHLIST</span>
                        </a>
                        <a>
                            <img src="/images/original-icon.svg"/>
                            <span>ORIGINALS</span>
                        </a>
                        <a>
                            <img src="/images/movie-icon.svg"/>
                            <span>MOVIES</span>
                        </a>
                        <a>
                            <img src="/images/series-icon.svg"/>
                            <span>SERIES</span>
                        </a>
                    </NavMenu>
                    <UserImg 
                        onClick={signOut}
                        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUQEhIVFRUXFRgVFhYXFSAYHRcaHR0XHRgdFx0dHiggHx0lHR4dITEhJSkrLi4uIys1ODM1NzQtLjMBCgoKDg0OGBAQGysdHx8tLyswLS0vNzcvLS0uNzctLS0tLS0tNzArLS0rKy0tLSstLS0tLS0tLS0tLS0tLTctLf/AABEIAJYAlgMBIgACEQEDEQH/xAAbAAEAAwADAQAAAAAAAAAAAAAAAQUGAgMEB//EADoQAAIBAAYGBgkCBwAAAAAAAAABAgMEESFh8AUGMUGRsRJRcaHB0RMiMjNDcoGCwpLhFUJSU2Ki0v/EABkBAQADAQEAAAAAAAAAAAAAAAACAwQBBf/EACARAQACAgIDAAMAAAAAAAAAAAABAgMRMTIEEmEhQVH/2gAMAwEAAhEDEQA/ANwAD3XmgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA89Yr9FC6dJFPqtv4K88605V3d6T/AFl5EopaeINwsAddBWYTvhOMux28TsIgAAAAAAAAAAAAAAAAAAOFPTRhFzk7Ela2ZPSenJ0jcYWwhhtfa/Bd5z1lr/Tn6JP1YbcZb+GziUxsw4oiPaVVrfosDAzyNKCYSadqbTWxp2NGh0Rp92qFM8FP/rz49ZnQQvSLxqXYnT6MQUurNf6cXRSd8NmMf22fVF0efes1nUroncAAIugAAAAAAAAAAHGln0YuXUm+CtOR012NtHNdcJLimI5GBcm2272732vaQED1WYAABk55kW5ywBYaApejTwxfReNqs52G1MLomNtPRL/NPg7fM3Ri8ntC7HwAAzpgAAAAAAAAAAAADCaTqroqSUN1vq4p7Dy5zfibPTejPTRtj7cdmK3pmOnBxbjJNNXNO7xPQxZPev1Raupcc5vAzm8ItRLc5fYBnN56KjVJ0slCG3a3uSuvZyZ1+ZFnqtVelSOk3QVi+Z3cvA1R0VGqRooKjju2vre9s7zzsl/e22isagABB0AAAAAAAAAAAAADx6Q0ZR03tKx7pK5/v9T2A7EzE7gmNstWNWqRexKMljbF+Xeedav1j+lfqXgzWTrVGttJBdskvE4fxCh/u0f64+ZfGfIh6VUdV1Ze2kmuyHm/Iv6rVoUcejCKS59r3smFYg9k4vskmdpVfJa3KUViOEAAg6AAAAAAAAAAAAcKalUIucnYkrWwObdl7Kau6xUcLoL0j69keO/6FHpXS06Z2ezDdHxl1vkV5rp48c2Vzf8AizrGnaef83QXVFWd7v7yvpKWUr5Scu1tnBLPDAI0RWI4hXMyWAIZzeScLDtoaxOHszlHsbR1A5p1bVXWCmj7TU1irHxXjaXdQ09RUlifqS6pbPo/OwxwZXbDS3xKLzD6KDJaF0y6NqE3bR7LXth2YYGtTMWTHNJ1K2ttgAIOgAAAAAUOttM1GEN0m28bLLOZfGc1w+F9/wCBbg7wjfhnUAM8j0FAlnhgEEs8MAgGeWIzm8LPdiE88MQAFueAAAMN5ywBtNXqVyoIW7rY/RO7usRi2bDVj3C+aRn8nosx8rUAGJaAAAAABnNcPhff+BozOa3/AAvv/Atwd4RvwzoCzngD0FAs92AWbws92AQBPPDELPdiE88MQnnhiAzyDGeQec2gM8sRnkBnN4A2GrHuF80jH2mw1Z9wvmkUeR0Tx8rUAGFcAAACQBBnNcPhff8AgQC3B3hG/DPWizPAkHoKBLPDAJb85uAAi3PAjpZ4YkgOiYTADg7iOkSADNhqx7hfNIAz+R0WU5WoJBiWoJAOOv/Z"/>


                </>
            }
            
        </Nav>
    )
}

export default Header

const Nav = styled.nav`
    height: 70px;
    background: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow-x: hidden; 
`
const Logo = styled.img`
    width: 80px;
    cursor: pointer;
`
const NavMenu = styled.div`
    display: flex; 
    flex: 1;
    margin-left: 25px;
    align-items:center;
    a{
        display: flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer;

        img{
            height: 20px;
        }
        span{
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative; 
            
            &:after {
                content: "";
                height: 2px;
                background: white;
                position: absolute;
                left: 0;
                right: 0;
                bottom: -6px;
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25,0.46,0.45,0.94) 0s;
                transform: scaleX(0); 
            }
        }

        &:hover {
            span:after{
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }

`
const UserImg = styled.img`
    width: 48px;
    heignt: 48px;
    border-radius: 50%;
    cursor: pointer;
`
const Login = styled.div`
    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    border-radius: 4px;
    letter-spacing:1.5px;
    text-transform: uppercase;
    background-color: rgba(0,0,0,0.6);
    transition: all 0.2s ease 0s;
    cursor: pointer;
    &:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent
    }
`

const LoginConatiner = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`