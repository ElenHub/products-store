import React from 'react';
import { Container, Typography } from '@mui/material';

const Footer: React.FC = () => {
    return (
    <footer style={{ backgroundColor: '#f1f1f1', padding: '1rem 0', width: '100%' }}>
        <Container maxWidth="lg">
          <Typography variant="body1" align="center">
            © {new Date().getFullYear()} My Product Store
          </Typography>
        </Container>
      </footer>
    );
  };

export default Footer;