import { motion } from 'framer-motion'
import Logo from "../assets/Ceylon_trails_logo.png"

function Splash_Page() {
    return (
        <div className="bg-base-500  flex-col h-screen flex justify-center items-center">
            <motion.div className='flex-col justify-center ' initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 6 }}>
                <img className="h-50 sm:h-100" src={Logo} alt="" />
                <label className="text-transparent flex justify-center text-4xl sm:text-5xl md:text-8xl font-jomhuria bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 bg-clip-text animate-textShadow">
                    Welcome To Ceylon Trails
                </label>
            </motion.div>
        </div>
    )
}

export default Splash_Page