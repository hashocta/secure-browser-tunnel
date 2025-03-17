
import React from "react";
import { Button } from "@/components/ui-custom/Button";
import { Bookmark, Trash2, ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui-custom/Input";

interface BrowserBookmarksProps {
  bookmarks: { url: string; title: string }[];
  onOpenBookmark: (url: string) => void;
  onRemoveBookmark: (url: string) => void;
}

export function BrowserBookmarks({ bookmarks, onOpenBookmark, onRemoveBookmark }: BrowserBookmarksProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const filteredBookmarks = bookmarks.filter(
    (bookmark) =>
      bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search bookmarks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      {filteredBookmarks.length === 0 ? (
        <div className="text-center py-8">
          <Bookmark className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
          <p className="mt-2 text-muted-foreground">
            {bookmarks.length === 0
              ? "No bookmarks yet. Add your favorite pages with the heart icon."
              : "No bookmarks match your search."}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredBookmarks.map((bookmark, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 hover:bg-secondary/30 rounded-md group"
            >
              <div className="flex-1 cursor-pointer overflow-hidden" onClick={() => onOpenBookmark(bookmark.url)}>
                <div className="font-medium truncate">{bookmark.title}</div>
                <div className="text-xs text-muted-foreground truncate">{bookmark.url}</div>
              </div>
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onOpenBookmark(bookmark.url)}
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">Open</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => onRemoveBookmark(bookmark.url)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
