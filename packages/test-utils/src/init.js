import enzyme from 'enzyme';
import Adapter from '@mnajdova/enzyme-adapter-react-18';
import { configure } from '@testing-library/react/pure';
import './initMatchers';

enzyme.configure({ adapter: new Adapter() });

// checking if an element is hidden is quite expensive
// this is only done in CI as a fail safe. It can still explicitly be checked
// in the test files which helps documenting what is part of the DOM but hidden
// from assistive technology
const defaultHidden = !process.env.CI;
// adds verbosity for something that might be confusing
console.warn(`${defaultHidden ? 'including' : 'excluding'} inaccessible elements by default`);
configure({ defaultHidden });
