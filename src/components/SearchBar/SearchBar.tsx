import React, { ChangeEvent } from 'react';
import { useDebounce } from 'use-debounce';
import styles from './SearchBar.module.css'

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [debouncedCallback] = useDebounce(
    handleSearch,
    5000
  );

  function handleSearch(value: string) {
    if (value) {
      onSearch(value);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    debouncedCallback(e.target.value);
  }

  return (
    <input
      type='text'
      placeholder="Type to search..."
      onChange={handleChange}
      className={styles.input}
    />
  );
};

export { SearchBar };