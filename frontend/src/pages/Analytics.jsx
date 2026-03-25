import React, { useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { Layers, Target, Activity, Loader2, BarChart3 } from 'lucide-react';
import axios from 'axios';

const THEME_COLORS = ['#C026D3', '#8B5CF6', '#06B6D4'];

const PulsingDot = (props) => {
  const { cx, cy, stroke } = props;
  if (!cx || !cy) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={6} fill={stroke} fillOpacity={0.2}>
        <animate attributeName="r" from="3" to="10" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="1" to="0" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r={3} fill={stroke} strokeWidth={2} stroke="#080A0F" />
    </g>
  );
};

const Analytics = () => {
  const [dbData, setDbData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://my-dashboard-pro.onrender.co/api/statsm')
      .then(res => { 
        const data = Array.isArray(res.data) ? res.data : [];
        setDbData(data); 
        setLoading(false); 
      })
      .catch((err) => { 
        console.error("Analytics Load Error:", err);
        setLoading(false); 
      });
  }, []);

  const timelineData = [
    { name: 'Пн', tiktok: 4000, youtube: 2400, instagram: 3200 },
    { name: 'Вт', tiktok: 3000, youtube: 1398, instagram: 4100 },
    { name: 'Ср', tiktok: 5000, youtube: 9800, instagram: 5500 },
    { name: 'Чт', tiktok: 2780, youtube: 3908, instagram: 4800 },
    { name: 'Пт', tiktok: 4890, youtube: 4800, instagram: 6200 },
    { name: 'Сб', tiktok: 2390, youtube: 3800, instagram: 7100 },
    { name: 'Вс', tiktok: 8500, youtube: 4300, instagram: 8000 },
  ];
  const pieData = dbData.length > 0 
  ? dbData.map(p => ({ name: p.platform, value: Number(p.followers) || 0 }))
  : [{ name: 'Загрузка...', value: 1 }];

  
  
  return (
    <div className="space-y-6 pb-10 max-w-[1300px] mx-auto text-white px-4"> 
      <div className="flex flex-col mb-10">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-none">
          DATA <span className="text-[#C026D3] drop-shadow-[0_0_20px_rgba(192,38,211,0.4)]">INTELLIGENCE</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          <h3 className="text-[10px] font-black uppercase italic tracking-[0.3em] text-gray-500 mb-8 flex items-center gap-2">
            <Activity size={14} className="text-[#C026D3]" /> Activity Trends Matrix
          </h3>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                <YAxis hide={true} />
                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #C026D3', borderRadius: '12px' }} />                
                <Line type="monotone" dataKey="tiktok" stroke="#06B6D4" strokeWidth={4} dot={<PulsingDot stroke="#06B6D4" />} animationDuration={2000} />
                <Line type="monotone" dataKey="youtube" stroke="#C026D3" strokeWidth={4} dot={<PulsingDot stroke="#C026D3" />} animationDuration={2500} />
                <Line type="monotone" dataKey="instagram" stroke="#8B5CF6" strokeWidth={4} dot={<PulsingDot stroke="#8B5CF6" />} animationDuration={3000} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white/[0.01] backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem] flex flex-col items-center shadow-2xl">
          <h3 className="text-[10px] font-black uppercase italic tracking-[0.3em] text-gray-500 self-start mb-8 text-left">Platform Share</h3>
          <div className="h-[220px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value" stroke="none">
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={THEME_COLORS[index % THEME_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <div className="w-16 h-16 rounded-full bg-[#C026D3]/5 blur-xl" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-8">
             {dbData.map((p, i) => (
               <div key={i} className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: THEME_COLORS[i % THEME_COLORS.length] }} />
                 <span className="text-[8px] font-black uppercase tracking-widest text-gray-500 italic">{p.platform}</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
        <h3 className="text-[10px] font-black uppercase italic tracking-[0.2em] text-gray-500 mb-8 flex items-center gap-2">
          <BarChart3 size={14} className="text-[#06B6D4]" /> Global Efficiency Node
        </h3>
        <div className="h-[180px] w-full">
           <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dbData}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                 <XAxis dataKey="platform" stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
                 <Tooltip cursor={{fill: 'rgba(255,255,255,0.02)'}} contentStyle={{ backgroundColor: '#000', border: '1px solid #06B6D4', borderRadius: '12px' }} />
                 <Bar dataKey="followers" radius={ [10, 10, 0, 0] } animationDuration={1500}>
                    {dbData.map((entry, index) => (
                      <Cell key={index} fill={THEME_COLORS[index % THEME_COLORS.length]} fillOpacity={0.8} />
                    ))}
                 </Bar>
              </BarChart>
           </ResponsiveContainer>
        </div>
        <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
           <span className="text-[7px] text-gray-600 font-black uppercase tracking-[0.5em]">System Node Status: Active</span>
           <div className="flex gap-4">
              <span className="text-[7px] text-[#C026D3] font-black uppercase tracking-[0.5em] italic">Encryption: AES-256</span>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

