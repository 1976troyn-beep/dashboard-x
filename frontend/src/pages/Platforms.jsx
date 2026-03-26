import { useState, useEffect } from 'react'
import { motion, animate } from 'framer-motion'
import { ArrowUpRight, MoreVertical, Loader2, Zap, Share2 } from 'lucide-react'
import { getSocialStats } from '../services/api'

const Counter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0)
  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2,
      onUpdate: (latest) => setDisplayValue(Math.floor(latest))
    })
    return () => controls.stop()
  }, [value])
  return <span>{displayValue.toLocaleString()}</span>
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1, 
      delayChildren: 0.2 
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,         
    y: 30,              
    filter: "blur(10px)", 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    filter: "blur(0px)", 
    transition: { 
      type: "spring", 
      stiffness: 80,    
      damping: 15 
    }
  }
}

const Platforms = () => {
  const [platforms, setPlatforms] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getSocialStats()
      .then(res => {
        const data = res?.data || res;
        setPlatforms(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(error => {
        console.error("Ошибка загрузки платформ:", error)
        setLoading(false)
      })
  }, [])

  const getStyle = (name) => {
    const styles = {
      'YouTube': { icon: '/logos/youtube.svg', color: 'text-red-500', glow: 'bg-red-600/20', border: 'group-hover:border-red-500/40' },
      'Instagram': { icon: '/logos/instagram.svg', color: 'text-[#C026D3]', glow: 'bg-[#C026D3]/20', border: 'group-hover:border-[#C026D3]/40' },
      'TikTok': { icon: '/logos/tiktok.svg', color: 'text-[#06B6D4]', glow: 'bg-[#06B6D4]/20', border: 'group-hover:border-[#06B6D4]/40' }
    }
    return styles[name] || styles['YouTube']
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10 pb-20 max-w-[1300px] mx-auto text-white"
    >
      <motion.div variants={cardVariants} className="flex flex-col mb-10 group px-2">
        <div className="flex items-baseline">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none text-white">
            <span className="drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">MEDIA</span>
            <span className="ml-3 text-[#C026D3] drop-shadow-[0_0_20px_rgba(192,38,211,0.4)] transition-all duration-500 group-hover:ml-5">ASSETS</span>
          </h1>
        </div>
        <div className="mt-3 flex items-center gap-4">
          <div className="h-[1px] w-full bg-gradient-to-r from-gray-500/20 to-transparent" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((p, index) => {
          const style = getStyle(p.platform)
          return (
            <motion.div 
              key={p.id || index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className={`
                bg-white/[0.03] backdrop-blur-3xl border border-white/10 border-t-white/20 
                p-8 rounded-[3rem] relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.3)]
                transition-all duration-500 ${style.border}
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 group-hover:scale-110 transition-all duration-500 backdrop-blur-md">
                      <img src={style.icon} alt="" className="w-6 h-6 object-contain" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold italic uppercase tracking-tight text-white">{p.platform}</h3>
                      <p className="text-[8px] text-gray-600 font-black uppercase tracking-[0.2em] mt-0.5 opacity-60 italic">Social network</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white/10 rounded-full transition-all text-gray-700 group-hover:text-white">
                    <MoreVertical size={18} />
                  </button>
                </div>

                <div className="mt-12">
                  <p className="text-[9px] text-gray-500 uppercase font-black tracking-[0.2em] mb-1 italic opacity-60 flex items-center gap-2">
                     <Zap size={10} className="text-[#C026D3] animate-pulse" /> Current Followers
                  </p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold tracking-tighter italic text-white drop-shadow-sm">
                      <Counter value={Number(p.followers) || 0} />
                    </span>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                      <ArrowUpRight size={10} className="text-green-400" /> 
                      <span className="text-green-400 text-[9px] font-black italic">{p.growth}%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/10 flex justify-between items-end">
                  <div>
                    <p className="text-[8px] text-gray-500 uppercase font-black tracking-[0.3em] mb-1 italic opacity-60 leading-none">Social network income</p>
                    <h4 className="text-2xl font-bold italic text-[#10B981] drop-shadow-[0_0_15px_rgba(16,185,129,0.3)] leading-none">
                      <Counter value={Number(p.revenue) || 0} />
                      <span className="text-xs ml-1.5 uppercase font-black opacity-40">$</span>
                    </h4>
                  </div>
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/5 p-3 rounded-xl border border-white/10 group-hover:bg-white/10 transition-all duration-500 cursor-pointer"
                  >
                    <Share2 size={16} className="text-gray-400 group-hover:text-white" />
                  </motion.div>
                </div>
              </div>
              <div className={`absolute -right-20 -bottom-20 w-64 h-64 rounded-full blur-[110px] opacity-0 group-hover:opacity-40 transition-all duration-1000 ${style.glow}`} />
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default Platforms;
 