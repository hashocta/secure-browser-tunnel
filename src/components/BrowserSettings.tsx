
import React, { useState } from "react";
import { Button } from "@/components/ui-custom/Button";
import { Input } from "@/components/ui-custom/Input";
import { Switch } from "@/components/ui/switch";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator } from "@/components/ui/menubar";
import { Badge } from "@/components/ui/badge";
import { Settings, Shield, Lock, Wifi, Moon, Sun, Globe, Database } from "lucide-react";

interface BrowserSettingsProps {
  onChangeHomepage: (url: string) => void;
}

export function BrowserSettings({ onChangeHomepage }: BrowserSettingsProps) {
  const [homepage, setHomepage] = useState("http://192.168.73.101");
  const [darkMode, setDarkMode] = useState(false);
  const [blockTrackers, setBlockTrackers] = useState(true);
  const [blockAds, setBlockAds] = useState(true);
  const [allowLocalNetwork, setAllowLocalNetwork] = useState(true);
  const [enhancedSecurity, setEnhancedSecurity] = useState(true);
  
  const handleSaveHomepage = () => {
    if (homepage.trim()) {
      onChangeHomepage(homepage);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Settings size={18} />
          Browser Settings
        </h3>
        <p className="text-sm text-muted-foreground">
          Configure your secure browsing experience
        </p>
      </div>
      
      {/* Homepage setting */}
      <div className="space-y-2">
        <label htmlFor="homepage" className="text-sm font-medium">
          Homepage
        </label>
        <div className="flex gap-2">
          <Input
            id="homepage"
            value={homepage}
            onChange={(e) => setHomepage(e.target.value)}
            placeholder="Enter URL for homepage"
          />
          <Button onClick={handleSaveHomepage}>Save</Button>
        </div>
      </div>
      
      {/* Security settings */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium flex items-center gap-2">
          <Shield size={16} />
          Security & Privacy
        </h4>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium flex items-center gap-2">
                <Lock size={14} />
                Enhanced Security
                <Badge className="ml-2 bg-green-500/20 text-green-700 dark:text-green-300">Recommended</Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                Increase protection against dangerous sites
              </div>
            </div>
            <Switch checked={enhancedSecurity} onCheckedChange={setEnhancedSecurity} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium flex items-center gap-2">
                <Wifi size={14} />
                Allow Local Network Access
              </div>
              <div className="text-xs text-muted-foreground">
                Access devices on your home network
              </div>
            </div>
            <Switch checked={allowLocalNetwork} onCheckedChange={setAllowLocalNetwork} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Block trackers</div>
              <div className="text-xs text-muted-foreground">
                Prevent sites from tracking your activity
              </div>
            </div>
            <Switch checked={blockTrackers} onCheckedChange={setBlockTrackers} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Block ads</div>
              <div className="text-xs text-muted-foreground">
                Remove intrusive advertisements
              </div>
            </div>
            <Switch checked={blockAds} onCheckedChange={setBlockAds} />
          </div>
        </div>
      </div>
      
      {/* Appearance */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Appearance</h4>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="text-sm font-medium flex items-center gap-2">
              {darkMode ? <Moon size={14} /> : <Sun size={14} />}
              Dark Mode
            </div>
            <div className="text-xs text-muted-foreground">
              Switch between light and dark themes
            </div>
          </div>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>
      </div>
      
      {/* Connection Info */}
      <div className="rounded-md border p-4 space-y-2">
        <h4 className="text-sm font-medium flex items-center gap-2">
          <Globe size={16} />
          Connection Information
        </h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="text-muted-foreground">Status:</div>
          <div className="font-medium">Connected</div>
          <div className="text-muted-foreground">Network:</div>
          <div className="font-medium">Local Secure Tunnel</div>
          <div className="text-muted-foreground">Protocol:</div>
          <div className="font-medium">HTTPS (TLS 1.3)</div>
          <div className="text-muted-foreground">Local IP:</div>
          <div className="font-medium">192.168.73.101</div>
        </div>
      </div>
    </div>
  );
}
