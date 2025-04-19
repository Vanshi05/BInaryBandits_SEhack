import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Card from "./Card";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface SlideItem {
  id: number | string;
  image: string;
  title: string;
  description: string;
  link?: {
    text: string;
    url: string;
  };
}

interface CardSliderProps {
  title: string;
  subtitle?: string;
  items: SlideItem[];
  autoSlide?: boolean;
  interval?: number;
  visibleCards?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  className?: string;
}

const CardSlider = ({
  title,
  subtitle,
  items,
  autoSlide = true,
  interval = 7000,
  visibleCards = { mobile: 1, tablet: 2, desktop: 3 },
  className
}: CardSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
 
  const getVisibleCardCount = () => {
    if (isMobile) return visibleCards.mobile;
   
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return visibleCards.mobile;
      if (window.innerWidth < 1024) return visibleCards.tablet;
    }
   
    return visibleCards.desktop;
  };
 
  const visibleCardCount = getVisibleCardCount();
  const maxIndex = Math.max(0, items.length - visibleCardCount);

  useEffect(() => {
    if (!autoSlide || isPaused || maxIndex <= 0) return;
   
    const slideTimer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
    }, interval);
   
    return () => clearInterval(slideTimer);
  }, [autoSlide, interval, isPaused, maxIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
 
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
 
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
 
  const handleTouchEnd = () => {
    const difference = touchStartX.current - touchEndX.current;
    const threshold = 50;
   
    if (difference > threshold) {
      goToNext();
    } else if (difference < -threshold) {
      goToPrevious();
    }
  };

  return (
    <section className={cn("py-16 px-4 md:px-8 overflow-hidden", className)}>
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      <div className="relative max-w-6xl mx-auto">
        <button
          onClick={goToPrevious}
          className="absolute left-1 md:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300"
          aria-label="Previous slide"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
       
        <button
          onClick={goToNext}
          className="absolute right-1 md:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300"
          aria-label="Next slide"
        >
          <ArrowRight className="h-6 w-6" />
        </button>

        <div
          ref={sliderRef}
          className="overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            className="flex gap-6 px-4"
            animate={{ x: `calc(-${currentIndex * (100 / visibleCardCount)}%)` }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 30,
              mass: 0.8,
              velocity: 2
            }}
          >
            {items.map((item, index) => (
              <Card
                key={item.id}
                image={item.image}
                title={item.title}
                description={item.description}
                link={item.link}
                index={index}
                className="flex-shrink-0 w-full md:w-[calc(100%/2-1rem)] lg:w-[calc(100%/3-1rem)]"
              />
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index ? "w-6 bg-primary" : "w-2 bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardSlider;
