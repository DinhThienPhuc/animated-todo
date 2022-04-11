import { Center, Fab, Icon, VStack, useColorModeValue } from 'native-base';
import { useCallback, useState } from 'react';

import { AntDesign } from '@expo/vector-icons';
import TaskList from '../components/task-list';
import ThemeToggle from '../services/themes/themeToggle';
import shortid from 'shortid';

const initialData = [
  {
    id: shortid.generate(),
    subject: 'Buy movie ticket for Friday',
    done: false
  },
  {
    id: shortid.generate(),
    subject: 'Make a React Native tutorial',
    done: false
  }
];

const MainScreen = () => {
  const [data, setData] = useState(initialData);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const handleToggleTaskItem = useCallback(item => {
    setData(prevData => {
      const newData = [...prevData];
      const index = prevData.indexOf(item);
      newData[index] = {
        ...item,
        done: !item.done
      };
      return newData;
    });
  }, []);

  const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
    setData(prevData => {
      const newData = [...prevData];
      const index = prevData.indexOf(item);
      newData[index] = {
        ...item,
        subject: newSubject
      };
      return newData;
    });
  }, []);

  const handleFinishEditingTaskItem = useCallback(() => {
    setEditingItemId(null);
  }, []);

  const handlePressTaskItemLabel = useCallback(item => {
    setEditingItemId(item.id);
  }, []);

  const handleRemoveItem = useCallback(item => {
    setData(prevData => {
      const newData = prevData.filter(i => i !== item);
      return newData;
    });
  }, []);

  const handleCreateTask = useCallback(() => {
    const id = shortid.generate();
    setData([
      {
        id,
        subject: '',
        done: false
      },
      ...data
    ]);
    setEditingItemId(id);
  }, [data]);

  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      flex={1}
    >
      <VStack space={5} alignItems={'center'} w={'full'}>
        <TaskList
          data={data}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinisgEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveItem}
          editingItemId={editingItemId}
        />
        <ThemeToggle />
        <Fab
          position={'absolute'}
          renderInPortal={false}
          size={'sm'}
          icon={<Icon color={'white'} as={<AntDesign name="plus" />} />}
          colorScheme={useColorModeValue('blue', 'darkBlue')}
          bg={useColorModeValue('blue.500', 'blue.400')}
          onPress={handleCreateTask}
        />
      </VStack>
    </Center>
  );
};

export default MainScreen;
