"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const PLAYER_SPEED = 5.5;
const MAX_TURN_SPEED = 0.07;
const BODY_SPACING = 9;
const INITIAL_LENGTH = 6;

const TEAMS = [
  { id: "HAŠ", name: "HA Senkvice", color: "#000000", secondary: "#ff8c00", skins: ["#ffdbac", "#f1c27d"], hairs: ["#1a1a1a", "#4b2c20", "#8d5524", "#d4a76a", "#c68642"] },
  { id: "ŠEN", name: "HC 1952 Senkvice", color: "#ff8c00", secondary: "#000000", skins: ["#ffdbac", "#f1c27d"], hairs: ["#1a1a1a", "#4b2c20", "#8d5524", "#d4a76a", "#c68642"] },
  { id: "RAČ", name: "KPH Rača", color: "#0169d4", secondary: "#ffffff", skins: ["#ffdbac", "#f1c27d"], hairs: ["#1a1a1a", "#4b2c20", "#8d5524", "#d4a76a", "#c68642"] },
  { id: "HOK", name: "HOKO Zlaté Moravce", color: "#4dd906", secondary: "#000000", skins: ["#ffdbac", "#f1c27d"], hairs: ["#1a1a1a", "#4b2c20", "#8d5524", "#d4a76a", "#c68642"] },
  { id: "HKM", name: "HKM Nová Dubnica", color: "#202684", secondary: "#000000", skins: ["#ffdbac", "#f1c27d"], hairs: ["#1a1a1a", "#4b2c20", "#8d5524", "#d4a76a", "#c68642"] },
  { id: "KAP", name: "Kaptar SE", color: "#f5d000", secondary: "#2b77ad", skins: ["#ffdbac", "#f1c27d"], hairs: ["#1a1a1a", "#4b2c20", "#8d5524", "#d4a76a", "#c68642"] },
];

const TEAM_LOGOS: Record<string, string> = {
  "HAŠ": "/images/timy/HAS.webp",
  "ŠEN": "/images/timy/SEN.webp",
  "RAČ": "/images/timy/Raca-logo-70x58-1-32x27.webp",
  "HOK": "/images/timy/logo-KPH-HOKO-1-Photoroom-32x18.webp",
  "HKM": "/images/timy/nova-dubnica-32x32.webp",
  "KAP": "/images/timy/KAP.webp",
};

interface Point { x: number; y: number; angle: number; lean: number; }
interface Particle { x: number; y: number; vx: number; vy: number; life: number; size: number; type: "grass" | "goal"; }

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speedRef = useRef(PLAYER_SPEED);
  const [gameW, setGameW] = useState(390);
  const [gameH, setGameH] = useState(844);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState<"mens" | "womens">("mens");
  const [teamId, setTeamId] = useState("RAČ");
  const [showNamePrompt, setShowNamePrompt] = useState(true);
  const [shake, setShake] = useState(0);
  const [goalPopup, setGoalPopup] = useState<{ x: number; y: number; life: number; text: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  const selectedTeam = TEAMS.find((t) => t.id === teamId) || TEAMS[0];
  const headRef = useRef<Point>({ x: 0, y: 0, angle: -Math.PI / 2, lean: 0 });
  const pathRef = useRef<Point[]>([]);
  const foodRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetRef = useRef<{ x: number; y: number } | null>(null);
  const lengthRef = useRef(INITIAL_LENGTH);
  const segmentHairColorsRef = useRef<string[]>([]);
  const segmentSkinColorsRef = useRef<string[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const runFrameRef = useRef(0);
  const isDesktopRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    const w = Math.min(window.innerWidth, 430);
    const h = window.innerHeight;
    isDesktopRef.current = window.innerWidth > 430;
    setGameW(w);
    setGameH(h);

    const saved = localStorage.getItem("szph_snake_username");
    if (saved) setUsername(saved);
    const savedTeam = localStorage.getItem("szph_snake_team");
    if (savedTeam) setTeamId(savedTeam);
    const savedGender = localStorage.getItem("szph_snake_gender") as "mens" | "womens";
    if (savedGender) setGender(savedGender);
    const savedHigh = localStorage.getItem("szph_snake_highscore");
    if (savedHigh) setHighScore(parseInt(savedHigh));

    headRef.current = { x: w / 2, y: h * 0.7, angle: -Math.PI / 2, lean: 0 };
    pathRef.current = Array(200).fill(0).map((_, i) => ({ ...headRef.current, y: headRef.current.y + i * 2 }));
    spawnFood(w, h);
  }, []);

  const spawnFood = (w: number, h: number) => {
    const pad = 60;
    foodRef.current = { x: pad + Math.random() * (w - pad * 2), y: 180 + Math.random() * (h - 250) };
  };

  const handleGameOver = useCallback((finalScore: number) => {
    setIsGameOver(true);
    targetRef.current = null;
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem("szph_snake_highscore", finalScore.toString());
    }
  }, [highScore]);

  const resetGame = () => {
    headRef.current = { x: gameW / 2, y: gameH * 0.7, angle: -Math.PI / 2, lean: 0 };
    pathRef.current = Array(200).fill(0).map((_, i) => ({ ...headRef.current, y: headRef.current.y + i }));
    lengthRef.current = INITIAL_LENGTH;
    const team = TEAMS.find((t) => t.id === teamId) || TEAMS[0];
    segmentHairColorsRef.current = Array(INITIAL_LENGTH).fill("").map(() => team.hairs[Math.floor(Math.random() * team.hairs.length)]);
    segmentSkinColorsRef.current = Array(INITIAL_LENGTH).fill("").map(() => team.skins[Math.floor(Math.random() * team.skins.length)]);
    targetRef.current = null;
    speedRef.current = PLAYER_SPEED;
    setScore(0);
    setIsGameOver(false);
    setIsPaused(true);
    setShowNamePrompt(true);
    spawnFood(gameW, gameH);
  };

  const update = useCallback(() => {
    if (isPaused || isGameOver || showNamePrompt) return;
    const head = headRef.current;
    if (targetRef.current) {
      const ta = Math.atan2(targetRef.current.y - head.y, targetRef.current.x - head.x);
      let diff = ta - head.angle;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      const turn = Math.max(-MAX_TURN_SPEED, Math.min(MAX_TURN_SPEED, diff));
      head.angle += turn;
      head.lean = turn * 15;
      if (Math.abs(turn) > MAX_TURN_SPEED * 0.5 && Math.random() > 0.5) {
        particlesRef.current.push({ x: head.x, y: head.y, vx: -Math.cos(head.angle) * 2 + (Math.random() - 0.5), vy: -Math.sin(head.angle) * 2 + (Math.random() - 0.5), life: 0.6, size: Math.random() * 2 + 1, type: "grass" });
      }
    } else { head.lean *= 0.9; }

    head.x += Math.cos(head.angle) * speedRef.current;
    head.y += Math.sin(head.angle) * speedRef.current;
    if (head.x < 0) head.x = gameW; if (head.x > gameW) head.x = 0;
    if (head.y < 0) head.y = gameH; if (head.y > gameH) head.y = 0;
    pathRef.current.unshift({ ...head });
    if (pathRef.current.length > 600) pathRef.current.pop();

    const dx = head.x - foodRef.current.x;
    const dy = head.y - foodRef.current.y;
    if (Math.sqrt(dx * dx + dy * dy) < 35) {
      const ns = score + 10;
      setScore(ns);
      speedRef.current = Math.min(PLAYER_SPEED + (ns / 10) * 0.15, PLAYER_SPEED * 2.5);
      setShake(10);
      const phrases = ["Gól!", "Super!", "Paráda!", "Výborne!", "Top!", "Pecka!"];
      setGoalPopup({ x: foodRef.current.x, y: foodRef.current.y, life: 1.0, text: phrases[Math.floor(Math.random() * phrases.length)] });
      lengthRef.current += 1;
      segmentHairColorsRef.current.push(selectedTeam.hairs[Math.floor(Math.random() * selectedTeam.hairs.length)]);
      segmentSkinColorsRef.current.push(selectedTeam.skins[Math.floor(Math.random() * selectedTeam.skins.length)]);
      spawnFood(gameW, gameH);
      for (let i = 0; i < 20; i++) {
        particlesRef.current.push({ x: foodRef.current.x, y: foodRef.current.y, vx: (Math.random() - 0.5) * 8, vy: (Math.random() - 0.5) * 8, life: 1.0, size: Math.random() * 4 + 2, type: "goal" });
      }
    }

    for (let i = BODY_SPACING * 4; i < lengthRef.current * BODY_SPACING; i += 5) {
      const p = pathRef.current[i];
      if (p) {
        const cdx = head.x - p.x;
        const cdy = head.y - p.y;
        if (Math.sqrt(cdx * cdx + cdy * cdy) < 18) handleGameOver(score);
      }
    }
    runFrameRef.current += 0.2;
    if (shake > 0) setShake((s) => Math.max(0, s - 0.5));
    if (goalPopup) {
      setGoalPopup((p) => (p ? { ...p, life: p.life - 0.02, y: p.y - 1 } : null));
      if (goalPopup.life <= 0) setGoalPopup(null);
    }
  }, [isPaused, isGameOver, showNamePrompt, score, handleGameOver, shake, goalPopup, gameW, gameH, selectedTeam]);

  const drawPlayer = useCallback((ctx: CanvasRenderingContext2D, p: Point, index: number) => {
    const isHead = index === 0;
    const size = 20;
    const jerseyColor = selectedTeam.color;
    const shortsColor = selectedTeam.secondary;
    const hairColor = segmentHairColorsRef.current[index] || selectedTeam.hairs[0];
    const skinColor = segmentSkinColorsRef.current[index] || selectedTeam.skins[0];

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle + Math.PI / 2);
    ctx.scale(1 - Math.abs(p.lean) * 0.02, 1);
    ctx.rotate(p.lean * 0.1);
    ctx.shadowBlur = 10; ctx.shadowColor = "rgba(0,0,0,0.15)"; ctx.shadowOffsetY = 5;

    ctx.fillStyle = jerseyColor;
    ctx.beginPath(); ctx.roundRect(-size * 0.8, -12, size * 1.6, 22, 6); ctx.fill();
    const rimGrad = ctx.createLinearGradient(-size * 0.8, -12, size * 0.8, 10);
    rimGrad.addColorStop(0, "rgba(255,255,255,0.1)"); rimGrad.addColorStop(0.5, "rgba(255,255,255,0)"); rimGrad.addColorStop(1, "rgba(0,0,0,0.05)");
    ctx.fillStyle = rimGrad; ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(-size * 0.3, -12); ctx.lineTo(0, -6); ctx.lineTo(size * 0.3, -12); ctx.stroke();

    ctx.fillStyle = shortsColor; ctx.fillRect(-size * 0.8, -4, 3, 8); ctx.fillRect(size * 0.8 - 3, -4, 3, 8);

    ctx.fillStyle = skinColor;
    ctx.beginPath(); ctx.arc(0, -size * 0.7, size * 0.45, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.beginPath(); ctx.arc(-size * 0.15, -size * 0.75, 1.5, 0, Math.PI * 2); ctx.arc(size * 0.15, -size * 0.75, 1.5, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = hairColor;
    if (gender === "womens") {
      ctx.beginPath(); ctx.arc(0, -size * 0.7, size * 0.45, Math.PI, 0); ctx.fill();
      ctx.fillRect(-size * 0.45, -size * 0.7, size * 0.9, size * 0.3);
      ctx.save(); ctx.translate(0, -size * 0.3);
      const tailSway = Math.sin(runFrameRef.current * 2 + index * 0.5) * 0.3;
      ctx.rotate(tailSway);
      ctx.beginPath(); ctx.moveTo(-2, 0); ctx.bezierCurveTo(-5, 8, 5, 12, 2, 20); ctx.bezierCurveTo(8, 12, 8, 8, 2, 0); ctx.fill();
      ctx.fillStyle = jerseyColor; ctx.fillRect(-3, -1, 6, 2);
      ctx.restore();
    } else {
      ctx.beginPath(); ctx.arc(0, -size * 0.7, size * 0.45, Math.PI, 0); ctx.fill();
    }

    const sway = Math.sin(runFrameRef.current + index * 0.8) * 8;
    ctx.fillStyle = skinColor;
    ctx.beginPath(); ctx.arc(-size * 0.9, sway * 0.2, 4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(size * 0.9, -sway * 0.2, 4, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = shortsColor; ctx.fillRect(-size * 0.6, 8, 5, 6); ctx.fillRect(size * 0.2, 8, 5, 6);
    ctx.fillStyle = jerseyColor; ctx.fillRect(-size * 0.6 + sway / 4, 14, 5, 8); ctx.fillRect(size * 0.2 - sway / 4, 14, 5, 8);
    ctx.fillStyle = shortsColor; ctx.fillRect(-size * 0.6 + sway / 4, 14, 5, 2); ctx.fillRect(size * 0.2 - sway / 4, 14, 5, 2);
    ctx.fillStyle = "#111";
    ctx.beginPath(); ctx.roundRect(-size * 0.7 + sway / 4, 22, 8, 4, 2); ctx.roundRect(size * 0.1 - sway / 4, 22, 8, 4, 2); ctx.fill();

    if (isHead) {
      ctx.save(); ctx.translate(size * 0.85, 2); ctx.rotate(sway * 0.05);
      ctx.shadowBlur = 10; ctx.shadowColor = shortsColor;
      ctx.strokeStyle = "#222"; ctx.lineWidth = 3.5; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(size * 0.6, size * 1.3); ctx.stroke();
      ctx.strokeStyle = jerseyColor; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(size * 0.1, size * 0.2); ctx.lineTo(size * 0.4, size * 0.8); ctx.stroke();
      ctx.strokeStyle = "#222"; ctx.lineWidth = 6;
      ctx.beginPath(); ctx.arc(size * 0.9, size * 1.3, 6, Math.PI, Math.PI * 0.4, true); ctx.stroke();
      ctx.strokeStyle = shortsColor; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(size * 0.25, size * 0.5); ctx.stroke();
      ctx.restore();
    }

    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "900 8px Inter"; ctx.textAlign = "center";
    ctx.fillText(isHead ? selectedTeam.id : index.toString(), 0, 4);
    ctx.restore();
  }, [selectedTeam, gender]);

  const drawField = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.fillStyle = "#023ad0"; ctx.fillRect(0, 0, w, h);
    const gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h));
    gradient.addColorStop(0, "rgba(255,255,255,0.05)"); gradient.addColorStop(1, "rgba(0,0,0,0.1)");
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(255,255,255,0.4)"; ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, w - 40, h - 40);
    ctx.beginPath(); ctx.moveTo(20, h / 2); ctx.lineTo(w - 20, h / 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(w / 2, h / 2, 60, 0, Math.PI * 2); ctx.stroke();
    const tm = h * 0.25;
    ctx.beginPath(); ctx.moveTo(20, tm); ctx.lineTo(w - 20, tm); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(20, h - tm); ctx.lineTo(w - 20, h - tm); ctx.stroke();
    const dR = Math.min(w * 0.3, 150);
    ctx.beginPath(); ctx.arc(w / 2, 20, dR, 0, Math.PI); ctx.stroke();
    ctx.beginPath(); ctx.arc(w / 2, h - 20, dR, Math.PI, 0); ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.beginPath(); ctx.arc(w / 2, 20 + dR * 0.6, 4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(w / 2, h - 20 - dR * 0.6, 4, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 4;
    const gw = w * 0.25;
    ctx.strokeRect(w / 2 - gw / 2, 5, gw, 15);
    ctx.strokeRect(w / 2 - gw / 2, h - 20, gw, 15);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    const w = canvas.width; const h = canvas.height;
    ctx.save();
    if (shake > 0) ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
    drawField(ctx, w, h);

    ctx.save(); ctx.shadowBlur = 20; ctx.shadowColor = "rgba(0,0,0,0.5)"; ctx.shadowOffsetY = 8;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath(); ctx.arc(foodRef.current.x, foodRef.current.y, 12, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0; ctx.fillStyle = "rgba(0,0,0,0.05)";
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
      ctx.beginPath(); ctx.arc(foodRef.current.x + Math.cos(a) * 6, foodRef.current.y + Math.sin(a) * 6, 2, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();

    for (let i = lengthRef.current - 1; i >= 0; i--) {
      const p = pathRef.current[i * BODY_SPACING];
      if (p) drawPlayer(ctx, p, i);
    }

    particlesRef.current.forEach((p) => {
      ctx.fillStyle = p.type === "grass" ? `rgba(208,0,39,${p.life})` : `rgba(255,255,255,${p.life})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
      p.x += p.vx; p.y += p.vy; p.life -= 0.02;
    });
    particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

    if (goalPopup) {
      ctx.save(); ctx.globalAlpha = goalPopup.life;
      ctx.fillStyle = "#d00027"; ctx.font = "900 44px Inter"; ctx.textAlign = "center";
      ctx.shadowBlur = 20; ctx.shadowColor = "#d00027";
      ctx.fillText(goalPopup.text, goalPopup.x, goalPopup.y);
      ctx.restore();
    }

    const vig = ctx.createRadialGradient(w / 2, h / 2, h / 4, w / 2, h / 2, h);
    vig.addColorStop(0, "rgba(0,0,0,0)"); vig.addColorStop(1, "rgba(0,0,0,0.4)");
    ctx.fillStyle = vig; ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }, [shake, goalPopup, drawField, drawPlayer]);

  const loop = useCallback(() => {
    update(); draw();
    animationFrameRef.current = requestAnimationFrame(loop);
  }, [update, draw]);

  useEffect(() => {
    if (!mounted) return;
    animationFrameRef.current = requestAnimationFrame(loop);
    return () => { if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); };
  }, [loop, mounted]);

  const handleInteraction = (e: React.PointerEvent) => {
    if (isGameOver || showNamePrompt) return;
    if (isPaused) { setIsPaused(false); return; }
    const offsetX = isDesktopRef.current ? (window.innerWidth - gameW) / 2 : 0;
    targetRef.current = { x: e.clientX - offsetX, y: e.clientY };
  };

  const saveUsername = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem("szph_snake_username", username.trim());
      localStorage.setItem("szph_snake_gender", gender);
      localStorage.setItem("szph_snake_team", teamId);
      setShowNamePrompt(false);
      setIsPaused(false);
    }
  };

  if (!mounted) return <div className="fixed inset-0 bg-[#050505]" />;

  return (
    <div className="fixed inset-0 z-[140] bg-[#050505] flex items-center justify-center" style={{ fontFamily: "Inter, sans-serif" }}>
      <div
        style={{ width: gameW, height: gameH, flexShrink: 0 }}
        className="relative bg-[#0a0a0a] flex flex-col overflow-hidden select-none touch-none"
        onPointerMove={handleInteraction}
        onPointerDown={handleInteraction}
      >
        {/* Back button during gameplay */}
        {!isPaused && !isGameOver && !showNamePrompt && (
          <Link href="/" className="absolute bottom-6 left-6 z-[250] flex items-center gap-2" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: "6px 12px", color: "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: 900, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            ← Späť
          </Link>
        )}

        <canvas ref={canvasRef} width={gameW} height={gameH} className="absolute inset-0 w-full h-full cursor-crosshair" />

        {/* Scoreboard */}
        <div className="absolute left-0 right-0 z-[150] px-3 flex justify-between items-start pointer-events-none" style={{ top: "calc(1.5rem + env(safe-area-inset-top, 0px))" }}>
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 rounded-full" style={{ backgroundColor: selectedTeam.color, boxShadow: `0 0 15px ${selectedTeam.color}40` }} />
            <div>
              <p className="font-black text-white text-sm italic leading-none tracking-tight">{selectedTeam.name}</p>
              <p className="text-[6px] font-black text-white/50 tracking-[0.2em]">{username || "Hráč"} · <span style={{ color: selectedTeam.color }}>{gender === "womens" ? "Ženy" : "Muži"}</span></p>
            </div>
          </div>
          <div className="flex items-center gap-6 px-4 py-2 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div className="text-center">
              <p className="text-[6px] font-black text-white/40 tracking-[0.2em]">Skóre</p>
              <p className="font-black text-xl italic leading-none" style={{ color: "#d00027" }}>{score}</p>
            </div>
            <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.1)" }} />
            <div className="text-center">
              <p className="text-[6px] font-black text-white/40 tracking-[0.2em]">Najlepšie</p>
              <p className="font-black text-xl text-white italic leading-none">{highScore}</p>
            </div>
          </div>
        </div>

        {/* Team selection */}
        {showNamePrompt && (
          <div className="absolute inset-0 z-[200] backdrop-blur-md flex items-start justify-center p-4 overflow-y-auto" style={{ paddingTop: "calc(4rem + env(safe-area-inset-top, 0px))", background: "rgba(5,25,55,0.6)" }}>
            <div className="w-full max-w-sm p-6 rounded-3xl shadow-2xl relative overflow-hidden" style={{ background: "#0e264a", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl" style={{ background: "rgba(208,0,39,0.1)" }} />

              <div className="flex justify-center mb-4 relative z-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo-szph-white.webp" alt="SZPH" className="h-8 w-auto object-contain" />
              </div>

              <div className="flex flex-col items-center mb-3 relative z-10">
                <h2 className="font-black text-xl text-white italic tracking-tight">Hadík na ihrisku</h2>
                <span className="text-white text-[7px] px-2 py-0.5 rounded font-black uppercase tracking-widest mt-1 italic" style={{ background: "#d00027" }}>Snake Game</span>
              </div>

              <form onSubmit={saveUsername} className="space-y-4 relative z-10">
                <input
                  autoFocus
                  type="text"
                  maxLength={12}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Tvoje meno"
                  className="w-full rounded-xl px-4 py-4 font-black text-xl italic focus:outline-none transition-all text-center"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
                />

                <div className="grid grid-cols-3 gap-2">
                  {TEAMS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTeamId(t.id)}
                      className="flex flex-col items-center justify-center p-3 rounded-xl transition-all"
                      style={{
                        background: teamId === t.id ? "#ffffff" : "rgba(255,255,255,0.06)",
                        border: teamId === t.id ? "2px solid #d00027" : "1px solid rgba(255,255,255,0.08)",
                        transform: teamId === t.id ? "scale(1.05)" : "scale(1)",
                      }}
                    >
                      <div className="w-11 h-11 rounded-full flex items-center justify-center mb-1.5 overflow-hidden" style={{ background: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                        {TEAM_LOGOS[t.id] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={TEAM_LOGOS[t.id]} alt={t.name} className="w-7 h-7 object-contain" />
                        ) : (
                          <span className="font-black text-[10px]" style={{ color: t.color }}>{t.id}</span>
                        )}
                      </div>
                      <span className="text-[8px] font-black text-center leading-tight" style={{ color: teamId === t.id ? "#0e264a" : "rgba(255,255,255,0.5)" }}>{t.id}</span>
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button type="button" onClick={() => setGender("mens")} className="flex-1 py-3 rounded-xl font-black text-xs italic transition-all border-2" style={{ background: gender === "mens" ? "#d00027" : "rgba(255,255,255,0.06)", borderColor: gender === "mens" ? "#d00027" : "rgba(255,255,255,0.08)", color: gender === "mens" ? "#fff" : "rgba(255,255,255,0.4)" }}>Muži</button>
                  <button type="button" onClick={() => setGender("womens")} className="flex-1 py-3 rounded-xl font-black text-xs italic transition-all border-2" style={{ background: gender === "womens" ? "#d00027" : "rgba(255,255,255,0.06)", borderColor: gender === "womens" ? "#d00027" : "rgba(255,255,255,0.08)", color: gender === "womens" ? "#fff" : "rgba(255,255,255,0.4)" }}>Ženy</button>
                </div>

                <button type="submit" disabled={!username.trim()} className="w-full disabled:opacity-50 text-white py-4 rounded-xl font-black text-xl italic tracking-widest hover:brightness-110 active:scale-95 transition-all uppercase" style={{ background: "#d00027", boxShadow: "0 10px 30px rgba(208,0,39,0.3)" }}>
                  HRAŤ!
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Pause / Game Over */}
        {(isPaused || isGameOver) && !showNamePrompt && (
          <div className="absolute inset-0 z-[160] bg-black/40 backdrop-blur-xl flex flex-col items-center justify-center p-3 text-center" onPointerDown={(e) => e.stopPropagation()}>
            {isGameOver ? (
              <div className="flex flex-col items-center">
                <h2 className="font-black text-4xl italic tracking-tighter uppercase mb-1" style={{ color: "#d00027", textShadow: "0 0 30px rgba(208,0,39,0.4)" }}>Koniec!</h2>
                <p className="text-white/60 text-[10px] font-black tracking-[0.5em] italic uppercase mb-6">Skóre: {score}</p>
                <button onClick={resetGame} className="text-black px-8 py-3 rounded-full font-black text-lg italic tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 uppercase" style={{ background: "#d00027", boxShadow: "0 20px 40px rgba(208,0,39,0.3)" }}>
                  ↺ Hrať znova
                </button>
                <Link href="/" className="mt-4 text-white/30 text-[10px] font-black tracking-widest uppercase hover:text-white/60 transition-colors">← Späť na web</Link>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo-szph-white.webp" alt="SZPH" className="h-8 w-auto object-contain mb-6" />
                <h2 className="font-black text-5xl text-white italic tracking-tighter leading-none uppercase">Hadík na<br /><span style={{ color: "#d00027" }}>ihrisku</span></h2>
                <p className="text-white/40 text-[9px] mb-12 font-black tracking-[0.4em] italic uppercase mt-4">{username}, ihrisko čaká. Zbieraj loptičky!</p>
                <button onClick={() => setIsPaused(false)} className="relative group">
                  <div className="absolute inset-0 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" style={{ background: "#d00027" }} />
                  <div className="relative text-black px-16 py-5 rounded-full font-black text-2xl italic tracking-[0.2em] shadow-2xl transition-all hover:scale-105 active:scale-95 uppercase" style={{ background: "#d00027" }}>Štart</div>
                </button>
                <Link href="/" className="mt-8 text-white/30 text-[10px] font-black tracking-widest uppercase hover:text-white/60 transition-colors">← Späť na web</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
