import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    <div className='fixed w-screen h-screen flex items-center justify-center bg-black/55 top-0 left-0'>
    <Box sx={{ display: 'flex' }}>
      <CircularProgress sx={{color:"white"}} size="9vw" />
    </Box>
    </div>
  )
}

export default Loader