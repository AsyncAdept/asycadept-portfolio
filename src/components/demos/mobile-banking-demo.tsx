"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Fingerprint, Wifi, WifiOff, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const screens = [
  {
    id: "login",
    title: "Sign In",
    content: (
      <div className="space-y-4 p-4">
        <div className="h-8 w-8 mx-auto bg-cyan-500/20 rounded-full flex items-center justify-center">
          <Fingerprint className="w-4 h-4 text-cyan-400" />
        </div>
        <p className="text-xs text-center text-muted-foreground">
          Touch to sign in with biometrics
        </p>
        <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-xs">
          Use Face ID
        </Button>
        <p className="text-[10px] text-center text-muted-foreground">
          Or use password
        </p>
      </div>
    ),
  },
  {
    id: "dashboard",
    title: "Dashboard",
    content: (
      <div className="space-y-3 p-4">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg p-3 text-white">
          <p className="text-[10px] opacity-80">Total Balance</p>
          <p className="text-xl font-bold">$24,592.00</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {["Send", "Receive", "Cards", "More"].map((action) => (
            <Button
              key={action}
              variant="outline"
              size="sm"
              className="text-xs h-10"
            >
              {action}
            </Button>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-semibold">Recent Transactions</p>
          {[
            { name: "Netflix", amount: "-$15.99", color: "text-red-400" },
            { name: "Salary", amount: "+$4,200.00", color: "text-green-400" },
            { name: "Grocery", amount: "-$87.32", color: "text-red-400" },
          ].map((tx) => (
            <div
              key={tx.name}
              className="flex justify-between text-xs p-2 bg-background/50 rounded"
            >
              <span>{tx.name}</span>
              <span className={tx.color}>{tx.amount}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "sync",
    title: "Offline Sync",
    content: (
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-center gap-2">
          <WifiOff className="w-4 h-4 text-yellow-400" />
          <span className="text-xs text-yellow-400">Offline Mode</span>
        </div>
        <p className="text-xs text-center text-muted-foreground">
          Your changes will sync when you&apos;re back online
        </p>
        <div className="space-y-2">
          {[
            { status: "Synced", icon: "✓", color: "text-green-400" },
            { status: "Pending", icon: "○", color: "text-yellow-400" },
          ].map((item) => (
            <div
              key={item.status}
              className="flex items-center gap-2 text-xs p-2 bg-background/50 rounded"
            >
              <span className={item.color}>{item.icon}</span>
              <span>{item.status}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-1 text-[10px] text-green-400">
          <Wifi className="w-3 h-3" />
          Connected - Syncing
        </div>
      </div>
    ),
  },
];

export function MobileBankingDemo() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [showBiometric, setShowBiometric] = useState(false);

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left" && currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else if (direction === "right" && currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  return (
    <Card className="p-4 bg-card/80 backdrop-blur">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-sm">Mobile Banking Demo</h4>
        <div className="flex gap-1">
          {screens.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === currentScreen ? "bg-cyan-500" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative w-40 h-72 bg-background rounded-2xl border-4 border-muted overflow-hidden shadow-xl">
          <div className="absolute top-0 left-0 right-0 h-6 bg-muted flex items-center justify-center">
            <div className="w-12 h-3 bg-background rounded-full" />
          </div>

          <div className="absolute top-6 left-0 right-0 px-2 py-1 flex items-center justify-between">
            <button
              onClick={() => handleSwipe("right")}
              className="p-1 hover:bg-muted rounded"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <span className="text-[10px] font-semibold">
              {screens[currentScreen].title}
            </span>
            <button
              onClick={() => handleSwipe("left")}
              className="p-1 hover:bg-muted rounded"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-10 left-0 right-0 bottom-0"
            >
              {currentScreen === 0 && showBiometric ? (
                <div className="flex items-center justify-center h-full">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="w-16 h-16 mx-auto bg-cyan-500/20 rounded-full flex items-center justify-center mb-2"
                    >
                      <Fingerprint className="w-8 h-8 text-cyan-400" />
                    </motion.div>
                    <p className="text-xs text-cyan-400">Authenticating...</p>
                  </motion.div>
                </div>
              ) : (
                screens[currentScreen].content
              )}
            </motion.div>
          </AnimatePresence>

          {currentScreen === 0 && !showBiometric && (
            <button
              onClick={() => setShowBiometric(true)}
              className="absolute bottom-4 left-2 right-2"
            >
              <Badge className="w-full bg-cyan-600 hover:bg-cyan-700 cursor-pointer">
                Tap for Biometric
              </Badge>
            </button>
          )}
        </div>
      </div>

      <p className="text-xs text-center text-muted-foreground mt-3">
        Swipe to navigate • Tap for biometric auth
      </p>
    </Card>
  );
}
