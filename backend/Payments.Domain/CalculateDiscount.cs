using System;

namespace Payments.Domain
{
    public class CalculateDiscount
    {
        public static CardType GetCardType(string cardNumber)
        {
            if (string.IsNullOrWhiteSpace(cardNumber))
            {
                return CardType.RuPay;
            }

            // Remove spaces and get first digit
            var cleaned = cardNumber.Trim().Replace(" ", "");
            if (cleaned.Length == 0)
            {
                return CardType.RuPay;
            }

            var firstDigit = cleaned[0];
            
            if (firstDigit == '4')
            {
                return CardType.Visa;
            }
            if (firstDigit == '5')
            {
                return CardType.MasterCard;
            }
            if (firstDigit == '6')
            {
                return CardType.RuPay;
            }

            // Default card type must be RuPay
            return CardType.RuPay;
        }

        public static (bool DiscountApplied, decimal DiscountPercentage, decimal DiscountAmount, decimal FinalAmount) Calculate(CardType cardType, decimal amount)
        {
            decimal discountPercentage = 0m;

            switch (cardType)
            {
                case CardType.Visa:
                    discountPercentage = 0m; // 0%
                    break;
                case CardType.MasterCard:
                    discountPercentage = 5m; // 5%
                    break;
                case CardType.RuPay:
                    discountPercentage = 10m; // 10%
                    break;
            }

            var discountAmount = amount * (discountPercentage / 100m);
            var finalAmount = amount - discountAmount;
            var discountApplied = discountPercentage > 0m;

            return (discountApplied, discountPercentage, discountAmount, finalAmount);
        }
    }
}
