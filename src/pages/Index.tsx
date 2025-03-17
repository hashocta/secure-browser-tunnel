
import { AuthForm } from "@/components/AuthForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";

const Index = () => {
  const navigate = useNavigate();

  // If user is already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <AuthForm />
      
      <footer className="mt-16 text-center text-xs text-muted-foreground">
        <p>Secure Browser Tunnel | Made with ♥ by Lovable</p>
        <p className="mt-1">© {new Date().getFullYear()} All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Index;
