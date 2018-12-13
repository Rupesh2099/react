import { install as installNextStyles } from '@material-ui/styles';
import enzyme from 'enzyme/build/index';
import Adapter from 'enzyme-adapter-react-16';
import consoleError from './consoleError';

consoleError();

enzyme.configure({ adapter: new Adapter() });

installNextStyles();
