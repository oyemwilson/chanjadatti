import { useEffect, useState, useRef } from "react";
import ImageCarousel from "../components/ImageCarousel";
import api from "../utils/axiosConfig";
import WhatWeDoImages from "../components/WhatWeDoImages";
import { Link } from "react-router-dom";
import Loading from "../components/Loading"; // ⭐ ADD

export default function WhatWeDo() {

  const wasteImages = [
    "/whatwedo/waste1.jpeg",
    "/whatwedo/waste2.jpeg",
    "/whatwedo/waste3.jpeg",
    "/whatwedo/waste4.jpeg",
    "/whatwedo/waste5.jpeg",
    "/whatwedo/waste6.jpeg",
    "/whatwedo/waste7.jpeg",
    "/whatwedo/plastic1.jpeg",
    "/whatwedo/plastic2.jpeg",
    "/whatwedo/plastic3.jpeg",
    "/whatwedo/plastic4.jpeg",
  ];

  const consultationImages = [
    "/whatwedo/consultation1.jpeg",
    "/whatwedo/consultation2.jpeg",
    "/whatwedo/consultation3.jpeg",
    "/whatwedo/consultation4.jpeg",
    "/whatwedo/consultation5.jpeg",
    "/whatwedo/consultation6.jpeg",
    "/whatwedo/waste8.jpeg",
    "/whatwedo/waste9.jpeg",
    "/whatwedo/waste10.jpeg",
    "/whatwedo/waste11.jpeg",
  ];

  const plasticImages = [
    // "/whatwedo/plastic1.jpeg",
    // "/whatwedo/plastic2.jpeg",
    // "/whatwedo/plastic3.jpeg",
    // "/whatwedo/plastic4.jpeg",
    // "/whatwedo/plastic5.jpeg",
    // "/whatwedo/plastic6.jpeg",
    // "/whatwedo/plastic7.jpeg",
    // "/whatwedo/plastic8.jpeg",
    // "/whatwedo/plastic9.jpeg",
    // "/whatwedo/plastic10.jpeg",
    // "/whatwedo/plastic12.jpeg",
    "/images/household1.jpg",
    "/images/household2.jpg",
    "/images/household3.jpg",
    "/images/household4.jpg",
    "/images/household5.jpg",
    "/images/household6.jpg",
  ];

  const sdgImages = [
    "/whatwedo/achievingsdg1.jpeg",
    "/whatwedo/achievingsdg2.jpeg",
    "/whatwedo/achievingsdg3.jpeg",
    "/whatwedo/achievingsdg4.jpeg",
    "/whatwedo/achievingsdg5.jpeg",
    "/whatwedo/achievingsdg6.jpeg",
    "/whatwedo/achievingsdg7.jpeg",
    "/whatwedo/achievingsdg8.jpeg",
  ];

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollRef = useRef(null);

  // Check scroll position to show/hide arrows
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      
      // Calculate current index based on scroll position
      const cardWidth = scrollRef.current.firstChild?.offsetWidth || 0;
      const gap = 32; // 8 * 4 (gap-8)
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      handleScroll(); // Initial check
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [reports]);

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstChild?.offsetWidth || 0;
      const gap = 32;
      scrollRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth'
      });
    }
  };

  /* ---------- FETCH REPORTS ---------- */
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data } = await api.get("/api/impact-reports");
        setReports(data);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      } finally {
        setLoading(false); // ⭐ CORRECT PLACE
      }
    };

    fetchReports();
  }, []);

  const getApiBaseUrl = () => {
    return api.defaults.baseURL || "";
  };

  /* ---------- LOADING GUARD ---------- */
  if (loading) return <Loading />;

  /* ---------- PAGE JSX ---------- */



  return (
    <>
      <section className="lg:max-w-[85%] max-w-[95%] mx-auto px-6 py-20 space-y-32">
        {/* Waste Collection */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold">
              Waste <span className="gradient-text">Collection & Processing</span>
            </h2>

            <p className="mt-6 text-gray-600 leading-relaxed">
              We collect recyclables such as PET plastics, aluminium cans,
              papers & old newspapers, cardboard, cartons, tires, and glass bottles.
            </p>

            <p className="mt-4 text-gray-600 leading-relaxed">
              Collected recyclables are further processed at our plants into Pellets and Flakes and thereafter supplied to manufacturers and other recyclers who use the items as raw materials for the production in their manufacturing process.
            </p>

            <Link to="/recycle-with-us">
              <button className="mt-8 bg-[#7BA717] hover:bg-[#E2F0CE] hover:text-black text-white px-6 py-3 rounded-full">
                Recycle with us
              </button>
            </Link>
          </div>

          <ImageCarousel images={wasteImages} />
        </div>

        {/* Plastic Manufacturing */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text - comes first on mobile, second on desktop */}
          <div className="text-left md:order-2">
            <h2 className="text-3xl font-bold">
              Plastic  <span className="gradient-text">Product Manufacturing</span>
            </h2>
            <p className="mt-6 text-gray-600 leading-relaxed">
              We leverage our internally processed pellets and flakes to manufacture durable, eco-friendly finished goods, effectively closing the waste loop.
              <span className="font-bold ml-1">Our Products include Bales, PET Flakes, HDPE Flakes, HDPE Pellets, Preform PET, Bowls, Dustpan.</span>
            </p>
            <button
              onClick={() =>
                window.location.href =
                "mailto:info@chanjadatti.com?subject=Order Inquiry"
              }
              className="mt-8 bg-[#7BA717] hover:bg-[#E2F0CE] hover:text-black text-white px-6 py-3 rounded-full"
            >
              Place an Order
            </button>
          </div>

          {/* Image - comes second on mobile, first on desktop */}
          <ImageCarousel images={plasticImages} className="md:order-1" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center ">
          <div>
            <h2 className="text-3xl font-bold">
              Sustainability <span className="gradient-text">Consultation</span>
            </h2>

            <p className="mt-6 text-gray-600 leading-relaxed">
              We provide research, policy advisory, and practical training to strengthen waste management and recycling systems. We support organisations to design and set up efficient recycling operations, from feasibility and process design to on-ground implementation.
            </p>

            <p className="mt-4 text-gray-600 leading-relaxed">
              We also help translate impact into credible ESG reporting aligned with global sustainability standards.
            </p>

            <Link to='/contact'>
              <button className="mt-8 bg-[#7BA717] hover:bg-[#E2F0CE] hover:text-black text-white px-6 py-3 rounded-full">
                Contact Us
              </button>
            </Link>

          </div>

          <ImageCarousel images={consultationImages} />
        </div>

        {/* SDGs */}
        <div className="text-center space-y-10">
          <div>
            <h2 className="text-3xl font-bold">
              Achieving the <span className="gradient-text">SDGs</span>
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-gray-600 leading-relaxed">
              Our work supports climate action, responsible consumption,
              decent work, and inclusive economic growth across communities.
            </p>
          </div>

          <WhatWeDoImages images={sdgImages} />
        </div>

      </section>

      {/* Impact Reports */}
<section className="bg-[#F3F8E6] py-14" id="impact">
  <div className="lg:max-w-[80%] max-w-[100%] mx-auto px-1">
    <h2 className="text-center text-2xl font-semibold text-gray-900 mb-10">
      Impact Reports
    </h2>

    {loading ? (
      <div className="text-center text-gray-600">Loading reports...</div>
    ) : reports.length === 0 ? (
      <div className="text-center text-gray-600">
        No reports available yet.
      </div>
    ) : (
      <div className="relative">
        <div className="flex justify-center">
          <div
            className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scroll-smooth"
            ref={scrollRef}
          >
            <div className="flex gap-8 pb-4 px-5 justify-start">
              {reports.map((report) => (
                <div
                  key={report._id}
                  className="w-[85vw] max-w-[350px] flex-shrink-0 text-center mx-auto"
                >
                  {/* ✅ CLICKABLE COVER IMAGE */}
                  <a
                    href={`${getApiBaseUrl()}/api/impact-reports/${report._id}/view`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Open Impact Report ${report.year}`}
                    aria-label={`Open Impact Report ${report.year}`}
                    className="block bg-white h-[420px] rounded-md overflow-hidden shadow-sm hover:shadow-md transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#9DB36B]"
                  >
                    <div className="w-full h-full flex items-center justify-center p-4">
                      <img
                        src={report.coverImage}
                        alt={`Impact Report ${report.year}`}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/350x420?text=Impact+Report";
                        }}
                      />
                    </div>
                  </a>

                  {/* YEAR */}
                  <p className="mt-4 font-medium text-gray-900 text-lg">
                    {report.year}
                  </p>

                  {/* ✅ VIEW BUTTON */}
                  <div className="flex flex-col gap-2 mt-4">
                    <a
                      href={`${getApiBaseUrl()}/api/impact-reports/${report._id}/view`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-[#8BA63E] text-white px-16 py-3 rounded-full text-sm font-medium hover:bg-[#7A9337] transition"
                    >
                      View Report
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== MOBILE ARROWS ===== */}
        {reports.length > 1 && (
          <>
            {showLeftArrow && (
              <button
                onClick={() =>
                  scrollToIndex(Math.max(0, currentIndex - 1))
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg hidden lg:hidden"
              >
                ‹
              </button>
            )}

            {showRightArrow && (
              <button
                onClick={() =>
                  scrollToIndex(
                    Math.min(reports.length - 1, currentIndex + 1)
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg hidden lg:hidden"
              >
                ›
              </button>
            )}
          </>
        )}

        {/* ===== DOT INDICATORS ===== */}
        {reports.length > 1 && (
          <div className="flex justify-center gap-2 mt-6 lg:hidden">
            {reports.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-[#8BA63E] w-8"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    )}
  </div>
</section>


      {/* CTA */}
      <section className="bg-[#F3F8E6] py-16 mt-64">
        <div className="max-w-[80%] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-4xl font-semibold text-gray-900">
              Recycle from the comfort of your home
            </h3>
            <p className="text-gray-600 mt-1">
              Recykoin pays you to recycle, with ease
            </p>
          </div>

          <Link to="https://play.google.com/store/apps/details?id=com.chanjadatti.recykoin_mobile" target="_blank">
            <button className="bg-[#7BA717] hover:bg-[#7A9337] text-white px-6 py-3 font-medium opacity-80 ">
              Get Recykoin
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
