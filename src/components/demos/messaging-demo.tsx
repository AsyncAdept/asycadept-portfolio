"use client";

import { useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: number;
  text: string;
  status: "queued" | "processing" | "sent";
}

export function MessagingDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [throughput, setThroughput] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [totalSent, setTotalSent] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setThroughput((prev) => Math.min(prev + Math.random() * 500, 10500));
      
      const newMsg: Message = {
        id: Date.now(),
        text: `Msg_${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        status: "processing",
      };
      
      setMessages((prev) => [...prev.slice(-8), newMsg]);
      
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) => (m.id === newMsg.id ? { ...m, status: "sent" } : m))
        );
        setTotalSent((prev) => prev + 1);
      }, 500);
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const statusColors = {
    queued: "bg-yellow-500",
    processing: "bg-cyan-500",
    sent: "bg-green-500",
  };

  return (
    <Card className="p-4 bg-card/80 backdrop-blur">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-sm">Messaging Platform Demo</h4>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
          {isPlaying ? "Pause" : "Play"}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-background/50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-cyan-400">
            {Math.round(throughput).toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">msgs/min</p>
        </div>
        <div className="bg-background/50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-400">
            {totalSent.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">total sent</p>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-xs text-muted-foreground mb-2">Message Queue:</p>
        {messages.length === 0 ? (
          <p className="text-xs text-muted-foreground italic">
            Click Play to start simulation
          </p>
        ) : (
          <div className="flex flex-wrap gap-1">
            {messages.map((msg) => (
              <Badge
                key={msg.id}
                variant="outline"
                className={`text-xs ${statusColors[msg.status]} bg-opacity-20`}
              >
                {msg.text}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
