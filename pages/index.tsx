import React from "react";
import { getProps, PageProps } from "@/lib/api";
import { GetStaticProps } from "next";
import Error from "next/error";
import { withRouter } from "next/router";
import TestimonialsSliderStandard from "@/components/templates/blocks/testimonials-slider-standard";
import JoinCTAStandard from "@/components/templates/blocks/join-ctastandard";
import MeetingsCTAStandard from "@/components/templates/blocks/meetings-ctastandard";
import MainCTAStandard from "@/components/templates/blocks/main-ctastandard";
import SliderStandard from "@/components/templates/blocks/slider-standard";
import Layout from "@/components/layout";

const Page = (props: PageProps) => {
  if (props.error) {
    return <Error statusCode={props.error.code} />
  }
  return (
    <><Layout headerContent={props.headerContent}  footerContent={props.footerContent} >
			 <SliderStandard content={props.homeLandingContent} />
			 <MainCTAStandard content={props.mainCTAContent} />
			 <MeetingsCTAStandard content={props.meetingsCTAContent} />
			 <JoinCTAStandard content={props.joinCTAContent} />
			 <TestimonialsSliderStandard content={props.homeTestimonialsContent} />
			</Layout>
		</>
  );
};

export default withRouter(Page);

export const getStaticProps: GetStaticProps = async () => {
  const props = await getProps({pageName: 'home'});
  return {
    props: props,
    revalidate: 30
  };
}