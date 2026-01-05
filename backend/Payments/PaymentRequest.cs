using Payments.Domain;

namespace Payments
{
    public class PaymentRequest
    {
        public decimal Amount { get; set; }
        public CardDetails CardDetails { get; set; }=new CardDetails();
    }

    public class CardDetails
    {
        public string CardNumber { get; set; } = string.Empty;
        public string Expiry { get; set; }=string.Empty;
        public string CVV { get; set; }=string.Empty;
        
    }
}