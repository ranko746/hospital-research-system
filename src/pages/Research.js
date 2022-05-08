import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import SearchDetail from "components/search/SearchDetail.js";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <SearchDetail />
      <Footer />
    </AnimationRevealPage>
  );
};