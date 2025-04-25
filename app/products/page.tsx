import EventComponent from "@/components/events/event.component";

const EventsPage = () => {
  return (
    <div className="h-screen ">
      <div className="align-element mt-28">
        <div className="text-5xl flex justify-start mb-10">
          <h1 className="font-semibold">Featured Products</h1>
        </div>
        <div>
          <EventComponent />
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
