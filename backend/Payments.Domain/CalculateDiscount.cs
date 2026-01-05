using System;

namespace Payments.Domain
{
    public class CalculateDiscount
    {
        // Detect card type based on first digit
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

            // Default to RuPay if unknown
            return CardType.RuPay;
        }

        // Calculate discount based on card type
        public static (bool DiscountApplied, decimal FinalAmount) Calculate(CardType cardType, decimal amount)
        {
            decimal discountPercentage = cardType switch
            {
                CardType.Visa => 0m,          // 0%
                CardType.MasterCard => 0.05m, // 5%
                CardType.RuPay => 0.10m,      // 10%
                _ => 0m
            };

            decimal discountAmount = amount * discountPercentage;
            decimal finalAmount = amount - discountAmount;

            return (discountAmount > 0, finalAmount);
        }
    }
}
