import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";

export default defineType({
  name: "home",
  title: "home",
  type: "document",
  liveEdit: true,
  icon: BookIcon,
  fields: [
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        {
          type: "reference",
          name: "homeLandingSection",
          title: "Home Landing Section Section",
          to: [{ type: "homeLandingSection" }],
        },
        {
          type: "reference",
          name: "mainCTASection",
          title: "Main C T A Section Section",
          to: [{ type: "mainCTASection" }],
        },
        {
          type: "reference",
          name: "meetingsCTASection",
          title: "Meetings C T A Section Section",
          to: [{ type: "meetingsCTASection" }],
        },
        {
          type: "reference",
          name: "joinCTASection",
          title: "Join C T A Section Section",
          to: [{ type: "joinCTASection" }],
        },
        {
          type: "reference",
          name: "homeTestimonialsSection",
          title: "Home Testimonials Section Section",
          to: [{ type: "homeTestimonialsSection" }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      sections: "sections",
    },
    prepare({ sections }) {
      const numSections = Array.isArray(sections) ? sections.length : 0;
      const title = `Sections (${numSections})`;
      return {
        title,
      };
    },
  },
});
