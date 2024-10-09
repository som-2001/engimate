import { createTransport } from "nodemailer";

export const sendMail = async (email, subject, data) => {
  const transport = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 30px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            overflow: hidden;
        }
        .header {
            background-color: #007bff;
            color: white;
            text-align: center;
            padding: 20px;
        }
        .header h1 {
            font-size: 28px;
            margin: 0;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        h2 {
            color: #007bff;
            font-size: 22px;
            margin-bottom: 20px;
        }
        p {
            font-size: 16px;
            color: #555555;
            margin-bottom: 20px;
            line-height: 1.6;
        }
        .otp-code {
            display: inline-block;
            background-color: #f8f9fa;
            color: #000;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 4px;
            padding: 10px 20px;
            border-radius: 8px;
            margin: 20px 0;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .btn {
            display: inline-block;
            padding: 12px 25px;
            background-color: #28a745;
            color: white;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
            border-radius: 5px;
            margin-top: 20px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s ease;
        }
        .btn:hover {
            background-color: #218838;
        }
        .footer {
            margin-top: 40px;
            font-size: 14px;
            color: #888888;
            text-align: center;
            border-top: 1px solid #e9ecef;
            padding-top: 20px;
        }
        .footer a {
            color: #007bff;
            text-decoration: none;
        }
        .footer p {
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header Section -->
        <div class="header">
            <h1>YANTRAVED</h1>
        </div>

        <!-- Content Section -->
        <div class="content">
            <h2>Verification Code</h2>
            <p>Hello, ${data.username}</p>
            <p>We received a request to access your account. Please use the OTP below to complete your login:</p>

            <!-- OTP Code Display -->
            <div class="otp-code">${data.otp}</div>

            <p>This OTP is valid for the next 10 minutes. If you did not request this, please ignore this email.</p>

            <!-- Call-to-action Button (Optional) -->
            <a href="#" class="btn">Verify Now</a>
        </div>

        <!-- Footer Section -->
        <div class="footer">
            <p>If you have any issues, please contact our support team at <a href="mailto:support@YANTRAVED.com">support@YANTRAVED.com</a>.</p>
            <p>Thank you,<br>YANTRAVED Team</p>
        </div>
    </div>
</body>
</html>
`;
  await transport.sendMail({
    from: process.env.SMTP_MAIL,
    to: email,
    subject: subject,
    html,
  });
};

export const sendContactUsMail = async (contactdata) => {
  const transport = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const { name, phone_number, email, message, subject } = contactdata;

  const emailSubject = `Contact Us Inquiry from ${name} -- ${subject}`;
  const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 20px auto; /* Added margin for spacing */
            background-color: #ffffff;
            padding: 30px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid #e0e0e0; /* Subtle border for definition */
        }
        .header {
            background-color: #007bff; /* Primary brand color */
            color: white;
            text-align: center;
            padding: 20px;
            border-top-left-radius: 10px; /* Rounded corners */
            border-top-right-radius: 10px; /* Rounded corners */
        }
        .header h1 {
            font-size: 28px;
            margin: 0;
        }
        .content {
            padding: 20px;
            text-align: left;
        }
        p {
            font-size: 16px;
            color: #555555;
            margin-bottom: 20px;
            line-height: 1.6;
        }
        .footer {
            margin-top: 40px;
            font-size: 14px;
            color: #888888;
            text-align: center;
            border-top: 1px solid #e9ecef;
            padding-top: 20px;
        }
        .footer a {
            color: #007bff;
            text-decoration: none;
            font-weight: bold; /* Bold links for emphasis */
        }
        .footer p {
            margin: 0;
        }
        /* Additional styles */
        strong {
            color: #333; /* Strong text color */
        }
        @media (max-width: 600px) {
            .container {
                padding: 15px; /* Reduced padding on smaller screens */
            }
            .header h1 {
                font-size: 24px; /* Smaller header font size */
            }
            p {
                font-size: 14px; /* Smaller paragraph font size */
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header Section -->
        <div class="header">
            <h1>Contact Us Inquiry</h1>
        </div>

        <!-- Content Section -->
        <div class="content">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phone_number}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        </div>

        <!-- Footer Section -->
        <div class="footer">
            <p>If you have any questions, please contact us at <a href="mailto:support@YANTRAVED.com">support@YANTRAVED.com</a>.</p>
            <p>Thank you,<br>YANTRAVED Team</p>
        </div>
    </div>
</body>
</html>

`;
  await transport.sendMail({
    from: process.env.SMTP_MAIL,
    to: process.env.SMTP_MAIL,
    subject: emailSubject,
    html,
  });
};
