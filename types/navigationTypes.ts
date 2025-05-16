export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  // Add other auth-related screens here
};

// Extend this as your app grows
export type RootStackParamList = AuthStackParamList & {
  Dashboard: undefined;
  // Other screens...
};