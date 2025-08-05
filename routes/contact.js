const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

// Create transporter for sending emails
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// @route   POST /api/contact
// @desc    Send contact form email
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message, phone, company } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: 'Please provide name, email, and message' 
      });
    }

    // Email validation
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Please provide a valid email address' 
      });
    }

    const transporter = createTransporter();

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to your email
      subject: `New Contact Form Submission: ${subject || 'General Inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5530; border-bottom: 2px solid #4a9960; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c5530; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
            <h3 style="color: #2c5530; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #333;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e8f5e8; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              This message was sent from the Energy Anvi website contact form.
              Please respond directly to: ${email}
            </p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to user
    const confirmationOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Energy Anvi',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5530; border-bottom: 2px solid #4a9960; padding-bottom: 10px;">
            Thank You for Your Interest
          </h2>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for reaching out to Energy Anvi. We have received your message and will get back to you within 24-48 hours.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c5530; margin-top: 0;">Your Message Summary</h3>
            <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
            <p><strong>Message:</strong></p>
            <p style="font-style: italic; color: #666;">${message}</p>
          </div>
          
          <p>In the meantime, feel free to explore our website to learn more about our energy solutions and projects.</p>
          
          <p>Best regards,<br>
          The Energy Anvi Team</p>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #e8f5e8; border-radius: 8px; text-align: center;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              Energy Anvi - Powering a Sustainable Future
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(confirmationOptions);

    res.json({
      success: true,
      message: 'Message sent successfully! We will get back to you soon.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

// @route   POST /api/contact/newsletter
// @desc    Subscribe to newsletter
// @access  Public
router.post('/newsletter', async (req, res) => {
  try {
    const { email, name } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({ 
        message: 'Please provide an email address' 
      });
    }

    // Email validation
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Please provide a valid email address' 
      });
    }

    const transporter = createTransporter();

    // Send notification to admin
    const adminOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Newsletter Subscription',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5530;">New Newsletter Subscription</h2>
          <p><strong>Email:</strong> ${email}</p>
          ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `,
    };

    await transporter.sendMail(adminOptions);

    // Send welcome email to subscriber
    const welcomeOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Energy Anvi Newsletter',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5530; border-bottom: 2px solid #4a9960; padding-bottom: 10px;">
            Welcome to Energy Anvi Newsletter!
          </h2>
          
          <p>Dear ${name || 'Subscriber'},</p>
          
          <p>Thank you for subscribing to our newsletter! You'll now receive the latest updates about:</p>
          
          <ul style="line-height: 1.8; color: #333;">
            <li>🌱 Renewable energy trends and innovations</li>
            <li>🔋 Energy efficiency tips and solutions</li>
            <li>📊 Industry insights and market analysis</li>
            <li>🚀 Our latest projects and case studies</li>
            <li>📅 Upcoming events and webinars</li>
          </ul>
          
          <p>We're committed to providing you with valuable content that helps you stay informed about the evolving energy landscape.</p>
          
          <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <h3 style="color: #2c5530; margin-top: 0;">Stay Connected</h3>
            <p>Follow us on social media for daily updates and insights!</p>
          </div>
          
          <p>Best regards,<br>
          The Energy Anvi Team</p>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #666;">
              You can unsubscribe at any time by replying to this email with "UNSUBSCRIBE"
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(welcomeOptions);

    res.json({
      success: true,
      message: 'Successfully subscribed to newsletter!'
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ 
      message: 'Failed to subscribe. Please try again later.' 
    });
  }
});

// @route   POST /api/contact/quote
// @desc    Request project quote
// @access  Public
router.post('/quote', async (req, res) => {
  try {
    const { 
      name, 
      email, 
      company, 
      phone, 
      projectType, 
      budget, 
      timeline, 
      description,
      location 
    } = req.body;

    // Validation
    if (!name || !email || !projectType || !description) {
      return res.status(400).json({ 
        message: 'Please provide name, email, project type, and description' 
      });
    }

    const transporter = createTransporter();

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Project Quote Request - ${projectType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5530; border-bottom: 2px solid #4a9960; padding-bottom: 10px;">
            New Project Quote Request
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c5530; margin-top: 0;">Client Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            ${location ? `<p><strong>Location:</strong> ${location}</p>` : ''}
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c5530; margin-top: 0;">Project Details</h3>
            <p><strong>Project Type:</strong> ${projectType}</p>
            ${budget ? `<p><strong>Budget Range:</strong> ${budget}</p>` : ''}
            ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}
            <p><strong>Description:</strong></p>
            <p style="line-height: 1.6; color: #333; background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
              ${description.replace(/\n/g, '<br>')}
            </p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #856404;">
              <strong>Action Required:</strong> Please respond to this quote request within 24 hours.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Send confirmation to client
    const confirmationOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Quote Request Received - Energy Anvi',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5530; border-bottom: 2px solid #4a9960; padding-bottom: 10px;">
            Quote Request Received
          </h2>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for your interest in our services. We have received your project quote request and our team is reviewing the details.</p>
          
          <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c5530; margin-top: 0;">What Happens Next?</h3>
            <ul style="line-height: 1.8; color: #333;">
              <li>Our project team will review your requirements</li>
              <li>We'll prepare a detailed proposal and cost estimate</li>
              <li>A project consultant will contact you within 24-48 hours</li>
              <li>We'll schedule a consultation to discuss your project in detail</li>
            </ul>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h3 style="color: #2c5530; margin-top: 0;">Your Request Summary</h3>
            <p><strong>Project Type:</strong> ${projectType}</p>
            ${budget ? `<p><strong>Budget Range:</strong> ${budget}</p>` : ''}
            ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}
          </div>
          
          <p>If you have any urgent questions, please don't hesitate to contact us directly.</p>
          
          <p>Best regards,<br>
          The Energy Anvi Team</p>
        </div>
      `,
    };

    await transporter.sendMail(confirmationOptions);

    res.json({
      success: true,
      message: 'Quote request submitted successfully! We will contact you soon.'
    });

  } catch (error) {
    console.error('Quote request error:', error);
    res.status(500).json({ 
      message: 'Failed to submit quote request. Please try again later.' 
    });
  }
});

module.exports = router;