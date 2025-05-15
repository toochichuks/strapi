const sendZeptoMail = require("../../../../utils/sendTransactionalMail");

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    // If already sent, skip
    if (result.email_sent) return;

    console.log("After create triggered");
    // process.exit();

    try {
      await sendZeptoMail({
        to: result.email,
        templateKey: process.env.ZEPTOMAIL_JOB_APPLICATIONS_TEMPLATE_KEY,
        data: {
          full_name: result.full_name,
        },
      });

      // Mark email as sent to prevent future sends
      await strapi.entityService.update(
        "api::application.application",
        result.id,
        {
          data: {
            email_sent: true,
          },
        },
      );
    } catch (error) {
      strapi.log.error("ZeptoMail failed:", error);
    }
  },
};
