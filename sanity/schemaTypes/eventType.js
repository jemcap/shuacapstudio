export default {
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
    {
      name: "tag",
      title: "Tag",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "s3Key",
      title: "S3 Key",
      type: "string",
      description: "The filename or key of the video in your S3 bucket",
    },
    {
      name: "packages",
      title: "Packages",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "description", title: "Description", type: "text" },
            { name: "price", title: "Price", type: "number" },
            {
              name: "priceDiscount",
              title: "Price Discount",
              type: "number",
            },
            {
              name: "earlyBirdPrice",
              title: "Early Bird Price",
              type: "number",
            },
            {
              name: "earlyBirdStart",
              title: "Early Bird Start",
              type: "datetime",
            },
            { name: "earlyBirdEnd", title: "Early Bird End", type: "datetime" },
          ],
        },
      ],
    },
  ],
};
