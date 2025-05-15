export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  // Add other auth-related screens here
};

// Extend this as your app grows
export type RootStackParamList = AuthStackParamList & {
  // Home: undefined;
  // Other screens...
};