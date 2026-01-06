namespace Payments
{
    public class PaymentResponse
    {
        public string CardTypeName { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public bool DiscountApplied { get; set; }
        public decimal Amount { get; set; } // Final payable amount
    }
}
