import React, { ChangeEvent, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import styles from './SearchBar.module.css'

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const debouncedSearch = useDebouncedCallback(
    (value: string) => {
      if (value) {
        onSearch(value);
      }
    },
    500
  );

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  }, [debouncedSearch]);

  return (
    <input
      type='text'
      placeholder="Type to search..."
      onChange={handleChange}
      className={styles.input}
    />
  );
};

