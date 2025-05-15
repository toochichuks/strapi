// module.exports = ({ env }) => ({
//   "users-permissions": {
//     config: {
//       jwtSecret: env("JWT_SECRET"),
//     },
//   },
//   upload: {
//     config: {
//       provider: "local",
//       providerOptions: {}
//     },
//   },
// });

module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET"),
    },
  },
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        // baseUrl: env("CDN_URL"),
        // rootPath: env("CDN_ROOT_PATH"),
        s3Options: {
          credentials: {
            accessKeyId: env("AWS_ACCESS_KEY_ID"),
            secretAccessKey: env("AWS_ACCESS_SECRET"),
          },
          region: env("AWS_REGION"),
          params: {
            Bucket: env("AWS_BUCKET"),
            ACL: "private",
            signedUrlExpires: 900,
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
