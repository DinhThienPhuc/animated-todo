import { Center, VStack } from 'native-base';
import { useCallback, useState } from 'react';

import TaskItem from '../components/task-item';
import ThemeToggle from '../services/themes/themeToggle';

const MainScreen = () => {
  const [checked, setChecked] = useState(false);
  const [subject, setSubject] = useState('Task 1');
  const [isEditing, setEditing] = useState(false);

  const handlePressCheckbox = useCallback(() => {
    setChecked(prev => !prev);
  }, []);

  const handleSwitchEdit = useCallback((value: boolean) => {
    return () => setEditing(value);
  }, []);

  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      flex={1}
    >
      <VStack space={5} alignItems={'center'} w={'full'}>
        <TaskItem
          isEditing={isEditing}
          isDone={checked}
          onToggleCheckbox={handlePressCheckbox}
          subject={subject}
          onPressLabel={handleSwitchEdit(true)}
          onChangeSubject={setSubject}
          onFinishEditing={handleSwitchEdit(false)}
        />
        <ThemeToggle />
      </VStack>
    </Center>
  );
};

export default MainScreen;
