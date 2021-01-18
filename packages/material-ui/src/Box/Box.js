import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_extendSxProp as extendSxProp } from '@material-ui/system';
import styled from '../styles/experimentalStyled';

const BoxRoot = styled(
  React.forwardRef((props, ref) => {
    const { children, clone, className, component: Component = 'div', sx, ...other } = props;

    if (clone) {
      return React.cloneElement(children, {
        className: clsx(children.props.className, className),
        ...other,
      });
    }

    if (typeof children === 'function') {
      return children({ className, ...other });
    }

    return (
      <Component ref={ref} className={className} {...other}>
        {children}
      </Component>
    );
  }),
  {},
  { muiName: 'MuiBox', skipVariantsResolver: true },
)``;

/**
 * @ignore - do not document.
 */
const Box = React.forwardRef(function Box(inProps, ref) {
  const props = extendSxProp(inProps);
  return <BoxRoot ref={ref} {...props} />;
});

Box.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  clone: PropTypes.bool,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * @ignore
   */
  sx: PropTypes.object,
};

export default Box;
