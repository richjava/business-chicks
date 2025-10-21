import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";

export default defineType({
  name: "meetingsInfoSection",
  title: "Meetings Info",
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
      name: "text",
      title: "Text",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "locationLat",
      title: "LocationLat",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "locationLng",
      title: "LocationLng",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      to: [{ type: "ourMeetings" }],
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
