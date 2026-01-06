namespace Payments
{
    public class PaymentResponse
    {
        public string CardType { get; set; } = string.Empty;

        public decimal OriginalAmount { get; set; }

        public decimal DiscountApplied { get; set; }

        public decimal FinalAmount { get; set; }
    }
}
