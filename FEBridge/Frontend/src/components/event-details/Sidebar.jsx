import ContactWithAgent from "../common/agent-view/ContactWithAgent";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar_listing_list">
        <div className="sidebar_advanced_search_widget">
          <div className="sl_creator">
            <h4 className="mb25">Buy Tickets</h4>
          </div>
          <ContactWithAgent />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
