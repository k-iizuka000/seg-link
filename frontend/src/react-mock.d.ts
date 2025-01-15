declare namespace NodeJS {
  interface Global {
    react_1: {
      lazy: typeof import('react').lazy;
      useState: typeof import('react').useState;
      useEffect: typeof import('react').useEffect;
    };
  }
}

declare const react_1: typeof import('react');
