import { Box } from '@mui/material';
import logo from '../../assets/images/syntch_logo.png';

function SyntchLogo(props) {
  return <Box component="img" src={logo} {...props} sx={{ height: 54, mr: 5, mt: 2 }} />;
}

export default SyntchLogo;
