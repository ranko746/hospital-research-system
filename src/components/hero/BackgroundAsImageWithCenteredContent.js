import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import backgroundImage from "images/hospital/back.jpg";

import Header, { NavLink, NavLinks, PrimaryLink as PrimaryLinkBase, LogoLink, NavToggle, DesktopNavLinks } from "../headers/light.js";
import { signout } from "api/user.js";

const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none w-full`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300 text-xl`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;

const PrimaryLink = tw(PrimaryLinkBase)`rounded-full`
const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-cover h-screen min-h-144`}
  background-image: url("${backgroundImage}");
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-black opacity-50`;

const HeroContainer = tw.div`z-20 relative px-6 sm:px-8 mx-auto h-full flex flex-col`;
const Content = tw.div`px-4 flex flex-1 flex-col justify-center items-center`;

const Heading = styled.h1`
  ${tw`text-3xl text-center sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-snug -mt-24 sm:mt-0`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

const PrimaryAction = styled.button`
  ${tw`rounded-full px-8 py-3 mt-10 text-xl sm:text-base sm:mt-16 sm:px-8 sm:py-4 font-bold shadow transition duration-300 bg-primary-500 text-gray-100 hocus:bg-gray-100 hocus:text-primary-500 focus:outline-none focus:shadow-outline`}
  :hover span{
    display: none;
  }
  :hover:after {
    content: "Better Care";
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export default ({ logoLink }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const navLinks = [
    <NavLinks key={1}>
      <NavLink href="/">
      </NavLink>
      <NavLink href="/">
      </NavLink>
      <NavLink href="/">
        Home
      </NavLink>
      <NavLink href="/research">
        Research
      </NavLink>
      <NavLink href="/about">
        About
      </NavLink>
      <NavLink href="/contact">
        Contact
      </NavLink>
    </NavLinks>,
    token ?
      <NavLink href="#" onClick={() => {
        setToken("");
        signout();
      }}>
        Sign out
      </NavLink >
      :
      <NavLinks key={2}>
        <NavLink href="/signup">
          Sign Up
        </NavLink>
        <PrimaryLink href="/signin">
          Sign In
        </PrimaryLink>
      </NavLinks >

  ];

  return (
    <Container>
      <OpacityOverlay />
      <HeroContainer>
        <StyledHeader links={navLinks} logoLink={logoLink} />
        <Content>
          <Heading>
            One Click Away From
            <br />
            Better Care
          </Heading>
          <a href="/research"><PrimaryAction><span>Find A Hospital</span></PrimaryAction></a>
        </Content>
      </HeroContainer>
    </Container>
  );
};
