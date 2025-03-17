
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Browser } from "@/components/Browser";
import { isAuthenticated } from "@/lib/auth";

const Dashboard = () => {
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <div className="flex-1 container py-6 px-4 mx-auto flex flex-col">
        <h1 className="text-2xl font-semibold mb-6">Local Network Browser</h1>
        
        <div className="flex-1 bg-background rounded-lg shadow-lg overflow-hidden border">
          <Browser />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
