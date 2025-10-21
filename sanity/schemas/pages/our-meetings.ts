import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";

export default defineType({
  name: "ourMeetings",
  title: "our-meetings",
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
          name: "meetingsBannerSection",
          title: "Meetings Banner Section Section",
          to: [{ type: "meetingsBannerSection" }],
        },
        {
          type: "reference",
          name: "meetingsInfoSection",
          title: "Meetings Info Section Section",
          to: [{ type: "meetingsInfoSection" }],
        },
        {
          type: "reference",
          name: "meetingsTestimonialsSection",
          title: "Meetings Testimonials Section Section",
          to: [{ type: "meetingsTestimonialsSection" }],
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
