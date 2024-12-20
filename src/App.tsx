
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Search } from './components/pages/Search';
import { RatedMovies } from './components/pages/RatedMovies';
import { GenreProvider } from './components/context/GenreContext';
import { SessionProvider } from './components/context/SessionContext';
import { Navigation } from './components/Navigation/Navigation';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
    <Router>
      <SessionProvider>
        <GenreProvider>
              <Navigation />
              <Routes>
                <Route path="/" element={<Search />} />
                <Route path="/rated" element={<RatedMovies />} />
              </Routes>
        </GenreProvider>
      </SessionProvider>
    </Router>
    </div>
  );
}

export { App };