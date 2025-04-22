import EventComponent from "@/components/events/event.component";

const EventsPage = () => {
  return (
    <div className="h-screen ">
      <div className="align-element">
        <div className="text-3xl font-bold flex justify-center items-center my-10">
          <h1>Featured Products</h1>
        </div>
        <div>
          <EventComponent />
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
