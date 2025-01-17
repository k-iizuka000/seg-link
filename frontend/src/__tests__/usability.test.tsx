import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AccessibilityProvider } from '@/components/common/AccessibilityProvider';
import App from '@/App';
import '@testing-library/jest-dom';

// React.lazyのモック実装を簡略化
jest.mock('react', () => {
  const actualReact = jest.requireActual('react');
  return {
    ...actualReact,
    lazy: <T extends React.ComponentType<any>>(fn: () => Promise<{ default: T }>) => {
      const Component = actualReact.forwardRef<React.ElementRef<T>, React.ComponentPropsWithoutRef<T>>(
        (props: React.ComponentPropsWithoutRef<T>, ref: React.ForwardedRef<React.ElementRef<T>>) => {
        const [Resolved, setResolved] = React.useState<T | undefined>();

        React.useEffect(() => {
          fn().then((module) => {
            setResolved(module.default);
          });
        }, [fn]);

        if (!Resolved) {
          return null;
        }

        return <Resolved {...props} ref={ref} />;
      }
      );

      Component.displayName = 'LazyComponent';
      return Component;
    },
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
