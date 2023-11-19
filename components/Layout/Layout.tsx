import { ReactNode, FC, useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import Footer from './footer';
import Header from './header';
import { MainAndFooterContainer } from './layout-style';
import ModalForm from './Modal-form';
import { setAccessKey } from '../../store/slices/sessionSlice';

interface IProps {
  children: ReactNode;
}

const RootPageLayout: FC<IProps> = ({ children }) => {
  const [openFormSignInModal, setOpenFormSignInModal] = useState(false);
  const dispatch = useDispatch();
  const handleOpenSignInModal = () => {
    setOpenFormSignInModal(true);
  };
  const handleCloseSignInModal = () => {
    setOpenFormSignInModal(false);
  };

  useEffect(() => {
    const updateKeysFromLocalStorage = () => {
      const storedSession = localStorage.getItem('session');

      if (storedSession) {
        try {
          const sessionData = JSON.parse(storedSession);
          const { refresh, access } = sessionData;

          dispatch(setAccessKey(access));
        } catch (error) {
          console.error('Error parsing session data:', error);
        }
      } else {
        dispatch(setAccessKey(null));
      }
    };

    updateKeysFromLocalStorage();

    window.addEventListener('storage', updateKeysFromLocalStorage);

    return () => {
      window.removeEventListener('storage', updateKeysFromLocalStorage);
    };
  }, []);

  return (
    <>
      <Header handleOpenSignInModal={handleOpenSignInModal} />

      <MainAndFooterContainer>
        {children}

        <Footer />
      </MainAndFooterContainer>

      <ModalForm
        handleCloseSignInModal={handleCloseSignInModal}
        openFormSignInModal={openFormSignInModal}
      />
    </>
  );
};

export default RootPageLayout;
