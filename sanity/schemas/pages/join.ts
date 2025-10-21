import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";

export default defineType({
  name: "join",
  title: "join",
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
          name: "joinBannerSection",
          title: "Join Banner Section Section",
          to: [{ type: "joinBannerSection" }],
        },
        {
          type: "reference",
          name: "membershipSection",
          title: "Membership Section Section",
          to: [{ type: "membershipSection" }],
        },
        {
          type: "reference",
          name: "requirementsSection",
          title: "Requirements Section Section",
          to: [{ type: "requirementsSection" }],
        },
        {
          type: "reference",
          name: "joinTestimonialsSection",
          title: "Join Testimonials Section Section",
          to: [{ type: "joinTestimonialsSection" }],
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
