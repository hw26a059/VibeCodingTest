import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Terminal, RefreshCw } from 'lucide-react';
import { BattleLog } from '../types';

interface LogViewProps {
  logs: BattleLog[];
  onResetGame: () => void;
  victoryCount: number;
}

export const LogView: React.FC<LogViewProps> = ({ logs, onResetGame, victoryCount }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogStyle = (type: string) => {
    switch (type) {
      case 'damage': return 'text-rose-450 bg-rose-950/15 border-l-4 border-rose-600 font-sans font-semibold text-[11px]';
      case 'heal': return 'text-emerald-400 bg-emerald-950/15 border-l-4 border-emerald-500 font-sans font-semibold text-[11px]';
      case 'shield': return 'text-cyan-400 bg-cyan-950/15 border-l-4 border-cyan-500 font-sans font-semibold text-[11px]';
      case 'combo': return 'text-amber-400 font-black italic uppercase font-display bg-amber-950/30 border-l-4 border-amber-500 py-1.5 text-xs tracking-wide';
      case 'player_action': return 'text-white bg-zinc-950/40 border-l-4 border-zinc-200 font-sans font-bold text-[11px]';
      case 'enemy_action': return 'text-orange-400 font-bold uppercase tracking-tight bg-orange-950/15 border-l-4 border-orange-500 text-[11px]';
      case 'victory': return 'text-yellow-400 font-black italic uppercase font-display bg-yellow-950/40 border-l-4 border-yellow-500 py-2 text-xs tracking-wider';
      case 'defeat': return 'text-rose-600 font-black italic uppercase font-display bg-zinc-950/90 border-l-4 border-rose-600 py-2 text-xs tracking-wider';
      default: return 'text-zinc-300 border-l-4 border-zinc-700 bg-zinc-950/20 text-[11px]';
    }
  };

  return (
    <div className="bg-zinc-900 border-[4px] border-black p-2 sm:p-2 flex flex-col h-24 sm:h-26 rounded-none shadow-xl text-white font-sans border-t-[5px] border-t-zinc-950" id="log-root">
      
      {/* 操作ヘッダー欄 */}
      <div className="flex justify-between items-center pb-1.5 border-b border-zinc-800 shrink-0">
        <div className="flex items-center gap-1.5">
          <Terminal size={12} className="text-rose-500" />
          <h4 className="text-[9px] text-rose-500 font-black tracking-widest leading-none">戦闘アクション行動記録ログ</h4>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 font-mono text-[9px] font-bold text-zinc-400 bg-zinc-950 px-2 py-0.5 border border-zinc-850">
            <span className="text-zinc-550 mr-1 tracking-wider text-[8px]">踏破ステージ数:</span>
            <span className="text-[#fbbf24] font-black">{victoryCount}</span>
          </div>

          <button
            onClick={onResetGame}
            className="flex items-center gap-1 text-[8.5px] font-black tracking-wider text-[#f43f5e] border border-black bg-white hover:bg-rose-50 hover:text-black px-2.5 py-1 rounded-none shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] hover:translate-y-[0.5px] transition cursor-pointer"
          >
            <RefreshCw size={9} className="text-black" />
            <span>タイトルへ</span>
          </button>
        </div>
      </div>

      {/* ログフィード */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto mt-2 space-y-1 pr-1 font-sans text-[11px] leading-relaxed select-text scroll-smooth"
        id="battle-log-feed"
      >
        {logs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-0.5 tracking-wider text-center py-2">
            <Terminal size={14} className="text-zinc-600 mb-0.5" />
            <span className="text-[10px]">戦闘コマンドを実行すると、ここにバトルの詳細ログが入ります。</span>
          </div>
        ) : (
          logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -2 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-1.5 pl-2 font-sans break-words rounded-none ${getLogStyle(log.type)}`}
            >
              {log.text}
            </motion.div>
          ))
        )}
      </div>

    </div>
  );
};
