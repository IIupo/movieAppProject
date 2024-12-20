import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createGuestSession } from '../services/api';
import { GuestSession } from '../types/movie';

interface SessionContextType {
  session: GuestSession | null;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType>({
  session: null,
  isLoading: false,
});

const useSession = () => useContext(SessionContext);

interface SessionProviderProps {
  children: ReactNode;
}

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [session, setSession] = useState<GuestSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initSession = async () => {
      try {
        setIsLoading(true);
        const newSession = await createGuestSession();
        setSession(newSession);
      } catch (err) {
        console.error('Failed to initialize session', err);
      } finally {
        setIsLoading(false);
      }
    };

    initSession();
  }, []);

  return (
    <SessionContext.Provider value={{ session, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};
export {SessionProvider, useSession}