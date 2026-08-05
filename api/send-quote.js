const { Resend } = require("resend");

module.exports = async (req, res) => {
    if (req.method !== "POST") {
          res.status(405).json({ error: "Method not allowed" });
          return;
    }

    if (!process.env.RESEND_API_KEY) {
          res.status(500).json({ error: "Email service not configured" });
          return;
    }

    try {
          const { name, phone, email, address, services, details } = req.body || {};

      if (!name || !phone || !address) {
              res.status(400).json({ error: "Missing required fields" });
              return;
      }

      const resend = new Resend(process.env.RESEND_API_KEY);

      const bodyLines = [
              "Name: " + name,
              "Phone: " + phone,
              "Email: " + (email || "Not provided"),
              "Property Address: " + address,
              "Services Requested: " + (services || "Not specified"),
              "",
              "Details:",
              details || "None provided"
            ];

      const result = await resend.emails.send({
              from: "L.I. Lawn Service Quotes <quotes@lilawnservice.com>",
              to: "estimate.setup@lilawnservice.com",
              replyTo: email || undefined,
              subject: "Quote Request: " + name,
              text: bodyLines.join("\n")
      });

      if (result.error) {
              console.error("Resend error:", result.error);
              res.status(502).json({ error: "Failed to send email" });
              return;
      }

      res.status(200).json({ ok: true });
    } catch (err) {
          console.error("send-quote error:", err);
          res.status(500).json({ error: "Failed to send email" });
    }
};
