import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/axiosConfig";

export default function CampaignDetail() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const { data } = await api.get(`/api/campaigns/${id}`);
        setCampaign(data);
      } catch (err) {
        console.error("Failed to load campaign");
      }
    };

    fetchCampaign();
  }, [id]);

  if (!campaign) {
    return <div className="py-20 text-center">Loading campaign…</div>;
  }

  return (
    <div>
      {/* Hero */}
      <section
        className="relative h-[420px] bg-cover bg-center flex items-center justify-center"
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
    </div>
  );
}
