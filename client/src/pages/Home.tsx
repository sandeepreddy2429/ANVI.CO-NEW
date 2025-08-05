import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Zap, Leaf, BarChart3, Users, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <HomeContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>
              Powering a <span>Sustainable</span> Future
            </HeroTitle>
            <HeroSubtitle>
              Leading the transition to renewable energy with innovative solutions, 
              data-driven insights, and cutting-edge technology for a cleaner tomorrow.
            </HeroSubtitle>
            <HeroButtons>
              <PrimaryButton>
                Get Started <ArrowRight size={20} />
              </PrimaryButton>
              <SecondaryButton>
                Learn More
              </SecondaryButton>
            </HeroButtons>
          </motion.div>
        </HeroContent>
        <HeroBackground />
      </HeroSection>

      {/* Features Section */}
      <FeaturesSection>
        <div className="container">
          <SectionTitle>Why Choose Energy Anvi?</SectionTitle>
          <FeaturesGrid>
            <FeatureCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <FeatureIcon>
                <Zap size={32} />
              </FeatureIcon>
              <FeatureTitle>Smart Energy Solutions</FeatureTitle>
              <FeatureDescription>
                Advanced energy management systems that optimize consumption 
                and reduce costs through intelligent automation.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <FeatureIcon>
                <Leaf size={32} />
              </FeatureIcon>
              <FeatureTitle>Renewable Energy</FeatureTitle>
              <FeatureDescription>
                Comprehensive renewable energy solutions including solar, 
                wind, and hydroelectric power systems.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <FeatureIcon>
                <BarChart3 size={32} />
              </FeatureIcon>
              <FeatureTitle>Data Analytics</FeatureTitle>
              <FeatureDescription>
                Real-time monitoring and analytics to track energy 
                performance and identify optimization opportunities.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <FeatureIcon>
                <Users size={32} />
              </FeatureIcon>
              <FeatureTitle>Expert Support</FeatureTitle>
              <FeatureDescription>
                Dedicated team of energy experts providing consultation, 
                implementation, and ongoing support services.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </div>
      </FeaturesSection>

      {/* Stats Section */}
      <StatsSection>
        <div className="container">
          <StatsGrid>
            <StatItem>
              <StatNumber>500+</StatNumber>
              <StatLabel>Projects Completed</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>2.5GW</StatNumber>
              <StatLabel>Energy Generated</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>50M+</StatNumber>
              <StatLabel>CO₂ Reduced (tons)</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>100+</StatNumber>
              <StatLabel>Happy Clients</StatLabel>
            </StatItem>
          </StatsGrid>
        </div>
      </StatsSection>
    </HomeContainer>
  );
};

// Styled Components
const HomeContainer = styled.div`
  min-height: 100vh;
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 600px;
`;

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.primary};

  span {
    color: ${({ theme }) => theme.colors.primary.main};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.primary.contrastText};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: transparent;
  color: ${({ theme }) => theme.colors.primary.main};
  border: 2px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.contrastText};
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary.main}20,
    ${({ theme }) => theme.colors.secondary.main}20
  );
  clip-path: polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%);
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    clip-path: none;
    opacity: 0.1;
  }
`;

const FeaturesSection = styled.section`
  padding: ${({ theme }) => theme.spacing['5xl']} 0;
  background: ${({ theme }) => theme.colors.background.alt};
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing['2xl']};
`;

const FeatureCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.paper};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-align: center;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const FeatureIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.primary.main}20;
  color: ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const FeatureTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const StatsSection = styled.section`
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
  background: ${({ theme }) => theme.colors.primary.main};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const StatItem = styled.div`
  color: ${({ theme }) => theme.colors.primary.contrastText};
`;

const StatNumber = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  opacity: 0.9;
`;

export default Home;