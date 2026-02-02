import { useEffect, useState } from "react";
import api from "../utils/axiosConfig";

export default function Campaigns() {
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    api.get("/api/campaigns/active").then(res =>
      setCampaign(res.data)
    );
  }, []);

  if (!campaign) return null;

  return (
    <>
      {/* HERO */}
      <section
        className="relative h-[520px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${campaign.heroImage})` }}
      >
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Text */}
        <h1 className="relative z-10 text-white text-5xl font-bold text-center px-6 max-w-4xl">
          {campaign.heroOverlayText}
        </h1>
      </section>


      {/* CONTENT */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: campaign.content }}
        />
      </section>

      {/* GALLERY */}
      <section className="max-w-6xl mx-auto pb-16 px-4">
        <h2 className="text-2xl font-semibold mb-6">
          Slide show of Our Beneficiaries
        </h2>

        <div className="flex gap-6 overflow-x-auto">
          {campaign.gallery.map((img, i) => (
            <img
              key={i}
              src={img}
              className="h-56 w-80 object-cover rounded-lg"
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="flex justify-center pb-20">
        <a
          href={campaign.ctaLink}
          className="bg-[#7BA717] text-white px-10 py-4 rounded-full text-lg"
        >
          {campaign.ctaText}
        </a>
      </div>
    </>
  );
}
