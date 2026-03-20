const sendEmail = async (to, subject, code) => {
  try {

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Startives <no-reply@startives.com>",
        to: [to],
        subject: subject,
        html: `
        <div style="font-family:Arial;background:#f8fafc;padding:40px">

          <div style="max-width:500px;margin:auto;background:white;border-radius:14px;padding:40px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.08)">

            <h1 style="color:#4f46e5;margin-bottom:10px;">
              🚀 Startives
            </h1>

            <p style="color:#64748b;font-size:14px;margin-bottom:25px;">
              Welcome to the startup collaboration network
            </p>

            <h2 style="font-size:20px;margin-bottom:10px;">
              Verify your email
            </h2>

            <p style="color:#6b7280;font-size:14px;">
              Use the verification code below to continue
            </p>

            <div style="
              margin:30px 0;
              font-size:34px;
              letter-spacing:8px;
              font-weight:bold;
              color:#111827;
              background:#f1f5f9;
              padding:15px;
              border-radius:10px;
            ">
              ${code}
            </div>

            <p style="font-size:13px;color:#9ca3af;">
              This code will expire in 10 minutes.
            </p>

            <hr style="margin:30px 0;border:none;border-top:1px solid #eee">

            <p style="font-size:12px;color:#9ca3af;">
              If you didn't request this email, you can safely ignore it.
            </p>

          </div>

        </div>
        `
      })
    });

    if (!response.ok) {
      console.log("Email failed");
      return false;
    }

    console.log("Email sent successfully");
    return true;

  } catch (error) {
    console.log("Email error:", error);
    return false;
  }
};

module.exports = sendEmail;