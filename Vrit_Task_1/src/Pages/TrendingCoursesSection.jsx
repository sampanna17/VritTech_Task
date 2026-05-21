import { ArrowRight } from "lucide-react";
import { LayoutGroup, MotionConfig, motion } from "framer-motion";
import { memo, useMemo, useState } from "react";

import reactImg from "../assets/Task2/react.png";
import socialImg from "../assets/Task2/social.png";
import vueImg from "../assets/Task2/vue.png";
import designImg from "../assets/Task2/design.png";
import clickMeImg from "../assets/Task2/clickme.png";

const springTransition = {
    type: "spring",
    stiffness: 240,
    damping: 34,
    mass: 1.2,
};

const textSwingTransition = {
    type: "spring",
    stiffness: 140,
    damping: 26,
    mass: 1.8,
};

const TECH_ICONS = [
    {
        src: reactImg,
        alt: "React",
        className: "w-20 h-20 object-contain drop-shadow-xl -rotate-[18deg]",
    },
    {
        src: socialImg,
        alt: "Social",
        className: "w-24 h-24 object-contain drop-shadow-xl rotate-[8deg]",
    },
    {
        src: vueImg,
        alt: "Vue",
        className: "w-[104px] h-[104px] object-contain drop-shadow-xl -rotate-[12deg]",
    },
    {
        src: designImg,
        alt: "Design",
        className: "w-20 h-20 object-contain drop-shadow-xl rotate-[14deg]",
    },
];

const CARDS = [
    {
        id: "all",
        mainTitle: "All Courses",
        sideTitle: <>All Courses</>,
        number: "23",
        description: (
            <>
                courses you're powering
                <br />
                through right now.
            </>
        ),
        sideDescription: "courses you're powering through right now.",
    },
    {
        id: "upcoming",
        mainTitle: "Upcoming Courses",
        sideTitle: (
            <>
                Upcoming
                <br />
                Courses
            </>
        ),
        number: "05",
        description: "exciting new courses waiting to boost your skills.",
        sideDescription: "exciting new courses waiting to boost your skills.",
    },
    {
        id: "ongoing",
        mainTitle: "Ongoing Courses",
        sideTitle: (
            <>
                Ongoing
                <br />
                Courses
            </>
        ),
        number: "10",
        description: "currently happening—don't miss out on the action!",
        sideDescription: "currently happening—don't miss out on the action!",
    },
];

const GRID_COLS_BY_ACTIVE = {
    all: "lg:grid-cols-[2.2fr_1fr_1fr]",
    upcoming: "lg:grid-cols-[1fr_2.2fr_1fr]",
    ongoing: "lg:grid-cols-[1fr_1fr_2.2fr]",
};

const TechIconRow = memo(({ icons }) => {
    return (
        <div className="flex items-center justify-center gap-10 mt-24">
            {icons.map((icon) => (
                <img
                    key={icon.alt}
                    src={icon.src}
                    alt={icon.alt}
                    className={icon.className}
                />
            ))}
        </div>
    );
});

const NumberWithPlus = memo(({
    value,
    containerClassName = "relative",
    numberClassName,
    plusClassName,
}) => {
    return (
        <div className={containerClassName}>
            <span className={numberClassName}>{value}</span>
            <span className={plusClassName}>+</span>
        </div>
    );
});

const MainCoursesCard = memo(
    ({ cardId, icons, title, description, number, onActivate }) => {
    return (
        <motion.div
            layout
            layoutId={`card-${cardId}`}
            onClick={() => onActivate(cardId)}
            className="relative bg-[#C92E40] rounded-[36px] p-10 min-h-[530px] text-white shadow-lg overflow-hidden group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
        >
            {/* Top Right Link */}
            <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                className="absolute top-10 right-10 flex items-center gap-3 text-[20px] font-semibold hover:[&>svg]:animate-[nudge-x_1000ms_ease-in-out_infinite]"
            >
                View all Courses
                <ArrowRight size={24} />
            </button>

            {/* Technology Icons */}
            <TechIconRow icons={icons} />

            {/* Bottom Stats */}
            <div className="absolute bottom-10 inset-x-0 flex items-center justify-center gap-8 px-10">
                {/* Number */}
                <NumberWithPlus
                    value={number}
                    numberClassName="block text-[150px] font-bold leading-[120%] tracking-[0] text-center"
                    plusClassName="absolute right-[-26px] top-[0px] text-[64px] font-extrabold leading-none"
                />

                {/* Text Content */}
                <motion.div
                    layoutId={`card-text-${cardId}`}
                    transition={textSwingTransition}
                    initial={false}
                    animate={{ rotate: 0 }}
                    style={{ transformOrigin: "100% 50%" }}
                    className="text-left"
                >
                    <h4 className="text-[30px] font-bold leading-none">{title}</h4>

                    <p className="mt-5 text-[22px] leading-[1.4] font-medium text-white/95">
                        {description}
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
    }
);

const SideCoursesCard = memo(
    ({ cardId, title, description, number, onActivate }) => {
    return (
        <motion.div
            layout
            className="relative group"
            role="button"
            tabIndex={0}
            layoutId={`card-${cardId}`}
            onClick={() => onActivate(cardId)}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onActivate?.(cardId);
                }
            }}
        >
            <div className="pointer-events-none absolute z-50 left-1/2 -top-10 -translate-x-1/2 flex flex-col items-center opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100">
                <p className=" text-[14px] font-medium text-[#2D2D2D]">
                    Click me!
                </p>
                <img src={clickMeImg} alt="Click me" className="w-[50px]" />
            </div>

            <div className="relative bg-[#F4E9EA] rounded-[36px] min-h-[530px] p-8 overflow-hidden shadow-md cursor-pointer transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">
                {/* Vertical Text */}
                <motion.div
                    layoutId={`card-text-${cardId}`}
                    transition={textSwingTransition}
                    initial={false}
                    animate={{ rotate: -90 }}
                    style={{ transformOrigin: "100% 50%" }}
                    className="absolute top-30 left-1/2 -translate-x-1/2 origin-center flex flex-col items-center gap-6 text-[#C92E40]"
                >
                    <h3 className="font-['Outfit'] text-[32px] font-bold leading-[100%]">
                        {title}
                    </h3>

                    <p className="font-['Outfit'] text-[18px] font-normal leading-[100%]">
                        {description}
                    </p>
                </motion.div>

                {/* Number */}
                <div className="absolute bottom-8 left-8 text-[#C92E40]">
                    <NumberWithPlus
                        value={number}
                        numberClassName="block text-[180px] font-bold leading-none tracking-tight"
                        plusClassName="absolute right-[-46px] top-[8px] text-[64px] font-bold leading-none"
                    />
                </div>
            </div>
        </motion.div>
    );
    }
);

const TrendingCoursesSection = () => {
    const [activeCard, setActiveCard] = useState("all");

    const cards = useMemo(() => CARDS, []);

    const active = cards.find((c) => c.id === activeCard) ?? cards[0];

    const gridColsByActive = GRID_COLS_BY_ACTIVE;

    return (
        <section id="task-2" className="bg-[#f3f3f3] py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Top Note */}
                <p className="text-center text-[20px] md:text-[22px] font-medium text-[#2D2D2D]">
                    Note: Click the cards to view the animation
                </p>

                {/* Heading */}
                <div className="mt-12">
                    <p className="text-[24px] md:text-[28px] font-medium text-[#333333]">
                        Explore our classes and master trending skills!
                    </p>

                    <h2 className="mt-4 text-[42px] md:text-[56px] font-bold leading-tight tracking-tight">
                        <span className="text-[#1F1F1F]">Dive Into </span>
                        <span className="text-[#1BA36B]">What's Hot Right Now!</span>
                        <span className="ml-2">🔥</span>
                    </h2>
                </div>

                {/* Cards */}
                <MotionConfig transition={springTransition} reducedMotion="user">
                    <LayoutGroup>
                        <motion.div
                            layout
                            className={`mt-16 grid grid-cols-1 gap-8 transition-all duration-700 ${gridColsByActive[active.id]}`}
                        >
                            {cards.map((card) =>
                                card.id === active.id ? (
                                    <MainCoursesCard
                                        key={card.id}
                                        cardId={card.id}
                                        icons={TECH_ICONS}
                                        title={card.mainTitle}
                                        description={card.description}
                                        number={card.number}
                                        onActivate={setActiveCard}
                                    />
                                ) : (
                                    <SideCoursesCard
                                        key={card.id}
                                        cardId={card.id}
                                        title={card.sideTitle}
                                        description={card.sideDescription}
                                        number={card.number}
                                        onActivate={setActiveCard}
                                    />
                                )
                            )}
                        </motion.div>
                    </LayoutGroup>
                </MotionConfig>
            </div>
        </section>
    );
};

export default TrendingCoursesSection;