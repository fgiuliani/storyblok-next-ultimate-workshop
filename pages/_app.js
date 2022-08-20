import "../styles/globals.css";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import Feature from "../components/Feature";
import Grid from "../components/Grid";
import Page from "../components/Page";
import Teaser from "../components/Teaser";
import HeroSection from "../components/HeroSection";
import AllArticles from "../components/AllArticles";
import Article from "../components/Article";

const components = {
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  page: Page,
  hero_section: HeroSection,
  all_articles: AllArticles,
  article: Article,
};

storyblokInit({
  accessToken: "F9OJvLvW6rYQ7rET6rdpzAtt",
  use: [apiPlugin],
  components,
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
