import React from "react";
import { getProps, PageProps } from "@/lib/api";
import { GetStaticProps } from "next";
import Error from "next/error";
import { withRouter } from "next/router";
import TestimonialsSliderStandard from "@/components/templates/blocks/testimonials-slider-standard";
import RequirementsStandard from "@/components/templates/blocks/requirements-standard";
import MembershipStandard from "@/components/templates/blocks/membership-standard";
import BannerStandard from "@/components/templates/blocks/banner-standard";
import Layout from "@/components/layout";

const Page = (props: PageProps) => {
  if (props.error) {
    return <Error statusCode={props.error.code} />
  }
  return (
    <><Layout headerContent={props.headerContent}  footerContent={props.footerContent} >
			 <BannerStandard content={props.joinBannerContent} />
			 <MembershipStandard content={props.membershipContent} />
			 <RequirementsStandard content={props.requirementsContent} />
			 <TestimonialsSliderStandard content={props.joinTestimonialsContent} />
			</Layout>
		</>
  );
};

export default withRouter(Page);

export const getStaticProps: GetStaticProps = async () => {
  const props = await getProps({pageName: 'join'});
  return {
    props: props,
    revalidate: 30
  };
}