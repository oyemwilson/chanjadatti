import { Slab } from "react-loading-indicators";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <Slab
        color="#7BA717"      // your brand green
        size="medium"
        text=""
        textColor="#7BA717"
      />
    </div>
  );
}
