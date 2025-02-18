/* eslint-disable react/no-unescaped-entities */
import Image1 from "../../assets/sub_carousel_image/image1.jpg";
import Image2 from "../../assets/sub_carousel_image/image2.jpg";
import Image3 from "../../assets/sub_carousel_image/image3.jpg";
import Image4 from "../../assets/sub_carousel_image/image4.jpg";
import { useState, useEffect } from 'react';

const Sub_Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            image: Image1,
            title: "Traditional Perahara Dance",
            description: "A vibrant celebration of Sri Lanka's cultural heritage."
        },
        {
            image: Image2,
            title: "Traditional Sri Lankan Foods",
            description: "Savor the rich flavors of authentic spices and dishes."
        },
        {
            image: Image3,
            title: "Sri Lankan Mask Craft",
            description: "Explore the vibrant art of traditional mask making."
        },
        {
            image: Image4,
            title: "Ancient Places in Sri Lanka",
            description: "Discover the rich history of sacred and ancient sites."
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 8000); 
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div id="animation-carousel" className="relative w-80 sm:w-100 shadow-2xl shadow-gray-500 rounded-lg overflow-hidden">
            <div className="relative h-50 md:h-80">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-linear ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
                        data-carousel-item
                    >
                        <img src={slide.image} className="block h-full w-full object-cover" alt={slide.title} />
                        <div className="absolute bottom-0 sm:bottom-5 sm:left-0 bg-black/50 text-white px-4 py-2 rounded-lg shadow-md">
                            <p className="text-lg font-bold">{slide.title}</p>
                            <p className="text-sm">{slide.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button
                type="button"
                className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={() => setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1))}
                data-carousel-prev
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                    <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" d="M5 1 1 5l4 4" />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button
                type="button"
                className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}
                data-carousel-next
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                    <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" d="m1 9 4-4-4-4" />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    );
};

export default Sub_Carousel;
