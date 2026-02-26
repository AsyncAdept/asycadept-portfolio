'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Minimize2, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type Command = {
  input: string;
  output: React.ReactNode;
  isError?: boolean;
};

type Theme = 'default' | 'github-dark' | 'dracula' | 'nord' | 'matrix';

const themes: Record<Theme, { bg: string; text: string; accent: string; border: string }> = {
  default: {
    bg: 'bg-background',
    text: 'text-foreground',
    accent: 'text-cyan-400',
    border: 'border-border',
  },
  'github-dark': {
    bg: 'bg-[#0d1117]',
    text: 'text-[#c9d1d9]',
    accent: 'text-[#58a6ff]',
    border: 'border-[#30363d]',
  },
  dracula: {
    bg: 'bg-[#282a36]',
    text: 'text-[#f8f8f2]',
    accent: 'text-[#ff79c6]',
    border: 'border-[#44475a]',
  },
  nord: {
    bg: 'bg-[#2e3440]',
    text: 'text-[#eceff4]',
    accent: 'text-[#88c0d0]',
    border: 'border-[#4c566a]',
  },
  matrix: {
    bg: 'bg-[#000000]',
    text: 'text-[#00ff00]',
    accent: 'text-[#00ff00]',
    border: 'border-[#003300]',
  },
};

const allCommands = [
  'help',
  'about',
  'skills',
  'timeline',
  'projects',
  'cv',
  'contact',
  'clear',
  'neofetch',
  'matrix',
  'cowsay',
  'weather',
  'theme',
  'sudo',
  'history',
  'date',
];

const neofetchArt = `
                    ████████████████
                ████              ████
              ██                      ██
            ██    ████████████████    ██
          ██    ██                ██    ██
        ██    ██    ▄▄▄▄    ▄▄▄▄    ██    ██
        ██    ██    ████    ████    ██    ██
      ██      ██                    ██      ██
      ██      ██    ▀██████████▀    ██      ██
      ██        ██                ██        ██
        ██      ███████████████████████      ██
          ██                              ██
            ████████████████████████████████
`;

const getNeofetchOutput = (accent: string) => (
  <div className="font-mono text-xs">
    <pre className={`${accent} text-[10px] leading-none mb-2`}>{neofetchArt}</pre>
    <div className="space-y-1">
      <p>
        <span className={accent}>asycadept</span>@<span className={accent}>portfolio</span>
      </p>
      <p>─────────────────────</p>
      <p>
        <span className="text-muted-foreground">OS:</span> TypeScript 5.x (NUXT)
      </p>
      <p>
        <span className="text-muted-foreground">Host:</span> Next.js 14
      </p>
      <p>
        <span className="text-muted-foreground">Kernel:</span> React 18.x
      </p>
      <p>
        <span className="text-muted-foreground">Uptime:</span> 12 years, 3 months
      </p>
      <p>
        <span className="text-muted-foreground">Shell:</span> Framer Motion 12.x
      </p>
      <p>
        <span className="text-muted-foreground">Terminal:</span> WebKit
      </p>
      <p>
        <span className="text-muted-foreground">CPU:</span> 12-core (async/await)
      </p>
      <p>
        <span className="text-muted-foreground">Memory:</span> 256GB (reams)
      </p>
    </div>
  </div>
);

const matrixChars =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';

const generateMatrixColumn = (height: number) => {
  const column: string[] = [];
  let y = 0;
  while (y < height) {
    column.push(matrixChars[Math.floor(Math.random() * matrixChars.length)]);
    y += 1;
  }
  return column;
};

function MatrixEffect({ accent, onComplete }: { accent: string; onComplete: () => void }) {
  const [lines, setLines] = useState<string[][]>([]);
  const [visibleRows, setVisibleRows] = useState(0);
  const maxRows = 12;
  const maxCols = 25;

  useEffect(() => {
    const newLines: string[][] = [];
    for (let i = 0; i < maxCols; i++) {
      newLines.push(generateMatrixColumn(maxRows));
    }
    setLines(newLines);
  }, []);

  useEffect(() => {
    if (visibleRows < maxRows) {
      const timer = setTimeout(() => setVisibleRows((prev) => prev + 1), 80);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onComplete, 2000);
      return () => clearTimeout(timer);
    }
  }, [visibleRows, onComplete]);

  return (
    <div className="font-mono text-xs leading-tight">
      {Array.from({ length: visibleRows }).map((_, row) => (
        <div key={row} className="flex">
          {lines.map((col, colIndex) => (
            <span key={colIndex} className={row === col.length - 1 ? accent : 'opacity-50'}>
              {col[row] || ' '}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

const cowsay = (message: string, accent: string) => {
  const lines = message.split('\n');
  const maxLen = Math.max(...lines.map((l) => l.length));
  const border = ' '.repeat(maxLen + 2);

  return (
    <div className="font-mono text-xs">
      <pre className={accent}>{`
 ${border}
${lines.map((l) => `  ${l}${' '.repeat(maxLen - l.length)} `).join('\n')}
 ${border}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
`}</pre>
    </div>
  );
};

async function fetchWeather() {
  try {
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current_weather=true'
    );
    const data = await response.json();
    const temp = data.current_weather?.temperature || 'N/A';
    const condition =
      data.current_weather?.weathercode !== undefined
        ? ['Clear', 'Cloudy', 'Fog', 'Rain', 'Snow'][
            Math.floor((data.current_weather.weathercode + 1) / 3)
          ] || 'Unknown'
        : 'Unknown';
    return { temp, condition, error: null };
  } catch {
    return { temp: 'N/A', condition: 'Unknown', error: 'API unavailable' };
  }
}

const getCommands = (theme: Theme, accent: string) => ({
  help: (
    <div className="space-y-2 text-sm">
      <p className={accent + ' font-bold'}>Available Commands</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        <span className="text-muted-foreground">help — show commands</span>
        <span className="text-muted-foreground">about — about me</span>
        <span className="text-muted-foreground">skills — my skills</span>
        <span className="text-muted-foreground">timeline — career</span>
        <span className="text-muted-foreground">projects — projects</span>
        <span className="text-muted-foreground">cv — download CV</span>
        <span className="text-muted-foreground">contact — contact</span>
        <span className="text-muted-foreground">clear — clear terminal</span>
        <span className="text-muted-foreground">neofetch — system info</span>
        <span className="text-muted-foreground">matrix — rain effect</span>
        <span className="text-muted-foreground">cowsay [msg] — ASCII cow</span>
        <span className="text-muted-foreground">weather — current weather</span>
        <span className="text-muted-foreground">theme [name] — set theme</span>
        <span className="text-muted-foreground">date — show date</span>
        <span className="text-muted-foreground">history — command history</span>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Themes: default, github-dark, dracula, nord, matrix
      </p>
      <p className="text-xs text-muted-foreground">
        Tip: Use ↑↓ arrows for history, Tab for autocomplete
      </p>
    </div>
  ),
  about: (
    <div className="space-y-2">
      <p className={accent + ' font-bold'}>AsycAdept — Full Stack TypeScript Engineer</p>
      <p className="text-sm text-muted-foreground">
        I design and ship production systems across web, mobile, and desktop. From complex frontend
        state management to APIs, data modeling, and real-time pipelines — I handle the full stack.
      </p>
    </div>
  ),
  skills: (
    <div className="space-y-2">
      <p className={accent + ' font-bold'}>Technical Skills</p>
      <div className="flex flex-wrap gap-2">
        {[
          'TypeScript',
          'React',
          'Next.js',
          'React Native',
          'Angular',
          'Vue',
          'Node.js',
          'Electron',
          'Tauri',
          'PostgreSQL',
          'MongoDB',
          'Docker',
        ].map((skill) => (
          <span key={skill} className="px-2 py-1 bg-secondary rounded text-xs">
            {skill}
          </span>
        ))}
      </div>
    </div>
  ),
  timeline: (
    <div className="space-y-2 text-sm">
      <p className={accent + ' font-bold'}>Career Timeline</p>
      <p className="text-muted-foreground">2020 — Present: Engineer @ Balena</p>
      <p className="text-muted-foreground">2017 — 2020: Consultant/Tech Lead @ Liknme</p>
      <p className="text-muted-foreground">2015 — 2017: Full Stack Dev @ Reputation Manager</p>
      <p className="text-muted-foreground">2012 — 2015: Frontend Dev @ FWR/Snappin</p>
    </div>
  ),
  projects: (
    <div className="space-y-2 text-sm">
      <p className={accent + ' font-bold'}>Featured Projects</p>
      <p className="text-muted-foreground">1. Targeted Messaging Platform</p>
      <p className="text-muted-foreground">2. Real-Time Social Firehose</p>
      <p className="text-muted-foreground">3. AutoUI Generator</p>
      <p className="text-muted-foreground">4. Cross-Platform Mobile Banking</p>
      <p className={accent + ' mt-2'}>Type &apos;project &lt;id&gt;&apos; for details</p>
    </div>
  ),
  cv: (
    <div className="space-y-2">
      <p className={accent}>Opening CV PDF...</p>
      <p className="text-sm text-muted-foreground">
        <a href="/cv" className="underline" target="_blank">
          /cv
        </a>
      </p>
    </div>
  ),
  contact: (
    <div className="space-y-2">
      <p className={accent + ' font-bold'}>Get In Touch</p>
      <p className="text-sm text-muted-foreground">Email: contact@asycadept.com</p>
      <p className="text-sm text-muted-foreground">
        Or use the contact form at the bottom of the page.
      </p>
    </div>
  ),
  date: (
    <div className="space-y-1">
      <p className={accent}>{new Date().toLocaleString()}</p>
      <p className="text-xs text-muted-foreground">Timezone: UTC</p>
    </div>
  ),
  sudo: (
    <div className="space-y-2">
      <p className="text-red-400">Permission denied: you are not in the sudoers file.</p>
      <p className="text-xs text-muted-foreground">This incident will be reported.</p>
    </div>
  ),
  history: (
    <div className="space-y-1 text-sm">
      <p className={accent + ' font-bold'}>Command History</p>
      <p className="text-xs text-muted-foreground">Use ↑↓ arrows to navigate history</p>
    </div>
  ),
  neofetch: getNeofetchOutput(accent),
  weather: <WeatherDisplay accent={accent} />,
});

const WeatherDisplay = ({ accent }: { accent: string }) => {
  const [weather, setWeather] = useState<{
    temp: string;
    condition: string;
    error?: string;
  } | null>(null);

  useEffect(() => {
    fetchWeather().then((data) => {
      if (data.error) {
        setWeather({ temp: 'N/A', condition: 'Unknown', error: data.error });
      } else {
        setWeather({ temp: data.temp, condition: data.condition });
      }
    });
  }, []);

  if (!weather) {
    return <p className={accent}>Fetching weather data...</p>;
  }

  if (weather.error) {
    return <p className="text-red-400">Weather API unavailable</p>;
  }

  return (
    <div className="space-y-1">
      <p className={accent + ' font-bold'}>Current Weather</p>
      <p className="text-sm text-muted-foreground">New York, NY (UTC-5)</p>
      <p className="text-lg">
        🌡️ {weather.temp}°C — {weather.condition}
      </p>
    </div>
  );
};

export function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [theme, setTheme] = useState<Theme>('default');
  const [history, setHistory] = useState<Command[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [showMatrix, setShowMatrix] = useState(false);
  const [matrixKey, setMatrixKey] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = themes[theme];
  const accent = t.accent;
  const commands = getCommands(theme, accent);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, showMatrix]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const addToHistory = useCallback((input: string, output: React.ReactNode, isError = false) => {
    setHistory((prev) => [...prev, { input, output, isError }]);
    if (input.trim()) {
      setCommandHistory((prev) => [...prev, input]);
    }
    setHistoryIndex(-1);
  }, []);

  const processCommand = useCallback(
    (cmdStr: string) => {
      const cmd = cmdStr.toLowerCase().trim();
      const parts = cmd.split(' ');
      const baseCmd = parts[0];

      if (cmd === 'clear') {
        setHistory([]);
        setShowMatrix(false);
        return true;
      }

      if (cmd.startsWith('theme ')) {
        const themeName = parts[1] as Theme;
        if (themes[themeName]) {
          setTheme(themeName);
          addToHistory(cmdStr, <p className={accent}>Theme set to {themeName}</p>);
        } else {
          addToHistory(
            cmdStr,
            <p className="text-red-400">
              Unknown theme. Available: default, github-dark, dracula, nord, matrix
            </p>,
            true
          );
        }
        return true;
      }

      if (cmd.startsWith('cowsay ')) {
        const message = cmdStr.slice(7) || 'Moo!';
        addToHistory(cmdStr, cowsay(message, accent));
        return true;
      }

      if (cmd === 'matrix') {
        setShowMatrix(true);
        setMatrixKey((prev) => prev + 1);
        return true;
      }

      if (cmd === 'neofetch') {
        addToHistory(cmdStr, commands.neofetch);
        return true;
      }

      if (cmd === 'weather') {
        addToHistory(cmdStr, <WeatherDisplay accent={accent} />);
        return true;
      }

      if (cmd.startsWith('project ')) {
        const id = parts[1];
        const projectDetails: Record<string, React.ReactNode> = {
          messaging: (
            <div className="space-y-1 text-sm">
              <p className={accent + ' font-bold'}>Targeted Messaging Platform</p>
              <p className="text-muted-foreground">High-Volume Campaigns system</p>
              <p className="text-muted-foreground">10K+ messages/minute throughput</p>
              <p className="text-muted-foreground">40% processing time reduction</p>
            </div>
          ),
          firehose: (
            <div className="space-y-1 text-sm">
              <p className={accent + ' font-bold'}>Real-Time Social Firehose</p>
              <p className="text-muted-foreground">Peak Event Traffic dashboard</p>
              <p className="text-muted-foreground">50K+ messages/sec handled</p>
              <p className="text-muted-foreground">60% memory reduction</p>
            </div>
          ),
          autoui: (
            <div className="space-y-1 text-sm">
              <p className={accent + ' font-bold'}>AutoUI Generator</p>
              <p className="text-muted-foreground">JSON Schema-Driven UI</p>
              <p className="text-muted-foreground">70% faster CRUD development</p>
              <p className="text-muted-foreground">Web + mobile output</p>
            </div>
          ),
          'mobile-banking': (
            <div className="space-y-1 text-sm">
              <p className={accent + ' font-bold'}>Mobile Banking App</p>
              <p className="text-muted-foreground">Ionic/React cross-platform</p>
              <p className="text-muted-foreground">50K+ users served</p>
              <p className="text-muted-foreground">4.6★ app store rating</p>
            </div>
          ),
        };
        addToHistory(
          cmdStr,
          projectDetails[id] || <p className="text-red-400">Project not found</p>,
          !projectDetails[id]
        );
        return true;
      }

      if (commands[baseCmd as keyof typeof commands]) {
        addToHistory(cmdStr, commands[baseCmd as keyof typeof commands]);
        return true;
      }

      addToHistory(
        cmdStr,
        <p className="text-red-400">
          Command not found. Type &apos;help&apos; for available commands.
        </p>,
        true
      );
      return false;
    },
    [commands, addToHistory, accent]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (input.toLowerCase().trim() === 'matrix') {
      processCommand(input);
    } else {
      processCommand(input);
    }
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const matches = allCommands.filter((c) => c.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        addToHistory(
          input,
          <div className="text-sm">
            <p className="text-muted-foreground mb-1">Suggestions:</p>
            {matches.map((m) => (
              <span key={m} className="mr-3">
                {m}
              </span>
            ))}
          </div>
        );
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const themeIcon = theme === 'matrix' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />;
  const nextTheme: Theme =
    theme === 'default'
      ? 'github-dark'
      : theme === 'github-dark'
        ? 'dracula'
        : theme === 'dracula'
          ? 'nord'
          : theme === 'nord'
            ? 'matrix'
            : 'default';

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 rounded-full w-12 h-12 sm:w-14 sm:h-14 bg-primary/90 hover:bg-primary glow-cyan-sm"
        size="icon"
      >
        <TerminalIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-full max-w-sm sm:max-w-lg"
          >
            <Card className={`${t.bg} ${t.border} border shadow-2xl overflow-hidden`}>
              <div className={`flex items-center justify-between p-3 ${t.border} border-b`}>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className={`text-sm ${t.text} ml-2 font-mono opacity-70`}>
                    asycadept@portfolio
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => {
                      setTheme(nextTheme);
                      addToHistory(
                        'theme ' + nextTheme,
                        <p className={accent}>Theme set to {nextTheme}</p>
                      );
                    }}
                    title={`Theme: ${theme}`}
                  >
                    {themeIcon}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setIsOpen(false)}
                  >
                    <Minimize2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div
                className={`p-3 sm:p-4 h-64 sm:h-80 overflow-y-auto font-mono text-xs sm:text-sm ${t.bg}`}
              >
                <div className="space-y-2">
                  {history.map((cmd, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-2">
                        <span className={accent}>$</span>
                        <span className={t.text}>{cmd.input}</span>
                      </div>
                      <div className={`ml-4 ${cmd.isError ? 'text-red-400' : t.text} opacity-90`}>
                        {cmd.output}
                      </div>
                    </div>
                  ))}
                  {showMatrix && (
                    <MatrixEffect
                      key={matrixKey}
                      accent={accent}
                      onComplete={() => setShowMatrix(false)}
                    />
                  )}
                  <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <span className={accent}>$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className={`flex-1 bg-transparent border-none outline-none ${t.text}`}
                      autoFocus
                      spellCheck={false}
                    />
                  </form>
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
