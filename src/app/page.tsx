function Header() {
  return (
    <header className="fixed top-2 left-100 right-100 pt-2 pb-2 rounded-[10px] z-10 backdrop-blur-[1px] backdrop-brightness-75 bg-white/30">
      <h1 className="text-[16px] font-normal">Your Title</h1>
    </header>
  );
}

export default function Home() {
  return (
    <div
      style={{
        backgroundImage:
          "url('https://www.baltana.com/files/wallpapers-16/Abstract-Digital-Art-Best-4K-Wallpaper-41512.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <Header />
    </div>
  );
}
