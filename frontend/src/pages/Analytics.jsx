import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { Activity, BarChart3, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';

const THEME_COLORS = ['#C026D3', '#8B5CF6', '#06B6D4', '#F43F5E', '#10B981'];

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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://my-dashboard-pro.onrender.co/api/statsm');
        console.log("Raw Data from Server:", res.data); // Проверка в консоли F12

        const raw = Array.isArray(res.data) ? res.data : [];
        
        // Маппинг данных: делаем их понятными для графиков
        const sanitized = raw.map(item => ({
          platform: item.platform || 'Unknown',
          followers: Number(item.followers) || Number(item.follower) || 0,
          revenue: Number(item.revenue) || 0
        }));

        setDbData(sanitized);
        setLoading(false);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Ошибка связи с сервером");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Создаем данные для линейного графика (имитация тренда)
  const timelineData = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, idx) => {
    const point = { name: day };
    dbData.forEach(p => {
      // Генерируем красивую кривую на основе реальных данных
      point[p.platform] = (p.followers / (1.5 + idx * 0.1)) + (Math.sin(idx) * 200);
    });
    return point;
  });

  if (loading) return (
    <div className="h-[80vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-[#C026D3]" size={50} />
      <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-[10px]">Synchronizing Nodes...</p>
    </div>
  );

  if (dbData.length === 0) return (
    <div className="h-[80vh] flex flex-col items-center justify-center gap-4 text-gray-500">
      <AlertCircle size={40} />
      <p className="font-black uppercase tracking-[0.2em]">Данные в базе не найдены</p>
      <p className="text-[10px]">Добавь платформы в разделе Settings</p>
    </div>
  );

  return (
    <div className="space-y-6 pb-10 max-w-[1300px] mx-auto text-white px-4 animate-in fade-in duration-700"> 
      <div className="flex flex-col mb-10">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-none">
          DATA <span className="text-[#C026D3] drop-shadow-[0_0_20px_rgba(192,38,211,0.4)]">INTELLIGENCE</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ВЕРХНИЙ ГРАФИК (ТРЕНДЫ) */}
        <div className="lg:col-span-8 bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative">
          <h3 className="text-[10px] font-black uppercase italic tracking-[0.3em] text-gray-500 mb-8 flex items-center gap-2">
            <Activity size={14} className="text-[#C026D3]" /> Activity Trends Matrix
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #C026D3', borderRadius: '12px' }} />                
                {dbData.map((p, i) => (
                  <Line 
                    key={`line-${p.platform}`}
                    type="monotone" 
                    dataKey={p.platform} 
                    stroke={THEME_COLORS[i % THEME_COLORS.length]} 
                    strokeWidth={4} 
                    dot={<PulsingDot stroke={THEME_COLORS[i % THEME_COLORS.length]} />} 
                    animationDuration={2000 + i * 500}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* КРУГОВАЯ ДИАГРАММА */}
        <div className="lg:col-span-4 bg-white/[0.01] backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem] flex flex-col items-center shadow-2xl">
          <h3 className="text-[10px] font-black uppercase italic tracking-[0.3em] text-gray-500 self-start mb-8">Platform Share</h3>
          <div className="h-[240px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={dbData} 
                  innerRadius={75} 
                  outerRadius={95} 
                  paddingAngle={10} 
                  dataKey="followers" 
                  nameKey="platform" 
                  stroke="none"
                >
                  {dbData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={THEME_COLORS[index % THEME_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-6">
             {dbData.map((p, i) => (
               <div key={`legend-${i}`} className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: THEME_COLORS[i % THEME_COLORS.length] }} />
                 <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{p.platform}</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* НИЖНИЙ БАР-ЧАРТ */}
      <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
        <h3 className="text-[10px] font-black uppercase italic tracking-[0.2em] text-gray-500 mb-8 flex items-center gap-2">
          <BarChart3 size={14} className="text-[#06B6D4]" /> Global Efficiency Node
        </h3>
        <div className="h-[200px] w-full">
           <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dbData}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                 <XAxis dataKey="platform" stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
                 <Tooltip cursor={{fill: 'rgba(255,255,255,0.02)'}} contentStyle={{ backgroundColor: '#000', border: '1px solid #06B6D4', borderRadius: '12px' }} />
                 <Bar dataKey="followers" radius={ [10, 10, 0, 0] } animationDuration={1500}>
                    {dbData.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={THEME_COLORS[index % THEME_COLORS.length]} fillOpacity={0.8} />
                    ))}
                 </Bar>
              </BarChart>
           </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

