
import { defineConfig, isDev  } from 'sanity';
import {structureTool} from 'sanity/structure';
import { visionTool } from "@sanity/vision";
import { myStructure } from './deskStructure';
import global from '@/sanity/schemas/global/global'
import header from '@/sanity/schemas/layout/header'
import footer from '@/sanity/schemas/layout/footer'
import home from '@/sanity/schemas/pages/home'
import join from '@/sanity/schemas/pages/join'
import ourMeetings from '@/sanity/schemas/pages/our-meetings'
import resources from '@/sanity/schemas/pages/resources'
import contact from '@/sanity/schemas/pages/contact'
import homeLandingSection from '@/sanity/schemas/sections/home-landing'
import mainCtaSection from '@/sanity/schemas/sections/main-cta'
import meetingsCtaSection from '@/sanity/schemas/sections/meetings-cta'
import joinCtaSection from '@/sanity/schemas/sections/join-cta'
import homeTestimonialsSection from '@/sanity/schemas/sections/home-testimonials'
import joinBannerSection from '@/sanity/schemas/sections/join-banner'
import membershipSection from '@/sanity/schemas/sections/membership'
import requirementsSection from '@/sanity/schemas/sections/requirements'
import joinTestimonialsSection from '@/sanity/schemas/sections/join-testimonials'
import meetingsBannerSection from '@/sanity/schemas/sections/meetings-banner'
import meetingsInfoSection from '@/sanity/schemas/sections/meetings-info'
import meetingsTestimonialsSection from '@/sanity/schemas/sections/meetings-testimonials'
import resourcesBannerSection from '@/sanity/schemas/sections/resources-banner'
import resourcesSection from '@/sanity/schemas/sections/resources'
import resourcesTestimonialsSection from '@/sanity/schemas/sections/resources-testimonials'
import contactBannerSection from '@/sanity/schemas/sections/contact-banner'
import contactSection from '@/sanity/schemas/sections/contact'
import navigationItem from '@/sanity/schemas/collections/navigation-item'
import keywordSlide from '@/sanity/schemas/collections/keyword-slide'
import testimonial from '@/sanity/schemas/collections/testimonial'
import resource from '@/sanity/schemas/collections/resource'
  
const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Business Chicks';
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'default',
  basePath: '/admin',
  title,
  projectId,
  dataset,
  schema: {
    types: [global, header, footer, home, join, ourMeetings, resources, contact, homeLandingSection, mainCtaSection, meetingsCtaSection, joinCtaSection, homeTestimonialsSection, joinBannerSection, membershipSection, requirementsSection, joinTestimonialsSection, meetingsBannerSection, meetingsInfoSection, meetingsTestimonialsSection, resourcesBannerSection, resourcesSection, resourcesTestimonialsSection, contactBannerSection, contactSection, navigationItem, keywordSlide, testimonial, resource],
  },
  plugins: [
    structureTool({
      structure: myStructure,
    }),
    ...(isDev ? [visionTool()] : []),
    ],
  });
  