class Event {
    constructor(
        eventName,
        description,
        startDate,
        endDate,
        location,
        organizer,
        capacity
    ) {
        if (typeof eventName !== "string" || eventName.trim() === "") {
            throw new Error("Event name must be a non-empty string.");
        }

        // Validation for startDate and endDate: Should be valid Date objects
        if (!(startDate instanceof Date) || isNaN(startDate.getTime())) {
            throw new Error("Start date must be a valid Date object.");
        }

        if (!(endDate instanceof Date) || isNaN(endDate.getTime())) {
            throw new Error("End date must be a valid Date object.");
        }

        // Validation for location: Should be a non-empty string
        if (typeof location !== "string" || location.trim() === "") {
            throw new Error("Event location must be a non-empty string.");
        }

        // Validation for organizer: Should be a non-empty string
        if (typeof organizer !== "string" || organizer.trim() === "") {
            throw new Error("Event organizer must be a non-empty string.");
        }

        // Validation for capacity: Should be a positive integer
        if (typeof capacity !== "number" || capacity <= 0 || !Number.isInteger(capacity)) {
            throw new Error("Event capacity must be a positive integer.");
        }

        // Description is optional, validate only if provided
        if (description && typeof description !== "string") {
            throw new Error("Event description must be a string.");
        }

        this.eventName = eventName;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.location = location;
        this.organizer = organizer;
        this.capacity = capacity;
    }
}

module.exports = Event;