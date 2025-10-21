import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";

export default defineType({
  name: "footerSection",
  title: "Footer",
  type: "document",
  liveEdit: true,
  icon: BookIcon,
  fields: [
    {
      name: "placeholder",
      title: "Placeholder",
      type: "string",
      hidden: true,
    },
  ],
});
