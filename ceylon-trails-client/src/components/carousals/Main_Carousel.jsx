import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import image1 from '../../../public/images/Image1.jpg';
import image2 from '../../../public/images/Image2.jpg';
import image3 from '../../../public/images/Image3.jpg';
import image4 from '../../../public/images/Image1.jpg';
import image5 from '../../../public/images/Image5.jpg';

const Main_Carousel = () => {
    const slides = [
        { image: image1, text: "Discover the trails of", subText: "Paradise" },
        { image: image2, text: "Explore lush, green landscapes in", subText: "exotic lands" },
        { image: image3, text: "Bask in the serene beaches of", subText: "a tropical paradise" },
        { image: image4, text: "Marvel at the majestic wildlife found in", subText: "untamed forests" },
        { image: image5, text: "Discover the vibrant culture and heritage of", subText: "an island gem" },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection(1);
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="relative w-full h-96 sm:h-150 overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentSlide}
                    custom={direction}
                    initial={{ x: direction * 100 + "%" }}
                    animate={{ x: 0 }}
                    exit={{ x: -direction * 100 + "%" }}
                    transition={{ duration: 1 }}
                    className="absolute w-full h-full flex items-center justify-center flex-col"
                >
                    <img src={slides[currentSlide].image} alt={`Slide ${currentSlide}`} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 md:bottom-8 md:left-8 text-white text-left drop-shadow-lg p-4">
                        <h2 className="text-3xl sm:text-6xl lg:text-8xl xl:text-10xl font-jomhuria font-thin">{slides[currentSlide].text}</h2>
                        <p className="text-2xl sm:text-5xl lg:text-6xl xl:text-8xl font-jomhuria mt-2">{slides[currentSlide].subText}</p>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Main_Carousel;
