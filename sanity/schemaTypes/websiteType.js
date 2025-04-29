export default {
  name: "website",
  title: "Website",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "client",
      title: "Client",
      type: "string",
    },
    {
      name: "link",
      title: "Link / URL",
      type: "string",
    },
    {
      name: "s3Key",
      title: "S3 Key",
      type: "string",
      description: "The filename or key of the video in your S3 bucket",
    },
  ],
};
