import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        404: Page not found
      </Typography>
      <Typography variant="body1" gutterBottom sx={{marginBottom:"20px", marginTop:'30px'}}>
        Unfortunately, we cannot find the page you requested.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go back to the main page
      </Button>
    </Container>
  );
};

export default NotFound;
