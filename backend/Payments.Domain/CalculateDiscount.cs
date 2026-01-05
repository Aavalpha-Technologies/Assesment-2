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

            return CardType.RuPay; // Default return CardType.RuPay;
        }

        public static (bool DiscountApplied, decimal FinalAmount) Calculate(CardType cardType, decimal amount)
        {
            decimal discountPercentage = 0;

            switch (cardType) 
            {
                case CardType.MasterCard:
                    discountPercentage = 5;
                    break;
                case CardType.RuPay:
                    discountPercentage = 10;
                    break;
                case CardType.Visa:
                default:
                    discountPercentage = 0;
                    break;
            }

            var discountAmount = amount * discountPercentage / 100;
            var finalAmount = amount - discountAmount

            return (discountPercentage > 0, finalAmount);
        }
    }
}
