
import Event from "@/components/event-details";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Event Details || EasyPass',
  description:
    'EasyPass - Ticket booking made easy.',
}

const EventDetails = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Event />
    </>
  );
};

export default EventDetails
