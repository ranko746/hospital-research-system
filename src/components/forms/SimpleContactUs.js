import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as SvgDotPatternIcon } from "../../images/dot-pattern.svg"
import { sendMessage } from "api/user";
import { toast } from "react-toast";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-500 text-gray-100 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,textarea {
    ${tw`w-full text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-gray-500`}
    }
  }
`;

const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Error = tw.label`text-sm text-red-400`;
const Input = tw.input``;
const TextArea = tw.textarea`h-24 sm:h-full resize-none`;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;

const SvgDotPattern1 = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`

export default () => {

  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMsg = {};

    !name && (errorMsg.user_name = "This field is required.");
    !email && (errorMsg.user_email = "This field is required.");
    !reason && (errorMsg.message_reason = "This field is required.");
    !content && (errorMsg.message = "This field is required.");

    if (!name || !email || !reason || !content) {
      setError(errorMsg);
      return;
    }

    const params = {
      user_name: name,
      user_email: email,
      message_reason: reason,
      message: content
    }

    const result = await sendMessage(params);
    if (result.res) {
      setError({});
      toast.success("Message sent.");
    }
    else {
      setError(result.err.response.data);
    }
  }

  return (
    <Container>
      <Content>
        <FormContainer>
          <div tw="mx-auto max-w-4xl">
            <h2>Need Help?</h2>
            <form action="#">
              <TwoColumn>
                <Column>
                  <InputContainer>
                    <Label htmlFor="name-input">Your Name</Label>
                    <Input tw="bg-transparent" id="name-input" type="text" name="name" placeholder="E.g. John Doe"
                      value={name} onChange={(e) => setUsername(e.target.value)} />
                    {error.user_name && <Error htmlFor="name-input">{error.user_name}</Error>}
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="email-input">Your Email Address</Label>
                    <Input tw="bg-transparent" id="email-input" type="email" name="email" placeholder="E.g. john@mail.com"
                      value={email} onChange={(e) => setEmail(e.target.value)} />
                    {error.user_email && <Error htmlFor="name-input">{error.user_email}</Error>}
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="reason-input">Your Reason</Label>
                    <Input tw="bg-transparent" id="reason-input" type="text" name="reason" placeholder="E.g. Surgery"
                      value={reason} onChange={(e) => setReason(e.target.value)} />
                    {error.message_reason && <Error htmlFor="name-input">{error.message_reason}</Error>}
                  </InputContainer>
                </Column>
                <Column>
                  <InputContainer tw="flex-1">
                    <Label htmlFor="name-input">Your Message</Label>
                    <TextArea tw="bg-transparent" id="message-input" name="message" placeholder="E.g. Details about your idea" value={content} onChange={(e) => setContent(e.target.value)} />
                  </InputContainer>
                  {error.message && <Error htmlFor="name-input">{error.message}</Error>}
                </Column>
              </TwoColumn>

              <SubmitButton type="submit" value="Submit" onClick={handleSubmit}>Submit</SubmitButton>
            </form>
          </div>
          <SvgDotPattern1 />
        </FormContainer>
      </Content>
    </Container>
  );
};
