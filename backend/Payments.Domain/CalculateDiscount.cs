namespace Payments.Domain
{
    public static class CalculateDiscount
    {
        public static CardType GetCardType(string cardNumber)
        {
            if (cardNumber.StartsWith("4"))
                return CardType.Visa;

            if (cardNumber.StartsWith("5"))
                return CardType.MasterCard;

            if (cardNumber.StartsWith("6"))
                return CardType.RuPay;

        
            return CardType.RuPay;
        }

        public static (decimal discountAmount, decimal finalAmount)
            Calculate(CardType cardType, decimal amount)
        {
            decimal discountPercentage = cardType switch
            {
                CardType.Visa => 0,
                CardType.MasterCard => 5,
                CardType.RuPay => 10,
                _ => 10
            };

            decimal discountAmount = amount * discountPercentage / 100;
            decimal finalAmount = amount - discountAmount;

            return (discountAmount, finalAmount);
        }
    }
}
