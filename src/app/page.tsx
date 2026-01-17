import LiveEventFeed from "@/components/LiveEventFeed";
import CampaignTable from "@/components/CampaingTable";

export default function Home() {
  return (
    <main className="">
      <nav className="nav py-3 border-b bg-white border-b-amber-900 shadow">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-amber-900">
            Ad-Pulse Dashboard
          </h1>
        </div>
      </nav>

      <section className=" container mx-auto my-7 flex flex-col gap-8">
        <LiveEventFeed />
        <CampaignTable />
      </section>
    </main>
  );
}
