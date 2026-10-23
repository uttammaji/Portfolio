const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const { Resend } = require('resend');
const Message = require('../models/Message');

const resend = new Resend(process.env.RESEND_API_KEY);

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many messages. Please try again in 15 minutes.',
  },
});

const validateContact = [
  body('name').trim().notEmpty().withMessage('Name is required.').isLength({ max: 100 }),
  body('email').trim().notEmpty().withMessage('Email is required.').isEmail().withMessage('Invalid email.').normalizeEmail(),
  body('subject').trim().notEmpty().withMessage('Subject is required.').isLength({ max: 200 }),
  body('message').trim().notEmpty().withMessage('Message is required.').isLength({ min: 10 }).isLength({ max: 5000 }),
];

router.post('/', contactLimiter, validateContact, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed.',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }

  const { name, email, subject, message } = req.body;
  
  // Safe IP extraction without optional chaining
  const forwarded = req.headers['x-forwarded-for'];
  const ip = (forwarded ? forwarded.split(',')[0].trim() : null) || 
             (req.socket && req.socket.remoteAddress ? req.socket.remoteAddress : null);

  try {
    const saved = await Message.create({ name, email, subject, message, ip });

    try {
      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: process.env.EMAIL_TO,
        replyTo: email,
        subject: '[Portfolio] ' + subject,
        html: `
          <div style="font-family: monospace; background: #0f0f0f; color: #f5f5f5; padding: 24px; border-radius: 6px;">
            <h2 style="color: #7cff9b; margin: 0 0 16px;">New Contact Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #7cff9b;">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="border: 1px solid #252525; margin: 16px 0;">
            <p style="white-space: pre-wrap; color: #d0d0d0;">${message}</p>
          </div>
        `,
      });
    } catch (mailErr) {
      console.error('[contact] Resend email failed:', mailErr);
    }

    return res.status(201).json({
      success: true,
      message: 'Message received! I will get back to you within 24 hours.',
    });
  } catch (err) {
    console.error('[contact] Database error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
});

module.exports = router;
