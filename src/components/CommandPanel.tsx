import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Zap, 
  Flame, 
  Snowflake, 
  Wind, 
  ChevronRight,
  BookOpen,
  Play
} from 'lucide-react';
import { CharacterState, Skill } from '../types';
import { findSpecialCombo, SPECIAL_COMBOS } from '../data/gameData';

interface CommandPanelProps {
  activeHero: CharacterState;
  slotA: Skill | null;
  slotB: Skill | null;
  abilityActive: boolean;
  onSetSlotA: (skill: Skill | null) => void;
  onSetSlotB: (skill: Skill | null) => void;
  onToggleAbility: () => void;
  onExecuteTurn: () => void;
  hasSufficientMp: boolean;
  hasSufficientSp: boolean;
  requiredMp: number;
  requiredSp: number;
  selectedEnemyName: string;
  selectedAllyName: string;
}

export const CommandPanel: React.FC<CommandPanelProps> = ({
  activeHero,
  slotA,
  slotB,
  abilityActive,
  onSetSlotA,
  onSetSlotB,
  onToggleAbility,
  onExecuteTurn,
  hasSufficientMp,
  hasSufficientSp,
  requiredMp,
  requiredSp,
  selectedEnemyName,
  selectedAllyName,
}) => {
  const activeCombo = (slotA && slotB && abilityActive) 
    ? findSpecialCombo(slotA.id, slotB.id, activeHero.uniqueAbility.id) 
    : null;

  const currentHeroRecipes = SPECIAL_COMBOS.filter(
    (recipe) => recipe.abilityId === activeHero.uniqueAbility.id
  );

  const getElementIcon = (element: string, size = 12) => {
    switch (element) {
      case 'fire': return <Flame size={size} className="text-rose-450" />;
      case 'ice': return <Snowflake size={size} className="text-cyan-400" />;
      case 'wind': return <Wind size={size} className="text-emerald-400" />;
      case 'light': return <Sparkles size={size} className="text-amber-400" />;
      default: return null;
    }
  };

  return (
    <div className="bg-zinc-900 border-[4px] border-black p-2.5 flex flex-col md:flex-row gap-2.5 border-t-[5px] border-t-rose-600 rounded-none shadow-xl text-white font-sans" id="command-root">
      
      {/* 左列: 指令構築スロット＆スキル一覧 */}
      <div className="flex-1 flex flex-col gap-2.5" id="command-builder">
        
        {/* 行動ヒーローのヘッドライン */}
        <div className="flex items-center justify-between border-b border-zinc-805 pb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-3.5 bg-rose-600 border border-white"></span>
            <div>
              <p className="text-[7.5px] text-rose-500 font-bold tracking-widest uppercase">行動可能キャラクター</p>
              <h3 className="text-base font-black italic uppercase tracking-tighter text-white font-display leading-none mt-0.5">{activeHero.name}</h3>
            </div>
          </div>
          {/* 簡易ステータス表示 */}
          <div className="flex gap-2 font-mono text-[10px] font-bold bg-zinc-950 px-2 py-0.5 border border-zinc-850">
            <span className="text-zinc-400">保有MP: <b className="text-[#f43f5e] font-extrabold">{activeHero.mp}</b>/{activeHero.maxMp}</span>
            <span className="text-zinc-400">現在SP: <b className="text-[#fbbf24] font-extrabold">{activeHero.sp}</b>%</span>
          </div>
        </div>

        {/* コマンドスロット選択状態 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2" id="slots-view">
          
          {/* コマンドスロット1 */}
          <div className="bg-white text-black border border-black p-1.5 px-2 flex flex-col justify-between h-[48px] sm:h-[54px] rounded-none shadow-[1px_1px_0px_rgba(0,0,0,1)] hover:translate-y-[-0.5px] transition-all">
            <div className="flex justify-between items-center leading-none">
              <span className="text-[7.5px] text-rose-600 font-black tracking-wider">スロット1: スキルA</span>
              {slotA && (
                <button 
                  onClick={() => onSetSlotA(null)} 
                  className="text-black font-bold text-[8.5px] hover:text-rose-600 underline cursor-pointer"
                >
                  解除
                </button>
              )}
            </div>
            
            {slotA ? (
              <motion.div 
                initial={{ scale: 0.97 }} 
                animate={{ scale: 1 }} 
                className="flex-1 flex flex-col justify-center min-w-0"
              >
                <div className="flex items-center gap-1 mt-0.5">
                  {getElementIcon(slotA.element, 10)}
                  <p className="text-[11px] font-black italic uppercase text-black font-display leading-none truncate">{slotA.name}</p>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-zinc-400 text-[8px] font-bold tracking-wider border border-dashed border-zinc-305 bg-zinc-50 select-none p-0.5 text-center leading-none">
                スキルAを選択
              </div>
            )}
          </div>

          {/* コマンドスロット2 */}
          <div className="bg-white text-black border border-black p-1.5 px-2 flex flex-col justify-between h-[48px] sm:h-[54px] rounded-none shadow-[1px_1px_0px_rgba(0,0,0,1)] hover:translate-y-[-0.5px] transition-all">
            <div className="flex justify-between items-center leading-none">
              <span className="text-[7.5px] text-rose-600 font-black tracking-wider">スロット2: スキルB</span>
              {slotB && (
                <button 
                  onClick={() => onSetSlotB(null)} 
                  className="text-black font-bold text-[8.5px] hover:text-rose-600 underline cursor-pointer"
                >
                  解除
                </button>
              )}
            </div>
            
            {slotB ? (
              <motion.div 
                initial={{ scale: 0.97 }} 
                animate={{ scale: 1 }} 
                className="flex-1 flex flex-col justify-center min-w-0"
              >
                <div className="flex items-center gap-1 mt-0.5">
                  {getElementIcon(slotB.element, 10)}
                  <p className="text-[11px] font-black italic uppercase text-black font-display leading-none truncate">{slotB.name}</p>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-zinc-400 text-[8px] font-bold tracking-wider border border-dashed border-zinc-305 bg-zinc-50 rounded-none select-none p-0.5 text-center leading-none">
                スキルBを選択
              </div>
            )}
          </div>

          {/* 固有能力トグラー */}
          <button
            onClick={() => activeHero.sp >= activeHero.uniqueAbility.spCost && onToggleAbility()}
            disabled={activeHero.sp < activeHero.uniqueAbility.spCost}
            className={`text-left rounded-none p-1.5 px-2 border h-[48px] sm:h-[54px] transition-all duration-205 flex flex-col justify-between cursor-pointer ${
              activeHero.sp < activeHero.uniqueAbility.spCost
                ? 'opacity-30 bg-zinc-950/30 border-zinc-850 text-zinc-500 cursor-not-allowed'
                : abilityActive
                  ? 'border-rose-600 bg-rose-100 text-black shadow-[1px_1px_0px_rgba(0,0,0,1)] ring-1 ring-rose-505'
                  : 'border-zinc-700 bg-[#0a0a0d] text-white hover:border-zinc-500'
            }`}
          >
            <div className="flex justify-between items-center w-full leading-none">
              <span className={`text-[7.5px] font-black tracking-wider flex items-center gap-0.5 ${abilityActive ? 'text-rose-600' : 'text-rose-400'}`}>
                <Zap size={7} /> ユニーク能力
              </span>
              {abilityActive && (
                <span className="bg-rose-600 text-white font-black text-[6.5px] px-1 py-0.1 rounded leading-none">
                  ON
                </span>
              )}
            </div>

            <div className="flex-grow flex flex-col justify-center min-w-0 my-0.5">
              <p className={`text-[11px] font-black italic uppercase font-display leading-none truncate ${abilityActive ? 'text-black' : 'text-white'}`}>
                {activeHero.uniqueAbility.name}
              </p>
            </div>

            <div className={`text-[8px] font-mono font-bold flex justify-between w-full leading-none ${abilityActive ? 'text-zinc-700' : 'text-zinc-500'}`}>
              <span>必要:{activeHero.uniqueAbility.spCost}SP</span>
              <span>現在:{activeHero.sp}SP</span>
            </div>
          </button>

        </div>

        {/* コマンド選択可能なアクティブスキルデッキ */}
        <div className="p-2 bg-zinc-950 border border-zinc-850 rounded-none space-y-1.5" id="selection-deck">
          <div className="flex items-center justify-between border-b border-zinc-850 pb-1">
            <div>
              <h4 className="text-[10px] sm:text-xs font-black tracking-widest text-[#fbbf24] uppercase">選択可能なキャラ戦闘スキル</h4>
              <p className="text-[8px] text-zinc-500 mt-0.5">タップまたはクリックで上記スロットへ順次装填します。</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {activeHero.skills.map((skill) => {
              const isSlotA = slotA?.id === skill.id;
              const isSlotB = slotB?.id === skill.id;
              const canAfford = activeHero.mp >= skill.mpCost;

              let stateClass = '';
              if (!canAfford) {
                stateClass = 'opacity-35 border-zinc-900 cursor-not-allowed bg-zinc-950/20 text-zinc-600';
              } else if (isSlotA) {
                stateClass = 'border-rose-600 bg-rose-950/40 text-white font-bold shadow-[1px_1px_0px_rgba(225,29,72,1)]';
              } else if (isSlotB) {
                stateClass = 'border-rose-400 bg-rose-950/20 text-white font-bold shadow-[1px_1px_0px_rgba(244,63,94,0.8)]';
              } else {
                stateClass = 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 text-zinc-200 hover:bg-zinc-850 shadow-[1px_1px_0px_rgba(0,0,0,0.3)]';
              }

              return (
                <button
                  key={skill.id}
                  onClick={() => {
                    if (!slotA) {
                      onSetSlotA(skill);
                    } else if (!slotB) {
                      onSetSlotB(skill);
                    } else {
                      onSetSlotA(skill);
                      onSetSlotB(null);
                    }
                  }}
                  disabled={!canAfford}
                  className={`text-left p-1.5 sm:p-2 rounded-none border text-xs transition-all relative flex flex-col justify-between gap-0.5 cursor-pointer min-h-[46px] sm:min-h-[50px] ${stateClass}`}
                >
                  <div className="flex justify-between items-center w-full min-w-0 leading-none">
                    <span className="font-black font-display uppercase tracking-tight text-white flex items-center gap-1 truncate w-9/12">
                      {getElementIcon(skill.element, 10)}
                      {skill.name}
                    </span>
                    <span className="font-mono text-[8px] bg-zinc-950 border border-zinc-805 px-1.5 py-0.2 rounded text-rose-450 font-bold shrink-0">
                      {skill.mpCost} MP
                    </span>
                  </div>

                  <p className="text-[8.5px] text-zinc-400 leading-tight font-sans line-clamp-1 pr-12">{skill.description}</p>
                  
                  {/* 装填状況スロットバッジ */}
                  <div className="absolute right-1.5 bottom-1 flex gap-0.5 leading-none">
                    {isSlotA && (
                      <span className="bg-rose-600 text-white text-[6.5px] font-black px-1.5 py-0.2 rounded leading-none">
                        A
                      </span>
                    )}
                    {isSlotB && (
                      <span className="bg-rose-500 text-white text-[6.5px] font-black px-1.5 py-0.2 rounded leading-none">
                        B
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 右列: 共鳴予測＆発動アクション */}
      <div className="w-full md:w-64 bg-zinc-950 border border-zinc-850 rounded-none p-2 md:p-3 flex flex-col justify-between" id="resonance-deck">
        <div>
          <div className="flex items-center gap-1 pb-1 border-b border-zinc-850">
            <Sparkles size={10} className="text-rose-500 animate-pulse" />
            <h4 className="text-[8.5px] text-[#fbbf24] font-black uppercase tracking-wider">戦術コンボシミュレータ</h4>
          </div>

          <div className="py-2 flex-1 flex flex-col justify-center min-h-[48px] sm:min-h-[56px]" id="result-status-container">
            <AnimatePresence mode="wait">
              {activeCombo ? (
                <motion.div
                  key={activeCombo.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-0.5 min-w-0"
                >
                  <div className="inline-flex items-center gap-0.5 bg-rose-600 text-white px-1.5 py-0.2 text-[7.5px] font-black uppercase tracking-wider border border-white leading-none">
                    ⚡ 連携発動可能 ⚡
                  </div>
                  <div>
                    <h4 className="text-xs font-black italic uppercase tracking-tighter text-[#fbbf24] font-display leading-none">{activeCombo.name}</h4>
                  </div>
                  <p className="text-[8px] text-zinc-400 leading-tight font-sans">{activeCombo.description}</p>
                </motion.div>
              ) : (slotA || slotB) ? (
                <motion.div
                  key="sequential"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-1"
                >
                  <div className="inline-flex items-center gap-0.5 bg-zinc-800 text-zinc-300 px-1 py-0.2 border border-zinc-700 text-[6.5px] font-black leading-none">
                    連続通常判定
                  </div>
                  
                  <div className="space-y-0.5 text-[8px] text-zinc-300 font-bold leading-none">
                    {slotA && (
                      <div className="flex items-center gap-1 bg-zinc-900/60 p-0.5 border border-zinc-850 truncate">
                        <span className="w-1 h-1.5 bg-indigo-500"></span>
                        <ChevronRight size={6} />
                        <span className="truncate">{slotA.name}</span>
                      </div>
                    )}
                    {slotB && (
                      <div className="flex items-center gap-1 bg-zinc-900/60 p-0.5 border border-zinc-850 truncate">
                        <span className="w-1 h-1.5 bg-violet-500"></span>
                        <ChevronRight size={6} />
                        <span className="truncate">{slotB.name}</span>
                      </div>
                    )}
                    {abilityActive && (
                      <div className="flex items-center gap-1 bg-zinc-900/60 p-0.5 border border-zinc-850 text-amber-500 truncate">
                        <Zap size={6} />
                        <span className="truncate">【{activeHero.uniqueAbility.name}】準備OK</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="text-center text-zinc-650 space-y-1 leading-none">
                  <Play size={12} className="mx-auto stroke-[1.5] text-zinc-700" />
                  <p className="text-[8px] font-sans text-zinc-500 leading-tight">
                    コマンド構成でここに自動でプレビュー。
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* コストサマリー・発動ボタン */}
        <div className="space-y-1.5 pt-1.5 border-t border-zinc-850">
          
          {/* 明示的なターゲット標的インジケータ */}
          <div className="text-[7.5px] font-mono text-zinc-450 flex flex-col gap-0 bg-zinc-950 p-1 px-1.5 border border-zinc-850 truncate leading-tight">
            <span className="flex items-center gap-1 truncate text-zinc-300">
              <span className="w-1 h-1 bg-rose-600"></span>攻撃対象: <b>{selectedEnemyName || '自動'}</b>
            </span>
            <span className="flex items-center gap-1 truncate text-zinc-300">
              <span className="w-1 h-1 bg-cyan-500"></span>支援/回復対象: <b>{selectedAllyName || '自身'}</b>
            </span>
          </div>

          <div className="flex justify-between items-center text-[8.5px] font-mono text-zinc-400">
            <span>消費コスト：</span>
            <div className="flex gap-1.5">
              <span className={hasSufficientMp ? 'text-indigo-400 font-bold' : 'text-rose-500 font-black'}>
                {requiredMp} MP
              </span>
              <span className="text-amber-400 font-bold">
                {requiredSp} SP
              </span>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={onExecuteTurn}
              disabled={(!slotA && !slotB && !abilityActive) || !hasSufficientMp || !hasSufficientSp}
              className={`w-full py-2 font-black uppercase text-xs flex justify-center items-center gap-1 transition-all skew-x-[-10deg] tracking-wide relative ${
                (!slotA && !slotB && !abilityActive) || !hasSufficientMp || !hasSufficientSp
                  ? 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed'
                  : activeCombo
                    ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white border border-white hover:brightness-110 shadow-[0_1px_5px_rgba(225,29,72,0.3)] cursor-pointer font-extrabold'
                    : 'bg-rose-605 bg-rose-600 hover:bg-rose-500 text-white border border-white cursor-pointer'
              }`}
              id="btn-execute-turn"
            >
              <span className="skew-x-[10deg] flex items-center justify-center gap-1">
                {activeCombo ? '超連携共鳴技を発動！' : '行動を実行する'}
              </span>
            </button>
          </div>

          {!hasSufficientMp && (slotA || slotB) && (
            <p className="text-[8px] text-center text-rose-500 font-bold uppercase tracking-wider block animate-pulse mt-0.5">
              ※ パーティのMPが不足しています！
            </p>
          )}

          {/* 極意書セクション */}
          <div className="flex gap-1 items-center justify-center pt-1 relative">
            <details className="group w-full">
              <summary className="w-full flex items-center justify-center gap-1 text-[7.5px] font-black text-zinc-400 group-hover:text-zinc-200 cursor-pointer list-none select-none uppercase">
                <BookOpen size={8} className="text-rose-500 animate-pulse" />
                <span>秘伝連携書レシピを開く ({currentHeroRecipes.length})</span>
              </summary>
              <div className="absolute bottom-7 right-0 left-0 bg-zinc-950 border-2 border-black p-2.5 rounded-none shadow-2xl z-50 text-[9px] space-y-1.5 mt-0.5 select-none overflow-y-auto max-h-36 text-white border-t-4 border-t-rose-500">
                <p className="text-[10px] text-rose-500 font-black uppercase border-b border-zinc-850 pb-0.5 flex items-center justify-between">
                  <span>✨ {activeHero.name} の秘伝書レシピ</span>
                </p>
                {currentHeroRecipes.map((recipe) => {
                  const sA = activeHero.skills.find(s => s.id === recipe.skillAId)?.name || 'スキルA';
                  const sB = activeHero.skills.find(s => s.id === recipe.skillBId)?.name || 'スキルB';
                  
                  return (
                    <div key={recipe.id} className="border-b border-zinc-850 pb-1 last:border-b-0 space-y-0.5">
                      <p className="text-amber-400 font-extrabold text-[9px] uppercase italic">{recipe.name}</p>
                      <p className="text-zinc-400 leading-tight font-sans">{recipe.description}</p>
                      <p className="text-[7.5px] font-bold text-rose-500">
                        合成: {sA.split(' ')[0]} ＋ {sB.split(' ')[0]} ＋ 固有能力
                      </p>
                    </div>
                  );
                })}
              </div>
            </details>
          </div>

        </div>
      </div>
    </div>
  );
};
