import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming
} from 'react-native-reanimated';
import { Box, HStack, Text } from 'native-base';
import { ReactNode, memo } from 'react';

import { Pressable } from 'react-native';
import { useEffect } from 'react';

interface IProps {
  strikethrough: boolean;
  textColor: string;
  inactiveTextColor: string;
  onPress?: () => void;
  children?: ReactNode;
}

const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedHStack = Animated.createAnimatedComponent(HStack);
const AnimatedText = Animated.createAnimatedComponent(Text);

const AnimatedTaskLabel = memo(
  ({
    strikethrough,
    textColor,
    inactiveTextColor,
    onPress,
    children
  }: IProps) => {
    const hstackOffSet = useSharedValue(0);
    const hstackAnimatedStyles = useAnimatedStyle(
      () => ({
        transform: [{ translateX: hstackOffSet.value }]
      }),
      [strikethrough]
    );

    const textColorProgress = useSharedValue(0);
    const textColorAnimatedStyles = useAnimatedStyle(
      () => ({
        color: interpolateColor(
          textColorProgress.value,
          [0, 1],
          [textColor, inactiveTextColor]
        ) as string
      }),
      [strikethrough, textColor, inactiveTextColor]
    );

    const strikethroughWidth = useSharedValue(0);
    const strikethroughAnimatedStyles = useAnimatedStyle(
      () => ({
        width: `${strikethroughWidth.value * 100}%`,
        borderBottomColor: interpolateColor(
          textColorProgress.value,
          [0, 1],
          [textColor, inactiveTextColor]
        ) as string
      }),
      [strikethrough, textColor, inactiveTextColor]
    );

    useEffect(() => {
      const easing = Easing.out(Easing.quad);

      if (strikethrough) {
        hstackOffSet.value = withSequence(
          withTiming(4, { duration: 200, easing }),
          withTiming(0, { duration: 200, easing })
        );
        textColorProgress.value = withDelay(
          300,
          withTiming(1, { duration: 400, easing })
        );
        strikethroughWidth.value = withTiming(1, { duration: 400, easing });
      } else {
        textColorProgress.value = withTiming(0, { duration: 400, easing });
        strikethroughWidth.value = withTiming(0, { duration: 400, easing });
      }
    }, [hstackOffSet, strikethrough, strikethroughWidth, textColorProgress]);

    return (
      <Pressable onPress={onPress}>
        <AnimatedHStack alignItems={'center'} style={[hstackAnimatedStyles]}>
          <AnimatedText
            fontSize={19}
            noOfLines={1}
            isTruncated
            px={1}
            style={[textColorAnimatedStyles]}
          >
            {children}
          </AnimatedText>
          <AnimatedBox
            position={'absolute'}
            h={1}
            borderBottomWidth={1}
            style={[strikethroughAnimatedStyles]}
          />
        </AnimatedHStack>
      </Pressable>
    );
  }
);

AnimatedTaskLabel.displayName = 'AnimatedTaskLabel';

export default AnimatedTaskLabel;
