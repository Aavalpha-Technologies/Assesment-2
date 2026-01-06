using Payments.Domain;

namespace Payments
{
    public class PaymentRequest
    {
        public decimal Amount { get; set; }
        public required CardDetails CardDetails { get; set; }
    }

    public class CardDetails
    {
        public required string CardNumber { get; set; }
        public required string Expiry { get; set; }
        public required string CVV { get; set; }
    }
}