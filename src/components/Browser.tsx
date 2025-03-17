
import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui-custom/Card";
import { Button } from "@/components/ui-custom/Button";
import { Input } from "@/components/ui-custom/Input";
import { logoutUser } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Home,
  Shield,
  X,
  Globe,
  Wifi,
  LogOut,
} from "lucide-react";

const LOCAL_IP = "192.168.73.101"; // Example local IP
const DEFAULT_URL = `http://${LOCAL_IP}`;

export function Browser() {
  const [url, setUrl] = useState(DEFAULT_URL);
  const [currentUrl, setCurrentUrl] = useState(DEFAULT_URL);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(true);
  const [history, setHistory] = useState<string[]>([DEFAULT_URL]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Simulate loading state
  const navigateToUrl = (targetUrl: string) => {
    if (!targetUrl.startsWith("http")) {
      targetUrl = `http://${targetUrl}`;
    }
    
    setLoading(true);
    setCurrentUrl(targetUrl);
    setUrl(targetUrl);
    
    // Update history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(targetUrl);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    
    // Simulate connection check
    const randomSuccess = Math.random() > 0.2; // 80% success rate for demo
    
    setTimeout(() => {
      setLoading(false);
      setConnected(randomSuccess);
      
      if (!randomSuccess) {
        toast({
          title: "Connection Error",
          description: "Unable to connect to the local network resource",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  // Go back in history
  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentUrl(history[historyIndex - 1]);
      setUrl(history[historyIndex - 1]);
      setLoading(true);
      setTimeout(() => setLoading(false), 800);
    }
  };

  // Go forward in history
  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentUrl(history[historyIndex + 1]);
      setUrl(history[historyIndex + 1]);
      setLoading(true);
      setTimeout(() => setLoading(false), 800);
    }
  };

  // Refresh the current page
  const refreshPage = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // For a real app, you would reload the iframe content
      if (iframeRef.current) {
        iframeRef.current.src = currentUrl;
      }
    }, 1000);
  };

  // Go to home page
  const goHome = () => {
    navigateToUrl(DEFAULT_URL);
  };

  // Handle URL form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateToUrl(url);
  };

  // Handle logout
  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  // Auto navigate on first load
  useEffect(() => {
    // Simulate initial loading
    setLoading(true);
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Browser header */}
      <div className="bg-card rounded-t-lg border-b shadow-sm">
        <div className="flex items-center p-2 gap-2">
          <div className="flex items-center gap-1.5">
            {/* Navigation controls */}
            <Button
              variant="ghost"
              size="icon"
              onClick={goBack}
              disabled={historyIndex === 0 || loading}
              className="rounded-full"
            >
              <ArrowLeft size={16} />
              <span className="sr-only">Back</span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={goForward}
              disabled={historyIndex === history.length - 1 || loading}
              className="rounded-full"
            >
              <ArrowRight size={16} />
              <span className="sr-only">Forward</span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={refreshPage}
              disabled={loading}
              className={`rounded-full ${loading ? "animate-spin" : ""}`}
            >
              <RefreshCw size={16} />
              <span className="sr-only">Refresh</span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={goHome}
              disabled={loading}
              className="rounded-full"
            >
              <Home size={16} />
              <span className="sr-only">Home</span>
            </Button>
          </div>

          {/* URL input */}
          <form onSubmit={handleSubmit} className="flex-1 mx-2">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground flex items-center gap-1.5">
                {connected ? (
                  <Wifi size={14} className="text-green-500" />
                ) : (
                  <Wifi size={14} className="text-destructive" />
                )}
                <Globe size={14} />
              </div>
              
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter local network URL"
                className="h-10 pl-14 pr-10 text-sm transition-all bg-secondary/50 hover:bg-secondary focus:bg-background"
                disabled={loading}
              />
              
              {url && (
                <button
                  type="button"
                  onClick={() => setUrl("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={14} />
                  <span className="sr-only">Clear</span>
                </button>
              )}
            </div>
          </form>

          {/* Status and controls */}
          <div className="flex items-center gap-2">
            <div 
              className={`h-2.5 w-2.5 rounded-full ${
                connected ? "bg-green-500" : "bg-red-500"
              }`}
            />
            
            <div className="text-xs font-medium text-muted-foreground hidden sm:block">
              {connected ? "Connected" : "Disconnected"}
            </div>
            
            <div className="h-5 w-px bg-border mx-1"></div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="rounded-full text-muted-foreground hover:text-destructive"
            >
              <LogOut size={16} />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Browser content area */}
      <div className="flex-1 bg-background overflow-hidden relative">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-card animate-fade-in">
            <Shield className="h-16 w-16 text-primary animate-pulse" />
            <div className="mt-4 text-lg font-medium">Loading secure connection...</div>
            <div className="text-sm text-muted-foreground mt-2">Establishing encrypted tunnel</div>
          </div>
        ) : !connected ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-card animate-fade-in">
            <Wifi className="h-16 w-16 text-destructive" />
            <div className="mt-4 text-lg font-medium">Connection Failed</div>
            <div className="text-sm text-muted-foreground mt-2 max-w-md text-center">
              Unable to establish a secure connection to the local network resource.
              Please check your network settings or try again later.
            </div>
            <Button 
              onClick={refreshPage} 
              className="mt-6"
              icon={<RefreshCw size={16} />}
            >
              Try Again
            </Button>
          </div>
        ) : (
          <div className="w-full h-full animate-fade-in">
            {/* This would be replaced with a proper proxy solution in a real app */}
            <iframe
              ref={iframeRef}
              src={currentUrl}
              title="Secure Browser Frame"
              className="w-full h-full border-none"
              sandbox="allow-scripts allow-forms allow-same-origin"
              onError={() => setConnected(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
