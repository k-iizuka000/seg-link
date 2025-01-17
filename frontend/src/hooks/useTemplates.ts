import { useState, useEffect } from 'react';
import axios from 'axios';
import { Template } from '@/types';

type ErrorType = {
  message: string;
  code?: number;
};

interface TemplateError {
  message: string;
  status?: number;
}

export const useTemplates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<TemplateError | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get<Template[]>('/api/templates');
        setTemplates(response.data);
      } catch (err) {
        setError({
          message: err instanceof Error ? err.message : 'Failed to fetch templates',
          status: axios.isAxiosError(err) ? err.response?.status : undefined
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  return { templates, loading, error };
}; 