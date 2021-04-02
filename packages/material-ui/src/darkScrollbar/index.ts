// track, thumb and active are derieved from macOS 10.15.7
const scrollBar = {
  track: '#2b2b2b',
  thumb: '#6b6b6b',
  active: '#959595',
};

export default function darkScrollbar(options = scrollBar) {
  return `
    scrollbar-color: ${options.thumb} ${options.track};
    &::-webkit-scrollbar, & *::-webkit-scrollbar {
      background-color: ${options.track};
    }
    &::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background-color: ${options.thumb};
      min-height: 24px;
      border: '3px solid ${options.track}';
    }
    &::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus {
      background-color: ${options.active};
    }
    &::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active {
      background-color: ${options.active};
    }
    &::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover {
      background-color: ${options.active};
    }
    &::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner {
      background-color: ${options.track};
    }
  `;
}
