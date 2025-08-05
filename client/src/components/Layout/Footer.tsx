import React from 'react';
import styled from 'styled-components';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <div className="container">
        <FooterContent>
          <p>&copy; 2025 Energy Anvi. All rights reserved.</p>
        </FooterContent>
      </div>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.grey[900]};
  color: ${({ theme }) => theme.colors.common.white};
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const FooterContent = styled.div`
  text-align: center;
`;

export default Footer;