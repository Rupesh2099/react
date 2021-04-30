import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import RadioButtonUncheckedIcon from '../internal/svg-icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '../internal/svg-icons/RadioButtonChecked';
import experimentalStyled from '../styles/experimentalStyled';

const RadioButtonIconRoot = experimentalStyled('span')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  '&.Mui-checked .MuiRadioButtonIcon-dot': {
    transform: 'scale(1)',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

const RadioButtonIconBackground = experimentalStyled(RadioButtonUncheckedIcon)({
  // Scale applied to prevent dot misalignment in Safari
  transform: 'scale(1)',
});

const RadioButtonIconDot = experimentalStyled(RadioButtonCheckedIcon)(({ theme }) => ({
  left: 0,
  position: 'absolute',
  transform: 'scale(0)',
  transition: theme.transitions.create('transform', {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.shortest,
  }),
}));

/**
 * @ignore - internal component.
 */
function RadioButtonIcon(props) {
  const { checked, classes = {}, fontSize } = props;

  return (
    <RadioButtonIconRoot className={clsx(classes.root, { 'Mui-checked': checked })}>
      <RadioButtonIconBackground fontSize={fontSize} className={classes.background} />
      <RadioButtonIconDot
        fontSize={fontSize}
        className={clsx('MuiRadioButtonIcon-dot', classes.dot)}
      />
    </RadioButtonIconRoot>
  );
}

RadioButtonIcon.propTypes = {
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * The size of the component.
   * `small` is equivalent to the dense radio styling.
   */
  fontSize: PropTypes.oneOf(['small', 'medium']),
};

export default RadioButtonIcon;
