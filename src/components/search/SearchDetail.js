import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { motion } from "framer-motion";
import { SectionHeading } from "components/misc/Headings.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { getHospitals } from "api/hospital";

const Heading = tw(SectionHeading)`text-left lg:text-4xl xl:text-5xl mb-5 text-center`;

const PostsContainer = tw.div`mt-12 flex flex-col sm:flex-row sm:justify-between lg:justify-start`;
const Post = tw(motion.a)`block sm:max-w-sm cursor-pointer mb-16 last:mb-0 sm:mb-0 sm:odd:mr-8 lg:mr-8 xl:mr-16`;
const Image = styled(motion.div)(props => [
  `background-image: url("${props.$imageSrc}");`,
  tw`h-64 bg-cover bg-center rounded`
]);
const Title = tw.h5`mt-6 pl-5 text-xl font-bold transition duration-300 group-hover:text-primary-500`;
const Location = tw.h6`text-sm px-5 border-r border-gray-400`;
const LinkTo = tw.a`text-primary-500 text-sm px-5 pt-2`;
const Center = tw.div`w-full flex justify-center`;

const RecentPostsContainer = styled.div`
  ${tw`mt-24 lg:mt-0`}
  ${PostsContainer} {
    ${tw`w-full flex flex-wrap lg:flex-col`}
  }
  ${Post} {
    ${tw`flex justify-center mb-10 max-w-none w-full sm:w-1/2 lg:w-auto sm:odd:pr-12 lg:odd:pr-0 mr-0`}
  }
  ${Title} {
    ${tw`text-base xl:text-xl mt-0 mr-4 lg:max-w-xs`}
  }
  ${Location} {
    ${tw`mt-3 text-sm text-secondary-100 font-normal leading-none`}
  }
  ${Image} {
    ${tw`h-20 w-20 flex-shrink-0`}
  }
`;
const Address = tw(Location)`lg:w-[300px] sm:w-[150px]`;
const PostTextContainer = tw.div`pt-2`;
const TextContainer = tw.div`flex w-full`;
const SearchBox = tw.div`lg:border-gray-400 lg:border-2 lg:rounded-full pl-10 pr-5 py-4 mb-10`;
const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-full lg:w-6/12 flex flex-col lg:pr-3`;
const ColumnDivider = tw.div`sm:w-full lg:w-6/12 flex flex-col lg:pr-3 lg:border-l-2 lg:pl-10 border-gray-300`;
const Label = tw.label`tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const SearchButton = tw.button`font-bold px-8 lg:px-10 py-3 rounded-full bg-red-500 text-gray-100 hocus:bg-red-700 focus:shadow-outline focus:outline-none transition duration-300`;
const LoadButton = tw(SearchButton)`bg-primary-500`;
const Select = tw.select`bg-gray-200 rounded-full p-2 mt-1 text-gray-600 text-sm focus:ring-blue-500  block w-full dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 focus:outline-none transition`;
const FormContainer = styled.div`
  ${tw`text-gray-500 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,textarea {
    ${tw`w-full text-gray-600 text-base font-medium tracking-wide mt-2 text-gray-600 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-gray-400`}
    }
  }
`;

export default () => {
  const [hospitals, setHospitals] = useState([]);
  const [readPages, setReadPages] = useState(0);
  const [procedure, setProcedure] = useState("");
  const [keyword, setKeyword] = useState("");
  const [visibleMore, setVisibleMore] = useState(true);

  const loadMore = async (page) => {
    const result = await getHospitals({
      page: page,
      page_size: 10,
      procedure: procedure,
      search: keyword
    });

    if (result.res) {
      if (result.payload.count > 0) {
        setReadPages(page);
        if (result.payload.count > 9)
          setVisibleMore(true);
        setHospitals(page === 1 ? result.payload.results : [...hospitals, ...result.payload.results]);
      }
      else {
        setHospitals([]);
        setVisibleMore(false);
      }
    }
    else {
      setVisibleMore(false);
    }
  }

  useEffect(() => {
    loadMore(1);
  }, []);

  return (
    <Container>
      <ContentWithPaddingXl>
        <Heading>Find A Hospital</Heading>
        <SearchBox>
          <FormContainer>
            <TwoColumn>
              <Column>
                <Label htmlFor="name-input">Search doctors, conditions, or procedures</Label>
                <Input id="name-input" type="text" name="name" placeholder='E.g. "Family Medicine"' value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    setKeyword(e.target.value);
                    loadMore(1);
                  }
                }} />
              </Column>
              {/* <Column>
                <Label htmlFor="procedure">Procedure</Label>
                <Input id="procedure" type="text" name="procedure" placeholder="Procedure" value={procedure}
                  onChange={e => setProcedure(e.target.value)} onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      setProcedure(e.target.value);
                      loadMore(1);
                    }
                  }} />
              </Column> */}
              <SearchButton onClick={() => loadMore(1)}>Search</SearchButton>
            </TwoColumn>
          </FormContainer>
        </SearchBox>
        <RecentPostsContainer>
          <Heading>{hospitals.length > 0 ? "Search Results" : "No result found."}</Heading>
          <PostsContainer>
            {hospitals.map((hospital, index) => (
              <Post key={index} href={hospital.website} className="group">
                <Image $imageSrc={hospital.avatar_url ||
                  "https://upload.wikimedia.org/wikipedia/commons/1/1a/Cleveland_Clinic_Miller_Family_Pavilion.jpg"} />
                <PostTextContainer>
                  <Title>{hospital.hospital_name}</Title>
                  <TextContainer>
                    <Address>{hospital.address}</Address>
                    <Location>City: {hospital.city}</Location>
                    <Location>Phone: {hospital.phone}</Location>
                    <LinkTo href={hospital.website}>More</LinkTo>
                  </TextContainer>
                </PostTextContainer>
              </Post>
            ))}
          </PostsContainer>
        </RecentPostsContainer>
        {visibleMore && <Center><LoadButton onClick={() => loadMore(readPages + 1)}>Load More</LoadButton></Center>}
      </ContentWithPaddingXl>
    </Container>
  );
};
