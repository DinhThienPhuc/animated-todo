import { Box, themeTools, useColorModeValue, useTheme } from 'native-base';

import Checkbox from 'react-native-checkbox-animated';
import { Pressable } from 'react-native';
import { useCallback } from 'react';

interface IProps {
  isDone: boolean;
  onToggleCheckbox: (val: boolean) => boolean;
}

const TaskItem = ({ isDone, onToggleCheckbox }: IProps) => {
  return (
    <Box width={30} height={30} mr={1}>
      <Checkbox
        label="test"
        onValueChange={onToggleCheckbox}
        checked={isDone}
      />
    </Box>
  );
};

export default TaskItem;
