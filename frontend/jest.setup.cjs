const { TextEncoder, TextDecoder } = require('text-encoding');
const React = require('react');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Reactモックをグローバルに設定
const react_1 = {
  ...React,
  lazy: (fn) => {
    const Component = React.forwardRef((props, ref) => {
      const [comp, setComp] = React.useState(null);
      React.useEffect(() => {
        fn().then(mod => {
          setComp(() => mod.default);
        });
      }, []);
      return comp ? React.createElement(comp, { ...props, ref }) : null;
    });
    Component.displayName = 'LazyComponent';
    return Component;
  },
  useState: React.useState,
  useEffect: React.useEffect
};

global.react_1 = react_1;
module.exports = react_1;
