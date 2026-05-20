import clarityImg from "../assets/clarity.png";
import learnImg from "../assets/learn.png";
import mentorImg from "../assets/mentor.png";
import achieveImg from "../assets/achieve.png";

const cards = [
  {
    title: "Start with Clarity",
    subtitle: "Step into a better learning path.",
    desc: `Overwhelmed by too many learning options? SkillShikshya provides a clear,
    curated roadmap from the start. Whether you're a beginner or upskilling,
    we have a path tailored to your growth.`,
    bg: "#F45C5C",
    image: clarityImg,
    imageClass: "-left-10 top-10 w-[257.3858337402344px] h-[338.593994140625px] z-50 ",
    contentClass: "items-end text-right pl-52 pr-10",
  },
  {
    title: "Learn by Doing",
    subtitle: "Practical skills, real projects.",
    desc: `Theory is great, but action is better. At SkillShikshya, you learn by doing.
    Hands-on projects and real-world scenarios help you build, break, and create—leading to true mastery.`,
    bg: "#5D97A6",
    image: learnImg,
    imageClass: "right-0 -bottom-10 w-[200px] h-[360px]",
    contentClass: "items-start text-left pr-52 pl-10",
  },
  {
    title: "Get Mentored & Supported",
    subtitle: "You're not learning alone.",
    desc: `Stuck or need feedback? SkillShikshya’s community of mentors and learners has your back
    with live support, interactive discussions, and expert insights. You’re never on your own.`,
    bg: "#7569B5",
    image: mentorImg,
    imageClass: "-left-10 top-34  w-[307.03753662109375px] h-[249.9674835205078px]",
    contentClass: "items-end text-right pl-52 pr-10",
  },
  {
    title: "Achieve & Showcase",
    subtitle: "Build your portfolio, get job-ready.",
    desc: `Your journey ends with achievement. Each completed project builds a portfolio showcasing your skills and job readiness,
    bringing you closer to that dream job, promotion, or your own venture.`,
    bg: "#B6966D",
    image: achieveImg,
    imageClass: "-right-8 -bottom-10 w-[280.0356889119445px] h-[310.76718089642645px]",
    contentClass: "items-start text-left pr-52 pl-10",
  },
];

const JourneyCard = ({
  title,
  subtitle,
  desc,
  bg,
  image,
  imageClass,
  contentClass,
}) => {
  return (
    <div className="relative">
      {/* Main Card */}
      <div
        className="group relative overflow-visible rounded-[32px] h-[325px]
                   shadow-md transition-all duration-500
                   hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
        style={{ backgroundColor: bg }}
      >
        {/* Content */}
        <div
          className={`relative z-10 flex flex-col pt-14 text-white ${contentClass}`}
        >
          <h2 className="text-[24px] md:text-[28px] font-bold leading-tight">
            {title}
          </h2>

          <h4 className="mt-3 text-[18px] md:text-[20px] font-semibold">
            {subtitle}
          </h4>

          <p className="mt-8 text-[15px] leading-8 max-w-[390px] font-medium">
            {desc}
          </p>
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-white/10 to-transparent" />
      </div>

      <img
        src={image}
        alt={title}
        className={`absolute z-20 transition-transform duration-500
                    group-hover:scale-105 group-hover:-translate-y-2
                    ${imageClass}`}
      />
    </div>
  );
};

const JourneySection = () => {
  return (
    <section className="bg-[#f3f3f3] min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Note */}
        <p className="text-center text-[18px] md:text-[22px] font-medium text-[#2b2b2b]">
          Note: Hover the component to view the animation & Click the arrow icon
        </p>

        {/* Heading */}
        <div className="mt-12">
          <p className="text-[18px] font-semibold text-[#444]">
            Your SkillShikshya Journey
          </p>

          <h1 className="mt-3 text-[36px] md:text-[48px] font-bold leading-tight">
            <span className="text-[#22A06B]">Step</span> In.{" "}
            <span className="text-[#22A06B]">Skill</span> Up.{" "}
            <span className="text-[#22A06B]">Stand</span> Out. 🚀
          </h1>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
          {cards.map((card, index) => (
            <JourneyCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;