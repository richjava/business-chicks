import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";

export default defineType({
  name: "homeTestimonialsSection",
  title: "Home Testimonials",
  type: "document",
  liveEdit: true,
  icon: BookIcon,
  fields: [
    defineField({
      name: "sectionTitle",
      title: "SectionTitle",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "page",
      title: "Page",
      type: "reference",
      to: [{ type: "home" }],
      hidden: true,
    }),
  ],

  preview: {
    select: {
      title: "sectionTitle",
    },
    prepare({ title }) {
      return {
        title: title,
      };
    },
  },
});
