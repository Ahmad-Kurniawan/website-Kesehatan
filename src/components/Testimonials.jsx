import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Dewi Sartika",
        role: "Pembaca Setia",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
        text: "Artikel-artikelnya sangat bermanfaat dan mudah dipahami. Saya jadi lebih paham cara menjaga kesehatan keluarga berkat blog ini!",
    },
    {
        id: 2,
        name: "Ahmad Rizky",
        role: "Pembaca Aktif",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5,
        text: "Informasi yang disajikan sangat akurat dan up-to-date. Referensi terpercaya untuk tips kesehatan sehari-hari.",
    },
    {
        id: 3,
        name: "Sarah Amelia",
        role: "Subscriber Newsletter",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        rating: 5,
        text: "Newsletter mingguannya selalu ditunggu! Kontennya berkualitas dan sudah membantu saya menerapkan pola hidup sehat.",
    },
    {
        id: 4,
        name: "Budi Santoso",
        role: "Pembaca",
        image: "https://randomuser.me/api/portraits/men/52.jpg",
        rating: 5,
        text: "Blog kesehatan terbaik yang pernah saya baca. Penjelasannya detail tapi tidak membingungkan. Sangat recommended!",
    },
];

const TestimonialCard = ({ testimonial }) => (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
        <Quote className="w-8 h-8 text-emerald-200 mb-4" />
        <p className="text-gray-700 leading-relaxed mb-6 italic">
            "{testimonial.text}"
        </p>
        <div className="flex gap-1 mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
            ))}
        </div>
        <div className="flex items-center gap-3">
            <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
            />
            <div>
                <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
            </div>
        </div>
    </div>
);

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-emerald-600 font-medium text-sm mb-2 block">TESTIMONI</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                        Apa Kata Pembaca Kami
                    </h2>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        Ribuan pembaca sudah mendapatkan manfaat dari artikel kesehatan kami
                    </p>
                </motion.div>

                {/* Desktop Grid */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <TestimonialCard testimonial={testimonial} />
                        </motion.div>
                    ))}
                </div>

                {/* Mobile Carousel */}
                <div className="md:hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                            <TestimonialCard testimonial={testimonials[currentIndex]} />
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex justify-center gap-2 mt-6">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-emerald-600 w-6" : "bg-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
