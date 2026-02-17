import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqData = [
    {
        question: "Siapa yang menulis artikel di blog ini?",
        answer:
            "Artikel kami ditulis oleh tim penulis kesehatan berpengalaman yang bekerja sama dengan praktisi medis untuk memastikan akurasi informasi. Setiap artikel melewati proses review ketat sebelum dipublikasikan.",
    },
    {
        question: "Apakah informasi di blog ini dapat dipercaya?",
        answer:
            "Ya, kami berkomitmen menyajikan informasi kesehatan yang akurat dan berbasis bukti ilmiah. Setiap artikel dilengkapi referensi dari jurnal medis dan sumber terpercaya lainnya.",
    },
    {
        question: "Bagaimana cara berlangganan newsletter?",
        answer:
            "Anda dapat berlangganan newsletter kami dengan memasukkan email di form yang tersedia di halaman utama atau di bagian bawah setiap halaman. Newsletter dikirim seminggu sekali berisi artikel-artikel terpilih.",
    },
    {
        question: "Apakah saya bisa berkontribusi menulis artikel?",
        answer:
            "Tentu! Kami menerima kontribusi artikel dari penulis tamu. Silakan hubungi kami melalui halaman kontak untuk informasi lebih lanjut tentang panduan penulisan dan proses submit artikel.",
    },
    {
        question: "Apakah blog ini menggantikan konsultasi dokter?",
        answer:
            "Tidak. Informasi di blog ini bersifat edukatif dan tidak menggantikan konsultasi medis profesional. Untuk masalah kesehatan spesifik, selalu konsultasikan dengan dokter atau tenaga medis yang berkompeten.",
    },
];

const FAQItem = ({ question, answer, isOpen, onClick, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        viewport={{ once: true }}
        className="border-b border-gray-100 last:border-b-0"
    >
        <button
            onClick={onClick}
            className="w-full py-5 flex items-center justify-between text-left group"
        >
            <span className="font-medium text-gray-800 group-hover:text-emerald-600 transition-colors pr-4">
                {question}
            </span>
            <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600"
                    }`}
            >
                <ChevronDown className="w-4 h-4" />
            </motion.div>
        </button>

        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <p className="pb-5 text-gray-600 leading-relaxed pr-12">
                        {answer}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
);

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-3xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-emerald-600 font-medium text-sm mb-2 block">FAQ</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                        Pertanyaan Umum
                    </h2>
                    <p className="text-gray-600">
                        Temukan jawaban untuk pertanyaan yang sering diajukan
                    </p>
                </motion.div>

                <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                    {faqData.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
