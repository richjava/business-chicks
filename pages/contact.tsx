import React from "react";
import { getProps, PageProps } from "@/lib/api";
import { GetStaticProps } from "next";
import Error from "next/error";
import { withRouter } from "next/router";
import ContactFormStandard from "@/components/templates/blocks/contact-form-standard";
import BannerStandard from "@/components/templates/blocks/banner-standard";
import Layout from "@/components/layout";

const Page = (props: PageProps) => {
  if (props.error) {
    return <Error statusCode={props.error.code} />
  }
  return (
    <><Layout headerContent={props.headerContent}  footerContent={props.footerContent} >
			 <BannerStandard content={props.contactBannerContent} />
			 <ContactFormStandard content={props.contactContent} />
			</Layout>
		</>
  );
};

export default withRouter(Page);

export const getStaticProps: GetStaticProps = async () => {
  const props = await getProps({pageName: 'contact'});
  return {
    props: props,
    revalidate: 30
  };
}