import { useState, useEffect } from "react";
import { Instagram, Linkedin, GitHub } from "react-feather";
import Typewriter from "typewriter-effect";
import Background3D from "./assets/Background3D";

function LoadingScreen({ onStartExit, onComplete }) {
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        let isPaused = false;
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 99 && !isPaused) {
                    isPaused = true;
                    // Pause for 1.5 seconds at 99%
                    setTimeout(() => {
                        setProgress(100);
                        setTimeout(() => {
                            setIsExiting(true);
                            if (onStartExit) onStartExit();
                        }, 300);
                        setTimeout(() => {
                            if (onComplete) onComplete();
                        }, 1200);
                    }, 800);
                    return 99;
                }
                if (isPaused) return prev;
                // Fast progress to 99
                return Math.min(99, prev + 2);
            });
        }, 15);
        return () => clearInterval(interval);
    }, [onStartExit, onComplete]);

    const dots = Array.from({ length: 50 });

    return (
        <div
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0A] transition-all duration-[1000ms] ease-in-out ${isExiting ? "opacity-0 -translate-y-24 pointer-events-none" : "opacity-100 translate-y-0"}`}
        >
            <div
                className={`relative flex items-center justify-center transition-all duration-1000 ease-in-out ${isExiting ? "scale-[1.5] opacity-0" : "scale-100 opacity-100"}`}
            >
                {/* Center Logo */}
                <div className="font-mono text-5xl font-bold text-[#A3E635] tracking-tighter">
                    [ A ]
                </div>

                {/* Circular Dots */}
                <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${isExiting ? "scale-[1.2] opacity-0" : "scale-100 opacity-100"}`}
                >
                    {dots.map((_, i) => {
                        const theta = (i / 50) * 2 * Math.PI - Math.PI / 2;
                        const radius = 80;
                        const x = radius * Math.cos(theta);
                        const y = radius * Math.sin(theta);
                        const isVisible = progress >= i * 2;

                        return (
                            <div
                                key={i}
                                className={`absolute w-1.5 h-1.5 rounded-full bg-[#A3E635] transition-opacity duration-75 ${isVisible ? "opacity-100 shadow-[0_0_8px_#A3E635]" : "opacity-0"}`}
                                style={{
                                    transform: `translate(${x}px, ${y}px)`,
                                }}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Progress Text */}
            <div
                className={`absolute mt-48 font-mono text-[#A3E635] text-sm tracking-widest transition-opacity duration-500 ${isExiting ? "opacity-0" : "opacity-100"}`}
            >
                {progress}%
            </div>
        </div>
    );
}

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [isExitingLoader, setIsExitingLoader] = useState(false);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        if (isExitingLoader) {
            // Delay content reveal to sync with the loading screen fading out
            setTimeout(() => setShowContent(true), 400);
        }
    }, [isExitingLoader]);

    return (
        <div className="relative min-h-screen bg-[#0A0A0A] text-[#E0E0E0] font-poppins selection:bg-[#A3E635] selection:text-[#0A0A0A] pb-24 overflow-x-hidden">
            {loading && (
                <LoadingScreen
                    onStartExit={() => setIsExitingLoader(true)}
                    onComplete={() => setLoading(false)}
                />
            )}

            {/* Render background right as exit starts for a seamless fade-in reveal */}
            {(isExitingLoader || !loading) && <Background3D />}

            <div
                className={`relative z-10 transition-all duration-[1200ms] transform ease-out ${showContent ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
            >
                {/* Navbar / Header */}
                <header className="px-8 py-8 flex justify-between items-center max-w-[90rem] mx-auto w-full border-b border-[#222222]">
                    <div className="font-bold tracking-tighter text-xl text-[#A3E635]">
                        ALEA.
                    </div>
                    <a
                        href="#contact"
                        className="text-xs uppercase tracking-widest font-mono text-[#808080] hover:text-[#A3E635] transition-colors"
                    >
                        [Contact]
                    </a>
                </header>

                <main className="max-w-[90rem] mx-auto w-full px-8">
                    {/* Hero Section */}
                    <section className="mt-32 mb-40 flex flex-col items-start border-b border-[#222222] pb-32">
                        <div className="font-mono text-xs text-[#808080] mb-8">
                            {`// SOFTWARE ENGINEER`}
                        </div>
                        <h1 className="text-5xl md:text-8xl font-bold leading-[1.05] tracking-tighter mb-8 max-w-4xl text-white mix-blend-difference">
                            <span className="block">AFRIZAL LUTHFI</span>
                            <span className="block text-[#A3E635]">
                                EKA ARNATHA
                            </span>
                        </h1>
                        <div className="text-lg md:text-xl text-[#808080] max-w-2xl font-light leading-relaxed font-mono min-h-[4rem]">
                            {showContent && (
                                <Typewriter
                                    onInit={(typewriter) => {
                                        typewriter
                                            .typeString(
                                                "> I build things for the web.",
                                            )
                                            .pauseFor(1500)
                                            .deleteChars(25)
                                            .changeDeleteSpeed(200)
                                            .typeString(" play guitar.")
                                            .pauseFor(1500)
                                            .deleteChars(12)
                                            .typeString(" love technology.")
                                            .pauseFor(2000)
                                            .start();
                                    }}
                                    options={{
                                        autoStart: true,
                                        loop: true,
                                        cursor: "_",
                                    }}
                                />
                            )}
                        </div>
                    </section>

                    {/* Selected Projects */}
                    <section className="mb-40 border-b border-[#222222] pb-32">
                        <div className="flex justify-between items-end mb-16">
                            <h2 className="text-sm font-mono text-[#808080] uppercase tracking-widest">
                                [01] SELECTED WORK
                            </h2>
                        </div>

                        <div className="flex flex-col space-y-24">
                            {/* Project 1 */}
                            <a
                                href="http://exsciitwo.vercel.app"
                                target="_blank"
                                rel="noreferrer"
                                className="group grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative"
                            >
                                <div className="md:col-span-7 aspect-[16/9] bg-[#111111] overflow-hidden border border-[#222222] relative z-10">
                                    <img
                                        src="./img/project1.webp"
                                        alt="Website Portofolio"
                                        className="w-full h-full object-cover opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-[#A3E635] mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                                </div>
                                <div className="md:col-span-5 md:pl-12 flex flex-col justify-center relative z-10">
                                    <div className="font-mono text-xs text-[#A3E635] mb-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
                                        [P-01]
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4 tracking-tight group-hover:text-[#A3E635] transition-colors duration-300">
                                        Portfolio v1
                                    </h3>
                                    <p className="text-[#808080] font-light leading-relaxed">
                                        Website portofolio yang saya buat untuk
                                        mendeskripsikan siapa dan apa kemampuan
                                        saya dalam bidang web development.
                                    </p>
                                </div>
                            </a>

                            {/* Project 2 */}
                            <a
                                href="http://exsciitwo.vercel.app"
                                target="_blank"
                                rel="noreferrer"
                                className="group grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative"
                            >
                                <div className="md:col-span-5 md:pr-12 flex flex-col justify-center order-2 md:order-1 relative z-10 text-right">
                                    <div className="font-mono text-xs text-[#A3E635] mb-4 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
                                        [P-02]
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4 tracking-tight group-hover:text-[#A3E635] transition-colors duration-300">
                                        Exsciitwo
                                    </h3>
                                    <p className="text-[#808080] font-light leading-relaxed">
                                        Website yang saya buat sebagai memori
                                        kenang-kenangan. Dibangun dengan
                                        pendekatan desain yang minimalis.
                                    </p>
                                </div>
                                <div className="md:col-span-7 aspect-[16/9] bg-[#111111] overflow-hidden border border-[#222222] order-1 md:order-2 relative z-10">
                                    <img
                                        src="./img/project2.webp"
                                        alt="Exsciitwo"
                                        className="w-full h-full object-cover opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-[#A3E635] mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                                </div>
                            </a>

                            {/* Project 3 */}
                            <a
                                href="http://iqiyi-clone.vercel.app"
                                target="_blank"
                                rel="noreferrer"
                                className="group grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative"
                            >
                                <div className="md:col-span-7 aspect-[16/9] bg-[#111111] overflow-hidden border border-[#222222] relative z-10">
                                    <img
                                        src="./img/project3.webp"
                                        alt="Iqiyi Clone"
                                        className="w-full h-full object-cover opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-[#A3E635] mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                                </div>
                                <div className="md:col-span-5 md:pl-12 flex flex-col justify-center relative z-10">
                                    <div className="font-mono text-xs text-[#A3E635] mb-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
                                        [P-03]
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4 tracking-tight group-hover:text-[#A3E635] transition-colors duration-300">
                                        iQIYI Clone
                                    </h3>
                                    <p className="text-[#808080] font-light leading-relaxed">
                                        Website untuk mengasah skill
                                        pengembangan full-stack. Dibangun dengan
                                        mereplikasi fungsionalitas dan layout
                                        platform iQIYI.
                                    </p>
                                </div>
                            </a>
                        </div>
                    </section>

                    {/* Contact */}
                    <section
                        id="contact"
                        className="pb-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8"
                    >
                        <div className="md:col-span-4">
                            <h2 className="text-sm font-mono text-[#808080] uppercase tracking-widest">
                                [02] GET IN TOUCH
                            </h2>
                        </div>
                        <div className="md:col-span-8 relative z-10">
                            <div className="text-3xl md:text-5xl font-bold tracking-tight mb-12">
                                <a
                                    href="mailto:afrizal.23183@mhs.unesa.ac.id"
                                    className="hover:text-[#A3E635] transition-colors block mb-4"
                                >
                                    afrizal.23183
                                    <br className="sm:hidden" />
                                    @mhs.unesa.ac.id
                                </a>
                            </div>

                            <div className="flex flex-wrap gap-8 items-center font-mono text-sm">
                                <a
                                    href="https://github.com/Ijoelel"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 text-[#808080] hover:text-[#A3E635] transition-colors"
                                >
                                    <GitHub size={16} />
                                    <span>GITHUB</span>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/afrizal-luthfi-4b8369281/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 text-[#808080] hover:text-[#A3E635] transition-colors"
                                >
                                    <Linkedin size={16} />
                                    <span>LINKEDIN</span>
                                </a>
                                <a
                                    href="https://www.instagram.com/afrizallea_/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 text-[#808080] hover:text-[#A3E635] transition-colors"
                                >
                                    <Instagram size={16} />
                                    <span>INSTAGRAM</span>
                                </a>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
