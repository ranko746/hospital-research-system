import React from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";
import Features from "components/features/ThreeColWithSideImage.js";
import MainFeature from "components/features/TwoColSingleFeatureWithStats.js";
import SliderCard from "components/cards/ThreeColSlider.js";
import TrendingCard from "components/cards/TwoTrendingPreviewCardsWithImage.js";
import ContactUsForm from "components/forms/SimpleContactUs.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import logo from "../images/logo_w.png";
import { LogoLink } from "components/headers/light.js";

export default () => {

  const Subheading = tw.span`uppercase tracking-widest font-bold text-primary-500`;
  const HighlightedText = tw.span`text-primary-500`;

  const logoLink = (
    <LogoLink href="/">
      <img src={logo} alt="logo" />
    </LogoLink>
  );

  return (
    <AnimationRevealPage>
      <Hero logoLink={logoLink} />
      <Features
        subheading={<Subheading>Features</Subheading>}
        heading={
          <>
            Introducing Project <HighlightedText>Isla.</HighlightedText>
          </>
        }
      />
      <SliderCard />
      <TrendingCard />
      <MainFeature />
      <ContactUsForm />
      <Footer />
    </AnimationRevealPage>
  )
};
