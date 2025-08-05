import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <HeaderContainer>
      <div className="container">
        <HeaderContent>
          <Logo to="/">
            <LogoIcon>
              <Zap size={28} />
            </LogoIcon>
            <LogoText>Energy Anvi</LogoText>
          </Logo>

          <Nav $isOpen={isMenuOpen}>
            <NavList>
              <NavItem>
                <NavLink to="/" $isActive={isActive('/')}>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/about" $isActive={isActive('/about')}>
                  About
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/services" $isActive={isActive('/services')}>
                  Services
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/projects" $isActive={isActive('/projects')}>
                  Projects
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/energy-data" $isActive={isActive('/energy-data')}>
                  Energy Data
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/blog" $isActive={isActive('/blog')}>
                  Blog
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/contact" $isActive={isActive('/contact')}>
                  Contact
                </NavLink>
              </NavItem>
            </NavList>
          </Nav>

          <HeaderActions>
            <ActionButton to="/login">Login</ActionButton>
            <PrimaryActionButton to="/register">
              Get Started
            </PrimaryActionButton>
          </HeaderActions>

          <MobileMenuButton onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </HeaderContent>
      </div>
    </HeaderContainer>
  );
};

// Styled Components
const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.colors.background.paper};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  z-index: ${({ theme }) => theme.zIndex.sticky};
  backdrop-filter: blur(8px);
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    text-decoration: none;
  }
`;

const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.primary.contrastText};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const LogoText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const Nav = styled.nav<{ $isOpen: boolean }>`
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.colors.background.paper};
    border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
    transform: translateY(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
    transition: transform 0.3s ease-in-out;
    z-index: ${({ theme }) => theme.zIndex.dropdown};
  }
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.lg};
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const NavItem = styled.li``;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary.main : theme.colors.text.secondary};
  text-decoration: none;
  transition: color 0.2s ease-in-out;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
  }

  ${({ $isActive, theme }) =>
    $isActive &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 2px;
      background: ${theme.colors.primary.main};
      border-radius: ${theme.borderRadius.full};
    }
  `}

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    &::after {
      display: none;
    }
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const ActionButton = styled(Link)`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.colors.grey[100]};
    text-decoration: none;
  }
`;

const PrimaryActionButton = styled(Link)`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.primary.contrastText};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
    text-decoration: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.colors.grey[100]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
  }
`;

export default Header;