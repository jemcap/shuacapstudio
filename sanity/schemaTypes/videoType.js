export default {
  name: "video",
  title: "Video",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
    {
      name: "year",
      title: "Year of Production",
      type: "string",
    },
    {
      name: "host",
      title: "Host",
      type: "string",
    },
    {
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      description: "Lightweight work thumbnail or still image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "s3Key",
      title: "S3 Key",
      type: "string",
      description: "The filename or key of the video file in your S3 bucket",
    },
    {
      name: "link",
      title: "External Link",
      type: "url",
      description: "Optional external video page when this item is not hosted on S3/CloudFront",
    },
  ],
};
