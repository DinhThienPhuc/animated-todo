import {
  Box,
  HStack,
  Icon,
  Input,
  themeTools,
  useColorModeValue,
  useTheme
} from 'native-base';
import {
  NativeSyntheticEvent,
  Pressable,
  TextInputChangeEventData
} from 'react-native';

import AnimatedCheckbox from 'react-native-checkbox-reanimated';
import AnimatedTaskLabel from './animated-task-label';
import { Feather } from '@expo/vector-icons';
import { PanGestureHandlerProps } from 'react-native-gesture-handler';
import SwipableView from './swipable-view';
import { useCallback } from 'react';

interface IProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  isDone: boolean;
  onToggleCheckbox?: () => void;
  onPressLabel?: () => void;
  onRemove?: () => void;
  subject: string;
  isEditing: boolean;
  onChangeSubject?: (subject: string) => void;
  onFinishEditing?: () => void;
}

const TaskItem = ({
  isDone,
  isEditing,
  onToggleCheckbox,
  subject,
  onPressLabel,
  onChangeSubject,
  onFinishEditing,
  onRemove,
  simultaneousHandlers
}: IProps) => {
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

  const handleChangeSubject = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      onChangeSubject?.(e.nativeEvent.text);
    },
    [onChangeSubject]
  );

  return (
    <SwipableView
      simultaneousHandlers={simultaneousHandlers}
      onSwipeLeft={onRemove}
      backView={
        <Box
          w={'full'}
          h={'full'}
          bg={'red.500'}
          alignItems={'flex-end'}
          justifyContent={'center'}
          pr={4}
        >
          <Icon color={'white'} as={<Feather name="trash-2" />} size={'sm'} />
        </Box>
      }
    >
      <HStack
        alignItems={'center'}
        w={'full'}
        px={'4'}
        py={'2'}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
      >
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
        {isEditing ? (
          <Input
            placeholder="Task"
            value={subject}
            variant={'unstyled'}
            fontSize={19}
            px={1}
            py={0}
            autoFocus
            blurOnSubmit
            onChange={handleChangeSubject}
            onBlur={onFinishEditing}
          />
        ) : (
          <AnimatedTaskLabel
            textColor={activeTextColor}
            inactiveTextColor={doneTextColor}
            strikethrough={isDone}
            onPress={onPressLabel}
          >
            {subject}
          </AnimatedTaskLabel>
        )}
      </HStack>
    </SwipableView>
  );
};

export default TaskItem;
