import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DoctorCarousel = () => {
  const doctors = [
    {
      name: "Dr. Terawan Agus Putranto",
      specialization: "Spesialisasi: Radiologi dan Terapi Inovatif",
      image: "/Doktor1.webp",
      quote: "Kesehatan adalah investasi terbesar dalam hidup. Jangan pernah abaikan sinyal dari tubuh Anda, karena tubuh yang sehat adalah kunci kebahagiaan sejati.",
    },
    {
      name: "Dr. Siti Fadilah Supari",
      specialization: "Spesialisasi: Penyakit Dalam dan Kesehatan Publik",
      image: "/Doktor2.webp",
      quote: "Pencegahan lebih baik daripada pengobatan. Dengan edukasi kesehatan yang baik, kita dapat memutus rantai penyakit sebelum terlambat.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % doctors.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [doctors.length]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + doctors.length) % doctors.length);
  };

  return (
    <div className="bg-slate-100">
      <div className="relative max-w-5xl mx-auto px-4 py-12 overflow-hidden">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> 
            Tim Dokter Profesional Kami
          </h2>
        </div>
        
        <div className="relative h-[400px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full"
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center mx-auto max-w-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={doctors[currentIndex].image}
                    alt={doctors[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{doctors[currentIndex].name}</h4>
                    <p className="text-gray-600 text-sm">{doctors[currentIndex].specialization}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-center italic">{doctors[currentIndex].quote}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
            onClick={() => paginate(-1)}
          >
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
            onClick={() => paginate(1)}
          >
            <ChevronRight className="h-6 w-6 text-gray-800" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {doctors.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCarousel;