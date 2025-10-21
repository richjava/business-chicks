import React from "react";
import { getProps, PageProps } from "@/lib/api";
import { GetStaticProps } from "next";
import Error from "next/error";
import { withRouter } from "next/router";
import TestimonialsSliderStandard from "@/components/templates/blocks/testimonials-slider-standard";
import InfoStandard from "@/components/templates/blocks/info-standard";
import BannerStandard from "@/components/templates/blocks/banner-standard";
import Layout from "@/components/layout";

const Page = (props: PageProps) => {
  if (props.error) {
    return <Error statusCode={props.error.code} />
  }
  return (
    <><Layout headerContent={props.headerContent}  footerContent={props.footerContent} >
			 <BannerStandard content={props.meetingsBannerContent} />
			 <InfoStandard content={props.meetingsInfoContent} />
			 <TestimonialsSliderStandard content={props.meetingsTestimonialsContent} />
			</Layout>
		</>
  );
};

export default withRouter(Page);

export const getStaticProps: GetStaticProps = async () => {
  const props = await getProps({pageName: 'ourMeetings'});
  return {
    props: props,
    revalidate: 10
  };
}