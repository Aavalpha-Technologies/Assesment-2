namespace Payments
{
    public class PaymentRequest
    {
        public decimal Amount { get; set; }
        
        // "required" keyword fixes the CS8618 warnings
        public required string CardNumber { get; set; }
        public required string Expiry { get; set; }
        public required string CVV { get; set; }
    }
}