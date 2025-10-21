import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";

export default defineType({
  name: "resources",
  title: "resources",
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
          name: "resourcesBannerSection",
          title: "Resources Banner Section Section",
          to: [{ type: "resourcesBannerSection" }],
        },
        {
          type: "reference",
          name: "resourcesSection",
          title: "Resources Section Section",
          to: [{ type: "resourcesSection" }],
        },
        {
          type: "reference",
          name: "resourcesTestimonialsSection",
          title: "Resources Testimonials Section Section",
          to: [{ type: "resourcesTestimonialsSection" }],
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
