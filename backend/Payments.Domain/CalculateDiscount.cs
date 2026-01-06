using System;

namespace Payments.Domain
{
    public class CalculateDiscount
    {
        public static CardType GetCardType(string cardNumber)
        {
            if (string.IsNullOrWhiteSpace(cardNumber)) return CardType.RuPay;
            cardNumber = cardNumber.Trim();

            if (cardNumber.StartsWith("4")) return CardType.Visa;
            if (cardNumber.StartsWith("5")) return CardType.MasterCard;
            if (cardNumber.StartsWith("6")) return CardType.RuPay;

            return CardType.RuPay;
        }

        // Returns: (DiscountPercentage, DiscountAmount, FinalAmount)
        public static (decimal DiscountPercentage, decimal DiscountAmount, decimal FinalAmount) Calculate(CardType cardType, decimal amount)
        {
            decimal discountPct = 0m;

            switch (cardType)
            {
                case CardType.Visa:
                    discountPct = 0m;
                    break;
                case CardType.MasterCard:
                    discountPct = 5m;
                    break;
                case CardType.RuPay:
                default:
                    discountPct = 10m;
                    break;
            }

            var discountAmount = Math.Round(amount * (discountPct / 100m), 2);
            var finalAmount = Math.Round(amount - discountAmount, 2);

            return (discountPct, discountAmount, finalAmount);
        }
    }
}
