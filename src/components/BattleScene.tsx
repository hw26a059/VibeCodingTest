import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  Snowflake, 
  Wind, 
  Heart, 
  Shield, 
  Sparkles, 
  Zap,
  User,
  HelpCircle
} from 'lucide-react';
import { CharacterState, EnemyState, FloatingText } from '../types';

interface BattleSceneProps {
  party: CharacterState[];
  enemies: EnemyState[];
  activeHeroId: string | null;
  stageBackground: string;
  stageName: string;
  stageDesc: string;
  floatingTexts: FloatingText[];
  onSelectEnemyTarget: (id: string) => void;
  selectedEnemyId: string | null;
  selectedAllyId: string | null;
  onSelectAllyTarget: (id: string) => void;
  isEnemyTurn: boolean;
  enemyTargetId: string | null;
}

export const BattleScene: React.FC<BattleSceneProps> = ({
  party,
  enemies,
  activeHeroId,
  stageBackground,
  stageName,
  stageDesc,
  floatingTexts,
  onSelectEnemyTarget,
  selectedEnemyId,
  selectedAllyId,
  onSelectAllyTarget,
  isEnemyTurn,
  enemyTargetId,
}) => {
  const getHeroIcon = (id: string, size = 16) => {
    switch (id) {
      case 'alric':
        return <Flame size={size} className="text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" />;
      case 'selene':
        return <Snowflake size={size} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />;
      case 'lyra':
        return <Wind size={size} className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />;
      default:
        return <User size={size} />;
    }
  };

  const getEnemyVisual = (seed: string) => {
    switch (seed) {
      case 'lime_slime':
        return (
          <div className="relative w-10 h-10 mx-auto flex items-end justify-center">
            <div className="w-8 h-6 bg-emerald-500/80 rounded-t-full rounded-b-xl border border-emerald-400 shadow flex items-center justify-center animate-bounce duration-1000">
              <span className="text-[8px] font-bold text-emerald-100 mt-0.5">..</span>
            </div>
          </div>
        );
      case 'fire_slime':
        return (
          <div className="relative w-10 h-10 mx-auto flex items-end justify-center">
            <div className="w-8 h-6 bg-amber-600/80 rounded-t-full rounded-b-xl border border-amber-500 shadow flex items-center justify-center animate-pulse">
              <span className="text-xs">🔥</span>
            </div>
          </div>
        );
      case 'aqua_slime':
        return (
          <div className="relative w-10 h-10 mx-auto flex items-end justify-center">
            <div className="w-8 h-6 bg-cyan-500/80 rounded-t-full rounded-b-xl border border-cyan-400 shadow flex items-center justify-center animate-bounce delay-200 duration-1000">
              <span className="text-xs">💧</span>
            </div>
          </div>
        );
      case 'rune_spark':
        return (
          <div className="relative w-10 h-10 mx-auto flex items-center justify-center">
            <div className="w-7 h-7 bg-purple-600/80 rounded-full border border-purple-400 animate-spin flex items-center justify-center shadow">
              <Sparkles size={8} className="text-purple-200" />
            </div>
          </div>
        );
      case 'ruin_golem':
        return (
          <div className="relative w-14 h-14 mx-auto flex items-end justify-center">
            <div className="w-12 h-11 bg-slate-700/90 rounded-lg border-2 border-slate-500 shadow flex flex-col items-center justify-between p-1 shadow-slate-900">
              <div className="w-full h-4 bg-slate-800 rounded flex items-center justify-around px-0.5 border border-slate-600">
                <span className="w-1 h-1 bg-cyan-400 rounded-full animate-ping"></span>
                <span className="w-1 h-1 bg-cyan-400 rounded-full animate-ping"></span>
              </div>
              <div className="text-[5.5px] font-mono text-zinc-400 leading-none">R-04</div>
            </div>
          </div>
        );
      case 'gargoyle_bat':
        return (
          <div className="relative w-10 h-10 mx-auto flex items-center justify-center">
            <div className="w-8 h-6 bg-red-950/90 rounded-b-lg border border-red-800 animate-pulse relative flex items-center justify-center">
              <span className="text-red-500 text-xs animate-bounce">🦇</span>
            </div>
          </div>
        );
      case 'belial':
        return (
          <div className="relative w-16 h-16 mx-auto flex items-end justify-center">
            <div className="w-15 h-14 bg-gradient-to-t from-orange-950/95 to-slate-900/95 rounded-xl border border-orange-600/90 shadow flex flex-col items-center justify-between p-1 shadow-orange-900/40">
              <span className="text-[5px] bg-red-800 text-red-100 px-1 py-0.1 rounded font-bold font-mono leading-none">BOSS</span>
              <div className="w-6 h-5 bg-black/45 rounded flex items-center justify-center relative my-0.5">
                <span className="text-xs animate-pulse">👑</span>
              </div>
              <span className="text-[6.5px] font-mono tracking-wider text-orange-400 font-black">BELIAL</span>
            </div>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 bg-rose-900 border border-rose-500 rounded-full flex items-center justify-center">
            <HelpCircle className="text-rose-100" size={12} />
          </div>
        );
    }
  };

  return (
    <div 
      className="relative w-full rounded-none border-4 border-rose-600 overflow-hidden flex flex-col min-h-[160px] sm:min-h-[180px] bg-zinc-950"
      style={{ background: `linear-gradient(rgba(9, 9, 11, 0.9), rgba(9, 9, 11, 0.94)), ${stageBackground}` }}
      id="battle-arena"
    >
      {/* 水印背景 */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center select-none z-0">
        <span className="text-[60px] sm:text-[100px] font-black italic text-white tracking-tighter uppercase font-display leading-none">BATTLE</span>
      </div>

      {/* ダメージ・回復数値レイヤー */}
      <div className="absolute inset-0 pointer-events-none z-45 overflow-hidden" id="floating-text-container">
        <AnimatePresence>
          {floatingTexts.map((f) => {
            const isHeal = f.type === 'heal';
            const isShield = f.type === 'shield';
            const isCrit = f.type === 'crit';
            const isCombo = f.type === 'combo';
            const isStatus = f.type === 'status';
            const isMiss = f.type === 'miss';

            let textColor = 'text-rose-500 font-display font-black text-lg sm:text-xl italic tracking-tighter';
            if (isHeal) textColor = 'text-emerald-450 font-display font-black text-lg sm:text-xl italic tracking-tighter';
            else if (isShield) textColor = 'text-cyan-400 font-display font-black text-base tracking-tighter';
            else if (isCrit) textColor = 'text-yellow-400 font-display font-black text-xl sm:text-2xl italic tracking-tighter uppercase';
            else if (isCombo) textColor = 'text-[#a855f7] font-display font-black text-xl sm:text-2xl italic tracking-tighter uppercase';
            else if (isStatus) textColor = 'text-purple-350 font-mono font-bold text-xs';
            else if (isMiss) textColor = 'text-zinc-500 font-sans font-bold text-base tracking-widest uppercase';

            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, scale: 0.6, y: `${f.y}%`, x: `${f.x}%` }}
                animate={{ 
                  opacity: [0, 1, 1, 0], 
                  scale: [0.6, 1.2, 1, 0.8],
                  y: [`${f.y}%`, `${f.y - 10}%`, `${f.y - 15}%`, `${f.y - 20}%`] 
                }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                exit={{ opacity: 0 }}
                className={`absolute select-none transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] ${textColor}`}
              >
                {isCrit && <span className="text-[7px] uppercase font-accent font-black tracking-widest text-[#f59e0b] mb-0.5">CRITICAL!</span>}
                {isCombo && <span className="text-[8px] uppercase font-accent font-black tracking-wider text-[#fbbf24] mb-0.5">連携超共鳴技！</span>}
                <span>{f.text}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ステージヘッダー */}
      <div className="w-full bg-zinc-900 border-b border-rose-600/50 px-2 py-1 flex flex-row justify-between items-center z-10" id="battle-header">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[7px] font-black tracking-widest text-rose-500 uppercase font-accent shrink-0">闘技場</span>
            <h2 className="text-xs sm:text-sm font-black italic tracking-tighter uppercase text-white font-display leading-none truncate">{stageName}</h2>
          </div>
          <p className="text-[9px] text-zinc-400 font-sans leading-tight hidden md:block mt-0.5 truncate">{stageDesc}</p>
        </div>
        
        <div className="flex items-center gap-2">
          {isEnemyTurn ? (
            <div className="flex flex-col items-center bg-rose-600 border border-white px-2 py-0.5 skew-x-[-10deg]">
              <span className="text-[7px] font-bold text-black skew-x-[10deg] tracking-wider leading-none">戦闘フェーズ</span>
              <span className="text-[10px] font-black italic text-white skew-x-[10deg] tracking-tighter leading-none mt-0.5 uppercase font-display">敵のターン</span>
            </div>
          ) : (
            <div className="flex flex-col items-center bg-white border border-black px-2 py-0.5 skew-x-[-10deg]">
              <span className="text-[7px] font-bold text-rose-600 skew-x-[10deg] tracking-wider leading-none">戦闘フェーズ</span>
              <span className="text-[10px] font-black italic text-black skew-x-[10deg] tracking-tighter leading-none mt-0.5 uppercase font-display">味方の指令選択</span>
            </div>
          )}
        </div>
      </div>

      {/* メイン対決画面: エネミー(上) vs ヒーロー(下) */}
      <div className="flex-1 flex flex-col justify-center p-1 sm:p-1.5 gap-1.5 z-10" id="battle-grid">
        
        {/* エネミー陣型 */}
        <div className="flex justify-center items-center gap-3 md:gap-6 py-0.5" id="enemy-section">
          {enemies.map((enemy) => {
            const isSelected = selectedEnemyId === enemy.id;
            const isFallen = enemy.hp <= 0;
            const hpPct = Math.round((enemy.hp / enemy.maxHp) * 100);
            
            if (isFallen) return null;

            const isStunned = enemy.statuses.some(s => s.type === 'stun');
            const isFrozen = enemy.statuses.some(s => s.type === 'freeze');
            const isBurned = enemy.statuses.some(s => s.type === 'burn');

            return (
              <motion.button
                key={enemy.id}
                onClick={() => onSelectEnemyTarget(enemy.id)}
                whileHover={{ scale: 1.02 }}
                className={`relative focus:outline-none transition-all duration-200 p-1 sm:p-2 border-2 flex flex-col items-center leading-none ${
                  isSelected 
                    ? 'border-rose-600 bg-zinc-900/90 scale-102' 
                    : 'border-zinc-850 hover:border-zinc-700 bg-zinc-900/40 active:scale-98'
                }`}
                id={`enemy-card-${enemy.id}`}
              >
                {isSelected && (
                  <div className="absolute -top-3.5 bg-rose-600 text-white font-bold border border-white text-[7px] px-1.5 py-0.2 tracking-wider leading-none">
                    標的
                  </div>
                )}

                <div className="relative">
                  {getEnemyVisual(enemy.avatarSeed)}
                  <div className="absolute -top-1 -right-3.5 flex flex-col gap-0.5">
                    {isStunned && (
                      <span className="bg-yellow-500 text-slate-950 font-black px-0.5 rounded-none text-[6px] border border-slate-950 uppercase">
                        麻痺
                      </span>
                    )}
                    {isFrozen && (
                      <span className="bg-cyan-500 text-white font-black px-0.5 rounded-none text-[6px] border border-slate-950 uppercase">
                        凍結
                      </span>
                    )}
                    {isBurned && (
                      <span className="bg-red-500 text-white font-black px-0.5 rounded-none text-[6px] border border-slate-950 uppercase">
                        炎上
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-1 text-center w-20 sm:w-24">
                  <span className="text-[10px] font-black uppercase text-slate-100 block truncate font-display">
                    {enemy.name}
                  </span>
                  
                  {/* HPバー */}
                  <div className="w-full h-1.5 bg-zinc-900 border border-zinc-750 relative mt-1 overflow-hidden">
                    <motion.div 
                      className={`h-full ${
                        hpPct < 25 ? 'bg-rose-600' : hpPct < 55 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      animate={{ width: `${hpPct}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  <div className="flex justify-between text-[7px] font-mono mt-0.5 text-zinc-400 font-bold leading-none">
                    <span>Lv.{enemy.level}</span>
                    <span>{enemy.hp}/{enemy.maxHp} HP</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* 境界線 */}
        <div className="border-t border-rose-600/30 relative py-1 my-0.5">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-600 border border-white text-white text-[7px] font-black italic px-1.5 py-0.2 select-none font-display leading-none">
            ⚔️ VS ⚔️
          </div>
        </div>

        {/* ヒーロー隊列 */}
        <div className="grid grid-cols-3 gap-1.5 py-0.5" id="hero-section">
          {party.map((hero) => {
            const isFallen = hero.isFallen;
            const isActive = activeHeroId === hero.id;
            const isTargetedByEnemy = enemyTargetId === hero.id && isEnemyTurn;
            const isSelected = selectedAllyId === hero.id;
            
            const hpPct = Math.round((hero.hp / hero.maxHp) * 100);
            const mpPct = Math.round((hero.mp / hero.maxMp) * 100);
            const spPct = Math.round((hero.sp / hero.maxSp) * 100);

            let cardBorder = 'border border-zinc-800 bg-zinc-900/40 rounded-none';
            if (isFallen) cardBorder = 'border border-zinc-900 bg-zinc-950/20 opacity-30 grayscale rounded-none';
            else if (isActive) {
              if (hero.colorTheme === 'rose') cardBorder = 'border-2 border-rose-500 bg-zinc-900/90 shadow-[0_0_8px_rgba(225,29,72,0.3)] rounded-none';
              else if (hero.colorTheme === 'cyan') cardBorder = 'border-2 border-cyan-500 bg-zinc-900/90 shadow-[0_0_8px_rgba(6,182,212,0.3)] rounded-none';
              else if (hero.colorTheme === 'emerald') cardBorder = 'border-2 border-emerald-500 bg-zinc-900/90 shadow-[0_0_8px_rgba(16,185,129,0.3)] rounded-none';
            } else if (isTargetedByEnemy) {
              cardBorder = 'border-2 border-rose-600 animate-pulse bg-rose-950/10 rounded-none';
            } else if (isSelected) {
              cardBorder = 'border border-white bg-zinc-900/80 rounded-none';
            }

            return (
              <motion.button
                key={hero.id}
                onClick={() => !isFallen && onSelectAllyTarget(hero.id)}
                disabled={isFallen}
                whileTap={{ scale: isFallen ? 1 : 0.98 }}
                className={`text-left p-1.5 flex flex-col justify-between transition-all relative focus:outline-none overflow-hidden ${cardBorder}`}
                id={`hero-card-${hero.id}`}
              >
                {isActive && !isFallen && (
                  <span className="absolute top-1 right-1 flex h-1 w-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-rose-500"></span>
                    <span className="relative inline-flex rounded-full h-1 w-1 bg-rose-600"></span>
                  </span>
                )}

                {/* ヒーローヘッダー */}
                <div className="flex items-center gap-1">
                  <div className={`p-0.5 border ${
                    hero.colorTheme === 'rose' ? 'bg-rose-950/70 border-rose-500' :
                    hero.colorTheme === 'cyan' ? 'bg-cyan-950/70 border-cyan-400' :
                    'bg-emerald-950/70 border-emerald-500'
                  }`}>
                    {getHeroIcon(hero.id, 10)}
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-[9px] font-black text-slate-100 truncate w-14 sm:w-24 font-display uppercase tracking-tight leading-none">{hero.name}</h5>
                    <p className="text-[7px] text-zinc-400 mt-0.5 truncate tracking-wider leading-none">{hero.role}</p>
                  </div>
                </div>

                {/* 状態異常、支援枠 */}
                <div className="flex flex-wrap gap-0.5 my-1 mini-statuses min-h-[10px]">
                  {hero.shield > 0 && (
                    <span className="bg-zinc-950 text-cyan-300 text-[6px] font-black font-mono px-1 border border-cyan-500 rounded-none flex items-center gap-0.5 animate-pulse leading-none">
                      <Shield size={5} /> {hero.shield}
                    </span>
                  )}
                  {hero.statuses.map((st, sIdx) => {
                    let label = '';
                    let color = '';
                    if (st.type === 'atk_buff') { label = '攻撃▲'; color = 'bg-rose-950 text-rose-350 border border-rose-600'; }
                    else if (st.type === 'def_buff') { label = '防御▲'; color = 'bg-amber-950 text-amber-300 border border-amber-500'; }
                    else if (st.type === 'spd_buff') { label = '速度▲'; color = 'bg-emerald-950 text-emerald-300 border border-emerald-500'; }
                    else if (st.type === 'invincibility') { label = '無敵'; color = 'bg-yellow-950 text-yellow-300 border border-yellow-500 animate-pulse'; }
                    
                    return (
                      <span key={sIdx} className={`text-[6px] font-bold px-0.5 py-0.1 rounded-none leading-none ${color}`}>
                        {label || st.type}({st.duration}T)
                      </span>
                    );
                  })}
                </div>

                {/* HP/MP/SPステータスバー */}
                <div className="space-y-0.5 w-full mt-auto">
                  {/* HPバー */}
                  <div>
                    <div className="flex justify-between items-center text-[7px] font-mono text-zinc-300 font-bold mb-0 uppercase tracking-wide leading-none">
                      <span className="flex items-center gap-0.2"><Heart size={5} className="text-rose-500" /> HP</span>
                      <span className={hero.hp < hero.maxHp * 0.35 ? 'text-rose-400 font-black animate-pulse' : ''}>
                        {isFallen ? '戦闘不能' : `${hero.hp}/${hero.maxHp}`}
                      </span>
                    </div>
                    <div className="w-full h-1 bg-zinc-900 border border-white relative overflow-hidden rounded-none">
                      <div 
                        className={`h-full transition-all duration-200 ${
                          isFallen ? 'bg-zinc-800' : hpPct < 35 ? 'bg-rose-600' : 'bg-emerald-505 bg-emerald-500'
                        }`}
                        style={{ width: `${isFallen ? 0 : hpPct}%` }}
                      />
                    </div>
                  </div>

                  {/* MPバー */}
                  <div>
                    <div className="flex justify-between items-center text-[7px] font-mono text-zinc-300 font-bold mb-0 uppercase tracking-wide leading-none">
                      <span className="flex items-center gap-0.2"><Sparkles size={5} className="text-indigo-400" /> MP</span>
                      <span>{hero.mp}/{hero.maxMp}</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-900 border border-zinc-650 relative overflow-hidden rounded-none">
                      <div 
                        className="h-full bg-indigo-505 bg-indigo-500 transition-all duration-205"
                        style={{ width: `${mpPct}%` }}
                      />
                    </div>
                  </div>

                  {/* SPバー */}
                  <div>
                    <div className="flex justify-between items-center text-[7px] font-mono text-zinc-300 font-bold mb-0 uppercase tracking-wide leading-none">
                      <span className="font-bold text-amber-400 flex items-center gap-0.2"><Zap size={5} /> SP</span>
                      <span className="font-bold font-mono text-amber-300">{hero.sp}%</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-900 border border-amber-500 relative overflow-hidden rounded-none">
                      <div 
                        className={`h-full transition-all duration-200 ${
                          spPct >= 100 ? 'bg-amber-400 animate-pulse' : 'bg-amber-600/60'
                        }`}
                        style={{ width: `${spPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
