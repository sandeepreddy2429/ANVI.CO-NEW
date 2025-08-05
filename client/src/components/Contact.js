import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 123-4568'],
    },
    {
      icon: <FaEnvelope />,
      title: 'Email',
      details: ['info@energypro.com', 'support@energypro.com'],
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Address',
      details: ['123 Energy Street', 'Green City, GC 12345'],
    },
    {
      icon: <FaClock />,
      title: 'Business Hours',
      details: ['Mon - Fri: 8:00 AM - 6:00 PM', 'Sat: 9:00 AM - 4:00 PM'],
    },
  ];

  return (
    <div className="contact">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <h1>Contact Us</h1>
            <p className="hero-subtitle">
              Ready to start your renewable energy journey? Get in touch with our 
              experts for a free consultation and personalized quote.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2>Send Us a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="service">Service Interest</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a service</option>
                    <option value="solar">Solar Energy Solutions</option>
                    <option value="wind">Wind Power Systems</option>
                    <option value="storage">Energy Storage</option>
                    <option value="consulting">Green Energy Consulting</option>
                    <option value="audit">Energy Efficiency Audit</option>
                    <option value="maintenance">System Maintenance</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    placeholder="Tell us about your project or questions..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <FaPaperPlane />
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="form-message success">
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="form-message error">
                    Sorry, there was an error sending your message. Please try again.
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              <h2>Get in Touch</h2>
              <p className="contact-intro">
                Have questions about our services or need immediate assistance? 
                We're here to help! Reach out to us through any of the following channels.
              </p>

              <div className="contact-info-grid">
                {contactInfo.map((info, index) => (
                  <div key={index} className="contact-info-item">
                    <div className="contact-icon">
                      {info.icon}
                    </div>
                    <div className="contact-details">
                      <h3>{info.title}</h3>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex}>{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact-cta">
                <h3>Emergency Support</h3>
                <p>
                  For urgent system issues or emergencies, call our 24/7 support line:
                </p>
                <a href="tel:+15551234567" className="emergency-phone">
                  +1 (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <h2>Visit Our Office</h2>
          <div className="map-placeholder">
            <div className="map-content">
              <FaMapMarkerAlt className="map-icon" />
              <h3>EnergyPro Headquarters</h3>
              <p>123 Energy Street, Green City, GC 12345</p>
              <p>Interactive map would be integrated here</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contact-faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How long does installation take?</h3>
              <p>Most residential installations are completed within 1-3 days, depending on system size and complexity.</p>
            </div>
            <div className="faq-item">
              <h3>Do you offer financing options?</h3>
              <p>Yes, we offer various financing options including solar loans, leases, and power purchase agreements.</p>
            </div>
            <div className="faq-item">
              <h3>What warranties do you provide?</h3>
              <p>We provide comprehensive warranties: 25 years on solar panels, 10 years on inverters, and 5 years on installation.</p>
            </div>
            <div className="faq-item">
              <h3>How much can I save on energy bills?</h3>
              <p>Savings vary by location and usage, but most customers see 70-90% reduction in their electricity bills.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;