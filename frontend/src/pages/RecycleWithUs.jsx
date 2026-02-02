import { useState } from "react";

export default function DropOffLocations() {
  const [openCity, setOpenCity] = useState("abuja");

  const locations = {
  abuja: [
    {
      area: "Zuba",
      address: "New garage, dankogi, Zuba",
      phone: "08105910930",
    },
    {
      area: "Nyanya",
      address: "After Nyanya overhead bridge, Nyanya",
      phone: "080376982160",
    },
    {
      area: "Bwari",
      address: "Living faith road, Bwari",
      phone: "08165498261",
    },
        {
      area: "Gwagwalada",
      address:
        "Phase 3, off waterboard, Beside the dump site.",
      phone: "08068993112",
    },
    {
      area: "Gwagwalada 2",
      address: "Sdp junction, Gwagwalada",
      phone: "08189724806",
    },
    {
      area: "Jikwoyi",
      address: "Near phase ii market, Jikwoyi phase ii",
      phone: "08095615451",
    },
    {
      area: "Giri",
      address: "Giri junction",
      phone: "08089948627",
    },
    {
      area: "Utako",
      address: "OPP. NNPC CLINIC UTAKO BESIDE UTAKO MARKET",
      phone: "08096009920",
    },
    {
      area: "Area 1",
      address:
        "OPP. ZOOLOGICAL GARDEN, OPP AREA 1 SHOPPING PLAZA",
      phone: "08171332124",
    },
    {
      area: "Banex 1",
      address: "CAR PARK, BEHIND CONOIL FILLING STATION",
      phone: "07083517907",
    },
    {
      area: "Banex 2",
      address:
        "OPP. BANEX PLAZA, BESIDE FEDERATION OF MUSLIM WOMEN ASSOCIATION OF NIG.",
      phone: "08138191530",
    },
    {
      area: "Garki",
      address: "Opposite Entrance of old Garki Market",
      phone: "08136210324",
    },
    {
      area: "Gwarimpa",
      address:
        "Opposite St. Matthew ang. Church, off 1st avenue",
      phone: "08123834941",
    },
    {
      area: "Kubwa",
      address: "Kubwa express, near phase 3 road, Kubwa",
      phone: "08133950304",
    },
    {
      area: "Lugbe",
      address: "BERGER YARD, LUGBE",
      phone: "09085078345",
    },
    {
      area: "Kuje",
      address: "Kuje stadium gate",
      phone: "07059744483",
    },
  ],
    lagos: [
    {
      area: "Coming Soon",
      address: "Lagos drop-off locations coming soon",
      phone: "",
    },

    ],
  };

  const renderLocations = (city) => (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out
        ${openCity === city ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"}
      `}
    >
      <div className="bg-white space-y-6 px-6 pb-6">
        {locations[city].length > 0 ? (
          locations[city].map((loc, index) => (
            <div
              key={index}
              className="bg-[#F0F9E3] rounded-md p-5"
            >
              <h4 className="font-semibold mb-1">{loc.area}</h4>
              <p className="text-sm text-gray-700">{loc.address}</p>
              <p className="text-sm text-gray-700">{loc.phone}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-600">
            {city} drop-off locations coming soon.
          </p>
        )}
      </div>
    </div>
  );

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-sm mb-2">
          Recycle with{" "}
          <span className="text-[#7BA717] font-medium">Chanja Datti</span>
        </p>

        <h2 className="text-2xl sm:text-3xl font-semibold mb-8">
          Drop off Locations
        </h2>

        <div className="space-y-4">
          {/* Abuja */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() =>
                setOpenCity(openCity === "abuja" ? null : "abuja")
              }
              className="w-full flex justify-between items-center px-6 py-4 font-semibold text-left"
            >
              Abuja
              <span
                className={`transition-transform duration-300 ${
                  openCity === "abuja" ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            {renderLocations("abuja")}
          </div>

          {/* Lagos */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() =>
                setOpenCity(openCity === "lagos" ? null : "lagos")
              }
              className="w-full flex justify-between items-center px-6 py-4 font-semibold text-left"
            >
              Lagos
              <span
                className={`transition-transform duration-300 ${
                  openCity === "lagos" ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            {renderLocations("lagos")}
          </div>
        </div>
      </div>
    </section>
  );
}
