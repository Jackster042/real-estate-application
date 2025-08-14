import Navbar from "@/components/shared/Navbar";
import LandingPage from "./(nonedashboard)/landing/page";
import { NAVBAR_HEIGHT } from "@/lib/constants";

export default function Home() {
  return (
    <div className="h-full w-full">
      <Navbar />
      <main
        className={"flex flex-col w-full h-full"}
        style={{ height: `${NAVBAR_HEIGHT}px` }}
      >
        <LandingPage />
      </main>
    </div>
  );
}
