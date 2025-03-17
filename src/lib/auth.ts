
// This would typically communicate with a backend service
// For this demo, we'll simulate the authentication flow

import { AuthFormData } from "./validation";
import { toast } from "@/hooks/use-toast";

// Hardcoded credentials (in a real app, these would be in environment variables)
const AUTH_CREDENTIALS = {
  username: "admin",
  email: "admin@local.net",
  password: "Admin@123"
};

// Simulated authentication function
export async function authenticateUser(data: AuthFormData): Promise<{ success: boolean, token?: string, error?: string }> {
  try {
    // In a real app, this would be an API call to your backend
    // For demo purposes, we're simulating a successful authentication
    // with a 1 second delay to mimic network latency
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, we'll authorize valid credentials
    // In a real app, you would validate against backend stored credentials
    if (
      data.username === AUTH_CREDENTIALS.username && 
      data.email === AUTH_CREDENTIALS.email && 
      data.password === AUTH_CREDENTIALS.password
    ) {
      // Generate a mock JWT token
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBsb2NhbC5uZXQiLCJpYXQiOjE2MTYxNTE2MTYsImV4cCI6MTYxNjE1NTIxNn0.SomeRandomSignature";
      
      // Store the token in localStorage for demo purposes
      // In a real application, you might use HTTP-only cookies or a more secure approach
      localStorage.setItem("authToken", token);
      
      return { success: true, token };
    } else {
      // Authentication failed
      return { 
        success: false, 
        error: "Invalid credentials. Please check your username, email, and password."
      };
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return { 
      success: false, 
      error: "An unexpected error occurred. Please try again later."
    };
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  const token = localStorage.getItem("authToken");
  return !!token; // Return true if token exists
}

// Log out the user
export function logoutUser(): void {
  localStorage.removeItem("authToken");
  toast({
    title: "Logged out",
    description: "You have been successfully logged out.",
  });
}
