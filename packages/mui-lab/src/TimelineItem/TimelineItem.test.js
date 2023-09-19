import * as React from 'react';
import { createRenderer, describeConformance } from '@mui-internal/test-utilities';
import TimelineItem, { timelineItemClasses as classes } from '@mui/lab/TimelineItem';

describe('<TimelineItem />', () => {
  const { render } = createRenderer();

  describeConformance(<TimelineItem />, () => ({
    classes,
    inheritComponent: 'li',
    render,
    muiName: 'MuiTimelineItem',
    refInstanceof: window.HTMLLIElement,
    skip: ['componentProp', 'componentsProp', 'themeVariants'],
  }));
});
