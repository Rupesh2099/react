import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ownerDocument from '../utils/ownerDocument';
import useForkRef from '../utils/useForkRef';
import setRef from '../utils/setRef';
import useEventCallback from '../utils/useEventCallback';
import { elementAcceptingRef, exactProp } from '@material-ui/utils';

function mapEventPropToEvent(eventProp) {
  return eventProp.substring(2).toLowerCase();
}

/**
 * Listen for click events that occur somewhere in the document, outside of the element itself.
 * For instance, if you need to hide a menu when people click anywhere else on your page.
 */
const ClickAwayListener = React.forwardRef(function ClickAwayListener(props, ref) {
  const {
    children,
    disableReactTree = false,
    mouseEvent = 'onClick',
    touchEvent = 'onTouchEnd',
    onClickAway,
  } = props;
  const movedRef = React.useRef(false);
  const nodeRef = React.useRef(null);
  const mountedRef = React.useRef(false);
  const syntheticEventRef = React.useRef(false);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleNodeRef = useForkRef(nodeRef, ref);
  // can be removed once we drop support for non ref forwarding class components
  const handleOwnRef = React.useCallback(
    (instance) => {
      // #StrictMode ready
      setRef(handleNodeRef, ReactDOM.findDOMNode(instance));
    },
    [handleNodeRef],
  );
  const handleRef = useForkRef(children.ref, handleOwnRef);

  const handleClickAway = useEventCallback((event) => {
    const insideReactTree = syntheticEventRef.current;
    syntheticEventRef.current = false;

    // The handler doesn't take event.defaultPrevented into account:
    //
    // event.preventDefault() is meant to stop default behaviours like
    // clicking a checkbox to check it, hitting a button to submit a form,
    // and hitting left arrow to move the cursor in a text input etc.
    // Only special HTML elements have these default behaviors.

    // IE 11 support, which trigger the handleClickAway even after the unbind
    if (!mountedRef.current) {
      return;
    }

    // Do not act if user performed touchmove
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }

    // The child might render null.
    if (!nodeRef.current) {
      return;
    }

    let insideDOM;

    // If not enough, can use https://github.com/DieterHolvoet/event-propagation-path/blob/master/propagationPath.js
    if (event.composedPath) {
      insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
    } else {
      const doc = ownerDocument(nodeRef.current);
      // TODO v6 remove dead logic https://caniuse.com/#search=composedPath.
      insideDOM =
        !(doc.documentElement && doc.documentElement.contains(event.target)) ||
        nodeRef.current.contains(event.target) ||
        (!disableReactTree && insideReactTree);
    }

    if (!insideDOM) {
      onClickAway(event);
    }
  });

  React.useEffect(() => {
    if (touchEvent !== false) {
      const mappedTouchEvent = mapEventPropToEvent(touchEvent);
      const doc = ownerDocument(nodeRef.current);

      const handleTouchMove = () => {
        movedRef.current = true;
      };

      doc.addEventListener(mappedTouchEvent, handleClickAway);
      doc.addEventListener('touchmove', handleTouchMove);

      return () => {
        doc.removeEventListener(mappedTouchEvent, handleClickAway);
        doc.removeEventListener('touchmove', handleTouchMove);
      };
    }

    return undefined;
  }, [handleClickAway, touchEvent]);

  React.useEffect(() => {
    if (mouseEvent !== false) {
      const mappedMouseEvent = mapEventPropToEvent(mouseEvent);
      const doc = ownerDocument(nodeRef.current);

      doc.addEventListener(mappedMouseEvent, handleClickAway);

      return () => {
        doc.removeEventListener(mappedMouseEvent, handleClickAway);
      };
    }

    return undefined;
  }, [handleClickAway, mouseEvent]);

  // Keep track of mouse/touch events that bubbled up through the portal.
  const createHandleSynthetic = (handlerName) => (event) => {
    syntheticEventRef.current = true;

    const childrenProps = children.props;
    if (childrenProps[handlerName]) {
      childrenProps[handlerName](event);
    }
  };

  const childrenProps = { ref: handleRef };

  if (mouseEvent !== false) {
    childrenProps[mouseEvent] = createHandleSynthetic(mouseEvent);
  }

  if (touchEvent !== false) {
    childrenProps[touchEvent] = createHandleSynthetic(touchEvent);
  }

  return <React.Fragment>{React.cloneElement(children, childrenProps)}</React.Fragment>;
});

ClickAwayListener.propTypes = {
  /**
   * The wrapped element.
   */
  children: elementAcceptingRef.isRequired,
  /**
   * If `true`, the React tree is ignored and only the DOM tree is considered.
   * This prop changes how portaled elements are handled.
   */
  disableReactTree: PropTypes.bool,
  /**
   * The mouse event to listen to. You can disable the listener by providing `false`.
   */
  mouseEvent: PropTypes.oneOf(['onClick', 'onMouseDown', 'onMouseUp', false]),
  /**
   * Callback fired when a "click away" event is detected.
   */
  onClickAway: PropTypes.func.isRequired,
  /**
   * The touch event to listen to. You can disable the listener by providing `false`.
   */
  touchEvent: PropTypes.oneOf(['onTouchStart', 'onTouchEnd', false]),
};

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  ClickAwayListener['propTypes' + ''] = exactProp(ClickAwayListener.propTypes);
}

export default ClickAwayListener;
