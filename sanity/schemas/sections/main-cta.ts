import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";

export default defineType({
  name: "mainCTASection",
  title: "Main CTA",
  type: "document",
  liveEdit: true,
  icon: BookIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "blurb",
      title: "Blurb",
      type: "text",
    }),
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
