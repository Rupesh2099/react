/* eslint-disable react/no-danger */
import * as React from 'react';
import Box from '@mui/material/Box';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import ToggleDisplayOption, {
  API_LAYOUT_STORAGE_KEYS,
  useApiPageOption,
} from 'docs/src/modules/components/ApiPage/sections/ToggleDisplayOption';
import SlotsList from 'docs/src/modules/components/ApiPage/list/SlotsList';
import SlotsTable from 'docs/src/modules/components/ApiPage/table/SlotsTable';

export type SlotsSectionProps = {
  componentSlots: { class: string; name: string; default: string }[];
  slotDescriptions: { [key: string]: string };
  componentName: string;
  title?: string;
  titleHash?: string;
  level?: 'h2' | 'h3' | 'h4';
  spreadHint?: string;
};

export default function SlotsSection(props: SlotsSectionProps) {
  const {
    componentSlots,
    slotDescriptions,
    componentName,
    title = 'api-docs.slots',
    titleHash = 'slots',
    level: Level = 'h2',
    spreadHint,
  } = props;
  const t = useTranslate();

  const [displayOption, setDisplayOption] = useApiPageOption(API_LAYOUT_STORAGE_KEYS.slots);

  if (!componentSlots || componentSlots.length === 0) {
    return null;
  }

  const formatedSlots = componentSlots?.map(({ class: className, name, default: defaultValue }) => {
    return {
      description: slotDescriptions[name],
      className,
      name,
      defaultValue,
      componentName,
    };
  });

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
        <Level id={titleHash} style={{ flexGrow: 1 }}>
          {t(title)}
          <a
            aria-labelledby={titleHash}
            className="anchor-link"
            href={`#${titleHash}`}
            tabIndex={-1}
          >
            <svg>
              <use xlinkHref="#anchor-link-icon" />
            </svg>
          </a>
        </Level>
        <ToggleDisplayOption displayOption={displayOption} setDisplayOption={setDisplayOption} />
      </Box>
      {spreadHint && <p dangerouslySetInnerHTML={{ __html: spreadHint }} />}
      {displayOption === 'Table' ? (
        <SlotsTable slots={formatedSlots} />
      ) : (
        <SlotsList slots={formatedSlots} displayOption={displayOption} />
      )}
    </React.Fragment>
  );
}
