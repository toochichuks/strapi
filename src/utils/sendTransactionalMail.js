const axios = require("axios");

const sendZeptoMail = async ({ to, templateKey, data }) => {
  try {
    const response = await axios.post(
      `${process.env.ZEPTOMAIL_API_ENDPOINT}`,
      {
        template_key: templateKey,
        from: {
          address: process.env.ZEPTOMAIL_SENDER_ADDRESS,
        },
        to: [{ email_address: { address: to } }],
        merge_info: data,
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: `${process.env.ZEPTOMAIL_JOB_APPLICATIONS_MAIL_AGENT_TOKEN}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("ZeptoMail error:", error.response?.data || error.message);
    throw error;
  }
};

module.exports = sendZeptoMail;
