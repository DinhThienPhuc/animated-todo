import { forwardRef } from 'react';
import { useStyledSystemPropsResolver } from 'native-base';

export const makeStyledComponent = (Comp: any) => {
  const StyledComp = forwardRef((props: any, ref: any) => {
    const [style, restProps] = useStyledSystemPropsResolver(props);
    return (
      <Comp {...restProps} style={style} ref={ref}>
        {props.children}
      </Comp>
    );
  });

  StyledComp.displayName = 'StyledComp';

  return StyledComp;
};
