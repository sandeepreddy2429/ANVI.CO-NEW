import React from 'react';
import { FaLeaf, FaUsers, FaAward, FaGlobe, FaLightbulb, FaHandshake, FaRecycle } from 'react-icons/fa';
import './About.css';

function About() {
  const values = [
    {
      icon: <FaLeaf />,
      title: 'Sustainability',
      description: 'We are committed to creating a sustainable future through clean energy solutions that protect our planet.',
    },
    {
      icon: <FaLightbulb />,
      title: 'Innovation',
      description: 'We continuously invest in cutting-edge technology to provide the most efficient energy solutions.',
    },
    {
      icon: <FaHandshake />,
      title: 'Integrity',
      description: 'We build trust through transparent communication and reliable service delivery.',
    },
    {
      icon: <FaRecycle />,
      title: 'Responsibility',
      description: 'We take responsibility for our environmental impact and help others do the same.',
    },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      position: 'CEO & Founder',
      description: 'Renewable energy expert with 20+ years of industry experience.',
    },
    {
      name: 'Michael Chen',
      position: 'CTO',
      description: 'Technology leader specializing in smart grid and energy storage systems.',
    },
    {
      name: 'Emily Rodriguez',
      position: 'Head of Operations',
      description: 'Operations specialist ensuring seamless project delivery and customer satisfaction.',
    },
    {
      name: 'David Wilson',
      position: 'Lead Engineer',
      description: 'Senior engineer with expertise in solar and wind energy system design.',
    },
  ];

  const achievements = [
    { number: '500+', label: 'Projects Completed' },
    { number: '50MW', label: 'Clean Energy Generated' },
    { number: '200+', label: 'Satisfied Customers' },
    { number: '15+', label: 'Years of Excellence' },
  ];

  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1>About EnergyPro</h1>
            <p className="hero-subtitle">
              Leading the transition to sustainable energy with innovative solutions 
              and unwavering commitment to environmental responsibility.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2008, EnergyPro began with a simple mission: to make clean energy 
                accessible and affordable for everyone. What started as a small team of 
                passionate engineers has grown into a leading renewable energy company 
                serving customers across the nation.
              </p>
              <p>
                Over the years, we've pioneered innovative solutions in solar, wind, and 
                energy storage technologies. Our commitment to quality and customer 
                satisfaction has earned us recognition as one of the most trusted names 
                in the renewable energy industry.
              </p>
              <p>
                Today, we continue to push the boundaries of what's possible in clean 
                energy, helping businesses and homeowners reduce their carbon footprint 
                while saving money on energy costs.
              </p>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <FaGlobe className="placeholder-icon" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values">
        <div className="container">
          <div className="section-header">
            <h2>Our Values</h2>
            <p>The principles that guide everything we do</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements">
        <div className="container">
          <div className="section-header">
            <h2>Our Achievements</h2>
            <p>Numbers that speak for our commitment to excellence</p>
          </div>
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div key={index} className="achievement-item">
                <div className="achievement-number">{achievement.number}</div>
                <div className="achievement-label">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our Team</h2>
            <p>The experts behind our success</p>
          </div>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">
                  <FaUsers className="avatar-icon" />
                </div>
                <h3>{member.name}</h3>
                <h4>{member.position}</h4>
                <p>{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                To accelerate the world's transition to sustainable energy by providing 
                innovative, reliable, and cost-effective renewable energy solutions that 
                empower our customers to reduce their environmental impact while achieving 
                energy independence.
              </p>
            </div>
            <div className="mission-icon">
              <FaAward className="mission-icon-large" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;