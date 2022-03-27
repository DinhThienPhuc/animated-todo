import { Box, Center, Text, VStack, useColorModeValue } from 'native-base';
import { useCallback, useState } from 'react';

import TaskItem from '../components/task-item';
import ThemeToggle from '../services/themes/themeToggle';

const MainScreen = () => {
  const [checked, setChecked] = useState(false);

  const handlePressCheckbox = useCallback(() => {
    setChecked(prev => !prev);
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
          <TaskItem isDone={checked} onToggleCheckbox={handlePressCheckbox} />
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
