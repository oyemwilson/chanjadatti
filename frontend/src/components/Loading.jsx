export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      
      {/* Loader Wrapper */}
      <div className="relative flex items-center justify-center">

        {/* Outer Ring */}
        <div className="
          w-24 h-24
          rounded-full
          border-4 border-[#7BA717]/30
          animate-spin
        " />

        {/* Inner Pulse Circle */}
        <div className="
          absolute
          w-12 h-12
          bg-[#7BA717]
          rounded-full
          animate-pulse
          shadow-lg
        " />

      </div>

    </div>
  );
}
