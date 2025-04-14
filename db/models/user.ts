export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password?: string; // Hashed password for email/password login
  profileImage?: string;
  provider?: 'email' | 'google' | 'facebook'; // Authentication provider
  providerId?: string; // ID from provider (Google/Facebook)
  createdAt: Date;
  updatedAt: Date;
}

// Mock database - in a real application, this would be replaced with a real database
const users: User[] = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    phone: '+91 9876543210',
    password: 'hashed_password_would_be_here',
    provider: 'email',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const createUser = (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User => {
  const newUser: User = {
    ...userData,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  users.push(newUser);
  // In a real app, this would save to a database
  saveToLocalStorage();
  
  return newUser;
};

export const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

export const findUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const findOrCreateSocialUser = (
  provider: 'google' | 'facebook',
  providerId: string,
  email: string,
  name: string,
  profileImage?: string
): User => {
  // Try to find existing user by provider ID or email
  let user = users.find(u => 
    (u.provider === provider && u.providerId === providerId) || 
    u.email === email
  );
  
  if (!user) {
    // Create new user if not found
    user = createUser({
      name,
      email,
      provider,
      providerId,
      profileImage
    });
  }
  
  return user;
};

// Save users to localStorage (for demo purposes)
function saveToLocalStorage() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('users', JSON.stringify(users));
  }
}

// Load users from localStorage (for demo purposes)
export function loadFromLocalStorage() {
  if (typeof window !== 'undefined') {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      const parsedUsers = JSON.parse(savedUsers);
      users.length = 0; // Clear the array
      users.push(...parsedUsers);
    }
  }
}

// Initialize by loading from localStorage
if (typeof window !== 'undefined') {
  loadFromLocalStorage();
} 