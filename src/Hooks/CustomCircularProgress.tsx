import * as React from 'react';
import CircularProgress, {
    circularProgressClasses,
    CircularProgressProps,
  } from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
const CustomCircularProgress = (props: CircularProgressProps) => {
return (
  <Box sx={{ flexGrow: 1, textAlign:'center', display:'flex',flex:1,justifyContent:'center' , marginTop:1,marginBottom:1}}>
    <CircularProgress
    
      variant="indeterminate"
      disableShrink
      sx={{
        color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
        display: 'flex',
        flexDirection: 'column',
        animationDuration: '1150ms',
        [`& .${circularProgressClasses.circle}`]: {
          strokeLinecap: 'round',
        },
        
      }}
      size={30}
      thickness={4}
      {...props}
    />
    </Box>
  )}

export default CustomCircularProgress;