export default {
  name: "video",
  title: "Video",
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
      name: "s3Key",
      title: "S3 Key",
      type: "string",
      description: "The filename or key of the video in your S3 bucket",
    },
  ],
};
