import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import {Link,useNavigate} from 'react-router-dom';



export default function Appbar() {

  return (
      <AppBar position="sticky">
        <Toolbar sx={{
            display: "flex",
            flexWrap: "wrap", // Prevents text overlap
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#006649",
            
          }}>
              
              <Button color='inherit'  component={Link} to="/" 
              sx={{
                p: 2,
                px: 4,
                display: "flex", 
                flexWrap: "wrap",
                justifyContent: "space-between",
                
                
              }}>Home</Button>

              <Button color='inherit'  component={Link} to="/verk" 
              sx={{
                p: 2,
                px: 4,
                display: "flex", 
                flexWrap: "wrap",
                justifyContent: "space-between",
                
                
              }}>verk</Button>

              
              
              
              
        </Toolbar>
      </AppBar>
    
  );
}