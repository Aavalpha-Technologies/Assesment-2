using System;

namespace Payments.Domain
{
    public class CalculateDiscount
    {
        public static CardType GetCardType(string cardNumber)
        {
            if (string.IsNullOrWhiteSpace(cardNumber))
                return CardType.RuPay; // default

            if (cardNumber.StartsWith("4"))
                return CardType.Visa;

            if (cardNumber.StartsWith("5"))
                return CardType.MasterCard;

            if (cardNumber.StartsWith("6"))
                return CardType.RuPay;

            // Default MUST be RuPay as per requirement
            return CardType.RuPay;
        }

        public static (bool DiscountApplied, decimal FinalAmount) Calculate(
            CardType cardType,
            decimal amount)
        {
            if (amount <= 0)
                return (false, amount);

            decimal discountRate = cardType switch
            {
                CardType.Visa => 0.00m,
                CardType.MasterCard => 0.05m,
                CardType.RuPay => 0.10m,
                _ => 0.10m
            };

            var discountAmount = amount * discountRate;
            var finalAmount = amount - discountAmount;

            return (discountRate > 0, finalAmount);
        }
    }
}

