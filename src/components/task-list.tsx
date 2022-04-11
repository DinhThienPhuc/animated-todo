import { AnimatePresence, View } from 'moti';
import {
  PanGestureHandlerProps,
  ScrollView
} from 'react-native-gesture-handler';
import { useCallback, useRef } from 'react';

import TaskItem from './task-item';
import { makeStyledComponent } from '../utils/styled';

interface ITaskItemData {
  id: string;
  subject: string;
  done: boolean;
}

interface IProps {
  data: ITaskItemData[];
  editingItemId: string | null;
  onToggleItem: (itemData: ITaskItemData) => void;
  onChangeSubject: (itemData: ITaskItemData, newSubject: string) => void;
  onFinisgEditing: (itemData: ITaskItemData) => void;
  onPressLabel: (itemData: ITaskItemData) => void;
  onRemoveItem: (itemData: ITaskItemData) => void;
}

interface ITaskItemProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  data: ITaskItemData;
  onToggleItem: (item: ITaskItemData) => void;
  isEditing: boolean;
  onChangeSubject: (itemData: ITaskItemData, newSubject: string) => void;
  onFinisgEditing: (itemData: ITaskItemData) => void;
  onRemove: (itemData: ITaskItemData) => void;
  onPressLabel: (itemData: ITaskItemData) => void;
}

const StyledView = makeStyledComponent(View);
const StyledScrollView = makeStyledComponent(ScrollView);

export const AnimatedTaskItem = ({
  simultaneousHandlers,
  data,
  onToggleItem,
  isEditing,
  onChangeSubject,
  onFinisgEditing,
  onPressLabel,
  onRemove
}: ITaskItemProps) => {
  const handleToggleCheckbox = useCallback(() => {
    onToggleItem(data);
  }, [data, onToggleItem]);

  const handleChangeSubject = useCallback(
    (subject: string) => {
      onChangeSubject(data, subject);
    },
    [data, onChangeSubject]
  );

  const handleFinishEditing = useCallback(() => {
    onFinisgEditing(data);
  }, [data, onFinisgEditing]);

  const handlePressLabel = useCallback(() => {
    onPressLabel(data);
  }, [data, onPressLabel]);

  const handleRemove = useCallback(() => {
    onRemove(data);
  }, [data, onRemove]);

  return (
    <StyledView
      w={'full'}
      from={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
      animate={{
        opacity: 1,
        scale: 1,
        marginBottom: 0
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
    >
      <TaskItem
        simultaneousHandlers={simultaneousHandlers}
        subject={data.subject}
        isDone={data.done}
        isEditing={isEditing}
        onToggleCheckbox={handleToggleCheckbox}
        onChangeSubject={handleChangeSubject}
        onFinishEditing={handleFinishEditing}
        onPressLabel={handlePressLabel}
        onRemove={handleRemove}
      ></TaskItem>
    </StyledView>
  );
};

const TaskList = ({
  data,
  editingItemId,
  onToggleItem,
  onChangeSubject,
  onFinisgEditing,
  onPressLabel,
  onRemoveItem
}: IProps) => {
  const refScrollView = useRef(null);

  return (
    <StyledScrollView ref={refScrollView} w={'full'}>
      <AnimatePresence>
        {data.map(item => (
          <AnimatedTaskItem
            key={item.id}
            data={item}
            isEditing={item.id === editingItemId}
            onToggleItem={onToggleItem}
            onChangeSubject={onChangeSubject}
            onFinisgEditing={onFinisgEditing}
            onPressLabel={onPressLabel}
            onRemove={onRemoveItem}
            simultaneousHandlers={refScrollView}
          />
        ))}
      </AnimatePresence>
    </StyledScrollView>
  );
};

export default TaskList;
