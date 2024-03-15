class TicketOrder {
    constructor(
        orderId,
        userId,
        eventId,
        tickets,
        totalPrice,
        paymentId,
        status
    ) {
        this.orderId = orderId;
        this.userId = userId;
        this.eventId = eventId;
        this.tickets = tickets; // Array of ticket objects
        this.totalPrice = totalPrice;
        this.paymentId = paymentId;
        this.status = status; // Possible values: 'pending', 'completed', 'cancelled'
    }
}

module.exports = TicketOrder;