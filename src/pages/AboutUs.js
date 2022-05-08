import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import MainFeature1 from "components/features/TwoColWithButton.js";
import Features from "components/features/ThreeColSimple.js";

import SupportIconImage from "images/support-icon.svg";
import ShieldIconImage from "images/shield-icon.svg";
import CustomerLoveIconImage from "images/simple-icon.svg";
import HappyIllustration from "images/happy-illustration.svg";
import LoveIllustration from "images/love-illustration.svg";

const Subheading = tw.span`uppercase tracking-wider text-sm`;
export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <MainFeature1
        subheading={<Subheading>About ISLA</Subheading>}
        heading="Healthcare made simple."
        buttonRounded={false}
        primaryButtonText="Learn More"
        imageSrc={HappyIllustration}
      />
      <MainFeature1
        subheading={<Subheading>Our Vision</Subheading>}
        heading="Revitalize Healthcare Across America."
        buttonRounded={false}
        description="Given only your location, insurance provider, and affliction,
        Project Isla will provide quality and affordable care. Our platform will give millions of
        Americans the ability to shop healthcare as they do any other good or service. Equipped with
        procedure prices, doctor reviews, forums, and a plethora of other medical insights, users will
        have the opportunity to make decisions on where to visit. Project Isla is a long-term solution
        to America’s healthcare needs."
        primaryButtonText="Try It Out"
        primaryButtonUrl="/research"
        imageSrc={LoveIllustration}
        textOnLeft={false}
      />
      <Features
        subheading={<Subheading>Our Values</Subheading>}
        heading="The Exorbital Promise."
        description="Reinventing global
        industries by following these tenets, while creating new ways to make the bare necessities
        simple. We help change the status quo, by thinking differently:"
        cards={[
          {
            imageSrc: ShieldIconImage,
            title: "Innovation",
            description: "Project Isla seeks to innovate and improve on outdated healthcare systems, to bring them up to current standards."
          },
          {
            imageSrc: CustomerLoveIconImage,
            title: "Transparency",
            description: "Healthcare’s murky, Project Isla brings clarity through transparent pricing."
          },
          {
            imageSrc: SupportIconImage,
            title: "Connectivity",
            description: "Project Isla creates a more connective and intuitive platform for people to use."
          },
        ]}
        linkText=""
      />
      <Footer />
    </AnimationRevealPage>
  );
};
