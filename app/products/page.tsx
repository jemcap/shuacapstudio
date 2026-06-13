import EventComponent from "@/components/events/event.component";

const EventsPage = () => {
  return (
    <div className="w-full">
      <section className="w-full px-8 pt-36">
        <h1 className="text-black text-4xl lg:text-7xl tracking-tight leading-none">
          Products
        </h1>
      </section>
      <section className="w-full px-8">
        <EventComponent />
      </section>
    </div>
  );
};

export default EventsPage;
