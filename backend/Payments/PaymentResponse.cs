namespace Payments
{
    public class PaymentResponse
    {
        public decimal TotalAmount { get; set; }
        public bool DiscountApplied { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal FinalAmount { get; set; }
        public string CardType { get; set; } = string.Empty;
    }
}
