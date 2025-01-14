import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any; // TODO: Define proper user type
}

export const useAuth = () => {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
  });

  // TODO: Implement token refresh logic (QA.md #3)
  const refreshToken = async () => {
    // Token refresh implementation
  };

  // TODO: Implement Strava OAuth login (QA.md #1)
  const login = async () => {
    // Redirect to Strava OAuth
  };

  const logout = () => {
    // Clear tokens and auth state
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      user: null,
    });
  };

  useEffect(() => {
    // Check authentication status on mount
    // TODO: Implement auth check logic (QA.md #2)
  }, []);

  return {
    ...authState,
    login,
    logout,
  };
};
