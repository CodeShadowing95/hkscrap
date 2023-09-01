import { Stack, Typography } from '@mui/material';

import {AccountIcon, KeyboardArrowDown, NotificationsIcon} from '../utils/constants';
import IconToggle from './IconToggle';

const Navbar = () => (
  <Stack direction="row" spacing={6}
    sx={{
      backgroundColor: '#187bcd',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: '50px',
      padding: '5px 30px'
    }}
  >
    <IconToggle />
    <NotificationsIcon sx={{ fontSize: 30, color: '#fff' }} />
    <Stack direction="row" sx={{ display: 'flex', alignItems: 'center', cursor: "pointer" }} spacing={1}>
      {/* <AccountIcon sx={{ fontSize: 30, color: '#fff' }} /> */}
      <Typography variant='body1' sx={{ color: '#fff', fontSize: '20px' }}>Bonjour, Hermann</Typography>
      <KeyboardArrowDown sx={{ fontSize: 30, color: '#fff' }} />
    </Stack>
  </Stack>
)

export default Navbar