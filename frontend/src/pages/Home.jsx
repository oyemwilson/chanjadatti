import React, { useState, useEffect, useRef } from "react";
import { partners } from "../data/partners.js";
import videos from "../data/thumbnails.js";
import { Link } from "react-router-dom";
import { faqs } from "../data/faq.js";
import { ChevronDown, ChevronUp } from "lucide-react";
import api from "../utils/axiosConfig";
import Loading from "../components/Loading";

const Home = () => {
  const [video, setVideo] = useState(null);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);
  const [openIndex, setOpenIndex] = useState();
  const [thumbnail, setThumbnail] = useState("");
  const [openVideo, setOpenVideo] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------- FETCH CAMPAIGNS ---------- */
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const { data } = await api.get("/api/campaigns");
        setCampaigns(Array.isArray(data) ? data : data.campaigns || []);
      } catch (err) {
        console.error("Failed to load campaigns");
      }
    };

    fetchCampaigns();
  }, []);

  /* ---------- VIDEO HELPERS ---------- */
  const getEmbedUrl = (url) => {
    if (url.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}?autoplay=1`;
    }

    if (url.includes("v=")) {
      return `https://www.youtube.com/embed/${url.split("v=")[1]}?autoplay=1`;
    }

    return url;
  };

  const extractVideoId = (url) => {
    const reg =
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/;
    const match = url?.match(reg);
    return match ? match[1] : null;
  };

  /* ---------- FETCH HERO VIDEO ---------- */
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const { data } = await api.get("/api/videos/hero");
        setVideo(data);
      } catch (err) {
        console.error("Failed to fetch hero video", err);
        setLoading(false);
      }
    };

    fetchVideo();
  }, []);

  /* ---------- RESOLVE BEST THUMBNAIL ---------- */
  useEffect(() => {
    if (!video?.videoUrl) return;

    const videoId = extractVideoId(video.videoUrl);
    if (!videoId) {
      setLoading(false);
      return;
    }

    const maxRes = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const sdRes = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
    const hqRes = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    const img = new Image();

    img.onload = () => {
      if (img.naturalWidth && img.naturalWidth > 120) {
        setThumbnail(maxRes);
      } else {
        setThumbnail(sdRes);
      }
      setLoading(false);
    };

    img.onerror = () => {
      setThumbnail(hqRes);
      setLoading(false);
    };

    img.src = maxRes;
  }, [video]);

  /* ---------- GLOBAL LOADING ---------- */
  if (loading) {
    return <Loading />;
  }

  /* ---------- EXTRA SAFETY ---------- */
  if (!video || !thumbnail) {
    return <Loading />;
  }

  /* ---------- PAGE JSX BELOW ---------- */





  const CheckItem = ({ text }) => (
    <div className="flex items-start gap-3">
      <img
        src="/images/check.png"
        alt="check"
        className="w-5 h-5 mt-0.5 shrink-0"
      />
      <span className="text-gray-700 text-sm leading-relaxed">
        {text}
      </span>
    </div>
  );




  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;

      // 1. Get the width of one single video card
      const cardWidth = current.firstElementChild.clientWidth;

      // 2. Get the gap between cards (default gap-8 is 32px)
      const gap = 32;

      // 3. Calculate total move (Card + Gap)
      // For 2 videos at a time, use: (cardWidth + gap) * 2
      // For 1 video at a time, use: (cardWidth + gap)
      const scrollAmount = cardWidth + gap;

      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      <section
        className="relative w-full bg-cover bg-center bg-no-repeat"

      >
        {/* BACKGROUND PLACEHOLDER */}
        <div className="absolute inset-0 bg-white" />

        {/* Reduced top padding, kept bottom comfortable */}
        <div className="relative max-w-[80%] mx-auto px-1 pt-12 pb-20">

          {/* HERO CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

            {/* LEFT TEXT */}
            <div>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight">
                We are <span className="gradient-text">transforming</span>
                <span className="block">waste into value</span>
              </h1>

              <p className="mt-6 text-gray-600 max-w-xl">
                Welcome to Chanja Datti, Abuja’s home of waste recycling and leader
                in Nigeria’s green revolution.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6">

                <Link
                  to="/recycle-with-us"   // change to your actual route
                  className="inline-block bg-[#7BA717] hover:bg-[#E2F0CE] hover:text-black transition text-white px-6 py-3 rounded-full font-semibold"
                >
                  Recycle with us
                </Link>

                <Link to='https://www.youtube.com/@chanjadatti3738/videos' target='_blank'>
                <button className="flex items-center gap-4 text-gray-700 font-medium hover:text-[#7BA717] transition text-left">
                  {/* PLAY ICON */}
                  <span className="flex items-center justify-center w-12 h-12 rounded-full border border-black text-black shrink-0">
                    ▶
                  </span>

                  {/* STACKED TEXT */}
                  <div className="flex flex-col leading-tight font-extrabold">
                    <span>Watch</span>
                    <span>our Videos</span>
                  </div>
                </button>
                </Link>
              </div>
            </div>

            {/* RIGHT IMAGE – BIGGER */}
            <div className="flex justify-center lg:justify-end">
              <img
                src="/images/hero-img.webp"
                alt="Hero Illustration"
                className="w-full max-w-lg lg:max-w-xl xl:max-w-xl h-auto"
              />
            </div>
          </div>

          {/* PARTNERS SLIDER */}
          <div className="mt-24">
            <p className="text-center text-gray-600 font-semibold text-3xl mb-10">
              Our Partners
            </p>

            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

              <div className="flex w-max animate-marquee">
                {[...partners, ...partners].map((partner, index) => (
                  <div
                    key={`${partner.id}-${index}`}
                    className="flex items-center justify-center min-w-[180px] px-3"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-16 w-auto object-contain text-black"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
      <section className="w-full bg-white">
        <div className="lg:max-w-[80%] max-w-[100%] mx-auto px-6 py-20">

          {/* FROM THE CEO */}
          {/* Added responsive padding and centered items for better visual balance on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-10 lg:gap-16 items-center px-4 md:px-0">

            {/* CEO IMAGE */}
            <div className="w-full">
              <img
                src="/images/ceo-img.png"
                alt="From the CEO"
                className="w-full h-[350px] lg:h-auto max-h-[400px] lg:max-h-none rounded-3xl object-cover "
              />
            </div>

            {/* CEO TEXT */}
            <div className="flex flex-col justify-center">
              {/* Scaled Typography: text-3xl on mobile, text-5xl on desktop */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 lg:mb-8 leading-tight">
                From the <span className="gradient-text">CEO</span>
              </h2>

              <div className="space-y-4">
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  Welcome to Chanja Datti, Abuja’s home of waste recycling and leader in Nigeria’s green-revolution.
                  At Chanja Datti we are committed to transforming waste to value! With an increasing demand to rid our environment of non-biodegradable waste materials,
                  we have made a commitment to making Abuja (and by extension Nigeria) safer and cleaner one-recyclable-at-a-time, as we primarily focus on Plastic (PET bottles,
                  pure water sachet, nylon bags etc.) and other waste streams such as Aluminium cans, Paper (old newspapers, old textbooks, corrugated cardboard, carton etc.), Glass bottles and Tires
                </p>


                <p className="text-gray-600 text-base md:text-lg leading-relaxed italic border-l-4 border-[#7BA717] pl-4">
                  "Our name ‘Chanja Datti’ is derived from the Hausa language and it means ‘to change or transform dirt’.
                  The name reflects the fact that our company was birthed and is located in the northern part of Nigeria,
                  and signifies our dedication to incorporating the local essence of Northern Nigeria into our company.’."
                </p>
              </div>
            </div>
          </div>

          {/* FOLLOW OUR STORY */}
          <div className="mt-24 text-center">
            <h3 className="text-3xl font-extrabold text-gray-900 mb-10">
              Follow our story
            </h3>

            {/* VIDEO PLACEHOLDER */}
            {/* Changed max-w-[80%] to w-full */}
            {/* VIDEO PLACEHOLDER */}
            <div className="relative w-full mx-auto rounded-2xl overflow-hidden">
              {/* Background thumbnail */}
              <div
                className="relative w-full aspect-video md:aspect-auto md:h-[620px] md:h-[620px]
      bg-cover bg-center bg-no-repeat
      flex items-center justify-center cursor-pointer"
                style={{ backgroundImage: `url(${thumbnail})` }}
                onClick={() => setOpen(true)}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/25" />

                {/* Play Button */}
                <div className="relative z-10 w-20 h-20 rounded-full border-4 border-white bg-black/30 grid place-items-center hover:scale-110 transition-transform">
                  <img
                    src="/images/playvector.png"
                    alt="Play"
                    className="w-8 h-8 object-contain ml-1"
                  />
                </div>
              </div>

              {/* Label */}
              <span className="absolute bottom-4 right-4 text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
                {video.title}
              </span>
            </div>

            {/* VIDEO MODAL */}
            {open && (
              <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
                <div className="relative w-[90%] max-w-4xl aspect-video bg-black rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpen(false)}
                    className="absolute top-3 right-3 text-white text-xl z-10"
                  >
                    ✕
                  </button>

                  <iframe
                    src={`https://www.youtube.com/embed/${video.videoUrl.includes("youtu.be")
                      ? video.videoUrl.split("youtu.be/")[1]
                      : video.videoUrl.split("v=")[1]
                      }?autoplay=1`}
                    className="w-full h-full"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    title={video.title}
                  />
                </div>
              </div>
            )}

          </div>

        </div>
      </section>
      <section className=" ">
        <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-10 mt-20">
          Our <span className="gradient-text">Campaigns</span>
        </h2>
        <div className="bg-[#F1F9E5]">

          {/* SECTION TITLE */}

          <div className='max-w-[85%] mx-auto py-14 hidden lg:block w-full'>
            {/* ================= CAMPAIGN 1 ================= */}
            <div className="grid grid-cols-12 gap-12 mb-32 items-center">

              {/* IMAGE */}
              <div className="col-span-4">
                <img
                  src="/images/mask2.png"
                  alt="Bottles for Books Initiative"
                  className="w-full h-[500px] rounded-md object-cover"
                />
              </div>

              {/* RIGHT CONTENT AREA */}
              <div className="col-span-8">

                {/* TOP: TITLE + INTRO (FULL WIDTH) */}
                <div className="mb-10">
                  <h3 className="text-3xl font-semibold mb-4">
                    Bottles for Books Initiative
                  </h3>

                  <p className="text-gray-700 max-w-xl">
                    We are partnering with{" "}
                    <span className="text-[#7BA717] font-medium">WASTE Africa</span>{" "}
                    to ensuring inclusive and equitable quality education.
                  </p>
                </div>

                {/* BOTTOM: VISION + BENEFICIARIES SIDE BY SIDE */}
                <div className="grid grid-cols-12 gap-8 items-end">

                  {/* VISION */}
                  <div className="col-span-8">
                    <h4 className="font-bold uppercase text-sm mb-4">
                      Bottles4Books Vision
                    </h4>

                    <p className="text-gray-600 mb-6 max-w-xl">
                      Our vision and mission towards the Bottle for Books Initiative
                    </p>

                    <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                      <CheckItem text="Targeting out of school children" />
                      <CheckItem text="Implementing the SDGs" />
                      <CheckItem text="Reducing illiteracy" />
                      <CheckItem text="Providing quality education" />
                      <CheckItem text="Boosting educational capacity" />
                      <CheckItem text="Waste to wealth awareness" />
                    </div>
                  </div>

                  {/* BENEFICIARIES */}
                  <div className="col-span-4 flex items-end justify-end">
                    <div className="flex items-center gap-4 bg-white rounded-lg px-6 py-10 shadow-sm">
                      <img
                        src="/images/round-check.png"
                        alt="Beneficiaries icon"
                        className="w-10 h-10 shrink-0"
                      />

                      <div className="text-left">
                        <p className="text-4xl font-extrabold text-gray-900">900+</p>
                        <p className="text-sm tracking-widest text-gray-500 mt-1">
                          BENEFICIARIES
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>


            {/* ================= CAMPAIGN 2 ================= */}
            <div className="grid grid-cols-12 gap-12 mb-32 items-center">

              {/* IMAGE */}
              <div className="col-span-4">
                <img
                  src="/images/mask1.png"
                  alt="Women Recyclers Empowerment Initiative"
                  className="w-full h-[500px] rounded-md object-cover"
                />
              </div>

              {/* RIGHT CONTENT AREA */}
              <div className="col-span-8">

                {/* TOP TITLE + INTRO */}
                <div className="mb-10">
                  <h3 className="text-3xl font-semibold mb-4">
                    Women Recyclers Empowerment Initiative
                  </h3>

                  <p className="text-gray-700 max-w-xl">
                    We are partnering with The Coca-Cola Company, Coca-Cola Foundation
                    and{" "}
                    <span className="text-[#7BA717] font-medium">WASTE Africa</span>{" "}
                    to give seed products to women recyclers.
                  </p>
                </div>

                {/* BOTTOM GRID: VISION + BENEFICIARY */}
                <div className="grid grid-cols-12 gap-8 items-end">

                  {/* VISION */}
                  <div className="col-span-8">
                    <h4 className="font-bold uppercase text-sm mb-4">
                      WREI Vision
                    </h4>

                    <p className="text-gray-600 mb-6 max-w-xl">
                      Our vision and mission towards WREI initiative
                    </p>

                    <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                      <CheckItem text="Empower local women with skills" />
                      <CheckItem text="Start a cooperative for their welfare" />
                      <CheckItem text="Help women start businesses" />
                      <CheckItem text="Pay the school fees of their children" />
                      <CheckItem text="Personal development training" />
                      <CheckItem text="Build their income stream" />
                    </div>
                  </div>

                  {/* BENEFICIARIES */}
                  <div className="col-span-4 flex justify-end">
                    <div className="flex items-center gap-4 bg-white rounded-lg px-6 py-10 shadow-sm">
                      <img
                        src="/images/round-check.png"
                        alt="Beneficiaries icon"
                        className="w-10 h-10 shrink-0"
                      />

                      <div className="text-left">
                        <p className="text-4xl font-extrabold text-gray-900">600+</p>
                        <p className="text-sm tracking-widest text-gray-500 mt-1">
                          BENEFICIARIES
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>
      <section>
<div className="relative w-full bg-[#F3F9E9] shadow-md rounded-md   z-50 border border-gray-100">

  {campaigns.length === 0 && (
    <div className="px-4 py-2 text-sm text-gray-500">
      No campaigns available
    </div>
  )}

  {/* ================= DESKTOP LIST ================= */}

  {/* ================= MOBILE BUTTON GRID ================= */}
  <div className=" w-full  lg:hidden">
    {campaigns.map((campaign) => (
      <Link
        key={campaign._id}
        to={`/campaigns/${campaign._id}`}
        className="flex items-center  justify-center text-center px-3 py-10 rounded-lg border border-gray-200 
                   hover:bg-[#9DB36B] hover:text-white transition-all text-xl font-medium"
      >
        {campaign.title}
      </Link>
    ))}
  </div>

</div>

      </section>
      <section>
        <div className='pb-32 pt-10 bg-white text-center'>
          <Link
            to="/campaigns"
            className='group inline-flex items-center gap-2 text-[#9DB36B] font-bold text-xl uppercase tracking-widest hover:text-black transition-colors'
          >
            View More
            <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </Link>
        </div>

      </section>
      <section className="bg-[#F3F9E9] w-full py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-0">

          {/* Left Content */}
          <div className='md:ml-40'>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Download <span className="text-[#9DB36B]">Recykoin</span>
            </h1>

            <p className="mt-4 text-gray-600 max-w-md">
              Recycle with ease and get paid when you use our mobile application,
              Recykoin.
            </p>

            {/* Google Play Placeholder */}
            <Link to="https://play.google.com/store/apps/details?id=com.chanjadatti.recykoin_mobile&pli=1" target='_blank'>
            <div className="mt-8 flex justify-start md:justify-start">
              <img src="./images/googleplay.png" className='' alt="" />
            </div>
            </Link>
          </div>

          {/* Right Phone Mockup */}
          <div className="flex justify-start md:justify-start mt-10 lg:mt-0">
            <div className="relative">
              <img
                src="/images/mobile.png"
                alt=""
                className="relative z-10"
              />

              {/* Bottom fade overlay */}
              <div className="pointer-events-none absolute bottom-0 left-0 w-full h-7 
                    bg-gradient-to-t from-[#F3F9E9] to-transparent z-20" />
            </div>
          </div>


        </div>
      </section>
      <section className="w-full py-16 bg-white overflow-hidden">
        <h2 className="text-3xl md:text-4xl font-bold text-center my-20">
          Our{" "}
          <span className="gradient-text">Impact</span>
        </h2>
        <div className="max-w-[100%] lg:max-w-[85%] mx-auto px-6">
          <div className="relative">

            {/* LEFT BUTTON */}
            <button
              onClick={() => scroll("left")}
              className="hidden lg:flex absolute -left-16 top-1/2 -translate-y-1/2 z-10
                   w-14 h-14 rounded-full bg-white shadow-xl
                   items-center justify-center text-3xl hover:bg-green-50 transition-colors"
            >
              ‹
            </button>

            {/* SCROLL AREA */}
            <div
              ref={scrollRef}
              className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar pb-8"
            >
              {videos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => {
                    setActiveVideo(video);
                    setOpenVideo(true);
                  }}
                  className="relative w-full lg:w-[calc(50%-16px)] relative w-full aspect-video md:h-[400px]
        rounded-2xl overflow-hidden shrink-0 shadow-lg snap-center
        cursor-pointer"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group">
                    <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:scale-110 transition-transform">
                      <span className="text-white text-4xl ml-1">▶</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {openVideo && activeVideo && (
              <div
                className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
                onClick={() => setOpenVideo(false)}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-[90%] max-w-5xl aspect-video bg-black rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenVideo(false)}
                    className="absolute top-3 right-3 text-white text-xl z-10"
                  >
                    ✕
                  </button>

                  <iframe
                    src={getEmbedUrl(activeVideo.url)}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={activeVideo.title}
                  />
                </div>
              </div>
            )}


            {/* RIGHT BUTTON */}
            <button
              onClick={() => scroll("right")}
              className="hidden lg:flex absolute -right-16 top-1/2 -translate-y-1/2 z-10
                   w-14 h-14 rounded-full bg-white shadow-xl
                   items-center justify-center text-3xl hover:bg-green-50 transition-colors"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      <section
        className=" bg-cover bg-top flex items-start justify-center py-20 px-4"
        style={{
          backgroundImage: "url('/images/faq.png')",
        }}
      >
        <div className="w-full max-w-3xl mt-[15%] mb-10">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-20">
            Frequently Asked{" "}
            <span className="text-[#8FAE5D]">Questions</span>
          </h2>

          {/* FAQ List */}
          <div className="space-y-6 ">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="border-b border-gray-300 pb-4"
                >
                  <button
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className={`w-full flex items-center justify-between text-left font-medium text-lg ${isOpen ? "text-[#8FAE5D]" : "text-gray-900"
                      }`}
                  >
                    {faq.question}
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>

                  {isOpen && (
                    <p className="mt-3 text-gray-600 text-sm leading-relaxed max-w-xl">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
