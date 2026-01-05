using Payments.Domain;

namespace Payments
{
    public class PaymentRequest
    {
        public decimal Amount { get; set; }
        public CardDetails CardDetails { get; set; }
    }

    public class CardDetails
    {
        public string CardNumber { get; set; }
        public string Expiry { get; set; }
        public string CVV { get; set; }
    }
}