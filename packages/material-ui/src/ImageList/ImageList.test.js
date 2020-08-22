import * as React from 'react';
import { expect } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import ImageList from './ImageList';
import consoleErrorMock from 'test/utils/consoleErrorMock';

const tilesData = [
  {
    img: 'images/image-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: 'images/image-list/burger-827309_640.jpg',
    title: 'Tasty burger',
    author: 'director90',
  },
];

describe('<ImageList />', () => {
  let classes;
  const mount = createMount();
  let shallow;

  before(() => {
    classes = getClasses(<ImageList />);
    shallow = createShallow({ dive: true });
  });

  describeConformance(
    <ImageList>
      <div />
    </ImageList>,
    () => ({
      classes,
      inheritComponent: 'ul',
      mount,
      refInstanceof: window.HTMLUListElement,
      testComponentPropWith: 'li',
    }),
  );

  it('should render children and change cellHeight', () => {
    const cellHeight = 250;
    const wrapper = shallow(
      <ImageList cellHeight={cellHeight}>
        {tilesData.map((tile) => (
          <span
            key={tile.img}
            className="image-tile"
            title={tile.title}
            subtitle={<span>by: {tile.author}</span>}
          >
            <img src={tile.img} alt="foo" />
          </span>
        ))}
      </ImageList>,
    );

    expect(wrapper.find('.image-tile').length).to.equal(2);
    expect(wrapper.children().at(0).props().style.height).to.equal(cellHeight + 4);
  });

  it('renders children by default', () => {
    const wrapper = shallow(
      <ImageList>
        {tilesData.map((tile) => (
          <span
            key={tile.img}
            className="image-tile"
            title={tile.title}
            subtitle={<span>by: {tile.author}</span>}
          >
            <img src={tile.img} alt="foo" />
          </span>
        ))}
        {false && <span>this is a null child</span>}
      </ImageList>,
    );

    expect(wrapper.find('.image-tile').length).to.equal(2);
  });

  it('renders children and change cols', () => {
    const wrapper = shallow(
      <ImageList cols={4}>
        {tilesData.map((tile) => (
          <span
            key={tile.img}
            className="image-tile"
            title={tile.title}
            subtitle={<span>by: {tile.author}</span>}
          >
            <img src={tile.img} alt="foo" />
          </span>
        ))}
      </ImageList>,
    );

    expect(wrapper.find('.image-tile').length).to.equal(2);
    expect(wrapper.children().at(0).props().style.width).to.equal('25%');
  });

  it('renders children and change spacing', () => {
    const spacing = 10;
    const wrapper = shallow(
      <ImageList spacing={spacing}>
        {tilesData.map((tile) => (
          <span
            key={tile.img}
            className="image-tile"
            title={tile.title}
            subtitle={<span>by: {tile.author}</span>}
          >
            <img src={tile.img} alt="foo" />
          </span>
        ))}
      </ImageList>,
    );

    expect(wrapper.find('.image-tile').length).to.equal(2);
    expect(wrapper.children().at(0).props().style.padding).to.equal(spacing / 2);
  });

  it('should render children and overwrite style', () => {
    const style = { backgroundColor: 'red' };
    const wrapper = shallow(
      <ImageList style={style}>
        {tilesData.map((tile) => (
          <span
            key={tile.img}
            className="image-tile"
            title={tile.title}
            subtitle={<span>by: {tile.author}</span>}
          >
            <img src={tile.img} alt="foo" />
          </span>
        ))}
      </ImageList>,
    );

    expect(wrapper.find('.image-tile').length).to.equal(2);
    expect(wrapper.props().style.backgroundColor).to.equal(style.backgroundColor);
  });

  describe('prop: cellHeight', () => {
    it('should accept auto as a property', () => {
      const wrapper = shallow(
        <ImageList cellHeight="auto">
          <br />
        </ImageList>,
      );

      expect(wrapper.children().at(0).props().style.height).to.equal('auto');
    });
  });

  describe('warnings', () => {
    before(() => {
      consoleErrorMock.spy();
    });

    after(() => {
      consoleErrorMock.reset();
    });

    it('warns a Fragment is passed as a child', () => {
      mount(
        <ImageList>
          <React.Fragment />
        </ImageList>,
      );

      expect(consoleErrorMock.callCount()).to.equal(1);
      expect(consoleErrorMock.messages()[0]).to.include(
        "Material-UI: The ImageList component doesn't accept a Fragment as a child.",
      );
    });
  });
});
