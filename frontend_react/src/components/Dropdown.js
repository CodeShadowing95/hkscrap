import * as React from 'react';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { AccountCircleIcon } from '../utils/constants';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// import { useTheme } from "./ThemeProvider";

export default function MenuIntroduction() {
  const navigate = useNavigate();
  // const { theme } = useTheme();

  const createHandleMenuClick = (menuItem) => {
    switch (menuItem) {
      case "Profil":
        return () => {
            navigate("/profil");
        }
      case "Paramètres":
        return () => {
            // navigate("/");
        }
      case "Aide":
        return () => {
            // navigate("/");
        }
      case "Déconnexion":
        return () => {
            localStorage.removeItem('user');
            navigate("/auth");
            localStorage.clear();
        }
      default:
        break;
    }
  };

  return (
    <Dropdown>
      <Box component={MenuButton} style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "8px", borderRadius: "15px", border: "1px solid #93B0C8", background: "none", cursor: "pointer" }}>
          <AccountCircleIcon sx={{ fontSize: '20px', color: "#88a9c3" }} />
      </Box>
      <Menu slots={{ listbox: StyledListbox }}>
        <StyledMenuItem onClick={createHandleMenuClick('Profil')}>
          <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px" }}>Mon profil</Typography>
        </StyledMenuItem>
        <StyledMenuItem onClick={createHandleMenuClick('Paramètres')}>
          <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px" }}>Paramètres</Typography>
        </StyledMenuItem>
        <StyledMenuItem onClick={createHandleMenuClick('Aide')}>
          <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px" }}>Aide</Typography>
        </StyledMenuItem>
        <StyledMenuItem onClick={createHandleMenuClick('Déconnexion')}>
          <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px" }}>Déconnexion</Typography>
        </StyledMenuItem>
      </Menu>
    </Dropdown>
  );
}

const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const StyledListbox = styled('ul')(
    ({ theme }) => `
  font-family: Roboto, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  z-index: 1;
  `,
);

const StyledMenuItem = styled(MenuItem)(
    ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &.${menuItemClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${menuItemClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);