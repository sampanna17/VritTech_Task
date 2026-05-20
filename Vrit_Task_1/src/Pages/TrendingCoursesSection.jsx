import { ArrowRight } from "lucide-react";

import reactImg from "../assets/Task2/react.png";
import socialImg from "../assets/Task2/social.png";
import vueImg from "../assets/Task2/vue.png";
import designImg from "../assets/Task2/design.png";

const TechIconRow = ({ icons }) => {
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
};

const NumberWithPlus = ({
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
};

const MainAllCoursesCard = ({ icons }) => {
    return (
        <div className="relative bg-[#C92E40] rounded-[36px] p-10 min-h-[530px] text-white shadow-lg overflow-hidden group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
            {/* Top Right Link */}
            <button className="absolute top-10 right-10 flex items-center gap-3 text-[20px] font-semibold">
                View all Courses
                <ArrowRight size={24} />
            </button>

            {/* Technology Icons */}
            <TechIconRow icons={icons} />

            {/* Bottom Stats */}
            <div className="absolute bottom-10 left-10 right-10 flex items-end justify-center gap-6">
                {/* Number */}
                <NumberWithPlus
                    value="23"
                    numberClassName="block text-[150px] font-bold leading-[120%] tracking-[0] text-center"
                    plusClassName="absolute right-[-26px] top-[0px] text-[64px] font-extrabold leading-none"
                />

                {/* Text Content */}
                <div className="pb-6">
                    <h4 className="text-[56px] font-bold leading-none">All Courses</h4>

                    <p className="mt-5 text-[22px] leading-[1.4] font-medium text-white/95">
                        courses you're powering
                        <br />
                        through right now.
                    </p>
                </div>
            </div>
        </div>
    );
};

const SideCoursesCard = ({ title, description, number }) => {
    return (
        <div className="relative bg-[#F4E9EA] rounded-[36px] min-h-[530px] p-8 overflow-hidden shadow-md group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
            {/* Vertical Text */}
            <div className="absolute top-30 left-1/2 -translate-x-1/2 rotate-[-90deg] origin-center flex flex-col items-center gap-6 text-[#C92E40]">
                <h3 className="font-['Outfit'] text-[32px] font-bold leading-[100%]">
                    {title}
                </h3>

                <p className="font-['Outfit'] text-[18px] font-normal leading-[100%]">
                    {description}
                </p>
            </div>

            {/* Number */}
            <div className="absolute bottom-8 left-8 text-[#C92E40]">
                <NumberWithPlus
                    value={number}
                    numberClassName="block text-[180px] font-bold leading-none tracking-tight"
                    plusClassName="absolute right-[-46px] top-[8px] text-[64px] font-bold leading-none"
                />
            </div>
        </div>
    );
};

const TrendingCoursesSection = () => {
    const techIcons = [
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
                <div className="mt-16 grid grid-cols-1 lg:grid-cols-[2.2fr_1fr_1fr] gap-8">
                    {/* Main All Courses Card */}
                    <MainAllCoursesCard icons={techIcons} />

                    {/* Upcoming Courses Card */}
                    <SideCoursesCard
                        title={
                            <>
                                Upcoming
                                <br />
                                Courses
                            </>
                        }
                        description="exciting new courses waiting to boost your skills."
                        number="05"
                    />

                    {/* Ongoing Courses Card */}
                    <SideCoursesCard
                        title={
                            <>
                                Ongoing
                                <br />
                                Courses
                            </>
                        }
                        description="currently happening—don't miss out on the action!"
                        number="10"
                    />
                </div>
            </div>
        </section>
    );
};

export default TrendingCoursesSection;