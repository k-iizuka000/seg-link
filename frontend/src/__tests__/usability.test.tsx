import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AccessibilityProvider } from '../components/common/AccessibilityProvider';
import App from '../App';
import '@testing-library/jest-dom';

// React.lazyのモック実装
jest.mock('react', () => {
  const actualReact = jest.requireActual('react');
  return {
    ...actualReact,
    lazy: (fn: () => Promise<{ default: React.ComponentType<unknown> }>) => {
      return actualReact.forwardRef<React.ComponentType<unknown>, React.PropsWithChildren<unknown>>((props: React.PropsWithChildren<unknown>, ref: React.ForwardedRef<React.ComponentType<unknown>>) => {
        const [Comp, setComp] = React.useState<React.ComponentType<unknown> | null>(null);
        
        React.useEffect(() => {
          fn().then(mod => setComp(() => mod.default));
        }, [fn]);

        if (!Comp) return null;
        return React.createElement(Comp, { ...props, ref } as React.Attributes & { ref?: React.ForwardedRef<React.ComponentType<unknown>> });
      });
    }
  };
});

describe('ユーザビリティテスト', () => {
  test('キーボードナビゲーションが機能すること', () => {
    render(
      <BrowserRouter>
        <AccessibilityProvider>
          <App />
        </AccessibilityProvider>
      </BrowserRouter>
    );

    // タブキーでフォーカス移動をテスト
    const focusableElements = screen.getAllByRole('button');
    focusableElements.forEach((element) => {
      element.focus();
      expect(document.activeElement).toBe(element);
    });
  });

  test('アクセシビリティ要素が適切に設定されていること', () => {
    render(<App />);

    // 画像に alt 属性があることを確認
    const images = screen.getAllByRole('img');
    images.forEach((img) => {
      expect(img).toHaveAttribute('alt');
    });

    // フォームラベルが適切に設定されていることを確認
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach((input) => {
      expect(input).toHaveAttribute('aria-label');
    });
  });
});
