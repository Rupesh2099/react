import { LoadingButtonClassKey } from '../LoadingButton';
import { MasonryClassKey } from '../Masonry';
import { TabListClassKey } from '../TabList';
import { TabPanelClassKey } from '../TabPanel';
import { TimelineClassKey } from '../Timeline';
import { TimelineConnectorClassKey } from '../TimelineConnector';
import { TimelineContentClassKey } from '../TimelineContent';
import { TimelineDotClassKey } from '../TimelineDot';
import { TimelineItemClassKey } from '../TimelineItem';
import { TimelineOppositeContentClassKey } from '../TimelineOppositeContent';
import { TimelineSeparatorClassKey } from '../TimelineSeparator';
import { TreeItemClassKey } from '../TreeItem';
import { TreeViewClassKey } from '../TreeView';

// prettier-ignore
export interface LabComponentNameToClassKey {
  MuiLoadingButton: LoadingButtonClassKey;
  MuiMasonry: MasonryClassKey;
  MuiTabList: TabListClassKey;
  MuiTabPanel: TabPanelClassKey;
  MuiTimeline: TimelineClassKey;
  MuiTimelineConnector: TimelineConnectorClassKey;
  MuiTimelineContent: TimelineContentClassKey;
  MuiTimelineDot: TimelineDotClassKey;
  MuiTimelineItem: TimelineItemClassKey;
  MuiTimelineOppositeContent: TimelineOppositeContentClassKey;
  MuiTimelineSeparator: TimelineSeparatorClassKey;
  MuiTreeItem: TreeItemClassKey;
  MuiTreeView: TreeViewClassKey;
}

declare module '@mui/material/styles/overrides' {
  interface ComponentNameToClassKey extends LabComponentNameToClassKey {}
}

// disable automatic export
export {};
