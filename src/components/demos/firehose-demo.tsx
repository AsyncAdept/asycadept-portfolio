"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface DataPoint {
  time: number;
  messages: number;
  memory: number;
}

export function FirehoseDemo() {
  const [isOptimized, setIsOptimized] = useState(false);
  const [data, setData] = useState<DataPoint[]>([]);
  const [currentMemory, setCurrentMemory] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const baseRate = isOptimized ? 8000 : 45000;
      const variance = Math.random() * 10000 - 5000;
      const messages = Math.max(1000, baseRate + variance);
      
      const memoryBase = isOptimized ? 30 : 85;
      const memoryVariance = Math.random() * 20 - 10;
      const memory = Math.min(100, Math.max(10, memoryBase + memoryVariance));
      
      setData((prev) => {
        const newData = [...prev, { time: Date.now(), messages, memory }];
        return newData.slice(-20);
      });
      
      setCurrentMemory(memory);
    }, 100);

    return () => clearInterval(interval);
  }, [isOptimized]);

  return (
    <Card className="p-4 bg-card/80 backdrop-blur">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-sm">Firehose Dashboard Demo</h4>
        <Button
          variant={isOptimized ? "default" : "outline"}
          size="sm"
          onClick={() => setIsOptimized(!isOptimized)}
          className={isOptimized ? "bg-green-600 hover:bg-green-700" : ""}
        >
          {isOptimized ? "✓ Optimized" : "Unoptimized"}
        </Button>
      </div>

      <div className="h-32 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="time" hide />
            <YAxis hide domain={[0, 60000]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: "none",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelFormatter={() => ""}
            />
            <Line
              type="monotone"
              dataKey="messages"
              stroke={isOptimized ? "#22c55e" : "#06b6d4"}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Memory Usage</span>
          <span className={currentMemory > 70 ? "text-red-400" : "text-green-400"}>
            {Math.round(currentMemory)}%
          </span>
        </div>
        <div className="h-2 bg-background rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${currentMemory > 70 ? "bg-red-500" : "bg-green-500"}`}
            initial={{ width: 0 }}
            animate={{ width: `${currentMemory}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {isOptimized
            ? "Sliding window + IndexedDB buffering maintaining 60fps"
            : "Naive implementation causing memory bloat"}
        </p>
      </div>
    </Card>
  );
}
