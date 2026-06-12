import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, Award, Zap, Settings, HelpCircle, X, Check, Brain } from 'lucide-react';

interface EasterEggRLProps {
  isOpen: boolean;
  onClose: () => void;
}

// Grid layout parameters (5x5 grid)
const GRID_SIZE = 5;
const ACTIONS = ['UP', 'RIGHT', 'DOWN', 'LEFT'] as const;
type Action = typeof ACTIONS[number];

interface Cell {
  r: number;
  c: number;
  type: 'empty' | 'obstacle' | 'goal';
}

export default function EasterEggRL({ isOpen, onClose }: EasterEggRLProps) {
  // Agent coordinates
  const [agentPos, setAgentPos] = useState({ r: 0, c: 0 });
  const [isTraining, setIsTraining] = useState(false);
  const [learningRate, setLearningRate] = useState(0.2);
  const [discountFactor, setDiscountFactor] = useState(0.9);
  const [epsilon, setEpsilon] = useState(0.3); // Exploration rate
  const [episodeCount, setEpisodeCount] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number }>({ r: 0, c: 0 });
  const [speedMs, setSpeedMs] = useState(100); // interval duration for continuous train

  // Q-Table ref: maps 'r,c' -> Record<Action, number>
  const qTableRef = useRef<Record<string, Record<Action, number>>>({});

  // Initialize Q-Table on component mount
  const resetQTable = () => {
    const table: Record<string, Record<Action, number>> = {};
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        table[`${r},${c}`] = { UP: 0, RIGHT: 0, DOWN: 0, LEFT: 0 };
      }
    }
    qTableRef.current = table;
    setEpisodeCount(0);
    setTotalSteps(0);
    setAgentPos({ r: 0, c: 0 });
  };

  // Run on mount to initialize Q-Table if empty
  if (Object.keys(qTableRef.current).length === 0) {
    resetQTable();
  }

  // Obstacle coords
  const gridCells: Cell[] = [];
  const obstacles = ['1,1', '1,3', '3,1', '2,3', '3,3'];
  const goal = '4,4';

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const coord = `${r},${c}`;
      let type: 'empty' | 'obstacle' | 'goal' = 'empty';
      if (obstacles.includes(coord)) type = 'obstacle';
      else if (coord === goal) type = 'goal';
      gridCells.push({ r, c, type });
    }
  }

  // Get next coordinates and rewards based on state & action
  const getNextState = (r: number, c: number, action: Action) => {
    let nextR = r;
    let nextC = c;
    if (action === 'UP') nextR = Math.max(0, r - 1);
    else if (action === 'DOWN') nextR = Math.min(GRID_SIZE - 1, r + 1);
    else if (action === 'LEFT') nextC = Math.max(0, c - 1);
    else if (action === 'RIGHT') nextC = Math.min(GRID_SIZE - 1, c + 1);

    const coord = `${nextR},${nextC}`;
    let reward = -0.1; // small movement penalty
    let terminal = false;

    if (coord === goal) {
      reward = 10;
      terminal = true;
    } else if (obstacles.includes(coord)) {
      reward = -5;
      terminal = true; // reset agent if hitting obstacle (hard penalty)
    }

    return { nextR, nextC, reward, terminal };
  };

  // Perform one Q-learning steps
  const performStep = () => {
    const qTable = qTableRef.current;
    const currentKey = `${agentPos.r},${agentPos.c}`;
    const stateQValues = qTable[currentKey] || { UP: 0, RIGHT: 0, DOWN: 0, LEFT: 0 };

    // Choose action: Epsilon-Greedy
    let chosenAction: Action;
    if (Math.random() < epsilon) {
      // Explore
      chosenAction = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
    } else {
      // Exploit (select action with max Q value)
      let maxQ = -Infinity;
      let bestActions: Action[] = ['UP'];
      ACTIONS.forEach((act) => {
        const val = stateQValues[act];
        if (val > maxQ) {
          maxQ = val;
          bestActions = [act];
        } else if (val === maxQ) {
          bestActions.push(act);
        }
      });
      chosenAction = bestActions[Math.floor(Math.random() * bestActions.length)];
    }

    // Environmental transition
    const { nextR, nextC, reward, terminal } = getNextState(agentPos.r, agentPos.c, chosenAction);

    // Dynamic Q-Value Update:
    // Q(s, a) = Q(s, a) + alpha * (r + gamma * max_a' Q(s', a') - Q(s, a))
    const nextKey = `${nextR},${nextC}`;
    const nextQValues = qTable[nextKey] || { UP: 0, RIGHT: 0, DOWN: 0, LEFT: 0 };
    const maxNextQ = Math.max(nextQValues.UP, nextQValues.RIGHT, nextQValues.DOWN, nextQValues.LEFT);

    const oldQ = stateQValues[chosenAction];
    qTable[currentKey][chosenAction] = oldQ + learningRate * (reward + discountFactor * maxNextQ - oldQ);

    setTotalSteps((prev) => prev + 1);

    if (terminal) {
      // Start a new episode
      setAgentPos({ r: 0, c: 0 });
      setEpisodeCount((prev) => prev + 1);
    } else {
      setAgentPos({ r: nextR, c: nextC });
    }
  };

  // Loop of continuous training when toggled, driven by intervals
  useEffect(() => {
    if (!isTraining || !isOpen) return;

    const interval = setInterval(() => {
      performStep();
    }, speedMs);

    return () => clearInterval(interval);
  }, [isTraining, agentPos, isOpen, learningRate, discountFactor, epsilon, speedMs]);

  // Bulk training helper (skips rendering step, computes 500 episodes instantly)
  const instantlyTrainBulk = () => {
    const qTable = qTableRef.current;
    let localEpisodes = episodeCount;
    let localSteps = totalSteps;

    for (let ep = 0; ep < 500; ep++) {
      let r = 0, c = 0;
      let steps = 0;
      let terminal = false;

      while (!terminal && steps < 100) {
        const stateKey = `${r},${c}`;
        const stateQValues = qTable[stateKey];

        // Epsilon-Greedy decision
        let action: Action;
        if (Math.random() < Math.max(0.05, epsilon * 0.95)) {
          action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
        } else {
          let maxQ = -Infinity;
          let bestActions: Action[] = [];
          ACTIONS.forEach((act) => {
            const val = stateQValues[act];
            if (val > maxQ) {
              maxQ = val;
              bestActions = [act];
            } else if (val === maxQ) {
              bestActions.push(act);
            }
          });
          action = bestActions[Math.floor(Math.random() * bestActions.length)] || 'UP';
        }

        const { nextR, nextC, reward, terminal: isTerm } = getNextState(r, c, action);

        // Q Value learning update
        const nextKey = `${nextR},${nextC}`;
        const nextQValues = qTable[nextKey];
        const maxNextQ = Math.max(nextQValues.UP, nextQValues.RIGHT, nextQValues.DOWN, nextQValues.LEFT);

        const oldQ = stateQValues[action];
        qTable[stateKey][action] = oldQ + learningRate * (reward + discountFactor * maxNextQ - oldQ);

        r = nextR;
        c = nextC;
        terminal = isTerm;
        steps++;
        localSteps++;
      }
      localEpisodes++;
    }

    setEpisodeCount(localEpisodes);
    setTotalSteps(localSteps);
    setAgentPos({ r: 0, c: 0 });
    // Force simple re-render by doing epsilon updates
    setEpsilon((prev) => Math.max(0.05, prev - 0.05));
  };

  const selectedQValues = qTableRef.current[`${selectedCell.r},${selectedCell.c}`] || { UP: 0, RIGHT: 0, DOWN: 0, LEFT: 0 };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh] font-sans"
          >
            {/* Header Close absolute button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 p-1.5 hover:bg-slate-800 rounded-full cursor-pointer transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Simulation Canvas Side */}
            <div className="flex-1 p-6 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] uppercase font-mono tracking-wider font-semibold text-cyan-400">RESEARCH PLAYGROUND</span>
                </div>
                <h3 className="text-xl font-bold font-display text-slate-100 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-cyan-400 animate-pulse" /> Q-Learning GridWorld Simulation
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-md">
                  A live demonstration of Bellman equation iterations. The triangle is an autonomous agent exploring policies. Use the metrics panel on the right to inspect learned values in real-time.
                </p>
              </div>

              {/* Grid Game Board Container */}
              <div className="my-6 flex justify-center items-center">
                <div className="grid grid-cols-5 gap-1 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 w-[300px] h-[300px]">
                  {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
                    const r = Math.floor(idx / GRID_SIZE);
                    const c = idx % GRID_SIZE;
                    const coord = `${r},${c}`;
                    const isAgent = agentPos.r === r && agentPos.c === c;
                    const isObstacle = obstacles.includes(coord);
                    const isGoal = coord === goal;
                    const isSelected = selectedCell.r === r && selectedCell.c === c;

                    return (
                      <div
                        key={coord}
                        onClick={() => setSelectedCell({ r, c })}
                        className={`relative rounded-lg flex items-center justify-center text-xs font-mono font-bold cursor-pointer transition-all duration-200 ${
                          isSelected ? 'ring-2 ring-cyan-400/80 bg-slate-800/80' : 'bg-slate-900/60 hover:bg-slate-800/30'
                        } border ${isObstacle ? 'border-red-950 bg-red-950/30 text-red-500' : isGoal ? 'border-emerald-950 bg-emerald-950/20 text-emerald-400' : 'border-slate-800/40'}`}
                      >
                        {isObstacle && (
                          <span className="text-[10px] uppercase text-red-400 tracking-wider">OBST</span>
                        )}
                        {isGoal && (
                          <span className="text-[10px] uppercase text-emerald-400 flex flex-col items-center">
                            <Award className="w-4 h-4 text-emerald-400" />
                            <span>+10</span>
                          </span>
                        )}
                        {!isObstacle && !isGoal && (
                          <div className="absolute inset-0.5 flex flex-col justify-between p-1 opacity-20 group-hover:opacity-100 text-[8px] text-slate-500">
                            {/* Directional values preview */}
                            <div className="text-center">{qTableRef.current[coord]?.UP.toFixed(1)}</div>
                            <div className="flex justify-between items-center">
                              <span>{qTableRef.current[coord]?.LEFT.toFixed(1)}</span>
                              <span>{qTableRef.current[coord]?.RIGHT.toFixed(1)}</span>
                            </div>
                            <div className="text-center">{qTableRef.current[coord]?.DOWN.toFixed(1)}</div>
                          </div>
                        )}

                        {/* Rendering the active training agent */}
                        {isAgent && (
                          <motion.div
                            layoutId="agent"
                            className="absolute bg-cyan-400 text-slate-950 p-2 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30 ring-2 ring-white/20"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            <Zap className="w-4 h-4" />
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setIsTraining((prev) => !prev)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 ${
                    isTraining 
                      ? 'bg-amber-500 hover:bg-amber-600 text-slate-950' 
                      : 'bg-cyan-500 hover:bg-cyan-600 text-slate-950'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  {isTraining ? 'Pause Trainer' : 'Start Trainer'}
                </button>
                <button
                  onClick={performStep}
                  disabled={isTraining}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700/60 transition-colors disabled:opacity-40"
                >
                  Step Action
                </button>
                <button
                  onClick={instantlyTrainBulk}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg text-xs font-semibold border border-slate-700/60 transition-colors"
                >
                  Epoch FastTrain (500 ep)
                </button>
                <button
                  onClick={resetQTable}
                  className="p-2 bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-red-400 rounded-lg border border-slate-800 transition-colors cursor-pointer"
                  title="Reset Policy Table"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Policy & Variables Side panel */}
            <div className="w-full md:w-[320px] bg-slate-950/60 p-6 flex flex-col justify-between overflow-y-auto">
              <div>
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-4 border-b border-slate-850 pb-2">POLICY HYPERPARAMETERS</h4>

                {/* Hyperparam controls */}
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                      <span>Learning Rate (α)</span>
                      <span className="text-cyan-400 font-bold">{learningRate.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.05"
                      max="0.8"
                      step="0.05"
                      value={learningRate}
                      onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                      <span>Discount Factor (γ)</span>
                      <span className="text-cyan-400 font-bold">{discountFactor.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="1.0"
                      step="0.05"
                      value={discountFactor}
                      onChange={(e) => setDiscountFactor(parseFloat(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                      <span>Exploration (Epsilon ε)</span>
                      <span className="text-cyan-400 font-bold">{epsilon.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.05"
                      max="0.9"
                      step="0.05"
                      value={epsilon}
                      onChange={(e) => setEpsilon(parseFloat(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">
                      Defines exploration vs. exploitation probabilities.
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                      <span>Update Speed (ms)</span>
                      <span className="text-cyan-400 font-bold">{speedMs}ms</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="300"
                      step="20"
                      value={speedMs}
                      onChange={(e) => setSpeedMs(parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>
                </div>

                {/* Training metrics overview */}
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 border-b border-slate-850 pb-1">MOCK STATE METRICS</h4>
                <div className="grid grid-cols-2 gap-2 mb-6 text-xs font-mono">
                  <div className="p-2 bg-slate-900/60 rounded border border-slate-850">
                    <div className="text-[10px] text-slate-500 uppercase">Episodes</div>
                    <div className="text-sm font-bold text-slate-200 mt-0.5">{episodeCount}</div>
                  </div>
                  <div className="p-2 bg-slate-900/60 rounded border border-slate-850">
                    <div className="text-[10px] text-slate-500 uppercase">Frames Trained</div>
                    <div className="text-sm font-bold text-slate-200 mt-0.5">{totalSteps}</div>
                  </div>
                </div>

                {/* Inspecting state selected table values */}
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 border-b border-slate-850 pb-1">Q-Table Cell inspect</h4>
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-850 text-xs font-mono">
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-500">Coordinate Selected:</span>
                    <span className="text-cyan-400 font-bold">[{selectedCell.r}, {selectedCell.c}]</span>
                  </div>
                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Q(S, Action_UP):</span>
                      <span className={selectedQValues.UP > 0 ? 'text-emerald-400 font-semibold' : selectedQValues.UP < 0 ? 'text-rose-400' : 'text-slate-400'}>
                        {selectedQValues.UP.toFixed(4)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Q(S, Action_RIGHT):</span>
                      <span className={selectedQValues.RIGHT > 0 ? 'text-emerald-400 font-semibold' : selectedQValues.RIGHT < 0 ? 'text-rose-400' : 'text-slate-400'}>
                        {selectedQValues.RIGHT.toFixed(4)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Q(S, Action_DOWN):</span>
                      <span className={selectedQValues.DOWN > 0 ? 'text-emerald-400 font-semibold' : selectedQValues.DOWN < 0 ? 'text-rose-400' : 'text-slate-400'}>
                        {selectedQValues.DOWN.toFixed(4)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Q(S, Action_LEFT):</span>
                      <span className={selectedQValues.LEFT > 0 ? 'text-emerald-400 font-semibold' : selectedQValues.LEFT < 0 ? 'text-rose-400' : 'text-slate-400'}>
                        {selectedQValues.LEFT.toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 font-mono mt-4 leading-normal">
                Click cells to inspect learned Q-values. Obstacles yield negative value propagation; the goal spreads rewards to adjacent moves over epochs.
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
