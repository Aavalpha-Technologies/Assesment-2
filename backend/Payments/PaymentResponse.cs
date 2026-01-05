namespace Payments
{
    public class PaymentResponse
    {
        public decimal TotalAmount { get; set; }
        public string CardType { get; set; }
        public int DiscountPercent { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal FinalPayableAmount { get; set; }
        public string Message { get; set; }
    }
}
