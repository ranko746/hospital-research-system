import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryLink as PrimaryLinkBase } from "components/misc/Links.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as RateIcon } from "feather-icons/dist/icons/star.svg";
import { ReactComponent as PhoneIcon } from "feather-icons/dist/icons/phone.svg";
import { ReactComponent as TrendingIcon } from "feather-icons/dist/icons/trending-up.svg";
import { ReactComponent as ArrowRightIcon } from "images/arrow-right-icon.svg";
import { toast } from "react-toast";
import { getComparingHospitals } from "api/hospital";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const ThreeColumn = tw.div`flex flex-wrap`;
const Column = tw.div``;
const HeadingColumn = tw(Column)`w-full xl:w-1/3`;
const CardColumn = tw(Column)`w-full md:w-1/2 xl:w-1/3 mt-16 xl:mt-0`;
const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const HeadingInfoContainer = tw.div`text-center xl:text-left max-w-lg xl:max-w-none mx-auto xl:mx-0`;
const HeadingTitle = tw(SectionHeading)`xl:text-left leading-tight`;
const HeadingDescription = tw.p`text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 mt-8`;
const PrimaryLink = styled(PrimaryLinkBase)`
  ${tw`inline-flex justify-center xl:justify-start items-center mt-8 text-lg`}
  svg {
    ${tw`ml-2 w-5 h-5`}
  }
`;

const Card = tw.div`mx-auto xl:mx-0 xl:ml-auto max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-xs`;
const CardImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`bg-cover bg-center rounded h-[200px]`
]);

const CardText = tw.div`mt-4`;

const CardHeader = tw.div`flex justify-between items-center`;
const CardType = tw.div`text-primary-500 font-bold text-lg`;
const CardPrice = tw.div`font-semibold text-sm text-gray-600`;
const CardTitle = tw.h5`text-xl mt-4 font-bold`;

const CardMeta = styled.div`
  ${tw`flex flex-row flex-wrap justify-between sm:items-center font-semibold tracking-wide text-gray-600 uppercase text-xs`}
`;

const CardMetaFeature = styled.div`
  ${tw`flex items-center mt-4`}
  svg {
    ${tw`w-5 h-5 mr-1`}
  }
`;
const CardAction = tw(PrimaryButtonBase)`w-full mt-8`;

export default () => {
  const [comparingHospitals, setComparingHospitals] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await getComparingHospitals();
      if (result.res) {
        console.table(result.payload);
        setComparingHospitals(result.payload);
      }
      else {
        toast.error(result.err.message);
      }
    })();
  }, []);

  return (
    <Container>
      <Content>
        <ThreeColumn>
          <HeadingColumn>
            <HeadingInfoContainer>
              <HeadingTitle>Comparing Hospitals</HeadingTitle>
              <HeadingDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua enim ad minim veniam.
              </HeadingDescription>
              <PrimaryLink href="/research">
                Search now <ArrowRightIcon />
              </PrimaryLink>
            </HeadingInfoContainer>
          </HeadingColumn>
          {comparingHospitals.slice(0, 2).map((hospital, index) => (
            <CardColumn key={index}>
              <Card>
                <CardImage imageSrc={hospital.avatar_url ||
                  "https://upload.wikimedia.org/wikipedia/commons/1/1a/Cleveland_Clinic_Miller_Family_Pavilion.jpg"} />
                <CardText>
                  <CardHeader>
                    <CardType>{hospital.address}</CardType>
                    <CardPrice>
                      <RatingsInfo><RateIcon /> {hospital.rating || "0.0"}</RatingsInfo>
                    </CardPrice>
                  </CardHeader>
                  <CardTitle>{hospital.hospital_name}</CardTitle>
                  <CardMeta>
                    <CardMetaFeature>
                      <TrendingIcon /> Trending
                    </CardMetaFeature>
                    <CardMetaFeature>
                      <PhoneIcon /> {hospital.phone}
                    </CardMetaFeature>
                    <CardMetaFeature>
                      <LocationIcon /> {hospital.city}, {hospital.state}
                    </CardMetaFeature>
                  </CardMeta>
                  <a href={hospital.website}><CardAction>See Details</CardAction></a>
                </CardText>
              </Card>
            </CardColumn>
          ))}
        </ThreeColumn>
      </Content>
    </Container>
  );
};
