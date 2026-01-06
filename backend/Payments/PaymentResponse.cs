namespace Payments
{
    public class PaymentResponse
    {
        // public bool DiscountApplied { get; set; }
        // public decimal Amount { get; set; }
        public decimal OriginalAmount{get; set;}
        public string CardType{get; set;}
        public bool DiscountApplied{get; set;}
        public decimal DiscountAmount{get; set;}
        public decimal FinalAmount{get; set;}
    }
}