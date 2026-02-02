import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import api from "../utils/axiosConfig";

export default function AboutPage() {
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
    <section className="py-16 bg-white">
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
          <h3 className="text-3xl font-semibold mb-2">Our Mission</h3>
          <p>
            Chanja Datti is a social enterprise that currently collects waste plastic (PET bottles, pure water sachet, nylon bags etc.) and other recyclables 
          </p>
        </div>
      </section>

      <section className="bg-[#C4F262] py-16 text-gray-900">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-semibold mb-2">Our Vision</h3>
          <p>
          Chanja Datti is a social enterprise that currently collects waste plastic (PET bottles, pure water sachet, nylon bags etc.) and other recyclables 
          </p>
        </div>
      </section>
    </>
  );
}

/* =======================
   CORE VALUES
======================= */
function CoreValues() {
    const values = [
    { text: "Innovation", bg: "bg-[#7BA717]", textColor: "text-white" },
    { text: "Integrity", bg: "bg-[#C4F262]", textColor: "text-gray-900" },
    { text: "Impact", bg: "bg-[#F0F9E3]", textColor: "text-gray-700" },

    { text: "Committed Execution", bg: "bg-[#C4F262]", textColor: "text-gray-800" },
    { text: "Continuous improvement", bg: "bg-[#F0F9E3]", textColor: "text-black" },
    { text: "Collaboration", bg: "bg-[#7BA717]", textColor: "text-white" },

    { text: "Excellence", bg: "bg-[#F0F9E3]", textColor: "text-gray-700" },
    { text: "Eco-friendliness", bg: "bg-[#7BA717]", textColor: "text-white" },
    { text: "Empathy", bg: "bg-[#C4F262]", textColor: "text-gray-800" },
  ];
  return (
    <section className="py-32 md:pb-32 pb:0 bg-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h3 className="text-xl font-semibold mb-4">Our Core Values</h3>
        <p className="text-gray-600">
          Chanja Datti is a social enterprise that currently collects waste plastic (PET bottles, pure water sachet, nylon bags etc.) and other recyclables 
        </p>
      </div>
      <div className="w-full max-w-5xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {values.map((item, index) => (
          <div
            key={index}
            className={`${item.bg} ${item.textColor} 
            h-20 md:h-60 flex items-center justify-center 
            text-center font-semibold text-lg md:text-xl
            p-4`}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
    </section>
  );
}
