import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import api from "../utils/axiosConfig";
import Loading from "../components/Loading";



export default function AboutPage() {

    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600); // short page transition loader

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;
  return (
    <>
      <AboutIntro />
      <OurTeam />
      <MissionVision />
      <CoreValues />
    </>
  );
}



/* =======================
   ABOUT INTRO SECTION
======================= */
function AboutIntro() {
  return (
    <section className="pt-20">
      <div className="max-w-5xl mx-auto px-4 text-gray-700 leading-relaxed">
        <p>
          Chanja Datti is a social enterprise that currently collects waste plastic (PET bottles,
          pure water sachet, nylon bags etc.) and other recyclables like aluminium cans, papers (old newspapers,
          cardboard, cartons, old textbooks etc.), tires, and glass bottles, and transforms them into flakes or shreds,
          as raw materials in the manufacture of other products. . Chanja Datti is committed to environmental protection
          and is strategically poised to deploy indigenous technology including those produced by students from Nigeria’s
          tertiary institutions towards its recycling efforts.

        </p>
      </div>
    </section>
  );
}

/* =======================
   OUR TEAM SECTION
======================= */
function OurTeam() {
  const ITEMS_PER_PAGE = 9;
  const [page, setPage] = useState(1);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { data } = await api.get("/api/team");
        setMembers(data);
      } catch (err) {
        console.error("Failed to fetch team members", err);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
  if (sectionRef.current) {
    sectionRef.current.scrollIntoView({
      behavior: "instant",
      block: "start",
    });
  }
}, [page]);

const sectionRef = useRef(null);

  /* PAGINATION BASED ON BACKEND DATA */
  const totalPages = Math.ceil(members.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;

  const currentMembers = members.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goPrev = () => setPage((p) => Math.max(p - 1, 1));
  const goNext = () => setPage((p) => Math.min(p + 1, totalPages));

  if (!members.length) return null;

  return (
   <section ref={sectionRef} className="py-16 bg-white">

      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-4xl font-semibold mb-10">
          Our <span className="gradient-text">Team</span>
        </h2>

        {/* TEAM GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {currentMembers.map((member) => (
            <div key={member._id} className="text-center">
              <img
                src={member.image}
                alt={member.name}
                className="h-[400px] w-full object-cover rounded mb-4"
              />
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.title}</p>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10">
            {/* Prev */}
            <button
              onClick={goPrev}
              disabled={page === 1}
              className={`w-9 h-9 flex items-center justify-center rounded
                ${
                  page === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-[#7BA717] text-white"
                }`}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-9 h-9 flex items-center justify-center rounded font-medium
                  ${
                    page === i + 1
                      ? "bg-[#7BA717] text-white"
                      : "bg-[#F0F9E3] text-black hover:bg-[#7BA717] hover:text-white"
                  }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={goNext}
              disabled={page === totalPages}
              className={`w-9 h-9 flex items-center justify-center rounded
                ${
                  page === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-[#7BA717] text-white"
                }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}


/* =======================
   MISSION & VISION
======================= */
function MissionVision() {
  return (
    <>
      <section className="bg-[#7BA717] py-16 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
       <h3 className="text-2xl sm:text-3xl font-semibold mb-2">Our Mission</h3>
          <p className="text-sm sm:text-base mx-w-xl mx-auto">
            To convert waste into commercially viable products while empowering women and youth entrepreneurs in the process.
          </p>
        </div>
      </section>

      <section className="bg-[#C4F262] py-16 text-gray-900">
        <div className="max-w-5xl mx-auto px-4 text-center">
         <h3 className="text-2xl sm:text-3xl font-semibold mb-2">Our Vision</h3>
          <p className="text-sm sm:text-base mx-w-xl mx-auto">
            To become an industry name known for waste management solutions and recycling plastic waste products and youth empowerment in Nigeria within the next 5 years.
          </p>
        </div>
      </section>
    </>
  );
}

function CoreValues() {
  
  const values = [
    { text: "Innovation", icon: "/images/innovation.png", bg: "bg-[#7BA717]", textColor: "text-white" },
    { text: "Integrity", icon: "/images/integrity.png", bg: "bg-[#C4F262]", textColor: "text-[#434141]" },
    { text: "Impact", icon: "/images/impact.png", bg: "bg-[#F0F9E3]", textColor: "text-[#434141]" },
    { text: "Committed Execution", icon: "/images/committed.png", bg: "bg-[#C4F262]", textColor: "text-[#434141]" },
    { text: "Continuous Improvement", icon: "/images/continuos.png", bg: "bg-[#F0F9E3]", textColor: "text-[#434141]" },
    { text: "Collaboration", icon: "/images/collab.png", bg: "bg-[#7BA717]", textColor: "text-white" },
    { text: "Excellence", icon: "/images/excellence.png", bg: "bg-[#F0F9E3]", textColor: "text-[#434141]" },
    { text: "Eco-friendliness", icon: "/images/eco.png", bg: "bg-[#7BA717]", textColor: "text-white" },
    { text: "Empathy", icon: "/images/empathy.png", bg: "bg-[#C4F262]", textColor: "text-[#434141]" },
  ];

  return (
    <section className="py-16 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-4 text-center mb-8">
        <h3 className="text-xl font-semibold mb-4">Our Core Values</h3>
        <p className="text-gray-600 text-sm sm:text-base">
          A commitment to Innovation, Integrity, Impact, Committed Execution, Continuous improvement, Collaboration, Excellence, Eco-friendliness and Empathy (ICE3)
        </p>
      </div>
      <div className="w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3">
          {values.map((item, index) => (
            <div
              key={index}
              className={`${item.bg} ${item.textColor} 
              min-h-[140px] sm:min-h-[180px] md:min-h-[240px] 
              flex flex-col items-center justify-center 
              text-center font-semibold text-sm sm:text-base md:text-xl 
              gap-2 sm:gap-3 p-4`}
            >
              <img
                src={item.icon}
                alt=""
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14"
                onError={(e) => e.target.style.display = 'none'}
              />
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
