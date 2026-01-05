namespace Payments
{
    public class PaymentResponse
    {
        public bool Result { get; set; }
        // Added 'required' to silence the warnings
        public required string Message { get; set; } 
        public decimal Amount { get; set; }
        public decimal FinalAmount { get; set; }
        public bool DiscountApplied { get; set; }
        // Added 'required' here too
        public required string CardType { get; set; } 
    }
}