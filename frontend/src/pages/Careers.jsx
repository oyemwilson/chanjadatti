export default function Careers() {
  return (
    <section className="w-full bg-white">
      {/* Image Header */}
      <div className="relative w-full h-[220px] sm:h-[300px] md:h-[600px]">
        <img
          src="/images/careers.webp" // replace with your image path
          alt="Chanja Datti Team"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold">
            Careers
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          Join the <span className="gradient-text">Chanja Datti</span> Team!
        </h2>

        <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
          <p>Do you want to volunteer to Save the Environment?</p>
          <p>Do you wish to contribute to the mitigation of Climate Change?</p>
          <p>
            Are you interested in working towards the attainment of the
            Sustainable Development Goals?
          </p>

          <p>
            Chanja Datti is a fast growing green social enterprise located in
            Abuja is looking for persons to volunteer from all walks of life,
            different ages, diverse backgrounds, cultures and skill-sets but
            with a common interest to salvage and protect the planet.
          </p>

          <p>
            We want to be very unique and different to ensure that we are a
            community-based grassroots green company, and that is why we are
            looking for persons who are not only willing to turn a blind eye to
            the myriad of Nigeria’s environmental challenges but are ready to
            join a community of people that are making painstaking and
            concerted efforts towards a sustainable future.
          </p>
        </div>

        {/* Roles */}
        <div className="mt-6">
          <p className="font-medium mb-2">
            You can volunteer in any or more of the following roles:
          </p>

          <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm sm:text-base">
            <li>Waste Ambassadors</li>
            <li>Campaign assistants</li>
            <li>Research assistants</li>
            <li>Freelance writers</li>
            <li>IT skill providers (Graphics/Web developer)</li>
            <li>Social Media promoters</li>
            <li>Independent Marketers</li>
          </ul>
        </div>

        {/* Footer Text */}
        <p className="mt-6 text-gray-700 text-sm sm:text-base leading-relaxed">
          Work schedule is very flexible. Volunteers will make a difference for
          the environment and get reference letters after a period of
          satisfactory commitment, as well as get on the job training and
          experience which can be helpful for future endeavors.
        </p>

        <p className="mt-4 font-medium text-gray-800">
          Looking forward to welcoming you as our green ambassadors!
        </p>

        {/* CTA */}
        <div className="mt-8">
          <button className="bg-[#7BA717] hover:bg-[#6a8f13] transition text-white px-8 py-3 rounded-full font-medium">
            Join the Team
          </button>
        </div>
      </div>
    </section>
  );
}
