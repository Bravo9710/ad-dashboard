import LiveEventFeed from "@/components/LiveEventFeed";

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

      <section className=" container mx-auto my-7">
        <LiveEventFeed
          events={[
            {
              id: 1,
              type: "Click",
              timestamp: new Date(),
              campaignName: "Campaign 1",
            },
            {
              id: 2,
              type: "Conversion",
              timestamp: new Date(),
              campaignName: "Campaign 2",
            },
            {
              id: 3,
              type: "Fraud Alert",
              timestamp: new Date(),
              campaignName: "Campaign 3",
            },
            {
              id: 4,
              type: "Click",
              timestamp: new Date(),
              campaignName: "Campaign 4",
            },
          ]}
        />
      </section>
    </main>
  );
}
