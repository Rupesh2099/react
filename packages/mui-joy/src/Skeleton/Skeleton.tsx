import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { keyframes, css } from '@mui/system';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getSkeletonUtilityClass } from './skeletonClasses';
import { SkeletonOwnerState, SkeletonProps, SkeletonTypeMap } from './SkeletonProps';
import useSlot from '../utils/useSlot';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getSkeletonUtilityClass, {});
};

const pulseKeyframe = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`;

const waveKeyframe = keyframes`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`;

const SkeletonRoot = styled('span', {
  name: 'JoySkeleton',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: SkeletonOwnerState }>(
  ({ ownerState, theme }) => ({
    display: 'block',
    position: 'relative',
    ...(ownerState.children
      ? {
          position: 'initial',
          display: 'inline',
          borderRadius: 'min(0.15em, 6px)',
          '-webkit-mask-image': '-webkit-radial-gradient(white, black)',
          '&::before': {
            position: 'absolute',
            zIndex: 9,
            backgroundColor: theme.vars.palette.background.surface,
            ...(ownerState.animation === 'wave' && {
              backgroundColor: theme.vars.palette.background.level2,
            }),
          },
        }
      : {
          ...(ownerState.shape === 'overlay' && {
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 10,
            backgroundColor: theme.vars.palette.background.surface,
          }),
          ...(ownerState.shape === 'rectangular' && {
            borderRadius: 'min(0.15em, 6px)',
            ...theme.typography.body1,
          }),
          ...(ownerState.shape === 'circular' && {
            borderRadius: '50%',
            ...theme.typography.body1,
            width: '1em',
            height: '1em',
          }),
          ...(!ownerState.animation && {
            backgroundColor: theme.vars.palette.background.level2,
          }),
          '&::before': {
            zIndex: 9,
            borderRadius: 'inherit',
            height: '1em',
            display: 'inline-block',
          },
        }),
    overflow: 'hidden',
    cursor: 'default',
    '& *': {
      visibility: 'hidden',
    },
    '&::before, &::after': {
      content: '" "',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    '&::after': {
      zIndex: 10,
      position: 'absolute',
      borderRadius: 'inherit',
    },
    [theme.getColorSchemeSelector('dark')]: {
      '--unstable_wave-bg': 'rgba(255 255 255 / 0.2)',
    },
  }),
  ({ ownerState, theme }) =>
    ownerState.animation === 'pulse' &&
    css`
      &::after {
        animation: ${pulseKeyframe} 1.5s ease-in-out 0.5s infinite;
        background: ${theme.vars.palette.background.level2};
      }
    `,
  ({ ownerState, theme }) =>
    ownerState.animation === 'wave' &&
    css`
      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);
      background-color: ${theme.vars.palette.background.level2};

      &::after {
        animation: ${waveKeyframe} 1.6s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          var(--unstable_wave-bg, rgba(0 0 0 / 0.08)),
          transparent
        );
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
      }
    `,
);

const Skeleton = React.forwardRef(function Skeleton(inProps, ref) {
  const props = useThemeProps<typeof inProps & SkeletonProps>({
    props: inProps,
    name: 'JoySkeleton',
  });

  const {
    className,
    component = 'span',
    children,
    animation = 'pulse',
    overlay = false,
    shape = 'overlay',
    height,
    width,
    sx,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const externalForwardedProps = {
    ...other,
    component,
    slots,
    slotProps,
    sx: [{ width, height }, ...(Array.isArray(sx) ? sx : [sx])],
  };

  const ownerState = {
    ...props,
    animation,
    component,
    overlay,
    shape,
    width,
    height,
  };

  const classes = useUtilityClasses();

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: SkeletonRoot,
    externalForwardedProps,
    ownerState,
  });

  return <SlotRoot {...rootProps}>{children}</SlotRoot>;
}) as OverridableComponent<SkeletonTypeMap>;

Skeleton.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Used to render icon or text elements inside the Skeleton if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The component orientation.
   * @default 'vertical'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default Skeleton;
