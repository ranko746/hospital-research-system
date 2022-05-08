import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import ContactUsForm from "components/forms/TwoColContactUsWithIllustrationFullForm.js";
import ContactDetails from "components/cards/ThreeColContactDetails.js";

const Address = tw.span`leading-relaxed`;
const AddressLine = tw.span`block`;
const Email = tw.span`text-sm mt-6 block text-gray-500`;
const Phone = tw.span`text-sm mt-0 block text-gray-500`;

export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <ContactUsForm
        subheading="Mail It In"
        description="Through phone call, text, chat bot, electronic mail, regular mail, morse code,
        telegram, carrier pigeon, messenger hawk, smoke signal or in person, we’re free to help."
      />
      <ContactDetails
        heading="Mailing Address"
        description=""
        cards={[
          {
            title: "Denver",
            description: (
              <>
                <Address>
                  <AddressLine>450 W 14th Ave #40144</AddressLine>
                  <AddressLine>Denver, CO, 80204</AddressLine>
                </Address>
                <Email>contactus@exorbital.co</Email>
                <Phone>(561) 561-2988</Phone>
              </>
            )
          }
        ]}
      />
      <Footer />
    </AnimationRevealPage>
  );
};
