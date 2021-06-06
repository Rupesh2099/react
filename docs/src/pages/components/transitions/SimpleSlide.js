import * as React from 'react';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const icon = (
  <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
    <Box component="svg" sx={{ width: 100, height: 100 }}>
      <Box
        component="polygon"
        sx={{
          fill: (theme) => theme.palette.common.white,
          stroke: (theme) => theme.palette.divider,
          strokeWidth: 1,
        }}
        points="0,100 50,00, 100,100"
      />
    </Box>
  </Paper>
);

export default function SimpleSlide() {
  const [slideInFromScreenEdge, setSlideInFromScreenEdge] = React.useState(false);

  const [slideInFromTargetEdge, setSlideInFromTargetEdge] = React.useState(false);
  const slideTargetRef = React.useRef(null);

  const handleSlideInFromScreenEdge = () => {
    setSlideInFromScreenEdge((prev) => !prev);
  };

  const handleSlideInFromTargetEdge = () => {
    setSlideInFromTargetEdge((prev) => !prev);
  };

  return (
    <Box display="flex" sx={{ height: 180, width: 360 }} ref={slideTargetRef}>
      <Box display="flex">
        <Box sx={{ width: 160 }}>
          <FormControlLabel
            control={
              <Switch
                checked={slideInFromScreenEdge}
                onChange={handleSlideInFromScreenEdge}
              />
            }
            label="Show"
          />
          <Slide
            direction="up"
            in={slideInFromScreenEdge}
            mountOnEnter
            unmountOnExit
          >
            {icon}
          </Slide>
        </Box>
        <Box sx={{ width: 200 }}>
          <FormControlLabel
            control={
              <Switch
                checked={slideInFromTargetEdge}
                onChange={handleSlideInFromTargetEdge}
              />
            }
            label="Show(from target)"
          />
          <Slide
            direction="up"
            in={slideInFromTargetEdge}
            targetRef={slideTargetRef}
            mountOnEnter
            unmountOnExit
          >
            {icon}
          </Slide>
        </Box>
      </Box>
    </Box>
  );
}
