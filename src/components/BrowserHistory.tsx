
import React from "react";
import { Button } from "@/components/ui-custom/Button";
import { Clock, Trash2, ExternalLink, Search, TrashIcon } from "lucide-react";
import { Input } from "@/components/ui-custom/Input";

interface BrowserHistoryProps {
  history: string[];
  onOpenHistory: (url: string) => void;
  onClearHistory: () => void;
}

export function BrowserHistory({ history, onOpenHistory, onClearHistory }: BrowserHistoryProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const filteredHistory = history
    .filter((url) => url.toLowerCase().includes(searchTerm.toLowerCase()))
    .reverse(); // Show most recent first

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 text-destructive"
          onClick={onClearHistory}
          title="Clear browsing history"
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>

      {filteredHistory.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
          <p className="mt-2 text-muted-foreground">
            {history.length <= 1
              ? "No browsing history yet."
              : "No history matches your search."}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredHistory.map((url, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 hover:bg-secondary/30 rounded-md group"
            >
              <div className="flex-1 cursor-pointer truncate" onClick={() => onOpenHistory(url)}>
                <div className="text-sm truncate">{url}</div>
                <div className="text-xs text-muted-foreground">
                  {index === 0 ? "Just now" : `${index} ${index === 1 ? "visit" : "visits"} ago`}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onOpenHistory(url)}
              >
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">Open</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
