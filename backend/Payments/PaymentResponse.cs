namespace Payments
{
    public class PaymentResponse
    {
        public decimal OriginalAmount { get; set; }
        public string CardType { get; set; }
        public bool DiscountApplied { get; set; }
        public decimal FinalAmount { get; set; }
    }
}
