import * as React from 'react';
import { Transition } from 'react-transition-group';
import { useTheme } from '@mui/system';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseIcon from '@mui/icons-material/Close';
import { Snackbar } from '@mui/base/Snackbar';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function UnstyledSnackbarIntroduction() {
  const isDarkMode = useIsDarkMode();

  const [open, setOpen] = React.useState(false);
  const [exited, setExited] = React.useState(true);
  const nodeRef = React.useRef(null);

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleOnEnter = () => {
    setExited(false);
  };

  const handleOnExited = () => {
    setExited(true);
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <button
        className="cursor-pointer transition text-sm font-sans font-semibold leading-normal bg-violet-500 text-white rounded-lg px-4 py-2 border border-solid border-violet-500 shadow-[0_2px_1px_rgb(45_45_60_/_0.2),_inset_0_1.5px_1px_#a78bfa,_inset_0_-2px_1px_#7c3aed] dark:shadow-[0_2px_1px_rgb(0_0_0/_0.5),_inset_0_1.5px_1px_#a78bfa,_inset_0_-2px_1px_#7c3aed] hover:bg-violet-600 active:bg-violet-700 active:shadow-none focus-visible:shadow-[0_0_0_4px_#ddd6fe] dark:focus-visible:shadow-[0_0_0_4px_#a78bfa] focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        type="button"
        onClick={handleClick}
      >
        Open snackbar
      </button>
      <Snackbar
        autoHideDuration={5000}
        open={open}
        onClose={handleClose}
        exited={exited}
        className="fixed z-50 font-sans flex right-4 bottom-4 left-auto max-w-xl	min-w-xs"
      >
        <Transition
          timeout={{ enter: 400, exit: 400 }}
          in={open}
          appear
          unmountOnExit
          onEnter={handleOnEnter}
          onExited={handleOnExited}
          nodeRef={nodeRef}
        >
          {(status) => (
            <div
              className="flex gap-4	overflow-hidden	bg-white dark:bg-slate-900 rounded-lg	border border-solid border-slate-200 dark:border-slate-700 shadow-md text-slate-900 dark:text-slate-50 p-3	text-start"
              style={{
                transform: positioningStyles[status],
                transition: 'transform 300ms ease',
              }}
              ref={nodeRef}
            >
              <CheckRoundedIcon
                sx={{
                  color: 'success.main',
                  flexShrink: 0,
                  width: '1.25rem',
                  height: '1.5rem',
                }}
              />
              <div className="flex-1	max-w-full">
                <p className="m-0 leading-normal mr-2 font-medium">
                  Notifications sent
                </p>
                <p className="m-0 leading-normal font-normal	text-slate-800 dark:text-slate-400">
                  Everything was sent to the desired address.
                </p>
              </div>
              <CloseIcon
                onClick={handleClose}
                className="cursor-pointer	shrink-0	p-0.5	rounded hover:bg-slate-50 hover:dark:bg-slate-800"
              />
            </div>
          )}
        </Transition>
      </Snackbar>
    </div>
  );
}

const positioningStyles = {
  entering: 'translateX(0)',
  entered: 'translateX(0)',
  exiting: 'translateX(500px)',
  exited: 'translateX(500px)',
  unmounted: 'translateX(500px)',
};
