using System;

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
            decimal discountPercentage = 0;

            if (cardType == CardType.MasterCard)
                discountPercentage = 0.05m;
            else if (cardType == CardType.RuPay)
                discountPercentage = 0.10m;

            var finalAmount = amount - (amount * discountPercentage);

            return (discountPercentage > 0, finalAmount);
        }
    }
}
