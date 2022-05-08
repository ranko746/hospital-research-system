import React, { useRef, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "images/signup-illustration.svg";
import logo from "images/logo_p.png";
import googleIconImageSrc from "images/google-icon.png";
import twitterIconImageSrc from "images/twitter-icon.png";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import { toast } from "react-toast";
import { signup } from "api/user";
import ValidationInput from "components/forms/Input.js";
import { useNavigate } from "react-router-dom";

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-[80px] mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;
const Select = tw.select`bg-gray-100 px-8 py-4 border-gray-200 rounded p-2 mt-5 text-gray-700 text-sm focus:ring-blue-500  block w-full dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 focus:outline-none transition`;
const Image = tw.img`p-2 w-[150px] h-[150px] rounded-full border-2 border-dashed border-gray-300 m-auto object-cover`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;

const Form = tw.form`mx-auto max-w-xs`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

export default ({
  logoLinkUrl = "/",
  illustrationImageSrc = illustration,
  headingText = "Sign Up For ISLA",
  socialButtons = [
    {
      iconImageSrc: googleIconImageSrc,
      text: "Sign Up With Google",
      url: "https://google.com"
    },
    {
      iconImageSrc: twitterIconImageSrc,
      text: "Sign Up With Twitter",
      url: "https://twitter.com"
    }
  ],
  submitButtonText = "Sign Up",
  SubmitButtonIcon = SignUpIcon,
  tosUrl = "/",
  privacyPolicyUrl = "/",
  signInUrl = "/signin"
}) => {
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState({});
  const [previewImage, setPreviewImage] = useState("https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png");
  const userImage = useRef();
  const navigate = useNavigate();

  const handleUserInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorMsg = {};

    !userInfo.fname && (errorMsg = { ...errorMsg, fname: "* First name is required." })
    !userInfo.lname && (errorMsg = { ...errorMsg, lname: "* Last name is required." })
    !userInfo.email && (errorMsg = { ...errorMsg, email: "* Email is required." })
    !userInfo.birthday && (errorMsg = { ...errorMsg, birthday: "* Birthday is required." })
    !userInfo.insurance && (errorMsg = { ...errorMsg, insurance: "* Insurance is required." })
    !userInfo.street && (errorMsg = { ...errorMsg, street: "* Street is required." })
    !userInfo.city && (errorMsg = { ...errorMsg, city: "* City is required." })
    !userInfo.state && (errorMsg = { ...errorMsg, state: "* State is required." })
    !userInfo.password && (errorMsg = { ...errorMsg, password: "* Password is required." })
    !userInfo.password_confirm && (errorMsg = { ...errorMsg, password_confirm: "* Password confirm is required." })
    !userInfo.zip && (errorMsg = { ...errorMsg, zip: "* Password confirm is required." })
    userInfo.password !== userInfo.password_confirm && toast.error("Password isn't matched");
    setError(errorMsg);

    if (!userInfo.fname || !userInfo.lname || !userInfo.email || !userInfo.birthday || !userInfo.insurance || !userInfo.street || !userInfo.city || !userInfo.state || !userInfo.password || !userInfo.password_confirm || userInfo.password !== userInfo.password_confirm) {
      return;
    }

    const params = {
      username: userInfo.fname + " " + userInfo.lname,
      email: userInfo.email,
      first_name: userInfo.fname,
      last_name: userInfo.lname,
      gender: userInfo.gender,
      birthday: userInfo.birthday,
      password: userInfo.password,
      address: `${userInfo.street} ${userInfo.city}, ${userInfo.state}`,
      insurance: userInfo.insurance,
    }

    const result = await signup(params);
    if (result.res) {
      toast.success("Register Success!");
      localStorage.setItem("token", result.payload.token);
      navigate("/");
    }
    else {
      setError(result.err.response.data)
    }
  }

  const loadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      var reader = new FileReader();

      reader.onload = function (re) {
        setPreviewImage(re.target.result);
      }

      reader.readAsDataURL(file);
    }
  }

  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <LogoLink href={logoLinkUrl}>
              <LogoImage src={logo} />
            </LogoLink>
            <MainContent>
              <Heading>{headingText}</Heading>
              <FormContainer>
                {/* <SocialButtonsContainer>
                {socialButtons.map((socialButton, index) => (
                  <SocialButton key={index} href={socialButton.url}>
                    <span className="iconContainer">
                      <img src={socialButton.iconImageSrc} className="icon" alt="" />
                    </span>
                    <span className="text">{socialButton.text}</span>
                  </SocialButton>
                ))}
              </SocialButtonsContainer>
              <DividerTextContainer>
                <DividerText>Or Sign up with your e-mail</DividerText>
              </DividerTextContainer> */}
                <Form>
                  <Image src={previewImage} onClick={() => userImage.current.click()} />
                  <Input type="file" id="userImage" tw="hidden" ref={userImage} onChange={loadImage} />
                  <ValidationInput type="text" name="fname" error={error.fname} placeholder="First Name" onChange={handleUserInfo} />
                  <ValidationInput type="text" name="lname" error={error.lname} placeholder="Last Name" onChange={handleUserInfo} />
                  <ValidationInput type="email" name="email" error={error.email} placeholder="Email" onChange={handleUserInfo} />
                  <ValidationInput type="date" name="birthday" error={error.birthday} placeholder="Birthday" onChange={handleUserInfo} />
                  <Select name="gender" onChange={handleUserInfo} >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Select>
                  <ValidationInput type="text" name="insurance" error={error.insurance} placeholder="Insurance" onChange={handleUserInfo} />
                  <ValidationInput type="text" name="street" error={error.street} placeholder="Street" onChange={handleUserInfo} />
                  <ValidationInput type="text" name="city" error={error.city} placeholder="City" onChange={handleUserInfo} />
                  <ValidationInput type="password" name="password" error={error.password} placeholder="Password" onChange={handleUserInfo} />
                  <ValidationInput type="password" name="password_confirm" error={error.password_confirm} placeholder="Password Confirm" onChange={handleUserInfo} />
                  <ValidationInput type="text" name="state" error={error.state} placeholder="State" onChange={handleUserInfo} />
                  <ValidationInput type="text" name="zip" error={error.zip} placeholder="Zip Code" onChange={handleUserInfo} />
                  <SubmitButton type="submit" onClick={handleSubmit}>
                    <SubmitButtonIcon className="icon" />
                    <span className="text">{submitButtonText}</span>
                  </SubmitButton>
                  <p tw="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by ISLA's{" "}
                    <a href={tosUrl} tw="border-b border-gray-500 border-dotted">
                      Terms of Service
                    </a>{" "}
                    and its{" "}
                    <a href={privacyPolicyUrl} tw="border-b border-gray-500 border-dotted">
                      Privacy Policy
                    </a>
                  </p>

                  <p tw="mt-8 text-sm text-gray-600 text-center">
                    Already have an account?{" "}
                    <a href={signInUrl} tw="border-b border-gray-500 border-dotted">
                      Sign In
                    </a>
                  </p>
                </Form>
              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustrationImageSrc} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage >
  );
}
