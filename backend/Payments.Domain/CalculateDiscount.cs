using System;

namespace Payments.Domain
{
    public class CalculateDiscount
    {
        public static CardType GetCardType(string cardNumber)
        {
            if (string.IsNullOrEmpty(cardNumber)) return CardType.RuPay;

            if (cardNumber.StartsWith("4")) return CardType.Visa;
            if (cardNumber.StartsWith("5")) return CardType.MasterCard;
            if (cardNumber.StartsWith("6")) return CardType.RuPay;

            // Requirement: Default must be RuPay
            return CardType.RuPay;
        }

        public static (bool DiscountApplied, decimal FinalAmount) Calculate(CardType cardType, decimal amount)
        {
            decimal discountPercent = 0m;

            switch (cardType)
            {
                case CardType.Visa:
                    discountPercent = 0m; // 0%
                    break;
                case CardType.MasterCard:
                    discountPercent = 0.05m; // 5%
                    break;
                case CardType.RuPay:
                    discountPercent = 0.10m; // 10%
                    break;
            }

            decimal discountAmount = amount * discountPercent;
            decimal finalAmount = amount - discountAmount;
            bool isDiscounted = discountPercent > 0;

            return (isDiscounted, finalAmount);
        }
    }
}