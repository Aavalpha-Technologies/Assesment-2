namespace Payments
{
    public class PaymentResponse
    {
        public string CardType { get; set; }
        public bool DiscountApplied { get; set; }
        public decimal OriginalAmount { get; set; }
        public decimal FinalAmount { get; set; }
    }
}
