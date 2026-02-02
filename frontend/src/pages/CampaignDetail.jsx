import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/axiosConfig";
import Loading from "../components/Loading";

export default function CampaignDetail() {
  const { id } = useParams();

  const [campaign, setCampaign] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const { data } = await api.get(`/api/campaigns/${id}`);
        setCampaign(data);
      } catch (err) {
        console.error("Failed to load campaign");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  /* ⭐ LOADING FIRST */
  if (loading) return <Loading />;

  /* ⭐ SAFETY */
  if (!campaign) {
    return (
      <div className="py-20 text-center">
        Campaign not found
      </div>
    );
  }

  /* ⭐ NORMAL PAGE RENDER BELOW */



  return (
    <div>
      {/* Hero */}
      <section
        className="relative h-[520px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${campaign.heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <h1 className="relative z-10 text-white text-5xl font-bold text-center px-6">
          {campaign.heroOverlayText}
        </h1>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">{campaign.title}</h2>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: campaign.content }}
        />
      </div>
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
              onClick={() => setSelectedImage(img)}
              className="
          h-60 w-80 object-cover rounded-lg
          cursor-pointer
          transition
          duration-300
          hover:scale-105
        "
            />
          ))}
        </div>

        {/* ⭐ IMAGE MODAL */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            className="
        fixed inset-0
        bg-black/80
        flex items-center justify-center
        z-50
        p-6
      "
          >
            <img
              src={selectedImage}
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-xl"
            />
          </div>
        )}
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
    </div>
  );
}
