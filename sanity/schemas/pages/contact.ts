import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";

export default defineType({
  name: "contact",
  title: "contact",
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
          name: "contactBannerSection",
          title: "Contact Banner Section Section",
          to: [{ type: "contactBannerSection" }],
        },
        {
          type: "reference",
          name: "contactSection",
          title: "Contact Section Section",
          to: [{ type: "contactSection" }],
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
