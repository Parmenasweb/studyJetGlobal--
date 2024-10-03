"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { MessageCircle, X } from "lucide-react";

const ChatAi = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <div>
      {isChatOpen ? (
        <Card className="w-80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chat with Us</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsChatOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] w-full pr-4">
              {/* Chat messages would go here */}
              <p className="text-sm">
                Welcome to our chat! How can we help you today?
              </p>
            </ScrollArea>
            <div className="flex items-center mt-4">
              <Input placeholder="Type your message..." className="flex-grow" />
              <Button size="sm" className="ml-2">
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button onClick={() => setIsChatOpen(true)}>
          <MessageCircle className="mr-2 h-4 w-4" /> Chat with Us
        </Button>
      )}
    </div>
  );
};

export default ChatAi;
