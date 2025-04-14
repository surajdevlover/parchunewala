import { User } from "@/db/models/user";

// Check if a user is authenticated
export const isAuthenticated = (): boolean => {
  // In client-side code, check localStorage
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('currentUser');
    return !!user;
  }
  return false;
};

// Get the current user if authenticated
export const getCurrentUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      try {
        return JSON.parse(userJson);
      } catch (error) {
        console.error('Error parsing user JSON:', error);
        return null;
      }
    }
  }
  return null;
};

// Redirect to login if not authenticated
export const requireAuthentication = (
  callback: () => void,
  redirectToLogin: () => void
): void => {
  if (isAuthenticated()) {
    callback();
  } else {
    redirectToLogin();
  }
}; 