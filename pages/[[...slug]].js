import Head from "next/head";
import Layout from "../components/Layout";

import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";

export default function Page({ story }) {
  story = useStoryblokState(story);

  return (
    <div>
      <Head>
        <title>{story ? story.name : "My Site"}</title>
      </Head>

      <Layout>
        <StoryblokComponent blok={story.content} />
      </Layout>
    </div>
  );
}

export async function getStaticProps({ params }) {
  let slug = params.slug ? params.slug.join("/") : "home";

  let sbParams = {
    version: "draft",
  };

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  let sbParams = {
    version: "draft",
  };

  let { data } = await getStoryblokApi().get("cdn/links/", sbParams);

  let paths = [];
  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder) {
      return;
    }

    const slug = data.links[linkKey].slug;
    let splittedSlug = slug.split("/");

    if (slug === "home") {
      splittedSlug = false;
    }

    paths.push({ params: { slug: splittedSlug } });
  });

  return {
    paths: paths,
    fallback: false,
  };
}
