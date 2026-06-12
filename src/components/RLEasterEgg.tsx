import { useState, useEffect, useRef } from 'react';
import { Eye, Zap, RefreshCw, Play, SkipForward, Info, Settings2, PlusCircle, Brain } from 'lucide-react';

interface QCell {
  up: number;
  right: number;
  down: number;
  left: number;
}

export default function RLEasterEgg() {
  const gridSize = 4;
  const startState = { r: 3, c: 0 };
  const goalState = { r: 0, c: 3 };

  // Grid states: 0 = empty, 1 = obstacle, 2 = start, 3 = goal
  const [grid, setGrid] = useState<number[][]>([
    [0, 0, 0, 3],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [2, 0, 0, 0],
  ]);

  // Q-Table: row x col x action (up: 0, right: 1, down: 2, left: 3)
  const [qTable, setQTable] = useState<QCell[][]>(() => 
    Array.from({ length: 4 }, () => 
      Array.from({ length: 4 }, () => ({ up: 0, right: 0, down: 0, left: 0 }))
    )
  );

  const [agentPos, setAgentPos] = useState<{ r: number; c: number }>(startState);
  const [learningRate, setLearningRate] = useState(0.2);
  const [discount, setDiscount] = useState(0.9);
  const [epsilon, setEpsilon] = useState(0.3); // explorer index
  const [episodes, setEpisodes] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [logs, setLogs] = useState<string[]>(['Q-Table initialized. Agent placed at start (S: cell 3,0).']);

  const trainingRef = useRef(isTraining);
  trainingRef.current = isTraining;

  // Actions offsets helper mapping
  const actions = [
    { name: 'up', dr: -1, dc: 0, index: 0 },
    { name: 'right', dr: 0, dc: 1, index: 1 },
    { name: 'down', dr: 1, dc: 0, index: 2 },
    { name: 'left', dr: 0, dc: -1, index: 3 },
  ];

  const resetAgent = () => {
    setAgentPos(startState);
  };

  const resetQTable = () => {
    setQTable(
      Array.from({ length: 4 }, () => 
        Array.from({ length: 4 }, () => ({ up: 0, right: 0, down: 0, left: 0 }))
      )
    );
    setEpisodes(0);
    setLogs(['Q-Table cleared. Values set to 0.']);
    resetAgent();
  };

  // State coordinate cell clicking toggler
  const handleCellClick = (r: number, c: number) => {
    if ((r === startState.r && c === startState.c) || (r === goalState.r && c === goalState.c)) return;

    const newGrid = grid.map((row, rIdx) =>
      row.map((val, cIdx) => {
        if (rIdx === r && cIdx === c) {
          return val === 1 ? 0 : 1; // Toggle obstacle
        }
        return val;
      })
    );
    setGrid(newGrid);
    setLogs(prev => [`Grid cell [${r},${c}] toggled. Environment modified.`, ...prev.slice(0, 5)]);
    resetAgent();
  };

  // Perform 1 Step Q-learning update
  const makeStep = () => {
    let r = agentPos.r;
    let c = agentPos.c;

    // Check if goal reached, restart immediately
    if (r === goalState.r && c === goalState.c) {
      resetAgent();
      return;
    }

    // Epsilon-greedy action selection
    let actionIdx = 0;
    const explore = Math.random() < epsilon;

    if (explore) {
      // Pick random
      actionIdx = Math.floor(Math.random() * 4);
    } else {
      // Pick best action
      const cellQ = qTable[r][c];
      const vals = [cellQ.up, cellQ.right, cellQ.down, cellQ.left];
      const maxVal = Math.max(...vals);
      // Handle ties randomly
      const bestActions = vals
        .map((v, i) => (v === maxVal ? i : -1))
        .filter(i => i !== -1);
      actionIdx = bestActions[Math.floor(Math.random() * bestActions.length)];
    }

    const action = actions[actionIdx];
    let nextR = r + action.dr;
    let nextC = c + action.dc;

    // Penalize out of bounds or obstacle hits, state remains same
    let reward = -0.1; // small penalty for moving representation
    let bounced = false;

    if (nextR < 0 || nextR >= gridSize || nextC < 0 || nextC >= gridSize) {
      nextR = r;
      nextC = c;
      reward = -0.7; // heavier boundary crash penalty
      bounced = true;
    } else if (grid[nextR][nextC] === 1) {
      nextR = r;
      nextC = c;
      reward = -0.8; // obstacle crash penalty
      bounced = true;
    } else if (nextR === goalState.r && nextC === goalState.c) {
      reward = 10.0; // Huge target reward!
    }

    // Temporal Difference (TD) learning calculation:
    // Q(s,a) = Q(s,a) + alpha * [Reward + gamma * max_a' Q(s',a') - Q(s,a)]
    const currentQVal = 
      actionIdx === 0 ? qTable[r][c].up :
      actionIdx === 1 ? qTable[r][c].right :
      actionIdx === 2 ? qTable[r][c].down :
      qTable[r][c].left;

    const nextCellQ = qTable[nextR][nextC];
    const maxFutureQ = Math.max(nextCellQ.up, nextCellQ.right, nextCellQ.down, nextCellQ.left);

    const tdTarget = reward + discount * maxFutureQ;
    const newQVal = currentQVal + learningRate * (tdTarget - currentQVal);

    // Update state Q-Table
    const updatedQ = qTable.map((row, rIdx) =>
      row.map((cell, cIdx) => {
        if (rIdx === r && cIdx === c) {
          const newCell = { ...cell };
          if (actionIdx === 0) newCell.up = parseFloat(newQVal.toFixed(4));
          else if (actionIdx === 1) newCell.right = parseFloat(newQVal.toFixed(4));
          else if (actionIdx === 2) newCell.down = parseFloat(newQVal.toFixed(4));
          else newCell.left = parseFloat(newQVal.toFixed(4));
          return newCell;
        }
        return cell;
      })
    );

    setQTable(updatedQ);
    setAgentPos({ r: nextR, c: nextC });

    // Output visual logs
    if (reward === 10.0) {
      setEpisodes(prev => prev + 1);
      setLogs(prev => [`🏆 EP_COMPLETED! Reached TARGET prize (Reward +10). Start new cycle.`, ...prev.slice(0, 4)]);
    } else if (bounced) {
      setLogs(prev => [`💥 Bounced off cell boundary/wall. Update Q(${r},${c}) to ${newQVal.toFixed(2)}.`, ...prev.slice(0, 4)]);
    }
  };

  // Run automated fast batch episodes
  const runBatchTraining = () => {
    setIsTraining(true);
    setLogs(prev => [`⚡ Initiating fast parallel RL training batch of 50 episodes...`, ...prev]);
  };

  useEffect(() => {
    if (!isTraining) return;

    let currentEpisode = 0;
    const interval = setInterval(() => {
      // Simulate multiple fast updates per tick
      let stepsInTick = 0;
      let r = agentPos.r;
      let c = agentPos.c;
      const localQ = JSON.parse(JSON.stringify(qTable));

      while (stepsInTick < 60) {
        if (r === goalState.r && c === goalState.c) {
          r = startState.r;
          c = startState.c;
          currentEpisode += 1;
          if (currentEpisode >= 55) {
            clearInterval(interval);
            setIsTraining(false);
            setLogs(prev => [`✔ Finished batch optimization. Policy convergence achieved.`, ...prev.slice(0, 5)]);
            break;
          }
        }

        // Q-learning execution loop
        let actionIdx = Math.random() < epsilon ? Math.floor(Math.random() * 4) : 0;
        if (Math.random() >= epsilon) {
          const cell = localQ[r][c];
          const vals = [cell.up, cell.right, cell.down, cell.left];
          const maxVal = Math.max(...vals);
          const best = vals.map((v, i) => (v === maxVal ? i : -1)).filter(i => i !== -1);
          actionIdx = best[Math.floor(Math.random() * best.length)];
        }

        const action = actions[actionIdx];
        let nextR = r + action.dr;
        let nextC = c + action.dc;
        let reward = -0.1;

        if (nextR < 0 || nextR >= gridSize || nextC < 0 || nextC >= gridSize) {
          nextR = r;
          nextC = c;
          reward = -0.5;
        } else if (grid[nextR][nextC] === 1) {
          nextR = r;
          nextC = c;
          reward = -0.6;
        } else if (nextR === goalState.r && nextC === goalState.c) {
          reward = 10.0;
        }

        const currCell = localQ[r][c];
        const currentQ = actionIdx === 0 ? currCell.up : actionIdx === 1 ? currCell.right : actionIdx === 2 ? currCell.down : currCell.left;
        const nextCell = localQ[nextR][nextC];
        const nextMax = Math.max(nextCell.up, nextCell.right, nextCell.down, nextCell.left);
        const targetQ = reward + discount * nextMax;
        const updatedVal = currentQ + learningRate * (targetQ - currentQ);

        if (actionIdx === 0) localQ[r][c].up = updatedVal;
        else if (actionIdx === 1) localQ[r][c].right = updatedVal;
        else if (actionIdx === 2) localQ[r][c].down = updatedVal;
        else localQ[r][c].left = updatedVal;

        r = nextR;
        c = nextC;
        stepsInTick++;
      }

      setQTable(localQ);
      setAgentPos({ r, c });
      setEpisodes(prev => prev + currentEpisode);
    }, 120);

    return () => clearInterval(interval);
  }, [isTraining]);

  // Calculate highest Q direction for vector arrow displays
  const getBestDirSymbol = (cell: QCell) => {
    const vals = [cell.up, cell.right, cell.down, cell.left];
    const maxVal = Math.max(...vals);
    if (maxVal === 0) return '•';
    const index = vals.indexOf(maxVal);
    if (index === 0) return '↑';
    if (index === 1) return '→';
    if (index === 2) return '↓';
    return '←';
  };

  return (
    <div className="border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-950 border border-blue-500/20 rounded-xl">
            <Brain className="text-blue-400 animate-pulse" size={20} />
          </div>
          <div>
            <h4 className="font-sans text-base font-bold text-slate-100 flex items-center gap-2">
              Reinforcement Learning Sandbox 
              <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider">
                Easter Egg
              </span>
            </h4>
            <p className="font-mono text-[11px] text-slate-400">Markov Decision Process Model (Bellman Equation Q-Learning)</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={resetQTable}
            className="p-2 text-slate-400 hover:text-red-400 border border-slate-800 bg-slate-950/40 rounded-lg text-xs font-mono flex items-center gap-1.5 hover:border-red-500/30 transition"
            title="Clean State"
          >
            <RefreshCw size={13} />
            <span>Clean Values</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Q-Table Visual Maze Cell Space */}
        <div className="lg:col-span-5 space-y-4">
          <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider block">Grid World Matrix [Tap to toggle walls]</span>
          
          <div className="grid grid-cols-4 gap-2.5 max-w-[320px] mx-auto lg:mx-0">
            {grid.map((row, r) =>
              row.map((val, c) => {
                const isAgent = agentPos.r === r && agentPos.c === c;
                const cellQ = qTable[r][c];
                const bestDir = getBestDirSymbol(cellQ);

                return (
                  <div
                    key={`${r}-${c}`}
                    onClick={() => handleCellClick(r, c)}
                    className={`aspect-square rounded-xl border relative flex flex-col items-center justify-between p-1 cursor-pointer transition-all duration-200 select-none ${
                      val === 1 
                        ? 'bg-slate-950/80 border-red-500/30 text-red-500/80' 
                        : val === 3 
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300' 
                        : isAgent 
                        ? 'bg-blue-600 border-blue-400 text-white shadow-lg scale-105 z-10'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-950/85 text-slate-300'
                    }`}
                  >
                    {/* Position Label */}
                    <span className="text-[8px] font-mono text-slate-600 block self-start">r:{r},c:{c}</span>

                    {/* Node central value indicator graphics */}
                    <div className="flex-1 flex items-center justify-center">
                      {isAgent ? (
                        <span className="text-xl animate-bounce">🤖</span>
                      ) : val === 1 ? (
                        <span className="text-xs font-mono font-bold">WALL</span>
                      ) : val === 3 ? (
                        <span className="text-lg animate-pulse">🧠</span>
                      ) : (
                        <span className="text-sm font-bold text-slate-400 bg-slate-900/40 px-1 py-0.5 rounded font-mono">{bestDir}</span>
                      )}
                    </div>

                    {/* Small coordinate value rendering */}
                    {val === 0 && !isAgent && (
                      <span className="text-[8px] font-mono text-blue-400/80 block">
                        val: {Math.max(cellQ.up, cellQ.right, cellQ.down, cellQ.left).toFixed(1)}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>

          <div className="flex gap-2 text-[10px] font-mono text-slate-500 justify-center lg:justify-start">
            <span className="flex items-center gap-1">🤖 Agent</span>
            <span className="flex items-center gap-1">🧠 Goal (+10)</span>
            <span className="flex items-center gap-1">🟥 Obstacle</span>
          </div>
        </div>

        {/* Setting Parameters & Statistics Column */}
        <div className="lg:col-span-4 space-y-4">
          <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider block">Policy Hyperparameters</span>
          
          <div className="space-y-3.5 bg-slate-950/50 p-4 rounded-xl border border-slate-850">
            {/* LR Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Learning Rate (α)</span>
                <span className="text-yellow-400 font-bold">{learningRate}</span>
              </div>
              <input
                type="range" min="0.05" max="0.8" step="0.05"
                value={learningRate} onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                className="w-full accent-blue-500 opacity-80"
              />
            </div>

            {/* Discount Factor Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Discount Factor (γ)</span>
                <span className="text-yellow-400 font-bold">{discount}</span>
              </div>
              <input
                type="range" min="0.5" max="0.99" step="0.05"
                value={discount} onChange={(e) => setDiscount(parseFloat(e.target.value))}
                className="w-full accent-blue-500 opacity-80"
              />
            </div>

            {/* Epsilon Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Exploration Rate (ε)</span>
                <span className="text-yellow-400 font-bold">{(epsilon * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range" min="0.0" max="0.7" step="0.05"
                value={epsilon} onChange={(e) => setEpsilon(parseFloat(e.target.value))}
                className="w-full accent-blue-500 opacity-80"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={makeStep}
              disabled={isTraining}
              className="py-2.5 px-3 rounded-lg border border-slate-800 bg-slate-950/70 hover:border-slate-600 hover:text-blue-300 transition text-xs font-mono flex items-center justify-center gap-2 text-slate-300 disabled:opacity-40"
            >
              <SkipForward size={13} />
              <span>Manual Step</span>
            </button>
            <button
              onClick={runBatchTraining}
              disabled={isTraining}
              className="py-2.5 px-3 rounded-lg border border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-400 hover:text-blue-200 transition text-xs font-mono flex items-center justify-center gap-2 text-blue-300 disabled:opacity-40"
            >
              <Zap size={13} className="animate-pulse" />
              <span>Train (50 epx)</span>
            </button>
          </div>
        </div>

        {/* Real-Time Training Log Terminal Panel */}
        <div className="lg:col-span-3 space-y-2">
          <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider block">Policy Logs & Metrics</span>
          
          <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl font-mono text-[11px] h-[190px] flex flex-col justify-between">
            <div className="space-y-1.5 overflow-y-auto max-h-[120px] pr-1">
              {logs.map((log, i) => (
                <div key={i} className={`leading-tight ${i === 0 ? 'text-blue-400 font-bold' : 'text-slate-500'}`}>
                  &gt; {log}
                </div>
              ))}
            </div>

            <div className="border-t border-slate-900 pt-3 mt-2 flex justify-between items-center text-[10px] text-slate-400">
              <span>EPISODES: <strong className="text-emerald-400">{episodes}</strong></span>
              <span>GRID_TYPE: 4x4_MDP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
