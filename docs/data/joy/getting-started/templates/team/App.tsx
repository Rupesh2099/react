import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Autocomplete from '@mui/joy/Autocomplete';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import Divider from '@mui/joy/Divider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Slider from '@mui/joy/Slider';
import Sheet from '@mui/joy/Sheet';
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

// Icons import
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import BookRoundedIcon from '@mui/icons-material/BookRounded';

// custom
import Layout from './components/Layout';

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="soft" color="neutral" />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="soft"
      color="neutral"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

function TeamNav() {
  return (
    <List size="sm" sx={{ '--ListItem-radius': '8px', '--List-gap': '4px' }}>
      <ListItem nested>
        <ListSubheader>
          Browse
          <IconButton
            size="sm"
            variant="plain"
            color="primary"
            sx={{ '--IconButton-size': '24px', ml: 'auto' }}
          >
            <KeyboardArrowDownRoundedIcon fontSize="small" color="primary" />
          </IconButton>
        </ListSubheader>
        <List
          aria-labelledby="nav-list-browse"
          sx={{
            '& .JoyListItemButton-root': { p: '8px' },
          }}
        >
          <ListItem>
            <ListItemButton selected>
              <ListItemDecorator>
                <PeopleRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>People</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator sx={{ color: 'neutral.500' }}>
                <AssignmentIndRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Managing accounts</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator sx={{ color: 'neutral.500' }}>
                <ArticleRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Policies</ListItemContent>
              <Chip
                variant="soft"
                color="neutral"
                size="sm"
                sx={{ borderRadius: 'sm' }}
              >
                Beta
              </Chip>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
    </List>
  );
}

export default function TeamExample() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <TeamNav />
        </Layout.SideDrawer>
      )}
      <Layout.Root
        sx={{
          ...(drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          }),
        }}
      >
        <Layout.Header>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <IconButton
              variant="outlined"
              size="sm"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              size="sm"
              variant="soft"
              sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
            >
              <GroupRoundedIcon />
            </IconButton>
            <Typography component="h1" fontWeight="xl">
              Team
            </Typography>
          </Box>
          <Input
            size="sm"
            variant="outlined"
            placeholder="Search anything…"
            startDecorator={<SearchRoundedIcon color="primary" />}
            endDecorator={
              <IconButton variant="outlined" color="neutral">
                <Typography fontWeight="lg" fontSize="sm" textColor="text.icon">
                  ⌘ + k
                </Typography>
              </IconButton>
            }
            sx={{
              flexBasis: '500px',
              display: {
                xs: 'none',
                sm: 'flex',
              },
              boxShadow: 'sm',
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
            <IconButton
              size="sm"
              variant="outlined"
              color="neutral"
              sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
            >
              <SearchRoundedIcon />
            </IconButton>

            <IconButton
              size="sm"
              variant="soft"
              color="neutral"
              component="a"
              href="/blog/first-look-at-joy/"
            >
              <BookRoundedIcon />
            </IconButton>
            <Dropdown>
              <MenuButton
                size="sm"
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'soft', color: 'neutral' } }}
              >
                <GridViewRoundedIcon />
              </MenuButton>
              <Menu size="sm" sx={{ zIndex: '999999' }}>
                <MenuItem>
                  <ListItemButton
                    role="menuitem"
                    component="a"
                    href="/joy-ui/getting-started/templates/email/"
                  >
                    <ListItemContent>
                      <Typography level="title-sm">Email</Typography>
                    </ListItemContent>
                  </ListItemButton>
                </MenuItem>
                <MenuItem selected>
                  <ListItemButton
                    selected
                    role="menuitem"
                    component="a"
                    href="/joy-ui/getting-started/templates/team/"
                  >
                    <ListItemContent>
                      <Typography level="title-sm">Teams</Typography>
                    </ListItemContent>
                  </ListItemButton>
                </MenuItem>
                <MenuItem>
                  <ListItemButton
                    role="menuitem"
                    component="a"
                    href="/joy-ui/getting-started/templates/files/"
                  >
                    <ListItemContent>
                      <Typography level="title-sm">Files</Typography>
                    </ListItemContent>
                  </ListItemButton>
                </MenuItem>
              </Menu>
            </Dropdown>
            <ColorSchemeToggle />
          </Box>
        </Layout.Header>
        <Layout.SideNav>
          <TeamNav />
        </Layout.SideNav>
        <Layout.SidePane>
          <Box
            sx={{
              p: 2,
              pb: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography level="title-sm">Filter by</Typography>
            <Button size="sm" variant="plain" sx={{ fontSize: 'xs', px: 1 }}>
              Clear filters
            </Button>
          </Box>
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography level="body-sm" textColor="text.primary">
                Keywords
              </Typography>
              <IconButton
                size="sm"
                variant="plain"
                color="primary"
                sx={{ '--IconButton-size': '24px' }}
              >
                <KeyboardArrowUpRoundedIcon fontSize="small" color="primary" />
              </IconButton>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Autocomplete
                placeholder="Position, skills, etc…"
                options={[
                  {
                    category: 'Position',
                    title: 'Frontend engineer',
                  },
                  {
                    category: 'Position',
                    title: 'Backend engineer',
                  },
                  {
                    category: 'Position',
                    title: 'Product manager',
                  },
                  {
                    category: 'Skill',
                    title: 'JavaScript',
                  },
                  {
                    category: 'Skill',
                    title: 'TypeScript',
                  },
                  {
                    category: 'Skill',
                    title: 'Project management',
                  },
                ]}
                groupBy={(option) => option.category}
                getOptionLabel={(option) => option.title}
              />
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Chip
                  variant="soft"
                  size="sm"
                  endDecorator={<ChipDelete variant="soft" />}
                  sx={{ '--Chip-radius': (theme) => theme.vars.radius.sm }}
                >
                  UI designer
                </Chip>
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography level="body-sm" textColor="text.primary">
                Location
              </Typography>
              <IconButton
                size="sm"
                variant="plain"
                color="primary"
                sx={{ '--IconButton-size': '24px' }}
              >
                <KeyboardArrowUpRoundedIcon fontSize="small" color="primary" />
              </IconButton>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Autocomplete
                placeholder="Position, skills, etc…"
                options={[
                  // some of Thailand provinces
                  'Bangkok',
                  'Amnat Charoen',
                  'Ang Thong',
                  'Bueng Kan',
                  'Buriram',
                  'Chachoengsao',
                  'Chai Nat',
                  'Chaiyaphum',
                  'Chanthaburi',
                  'Chiang Mai',
                  'Chiang Rai',
                  'Chonburi',
                ]}
              />
              <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
                <Slider
                  valueLabelFormat={(value) => `${value} km`}
                  defaultValue={6}
                  step={1}
                  min={0}
                  max={20}
                  valueLabelDisplay="on"
                />
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography level="body-sm" textColor="text.primary">
                Education
              </Typography>
              <IconButton
                size="sm"
                variant="plain"
                color="primary"
                sx={{ '--IconButton-size': '24px' }}
              >
                <KeyboardArrowUpRoundedIcon fontSize="small" color="primary" />
              </IconButton>
            </Box>
            <Box sx={{ mt: 2 }}>
              <RadioGroup name="education" defaultValue="any">
                <Radio label="Any" value="any" size="sm" />
                <Radio label="High School" value="high-school" size="sm" />
                <Radio label="College" value="college" size="sm" />
                <Radio label="Post-graduate" value="post-graduate" size="sm" />
              </RadioGroup>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography level="body-sm" textColor="text.primary">
                Previous experience
              </Typography>
              <IconButton
                size="sm"
                variant="plain"
                color="primary"
                sx={{ '--IconButton-size': '24px' }}
              >
                <KeyboardArrowDownRoundedIcon fontSize="small" color="primary" />
              </IconButton>
            </Box>
          </Box>
        </Layout.SidePane>
        <Layout.Main>
          <List
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 2,
            }}
          >
            {[...Array(3)].map((_, index) => (
              <Sheet
                key={index}
                component="li"
                variant="outlined"
                sx={{
                  borderRadius: 'sm',
                  p: 2,
                  listStyle: 'none',
                }}
              >
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Avatar
                    src="https://i.pravatar.cc/40?img=6"
                    srcSet="https://i.pravatar.cc/80?img=6 2x"
                    sx={{ borderRadius: 'sm' }}
                  />
                  <div>
                    <Typography>Andrew Smith</Typography>
                    <Typography level="body-xs">UI Designer</Typography>
                  </div>
                </Box>
                <Divider component="div" sx={{ my: 2 }} />
                <List sx={{ '--ListItemDecorator-size': '48px' }}>
                  <ListItem sx={{ alignItems: 'flex-start' }}>
                    <ListItemDecorator
                      sx={{
                        '&:before': {
                          content: '""',
                          position: 'absolute',
                          height: '100%',
                          width: '2px',
                          bgcolor: 'divider',
                          left: 'calc(var(--ListItem-paddingLeft) + 15px)',
                          top: '50%',
                        },
                      }}
                    >
                      <Avatar
                        size="sm"
                        src="https://www.vectorlogo.zone/logos/dribbble/dribbble-icon.svg"
                      />
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography fontSize="sm">Senior designer</Typography>
                      <Typography level="body-xs">Dribbble</Typography>
                    </ListItemContent>
                    <Typography level="body-sm">2015-now</Typography>
                  </ListItem>
                  <ListItem sx={{ alignItems: 'flex-start' }}>
                    <ListItemDecorator>
                      <Avatar
                        size="sm"
                        src="https://www.vectorlogo.zone/logos/pinterest/pinterest-icon.svg"
                        sx={{ backgroundColor: 'background.body' }}
                      />
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography fontSize="sm">Designer</Typography>
                      <Typography level="body-xs">Pinterest</Typography>
                    </ListItemContent>
                    <Typography level="body-sm">2012-2015</Typography>
                  </ListItem>
                </List>
                <Button
                  size="sm"
                  variant="plain"
                  endDecorator={<KeyboardArrowRightRoundedIcon fontSize="small" />}
                  sx={{ px: 1, mt: 1 }}
                >
                  Expand
                </Button>
                <Divider component="div" sx={{ my: 2 }} />
                <Typography fontSize="sm">Skills tags:</Typography>
                <Box sx={{ mt: 1.5, display: 'flex', gap: 1 }}>
                  <Chip
                    variant="outlined"
                    color="neutral"
                    size="sm"
                    sx={{ borderRadius: 'sm' }}
                  >
                    UI design
                  </Chip>
                  <Chip
                    variant="outlined"
                    color="neutral"
                    size="sm"
                    sx={{ borderRadius: 'sm' }}
                  >
                    Illustration
                  </Chip>
                </Box>
              </Sheet>
            ))}
          </List>
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}
