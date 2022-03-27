import { Box, themeTools, useColorModeValue, useTheme } from 'native-base';

import AnimatedCheckbox from 'react-native-checkbox-reanimated';
import { Pressable } from 'react-native';

interface IProps {
  isDone: boolean;
  onToggleCheckbox?: () => void;
}

const TaskItem = ({ isDone, onToggleCheckbox }: IProps) => {
  const theme = useTheme();

  const highlightColor = themeTools.getColor(
    theme,
    useColorModeValue('blue.500', 'blue.400')
  );

  const boxOutlineColor = themeTools.getColor(
    theme,
    useColorModeValue('muted.300', 'muted.500')
  );

  const checkmarkColor = themeTools.getColor(
    theme,
    useColorModeValue('white', 'white')
  );

  const activeTextColor = themeTools.getColor(
    theme,
    useColorModeValue('darkText', 'lightText')
  );

  const doneTextColor = themeTools.getColor(
    theme,
    useColorModeValue('muted.400', 'muted.600')
  );

  return (
    <Box width={30} height={30} mr={2}>
      <Pressable onPress={onToggleCheckbox}>
        <AnimatedCheckbox
          checked={isDone}
          highlightColor={highlightColor}
          checkmarkColor={checkmarkColor}
          boxOutlineColor={boxOutlineColor}
        />
      </Pressable>
    </Box>
  );
};

export default TaskItem;
