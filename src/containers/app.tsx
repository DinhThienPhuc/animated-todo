import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { ReactNode } from 'react';
import theme from '../services/themes/theme';

interface IProps {
  children: ReactNode;
}

const AppContainer = ({ children }: IProps) => {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>
    </NavigationContainer>
  );
};

export default AppContainer;
