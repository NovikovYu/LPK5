import * as React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, Container, Menu, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';

import deleteSessionFromLocalStorage from '@/feature/utils/session/deleteSessionFromLocalStorage';

import {
  AppBarRestyled,
  HeaderWrapper,
  MenuButtonRestyled,
  MenuIconButtonRestyled,
  NavigationListItem,
  NavigationUlItem,
  SignInButtonRestyled,
  ToolbarRestyled,
} from './Header-style';
import { selectAccessKey, setAccessKey } from '../../store/slices/sessionSlice';
import LintuIcon from '../img/icon';

interface Props {
  handleOpenSignInModal: () => void;
}

function Header({ handleOpenSignInModal }: Props) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const accessKey = useSelector(selectAccessKey);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    deleteSessionFromLocalStorage();
    dispatch(setAccessKey(null));
    router.push('/');
  };

  if (isDesktop) {
    return (
      <AppBarRestyled>
        <Container maxWidth="xl">
          <ToolbarRestyled>
            <div>
              <Link href="/">
                <LintuIcon />
              </Link>
            </div>

            <HeaderWrapper>
              <Box component="nav">
                <NavigationUlItem>
                  <NavigationListItem key={'portfolios'}>
                    <MenuButtonRestyled
                      href={{
                        pathname: '/portfolios',
                      }}
                    >
                      Portfolios
                    </MenuButtonRestyled>
                  </NavigationListItem>
                  <NavigationListItem key={'settings'}>
                    <MenuButtonRestyled
                      href={{
                        pathname: '/settings',
                      }}
                    >
                      Settings
                    </MenuButtonRestyled>
                  </NavigationListItem>
                </NavigationUlItem>
              </Box>

              {accessKey && (
                <SignInButtonRestyled onClick={handleSignOut}>
                  Sign Out
                </SignInButtonRestyled>
              )}
              {!accessKey && (
                <SignInButtonRestyled onClick={handleOpenSignInModal}>
                  Sign In
                </SignInButtonRestyled>
              )}
            </HeaderWrapper>
          </ToolbarRestyled>
        </Container>
      </AppBarRestyled>
    );
  }

  return (
    <AppBarRestyled>
      <Container maxWidth="md">
        <ToolbarRestyled>
          <Link href="/">
            <LintuIcon />
          </Link>
          <div>
            {accessKey && (
              <SignInButtonRestyled onClick={handleSignOut}>
                Sign Out
              </SignInButtonRestyled>
            )}
            {!accessKey && (
              <SignInButtonRestyled onClick={handleOpenSignInModal}>
                Sign In
              </SignInButtonRestyled>
            )}
            <MenuIconButtonRestyled
              id="menu-button"
              aria-controls={open ? 'menu-button' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MenuIcon />
            </MenuIconButtonRestyled>
            <Menu
              id="item-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'item-button',
              }}
            >
              <MenuItem key={'portfolios'}>
                <Link href="/portfolios">Portfolios</Link>
              </MenuItem>
              <MenuItem key={'settings'}>
                <Link href="/settings">Settings</Link>
              </MenuItem>
            </Menu>
          </div>
        </ToolbarRestyled>
      </Container>
    </AppBarRestyled>
  );
}

export default Header;
