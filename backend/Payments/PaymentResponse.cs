namespace Payments
{
    public class PaymentResponse
    {
        public string CardType { get; set; }
        public decimal OriginalAmount { get; set; }
        public decimal DiscountPercentage { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal FinalAmount { get; set; }
    }
}
