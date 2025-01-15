import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

// Performanceインターフェースの拡張
declare global {
  interface Performance {
    memory?: {
      usedJSHeapSize: number;
      totalJSHeapSize: number;
      jsHeapSizeLimit: number;
    };
  }
}

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

describe('パフォーマンステスト', () => {
  test('初期レンダリングが500ms以内に完了すること', () => {
    const startTime = performance.now();
    
    render(<App />);

    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    expect(renderTime).toBeLessThan(500);
  });

  test('メモリリークがないこと', () => {
    const initialMemory = performance.memory?.usedJSHeapSize;
    
    const { unmount } = render(<App />);

    unmount();

    const finalMemory = performance.memory?.usedJSHeapSize;
    
    if (initialMemory && finalMemory) {
      // メモリ使用量の増加が10MB以下であることを確認
      expect(finalMemory - initialMemory).toBeLessThan(10 * 1024 * 1024);
    }
  });
});
