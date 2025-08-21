import { GlassmorphicNav } from "@/components/nav-bar";

export default function Home() {
  return (
    <div>
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "fixed",
          right: 0,
          bottom: 0,
          minWidth: "100%",
          minHeight: "100%",
          zIndex: -1,
          objectFit: "cover",
        }}
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>
      <GlassmorphicNav />
    </div>
  );
}
