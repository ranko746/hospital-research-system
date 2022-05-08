import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Container as ContainerBase } from "components/misc/Layouts.js"
import logo from "../../images/logo_w.png";
import { ReactComponent as FacebookIcon } from "../../images/facebook-icon.svg";
import { ReactComponent as TwitterIcon } from "../../images/twitter-icon.svg";
import { ReactComponent as YoutubeIcon } from "../../images/youtube-icon.svg";
import { ReactComponent as DiscordIcon } from "../../images/discord-icon.svg";
import { ReactComponent as InstagramIcon } from "../../images/instagram-icon.svg";
import { ReactComponent as LinkedinIcon } from "../../images/linkedin-icon.svg";
import { ReactComponent as PinterestIcon } from "../../images/pinterest-icon.svg";


const Container = tw(ContainerBase)`bg-gray-900 text-gray-100 -mx-8 -mb-8`
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const Row = tw.div`flex items-center justify-center flex-col px-8`

const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;
const LogoImg = tw.img`w-[200px]`;
const LogoText = tw.h5`ml-2 text-2xl font-black tracking-wider`;

const LinksContainer = tw.div`mt-8 font-medium flex flex-wrap justify-center items-center flex-col sm:flex-row`
const Link = tw.a`border-b-2 border-transparent hocus:text-gray-300 hocus:border-gray-300 pb-1 transition duration-300 mt-2 mx-4`;

const SocialLinksContainer = tw.div`mt-10`;
const SocialLink = styled.a`
  ${tw`cursor-pointer inline-block text-gray-100 hover:text-gray-500 transition duration-300 mx-4`}
  svg {
    ${tw`w-5 h-5`}
  }
`;

const CopyrightText = tw.p`text-center mt-10 font-medium tracking-wide text-sm text-gray-600`
export default () => {
  return (
    <Container>
      <Content>
        <Row>
          <LogoContainer>
            <LogoImg src={logo} />
          </LogoContainer>
          <LinksContainer>
            <Link href="/">Home</Link>
            <Link href="/Research">Research</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact Us</Link>
          </LinksContainer>
          <SocialLinksContainer>
            <SocialLink href="https://www.discord.com/users/exorbital">
              <DiscordIcon />
            </SocialLink>
            <SocialLink href="https://www.facebook.com/exorbitalco/">
              <FacebookIcon />
            </SocialLink>
            <SocialLink href="https://www.instagram.com/exorbital.co/">
              <InstagramIcon />
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/company/exorbital/">
              <LinkedinIcon />
            </SocialLink>
            <SocialLink href="https://www.pinterest.com/teamexorbital/">
              <PinterestIcon />
            </SocialLink>
            <SocialLink href="https://www.twitter.com/ExorbitalCo">
              <TwitterIcon />
            </SocialLink>
            <SocialLink href="https://www.youtube.com/channel/UCLcrxHIYO4pi3mRANOq81-Q">
              <YoutubeIcon />
            </SocialLink>
          </SocialLinksContainer>
          <CopyrightText>
            COPYRIGHT &copy; 2022 EXORBITAL - ALL RIGHTS RESERVED.
          </CopyrightText>
        </Row>
      </Content>
    </Container>
  );
};
