"use client";

import * as React from "react";
import { WhatsAppChat } from "./WhatsAppChat";
export interface IPhoneMockupProps {
  variant?: "natural-titanium" | "blue-titanium" | "white-titanium" | "black-titanium";
}
const deviceColors = {
  "natural-titanium": {
    frame: "linear-gradient(135deg, #c4c4c4 0%, #9a9a9a 50%, #c4c4c4 100%)",
    shadow: "rgba(156, 156, 156, 0.4)",
    glow: "rgba(196, 196, 196, 0.2)"
  },
  "blue-titanium": {
    frame: "linear-gradient(135deg, #a8b8c4 0%, #6d8a9c 50%, #a8b8c4 100%)",
    shadow: "rgba(109, 138, 156, 0.4)",
    glow: "rgba(168, 184, 196, 0.2)"
  },
  "white-titanium": {
    frame: "linear-gradient(135deg, #f0f0f0 0%, #d0d0d0 50%, #f0f0f0 100%)",
    shadow: "rgba(208, 208, 208, 0.4)",
    glow: "rgba(240, 240, 240, 0.2)"
  },
  "black-titanium": {
    frame: "linear-gradient(135deg, #5a5a5a 0%, #2a2a2a 50%, #5a5a5a 100%)",
    shadow: "rgba(42, 42, 42, 0.6)",
    glow: "rgba(90, 90, 90, 0.3)"
  }
};
export default function IPhoneMockup({
  variant = "black-titanium"
}: IPhoneMockupProps) {
  const colors = deviceColors[variant];
  return <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex items-center justify-center p-4 sm:p-8 md:p-12">
      <div className="relative">
        {/* Ambient glow effect */}
        <div className="absolute inset-0 blur-3xl opacity-30 rounded-[80px]" style={{
        background: `radial-gradient(circle at 50% 50%, ${colors.glow}, transparent 70%)`
      }} />
        
        {/* iPhone 16 Pro Device Frame */}
        <div className="relative w-[375px] h-[812px] rounded-[58px] p-3.5 shadow-2xl" style={{
        background: colors.frame,
        boxShadow: `
              0 30px 80px -15px ${colors.shadow},
              0 0 0 0.5px rgba(0,0,0,0.15) inset,
              0 1px 3px rgba(255,255,255,0.3) inset,
              0 50px 100px -20px rgba(0,0,0,0.25)
            `
      }}>
          {/* Inner bezel */}
          <div className="relative w-full h-full bg-black rounded-[46px] overflow-hidden">
            {/* Dynamic Island */}
            <div className="absolute top-[18px] left-1/2 -translate-x-1/2 z-50 w-[120px] h-[26px] bg-black rounded-[26px]" style={{
            boxShadow: "0 4px 12px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.05)"
          }}>
              {/* Camera lens */}
              <div className="absolute top-1/2 left-[22px] -translate-y-1/2 w-[12px] h-[12px] bg-gradient-to-br from-slate-700 to-slate-900 rounded-full border border-slate-600 shadow-inner" />
              
              {/* Sensor */}
              <div className="absolute top-1/2 right-[22px] -translate-y-1/2 w-[8px] h-[8px] bg-gradient-to-br from-slate-800/80 to-black rounded-full" />
            </div>

            {/* Screen Content */}
            <div className="absolute inset-0 bg-white overflow-hidden">
              <WhatsAppChat />
            </div>

            {/* Subtle screen reflection overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
            background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.8) 48%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.8) 52%, transparent 100%)"
          }} />
          </div>

          {/* Side buttons - Left (Volume & Mute) */}
          <div className="absolute -left-[2.5px] top-[100px] w-[2.5px] h-[28px] rounded-l-full" style={{
          background: colors.frame
        }} />
          <div className="absolute -left-[2.5px] top-[155px] w-[2.5px] h-[52px] rounded-l-full" style={{
          background: colors.frame
        }} />
          <div className="absolute -left-[2.5px] top-[220px] w-[2.5px] h-[52px] rounded-l-full" style={{
          background: colors.frame
        }} />
          
          {/* Side button - Right (Power) */}
          <div className="absolute -right-[2.5px] top-[180px] w-[2.5px] h-[80px] rounded-r-full" style={{
          background: colors.frame
        }} />

          {/* Action button (new in iPhone 16 Pro) */}
          <div className="absolute -left-[2.5px] top-[75px] w-[2.5px] h-[14px] rounded-l-full" style={{
          background: "linear-gradient(90deg, #ea580c 0%, #f97316 100%)",
          boxShadow: "0 0 6px rgba(249, 115, 22, 0.4)"
        }} />
        </div>
      </div>
    </div>;
}