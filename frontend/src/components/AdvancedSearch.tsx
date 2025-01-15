import { useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorMessage } from '../components/ErrorMessage';
import { LoadingSpinner } from '../components/LoadingSpinner';

interface SearchResult {
  name: string;
  type: string;
  details: string;
}

function AdvancedSearch() {
  const [searchParams, setSearchParams] = useState({
    clothing: '',
    wheel: '',
    wind: '',
    weight: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const { data: results, error, refetch } = useQuery(
    ['search', searchParams],
    async () => {
      const response = await axios.post('/api/search', searchParams);
      return response.data;
    },
    { enabled: false }
  );

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      refetch();
    }
  }, [refetch]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="advanced-search"
      role="region"
      aria-label="詳細検索セクション"
    >
      <h1 tabIndex={0}>複合条件検索</h1>
      <div 
        role="search" 
        aria-label="詳細検索フォーム"
        className="search-form"
      >
        <input
          type="text"
          placeholder="服装"
          value={searchParams.clothing}
          onChange={(e) => setSearchParams(prev => ({ ...prev, clothing: e.target.value }))}
          onKeyPress={handleKeyPress}
          aria-label="服装"
          className="search-input"
        />
        <input
          type="text"
          placeholder="ホイール"
          value={searchParams.wheel}
          onChange={(e) => setSearchParams(prev => ({ ...prev, wheel: e.target.value }))}
          onKeyPress={handleKeyPress}
          aria-label="ホイール"
          className="search-input"
        />
        <input
          type="text"
          placeholder="風"
          value={searchParams.wind}
          onChange={(e) => setSearchParams(prev => ({ ...prev, wind: e.target.value }))}
          onKeyPress={handleKeyPress}
          aria-label="風"
          className="search-input"
        />
        <input
          type="text"
          placeholder="体重"
          value={searchParams.weight}
          onChange={(e) => setSearchParams(prev => ({ ...prev, weight: e.target.value }))}
          onKeyPress={handleKeyPress}
          aria-label="体重"
          className="search-input"
        />
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => refetch()}
          disabled={isLoading}
          aria-busy={isLoading}
          className="search-button"
        >
          {isLoading ? '検索中...' : '検索'}
        </motion.button>
      </div>

      <AnimatePresence>
        {isLoading && <LoadingSpinner />}
        {error && <ErrorMessage message={error.message} />}
        <h2>検索結果</h2>
        <ul>
          {results?.map((result, index) => (
            <li key={index}>
              {result.type === 'segment' ? 'セグメント' : 'アクティビティ'}: {result.name} - {result.details}
            </li>
          ))}
        </ul>
      </AnimatePresence>
    </motion.div>
  );
}

export default AdvancedSearch;