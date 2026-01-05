namespace Payments
{
    public class PaymentRequest
    {
        public decimal Amount { get; set; }
        
        // Added 'required' to silence warnings
        public required string CardNumber { get; set; }
        public required string Expiry { get; set; }
        public required string CVV { get; set; }
    }
}