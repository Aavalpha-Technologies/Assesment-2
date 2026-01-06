namespace Payments
{
    public class PaymentResponse
    {
        public decimal OriginalAmount { get; set; }
        public string CardType { get; set; }
        public decimal DiscountPercentage { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal FinalAmount { get; set; }
        public bool DiscountApplied { get; set; }
    }
}