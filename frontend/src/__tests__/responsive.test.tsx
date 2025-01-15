import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

// React.lazyのモック実装
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  lazy: (fn: () => Promise<{ default: React.ComponentType }>) => {
    const Component: React.FC = () => {
      const [comp, setComp] = React.useState<React.ComponentType | null>(null);
      React.useEffect(() => {
        fn().then(mod => {
          setComp(() => mod.default);
        });
      }, []);
      return comp ? React.createElement(comp) : null;
    };
    return Component;
  }
}));

describe('レスポンシブデザインテスト', () => {
  const resolutions = [
    { width: 320, height: 568, name: 'モバイル' },
    { width: 768, height: 1024, name: 'タブレット' },
    { width: 1366, height: 768, name: 'デスクトップ' },
  ];

  resolutions.forEach(({ width, height, name }) => {
    test(`${name}解像度 (${width}x${height}) でレンダリングできること`, () => {
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width });
      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: height });
      window.dispatchEvent(new Event('resize'));

      const { container } = render(<App />);

      expect(container).toBeInTheDocument();
    });
  });
});
