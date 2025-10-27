"use client";

import React, { useState } from 'react';
import { Send, Paperclip, Smile, MoreVertical, Phone, Video, ArrowLeft, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
type Message = {
  id: string;
  sender: string;
  text?: string;
  timestamp: string;
  date: string;
  sent: boolean;
  read: boolean;
  type?: 'text' | 'file';
  fileData?: {
    name: string;
    size: string;
    link: string;
  };
};
type WhatsAppChatProps = Record<string, never>;
const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};
const initialMessages: Message[] = [
// Monday - Week planning
{
  id: '1',
  sender: 'Emma',
  text: "Morning! Can you show me this week's forecast?",
  timestamp: '8:45 AM',
  date: 'Monday, Nov 4',
  sent: false,
  read: true,
  type: 'text'
}, {
  id: '2',
  sender: 'Preshift',
  text: "Good morning Emma! Here's your week ahead:\n\n📅 Mon: £2,340 | 58 covers\n📅 Tue: £2,180 | 52 covers\n📅 Wed: £2,520 | 61 covers\n📅 Thu: £2,890 | 68 covers\n📅 Fri: £4,230 | 98 covers\n📅 Sat: £3,950 | 89 covers\n📅 Sun: £3,120 | 74 covers\n\n💰 Total: £21,230 | 👥 500 covers\n\n⚠️ Friday heads-up: Concert ends at 9pm, expect +30% late covers. Recommend 2 extra FOH staff 8-11pm.",
  timestamp: '8:45 AM',
  date: 'Monday, Nov 4',
  sent: true,
  read: true,
  type: 'text'
}, {
  id: '3',
  sender: 'Emma',
  text: "Perfect. And what's our labour budget looking like?",
  timestamp: '8:47 AM',
  date: 'Monday, Nov 4',
  sent: false,
  read: true,
  type: 'text'
}, {
  id: '4',
  sender: 'Preshift',
  text: "Currently at 28.5% of projected revenue. Target is 30%, so you have £320 buffer for the week. With Friday's spike, I'd use that buffer there.",
  timestamp: '8:47 AM',
  date: 'Monday, Nov 4',
  sent: true,
  read: true,
  type: 'text'
},
// Tuesday - Supplier issues
{
  id: '5',
  sender: 'James',
  text: "Did the salmon delivery come in? I can't find the invoice",
  timestamp: '11:23 AM',
  date: 'Tuesday, Nov 5',
  sent: false,
  read: true,
  type: 'text'
}, {
  id: '6',
  sender: 'Preshift',
  text: "Hi James! Yes, delivery arrived at 10:15 AM. Invoice #SAL-8834, £487.50 for 25kg. It's in your procurement folder. Want me to send it?",
  timestamp: '11:23 AM',
  date: 'Tuesday, Nov 5',
  sent: true,
  read: true,
  type: 'text'
}, {
  id: '7',
  sender: 'Preshift',
  timestamp: '11:24 AM',
  date: 'Tuesday, Nov 5',
  sent: true,
  read: true,
  type: 'file',
  fileData: {
    name: 'Invoice_SAL-8834_Salmon.pdf',
    size: '1.2 MB',
    link: '/downloads/invoice-salmon'
  }
}, {
  id: '8',
  sender: 'James',
  text: "Brilliant, cheers!",
  timestamp: '11:25 AM',
  date: 'Tuesday, Nov 5',
  sent: false,
  read: true,
  type: 'text'
},
// Wednesday - Staff scheduling
{
  id: '9',
  sender: 'Sarah',
  text: "Who's scheduled for tomorrow dinner service?",
  timestamp: '2:15 PM',
  date: 'Wednesday, Nov 6',
  sent: false,
  read: true,
  type: 'text'
}, {
  id: '10',
  sender: 'Preshift',
  text: "Thursday dinner (5-11pm):\n\n👨‍🍳 Kitchen:\n• Alex (Head Chef) 4-11pm\n• Marcus (Sous) 5-11pm\n• Lisa (Prep) 5-9pm\n\n🍽️ FOH:\n• Tom (Manager) 5-11pm\n• Sophie, Maya, Jack (Servers) 5:30-10:30pm\n• Rachel (Bartender) 5-11pm\n\n68 covers booked, 2 private tables.",
  timestamp: '2:16 PM',
  date: 'Wednesday, Nov 6',
  sent: true,
  read: true,
  type: 'text'
},
// Thursday - Performance tracking
{
  id: '11',
  sender: 'Emma',
  text: "How are we tracking against last month?",
  timestamp: '9:30 AM',
  date: 'Thursday, Nov 7',
  sent: false,
  read: true,
  type: 'text'
}, {
  id: '12',
  sender: 'Preshift',
  text: "Great question! Comparing to October:\n\n📈 Revenue: +12% (£89,430 vs £79,850)\n📊 Covers: +8% (2,240 vs 2,075)\n💷 Average spend: +£2.10 per head\n⭐ Reviews: 4.6 → 4.8 stars\n\n🔥 Best performers:\n• Sunday roasts: +45% vs last year\n• Cocktail sales: +18%\n• Dessert attach rate: 38% (industry avg 22%)\n\n⚠️ Watch: Lunch covers down 6% - weather related or trend?",
  timestamp: '9:31 AM',
  date: 'Thursday, Nov 7',
  sent: true,
  read: true,
  type: 'text'
}, {
  id: '13',
  sender: 'Emma',
  text: "Interesting about lunch. Can you track that for me?",
  timestamp: '9:33 AM',
  date: 'Thursday, Nov 7',
  sent: false,
  read: true,
  type: 'text'
}, {
  id: '14',
  sender: 'Preshift',
  text: "Added to watchlist. I'll alert you if it drops below 15% vs last year. Want me to analyze lunch menu performance too?",
  timestamp: '9:33 AM',
  date: 'Thursday, Nov 7',
  sent: true,
  read: true,
  type: 'text'
}, {
  id: '15',
  sender: 'Emma',
  text: "Yes please",
  timestamp: '9:34 AM',
  date: 'Thursday, Nov 7',
  sent: false,
  read: true,
  type: 'text'
},
// Friday - Busy service prep
{
  id: '16',
  sender: 'Marcus',
  text: "Quick check - what's our prep needs for tonight's service?",
  timestamp: '1:45 PM',
  date: 'Friday, Nov 8',
  sent: false,
  read: true,
  type: 'text'
}, {
  id: '17',
  sender: 'Preshift',
  text: "For 98 covers tonight, based on your historical patterns:\n\n🥩 Mains (estimated orders):\n• Ribeye: 22-25 portions\n• Sea bass: 18-20\n• Risotto: 15-18 (🔥 trending)\n• Burger: 12-15\n• Lamb: 8-10\n\n🥗 Sides: prep 30% extra chips, asparagus popular this week\n\n⚠️ Note: Last 3 Fridays, you've run out of risotto by 9:30pm. Consider +20% buffer.",
  timestamp: '1:46 PM',
  date: 'Friday, Nov 8',
  sent: true,
  read: true,
  type: 'text'
}, {
  id: '18',
  sender: 'Marcus',
  text: "Good catch on the risotto. Making extra now 👍",
  timestamp: '1:48 PM',
  date: 'Friday, Nov 8',
  sent: false,
  read: true,
  type: 'text'
},
// Saturday - Real-time service support
{
  id: '19',
  sender: 'Tom',
  text: "We have a table asking about allergens for the sea bass special",
  timestamp: '7:34 PM',
  date: 'Saturday, Nov 9',
  sent: false,
  read: true,
  type: 'text'
}, {
  id: '20',
  sender: 'Preshift',
  text: "Sea Bass Special (Pan-seared):\n\n✅ Contains: Fish, butter (dairy)\n❌ Free from: Gluten, nuts, eggs, shellfish\n\n🔔 Sauce has white wine reduction with butter. Vegan alternative: olive oil & lemon.\n\nKitchen notes say to ask about severity - if high risk, use separate pan.",
  timestamp: '7:34 PM',
  date: 'Saturday, Nov 9',
  sent: true,
  read: true,
  type: 'text'
}, {
  id: '21',
  sender: 'Tom',
  text: "Perfect, thanks!",
  timestamp: '7:35 PM',
  date: 'Saturday, Nov 9',
  sent: false,
  read: true,
  type: 'text'
},
// Sunday - Weekly wrap-up
{
  id: '22',
  sender: 'Emma',
  text: "Can I get the week's summary?",
  timestamp: '10:12 AM',
  date: 'Sunday, Nov 10',
  sent: false,
  read: true,
  type: 'text'
}, {
  id: '23',
  sender: 'Preshift',
  text: "Week 45 Summary (Nov 4-10):\n\n💰 Revenue: £21,890 (103% of forecast!)\n👥 Covers: 512 vs 500 projected\n⭐ Average rating: 4.7/5 (32 reviews)\n\n🏆 Highlights:\n• Friday exceeded target by £580\n• Zero food waste on Tue/Wed\n• Staff retention: 100% this week\n• Cocktail sales: best week this year\n\n📊 Labour: 29.1% (within budget)\n📦 Food cost: 31.2% (target 32%)\n\n🎯 Next week prep:\n• 2 large bookings (Thu 16, Sat 22)\n• Wine supplier delivery Wed AM\n• New seasonal menu testing Thu\n\nWant the detailed breakdown?",
  timestamp: '10:13 AM',
  date: 'Sunday, Nov 10',
  sent: true,
  read: true,
  type: 'text'
}, {
  id: '24',
  sender: 'Emma',
  text: "This is brilliant. Can you send the full report?",
  timestamp: '10:15 AM',
  date: 'Sunday, Nov 10',
  sent: false,
  read: true,
  type: 'text'
}, {
  id: '25',
  sender: 'Preshift',
  timestamp: '10:15 AM',
  date: 'Sunday, Nov 10',
  sent: true,
  read: true,
  type: 'file',
  fileData: {
    name: 'Weekly_Report_Week45_2024.pdf',
    size: '3.1 MB',
    link: '/downloads/weekly-report-week-45'
  }
},
// Monday next week - Inventory check
{
  id: '26',
  sender: 'James',
  text: "What's our current stock level on red wine?",
  timestamp: '11:20 AM',
  date: 'Monday, Nov 11',
  sent: false,
  read: true,
  type: 'text'
}, {
  id: '27',
  sender: 'Preshift',
  text: "Red Wine Inventory:\n\n🍷 Current stock:\n• House Red (Merlot): 18 bottles\n• Rioja Reserva: 12 bottles\n• Malbec: 8 bottles\n• Chianti: 6 bottles\n• Pinot Noir: 4 bottles ⚠️\n\n📊 Based on last 2 weeks:\n• House Red: 4 days remaining\n• Pinot: 1.5 days remaining\n\n💡 Recommendation: Order 24 House Red, 12 Pinot Noir for next delivery (Wed). Friday/Saturday usually 40% higher consumption.",
  timestamp: '11:21 AM',
  date: 'Monday, Nov 11',
  sent: true,
  read: true,
  type: 'text'
}, {
  id: '28',
  sender: 'James',
  text: "On it. Creating the order now",
  timestamp: '11:23 AM',
  date: 'Monday, Nov 11',
  sent: false,
  read: true,
  type: 'text'
},
// Tuesday - Staff issue
{
  id: '29',
  sender: 'Sarah',
  text: "Sophie just called in sick for tonight. Who can cover?",
  timestamp: '3:45 PM',
  date: 'Tuesday, Nov 12',
  sent: false,
  read: true,
  type: 'text'
}, {
  id: '30',
  sender: 'Preshift',
  text: "Checking available staff for tonight (5:30-10:30pm):\n\n✅ Available:\n• Maya - worked 28hrs this week (can do 6hrs)\n• Jack - off tonight, lives nearby\n• Rachel - bartender but can dual-role\n\n💡 Suggestion: Jack is your best bet - he's done 4 Tuesday services this month, knows the menu well, and typically accepts short-notice shifts.\n\nTonight: 52 covers, manageable with current team + 1.",
  timestamp: '3:46 PM',
  date: 'Tuesday, Nov 12',
  sent: true,
  read: true,
  type: 'text'
}, {
  id: '31',
  sender: 'Sarah',
  text: "Calling Jack now. Thanks!",
  timestamp: '3:47 PM',
  date: 'Tuesday, Nov 12',
  sent: false,
  read: true,
  type: 'text'
}];
export const WhatsAppChat = (_props: WhatsAppChatProps) => {
  const [messages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const handleSend = () => {
    if (inputValue.trim()) {
      setInputValue('');
      setIsTyping(false);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Group messages by date
  const groupedMessages: {
    date: string;
    messages: Message[];
  }[] = [];
  messages.forEach(msg => {
    const lastGroup = groupedMessages[groupedMessages.length - 1];
    if (lastGroup && lastGroup.date === msg.date) {
      lastGroup.messages.push(msg);
    } else {
      groupedMessages.push({
        date: msg.date,
        messages: [msg]
      });
    }
  });
  return <div className="flex flex-col h-full w-full bg-gradient-to-b from-slate-50 to-white">
      {/* Status Bar Area */}
      <div className="absolute top-0 left-0 right-0 h-12 flex items-end justify-center pb-1 pointer-events-none z-40">
        <div className="w-28 h-5 bg-black/5 rounded-full" />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-14 pb-4 bg-gradient-to-b from-emerald-600 to-emerald-700 text-white shadow-lg relative z-30">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <motion.button whileTap={{
          scale: 0.9
        }} className="p-1.5 hover:bg-white/10 rounded-full transition-colors flex-shrink-0" aria-label="Go back">
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          
          <motion.div initial={{
          scale: 0.8,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} className="w-11 h-11 rounded-full bg-white shadow-md overflow-hidden flex-shrink-0">
            <img src="https://storage.googleapis.com/storage.magicpath.ai/user/333482674599645184/assets/366fe91d-c3a3-499b-b843-0341f6f8ac31.png" alt="Preshift Intelligence logo" className="w-full h-full object-cover" />
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <h1 className="font-semibold text-base truncate tracking-tight">
              Preshift Intelligence
            </h1>
            <p className="text-xs text-emerald-100 font-medium">
              Online
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 flex-shrink-0">
          <motion.button whileTap={{
          scale: 0.9
        }} className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Video call">
            <Video className="w-5 h-5" />
          </motion.button>
          <motion.button whileTap={{
          scale: 0.9
        }} className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Voice call">
            <Phone className="w-5 h-5" />
          </motion.button>
          <motion.button whileTap={{
          scale: 0.9
        }} className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="More options">
            <MoreVertical className="w-5 h-5" />
          </motion.button>
        </div>
      </header>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4" style={{
      background: 'linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)',
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    }}>
        {groupedMessages.map((group, groupIndex) => <div key={`group-${groupIndex}`} className="space-y-3">
            <div className="text-center my-6">
              <span className="inline-flex items-center bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
                {group.date}
              </span>
            </div>

            <AnimatePresence mode="popLayout">
              {group.messages.map(message => <motion.div key={message.id} initial={{
            opacity: 0,
            y: 20,
            scale: 0.95
          }} animate={{
            opacity: 1,
            y: 0,
            scale: 1
          }} exit={{
            opacity: 0,
            scale: 0.95
          }} transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }} className="flex flex-col">
                  {!message.sent && message.sender !== 'You' && <p className="text-[10px] font-semibold text-slate-500 mb-1.5 ml-1 tracking-wide uppercase">
                      {message.sender}
                    </p>}
                  
                  <div className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}>
                    <motion.div whileHover={{
                scale: 1.01
              }} transition={{
                type: "spring",
                stiffness: 400
              }} className={`max-w-[80%] rounded-2xl shadow-sm ${message.sent ? 'bg-gradient-to-br from-emerald-400 to-emerald-500 text-white rounded-br-md' : 'bg-white text-slate-900 rounded-bl-md border border-slate-100'}`}>
                      {message.type === 'text' && <div className="px-4 py-3">
                          <p className="text-[13px] leading-relaxed whitespace-pre-wrap break-words font-normal">
                            {message.text}
                          </p>
                          <div className="flex items-center justify-end gap-1.5 mt-1.5">
                            <span className={`text-[10px] font-medium ${message.sent ? 'text-white/80' : 'text-slate-400'}`}>
                              {message.timestamp}
                            </span>
                            {message.sent && <svg viewBox="0 0 16 15" width="14" height="13" className={message.read ? 'text-white' : 'text-white/60'}>
                                <path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
                              </svg>}
                          </div>
                        </div>}

                      {message.type === 'file' && message.fileData && <div className="p-3">
                          <motion.div whileHover={{
                    scale: 1.02
                  }} className="flex items-center gap-3 bg-gradient-to-br from-slate-50 to-white rounded-xl p-3 border border-slate-200 shadow-sm">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-md">
                              <Download className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-slate-900 truncate">
                                {message.fileData.name}
                              </p>
                              <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                                {message.fileData.size}
                              </p>
                            </div>
                          </motion.div>
                          <div className="flex items-center justify-end gap-1.5 mt-2 px-1">
                            <span className="text-[10px] font-medium text-white/80">
                              {message.timestamp}
                            </span>
                            <svg viewBox="0 0 16 15" width="14" height="13" className="text-white">
                              <path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
                            </svg>
                          </div>
                        </div>}
                    </motion.div>
                  </div>
                </motion.div>)}
            </AnimatePresence>
          </div>)}

        {isTyping && <motion.div initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0
      }} className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-bl-md px-5 py-3.5 shadow-sm border border-slate-100">
              <div className="flex gap-1.5">
                {[0, 0.15, 0.3].map((delay, index) => <motion.div key={`typing-dot-${index}`} animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 1, 0.4]
            }} transition={{
              repeat: Infinity,
              duration: 0.8,
              delay: delay,
              ease: "easeInOut"
            }} className="w-2 h-2 bg-slate-400 rounded-full" />)}
              </div>
            </div>
          </motion.div>}
      </div>

      {/* Input Area */}
      <div className="bg-gradient-to-t from-slate-50 to-white px-3 py-3 border-t border-slate-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="flex items-end gap-2">
          <div className="flex-1 flex items-center bg-white rounded-full px-3.5 py-2.5 shadow-sm border border-slate-200 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
            <motion.button whileTap={{
            scale: 0.9
          }} className="p-1.5 hover:bg-slate-100 rounded-full transition-colors flex-shrink-0" aria-label="Add emoji">
              <Smile className="w-5 h-5 text-slate-500" />
            </motion.button>
            
            <input type="text" placeholder="Message" value={inputValue} onChange={e => {
            setInputValue(e.target.value);
            setIsTyping(e.target.value.length > 0);
          }} onKeyPress={handleKeyPress} className="flex-1 px-3 py-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none font-normal" aria-label="Type a message" />
            
            <motion.button whileTap={{
            scale: 0.9
          }} className="p-1.5 hover:bg-slate-100 rounded-full transition-colors flex-shrink-0" aria-label="Attach file">
              <Paperclip className="w-5 h-5 text-slate-500" />
            </motion.button>
          </div>
          
          <motion.button whileTap={{
          scale: 0.92
        }} whileHover={{
          scale: 1.05
        }} onClick={handleSend} className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-all" aria-label="Send message">
            <Send className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>
    </div>;
};