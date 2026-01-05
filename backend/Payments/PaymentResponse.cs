namespace Payments
{
    public class PaymentResponse
    {
        public string CardType { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal FinalAmount { get; set; }
    }
}