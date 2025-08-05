import React from 'react';
import { Link } from 'react-router-dom';
import { FaSolarPanel, FaWind, FaLeaf, FaChartLine, FaUsers, FaAward, FaArrowRight } from 'react-icons/fa';
import './Home.css';

function Home() {
  const services = [
    {
      icon: <FaSolarPanel />,
      title: 'Solar Energy Solutions',
      description: 'Harness the power of the sun with our cutting-edge solar panel installations and maintenance services.',
    },
    {
      icon: <FaWind />,
      title: 'Wind Power Systems',
      description: 'Generate clean energy with our efficient wind turbine solutions for residential and commercial use.',
    },
    {
      icon: <FaLeaf />,
      title: 'Green Energy Consulting',
      description: 'Expert advice on sustainable energy strategies to reduce costs and environmental impact.',
    },
    {
      icon: <FaChartLine />,
      title: 'Energy Efficiency Audits',
      description: 'Comprehensive analysis of your energy usage with recommendations for optimization.',
    },
  ];

  const stats = [
    { number: '500+', label: 'Projects Completed' },
    { number: '50MW', label: 'Energy Generated' },
    { number: '200+', label: 'Happy Clients' },
    { number: '15+', label: 'Years Experience' },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Powering Tomorrow with 
              <span className="highlight"> Clean Energy</span>
            </h1>
            <p className="hero-description">
              Transform your energy future with our innovative renewable energy solutions. 
              We provide sustainable, cost-effective power systems that benefit both your 
              business and the environment.
            </p>
            <div className="hero-buttons">
              <Link to="/services" className="btn btn-primary">
                Our Services <FaArrowRight />
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-preview">
        <div className="container">
          <div className="section-header">
            <h2>Our Services</h2>
            <p>Comprehensive renewable energy solutions tailored to your needs</p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
          <div className="section-footer">
            <Link to="/services" className="btn btn-outline">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="about-preview">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Leading the Energy Revolution</h2>
              <p>
                With over 15 years of experience in renewable energy, EnergyPro has been 
                at the forefront of sustainable power solutions. We combine cutting-edge 
                technology with expert knowledge to deliver energy systems that reduce 
                costs and environmental impact.
              </p>
              <div className="about-features">
                <div className="feature">
                  <FaUsers className="feature-icon" />
                  <div>
                    <h4>Expert Team</h4>
                    <p>Certified professionals with decades of combined experience</p>
                  </div>
                </div>
                <div className="feature">
                  <FaAward className="feature-icon" />
                  <div>
                    <h4>Quality Assured</h4>
                    <p>Industry-leading warranties and maintenance support</p>
                  </div>
                </div>
              </div>
              <Link to="/about" className="btn btn-primary">
                Learn More About Us
              </Link>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <FaLeaf className="placeholder-icon" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Go Green?</h2>
            <p>Join hundreds of satisfied customers who have made the switch to renewable energy</p>
            <Link to="/contact" className="btn btn-primary btn-large">
              Get Your Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;