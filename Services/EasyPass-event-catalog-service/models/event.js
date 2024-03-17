class Event {
    constructor(
        eventName,
        description,
        startDate,
        endDate,
        location,
        organizer,
        eventType,
        organizerName,
        postedDate,
        // Add more properties if needed
    ) {
        // Validation for eventName: Should be a non-empty string
        if (typeof eventName !== "string" || eventName.trim() === "") {
            throw new Error("Event name must be a non-empty string.");
        }
        // Other validations for properties can be added as needed
        this.eventName = eventName;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.location = location;
        this.organizer = organizer;
        this.eventType = eventType;
        this.organizerName = organizerName;
        this.postedDate = postedDate;
        // Initialize more properties as needed
    }
}

module.exports = Event;