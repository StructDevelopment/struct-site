const { EmailClient } = require("@azure/communication-email");

module.exports = async function (context, req) {
  const connectionString = process.env['COMMUNICATION_SERVICES_CONNECTION_STRING'];
  const emailClient = new EmailClient(connectionString);

  if (req && req.rawBody && req.rawBody.length < 3000) {
    const { email, first, last, message, phone } = req.body;
    const emailMessage = {
      senderAddress: "DoNotReply@5f466b15-e008-4b0d-987d-525e9f6d4746.azurecomm.net",
      content: {
        subject: "Contact Request Received",
        plainText: `Contact request received. '${first} ${last}' sent the following message: '${message}'. They may be contacted at email address '${email}' or '${phone}'.`
      },
      recipients: {
        to: [{ address: "struct@structdevelopment.com" }],
      }
    };

    try {
      const poller = await emailClient.beginSend(emailMessage);
      await poller.pollUntilDone();

      console.log(`Contact email sent. JSON body sent: '${req.rawBody}'.`);
    } catch (err) {
      console.error(`Contact email failed. ${err}. JSON body dropped: '${req.rawBody}'.`);
    }

    context.res = {
      status: 201
    };

    return;
  }

  context.res = {
    status: 413
  };
}