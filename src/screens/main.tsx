import { Box, Center, Text, VStack, useColorModeValue } from 'native-base';

import AnimatedCheckBox from '../components/animated-checkbox';
import ThemeToggle from '../services/themes/themeToggle';

const MainScreen = () => {
  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      px={4}
      flex={1}
    >
      <VStack space={5} alignItems={'center'}>
        <Box width={'100px'} height={'100px'}>
          <AnimatedCheckBox />
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
