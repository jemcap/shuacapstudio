export default {
  name: "film",
  title: "Film",
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
      name: "host",
      title: "Host",
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
