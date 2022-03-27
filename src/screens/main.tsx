import { Box, Center, Text, VStack, useColorModeValue } from 'native-base';

import Checkbox from 'react-native-checkbox-animated';
import ThemeToggle from '../services/themes/themeToggle';
import { useCallback } from 'react';
import { useState } from 'react';

const MainScreen = () => {
  const [checked, setChecked] = useState(false);

  const toggleCheckbox = useCallback((val: boolean) => {
    setChecked(val);
    return true;
  }, []);

  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      px={4}
      flex={1}
    >
      <VStack space={5} alignItems={'center'}>
        <Box width={'100px'} height={'100px'}>
          <Checkbox
            label="your label here"
            onValueChange={toggleCheckbox}
            checked={checked}
          />
        </Box>
        <Box p={10} bg={useColorModeValue('red.500', 'yellow.500')}>
          <Text>hello</Text>
        </Box>
        <ThemeToggle />
      </VStack>
    </Center>
  );
};

export default MainScreen;
