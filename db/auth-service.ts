import { User, findUserByEmail, findOrCreateSocialUser, createUser } from './models/user';

// Mock function for password hashing - in a real app, use bcrypt or similar
const hashPassword = (password: string): string => {
  return `hashed_${password}`;
};

// Mock function for password validation - in a real app, use bcrypt.compare or similar
const validatePassword = (password: string, hashedPassword: string): boolean => {
  return hashedPassword === `hashed_${password}`;
};

export const emailPasswordSignIn = async (email: string, password: string): Promise<User | null> => {
  const user = findUserByEmail(email);
  
  if (!user || !user.password) {
    return null; // User not found or no password (social login only)
  }
  
  if (validatePassword(password, user.password)) {
    return user;
  }
  
  return null; // Password doesn't match
};

export const emailPasswordSignUp = async (
  name: string,
  email: string,
  password: string,
  phone?: string
): Promise<User | null> => {
  // Check if user already exists
  const existingUser = findUserByEmail(email);
  if (existingUser) {
    return null; // User already exists
  }
  
  // Create new user
  const hashedPassword = hashPassword(password);
  
  const newUser = createUser({
    name,
    email,
    phone,
    password: hashedPassword,
    provider: 'email'
  });
  
  return newUser;
};

export const googleSignIn = async (googleUser: {
  id: string;
  email: string;
  name: string;
  picture?: string;
}): Promise<User> => {
  return findOrCreateSocialUser(
    'google',
    googleUser.id,
    googleUser.email,
    googleUser.name,
    googleUser.picture
  );
};

export const facebookSignIn = async (facebookUser: {
  id: string;
  email: string;
  name: string;
  picture?: string;
}): Promise<User> => {
  return findOrCreateSocialUser(
    'facebook',
    facebookUser.id,
    facebookUser.email,
    facebookUser.name,
    facebookUser.picture
  );
};

// Mock implementation of Google OAuth
export const mockGoogleSignIn = (): Promise<User> => {
  // In a real app, this would come from actual Google OAuth
  return Promise.resolve(
    googleSignIn({
      id: 'google_123456789',
      email: 'user@gmail.com',
      name: 'Google User',
      picture: '/images/profile-placeholder.jpg'
    })
  );
};

// Mock implementation of Facebook OAuth
export const mockFacebookSignIn = (): Promise<User> => {
  // In a real app, this would come from actual Facebook OAuth
  return Promise.resolve(
    facebookSignIn({
      id: 'facebook_123456789',
      email: 'user@facebook.com',
      name: 'Facebook User',
      picture: '/images/profile-placeholder.jpg'
    })
  );
}; 