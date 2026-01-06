namespace Payments.Domain
{
    public class CalculateDiscount
    {
        public static CardType GetCardType(string cardNumber)
        {
            if (string.IsNullOrWhiteSpace(cardNumber))
                return CardType.RuPay;

            if (cardNumber.StartsWith("4"))
                return CardType.Visa;

            if (cardNumber.StartsWith("5"))
                return CardType.MasterCard;

            if (cardNumber.StartsWith("6"))
                return CardType.RuPay;

            return CardType.RuPay;
        }

        public static (bool DiscountApplied, decimal FinalAmount) Calculate(CardType cardType, decimal amount)
        {
            decimal discountPercentage = cardType switch
            {
                CardType.Visa => 0m,
                CardType.MasterCard => 0.05m,
                CardType.RuPay => 0.10m,
                _ => 0m
            };

            decimal finalAmount = amount - (amount * discountPercentage);
            return (discountPercentage > 0, finalAmount);
        }
    }
}

