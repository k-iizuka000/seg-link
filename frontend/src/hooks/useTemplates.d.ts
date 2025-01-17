declare module 'hooks/useTemplates' {
  export const useTemplates: () => {
    templates: any[];
    loading: boolean;
    error: any;
  };
} 