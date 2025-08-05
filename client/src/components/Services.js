import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSolarPanel, 
  FaWind, 
  FaLeaf, 
  FaChartLine, 
  FaBolt, 
  FaCog, 
  FaShieldAlt, 
  FaTools,
  FaCheckCircle 
} from 'react-icons/fa';
import './Services.css';

function Services() {
  const services = [
    {
      icon: <FaSolarPanel />,
      title: 'Solar Energy Solutions',
      description: 'Complete solar panel installation and maintenance services for residential and commercial properties.',
      features: [
        'Custom system design',
        'Professional installation',
        'Performance monitoring',
        '25-year warranty',
      ],
      price: 'Starting from $15,000',
    },
    {
      icon: <FaWind />,
      title: 'Wind Power Systems',
      description: 'Efficient wind turbine solutions designed to maximize energy generation in various environments.',
      features: [
        'Site assessment',
        'Turbine installation',
        'Grid connection',
        'Maintenance support',
      ],
      price: 'Starting from $25,000',
    },
    {
      icon: <FaBolt />,
      title: 'Energy Storage',
      description: 'Advanced battery storage systems to store excess energy and provide backup power when needed.',
      features: [
        'Battery system design',
        'Smart inverters',
        'Mobile monitoring',
        '10-year warranty',
      ],
      price: 'Starting from $8,000',
    },
    {
      icon: <FaLeaf />,
      title: 'Green Energy Consulting',
      description: 'Expert consultation services to help you develop comprehensive sustainable energy strategies.',
      features: [
        'Energy audit',
        'ROI analysis',
        'Regulatory guidance',
        'Implementation planning',
      ],
      price: 'Starting from $500',
    },
    {
      icon: <FaChartLine />,
      title: 'Energy Efficiency Audits',
      description: 'Comprehensive analysis of your energy consumption with detailed recommendations for optimization.',
      features: [
        'Thermal imaging',
        'Usage analysis',
        'Efficiency recommendations',
        'Cost-benefit analysis',
      ],
      price: 'Starting from $300',
    },
    {
      icon: <FaCog />,
      title: 'System Maintenance',
      description: 'Professional maintenance services to ensure optimal performance of your renewable energy systems.',
      features: [
        'Regular inspections',
        'Performance optimization',
        'Preventive maintenance',
        '24/7 support',
      ],
      price: 'Starting from $200/visit',
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Consultation',
      description: 'We assess your energy needs and site conditions to recommend the best solution.',
    },
    {
      step: '02',
      title: 'Design',
      description: 'Our engineers create a custom system design optimized for your specific requirements.',
    },
    {
      step: '03',
      title: 'Installation',
      description: 'Professional installation by certified technicians with minimal disruption to your routine.',
    },
    {
      step: '04',
      title: 'Monitoring',
      description: 'Ongoing monitoring and support to ensure optimal system performance and efficiency.',
    },
  ];

  return (
    <div className="services">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <div className="services-hero-content">
            <h1>Our Services</h1>
            <p className="hero-subtitle">
              Comprehensive renewable energy solutions designed to meet your 
              specific needs and budget requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section">
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-header">
                  <div className="service-icon">
                    {service.icon}
                  </div>
                  <h3>{service.title}</h3>
                </div>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <FaCheckCircle className="check-icon" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="service-footer">
                  <div className="service-price">{service.price}</div>
                  <Link to="/contact" className="btn btn-outline">
                    Get Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process">
        <div className="container">
          <div className="section-header">
            <h2>Our Process</h2>
            <p>From consultation to installation, we guide you through every step</p>
          </div>
          <div className="process-steps">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="step-number">{step.step}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <div className="container">
          <div className="why-choose-content">
            <div className="why-choose-text">
              <h2>Why Choose EnergyPro?</h2>
              <div className="benefits">
                <div className="benefit">
                  <FaShieldAlt className="benefit-icon" />
                  <div>
                    <h4>Certified & Insured</h4>
                    <p>All our technicians are certified professionals with comprehensive insurance coverage.</p>
                  </div>
                </div>
                <div className="benefit">
                  <FaTools className="benefit-icon" />
                  <div>
                    <h4>Quality Equipment</h4>
                    <p>We use only top-tier equipment from trusted manufacturers with proven track records.</p>
                  </div>
                </div>
                <div className="benefit">
                  <FaCog className="benefit-icon" />
                  <div>
                    <h4>Ongoing Support</h4>
                    <p>Comprehensive maintenance and support services to keep your system running optimally.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="why-choose-image">
              <div className="image-placeholder">
                <FaLeaf className="placeholder-icon" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Energy Transformation?</h2>
            <p>Contact us today for a free consultation and custom quote</p>
            <Link to="/contact" className="btn btn-primary btn-large">
              Get Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;