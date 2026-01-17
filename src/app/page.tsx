import LiveEventFeed from "@/components/LiveEventFeed";
import CampaignTable from "@/components/CampaingTable";
import StatsLayout from "@/components/StatsLayout";

export default function Home() {
  return (
    <main className="">
      <nav className="nav py-3 border-b bg-white border-b-amber-900 shadow px-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-amber-900">
            Ad-Pulse Dashboard
          </h1>
        </div>
      </nav>

      <section className="container mx-auto m-4 flex flex-col gap-8 px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-4">
          <div></div>
          <LiveEventFeed />
        </div>
        <StatsLayout />
        <CampaignTable />
      </section>
    </main>
  );
}
