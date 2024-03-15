class Ticket {
    constructor(
        eventId,
        type,
        price,
        quantity,
        soldQuantity,
    ) {
        // Validation for eventId: Should be a non-empty string
        if (typeof eventId !== "string" || eventId.trim() === "") {
            throw new Error("Event ID must be a non-empty string.");
        }

        // Validation for type: Should be a non-empty string
        if (typeof type !== "string" || type.trim() === "") {
            throw new Error("Ticket type must be a non-empty string.");
        }

        // Validation for price: Should be a positive number
        if (typeof price !== "number" || price <= 0) {
            throw new Error("Ticket price must be a positive number.");
        }

        // Validation for quantity: Should be a positive integer
        if (typeof quantity !== "number" || quantity <= 0 || !Number.isInteger(quantity)) {
            throw new Error("Ticket quantity must be a positive integer.");
        }

        // Validation for soldQuantity: Should be a positive integer
        if (typeof soldQuantity !== "number" || soldQuantity <= 0 || !Number.isInteger(soldQuantity)) {
            throw new Error("Ticket quantity must be a positive integer.");
        }

        this.eventId = eventId;
        this.type = type;
        this.price = price;
        this.quantity = quantity;
        this.soldQuantity = soldQuantity;
    }
}

module.exports = Ticket;