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

            // Default card type must be RuPay
            return CardType.RuPay;
        }

        public static (decimal DiscountAmount, decimal FinalAmount)
            Calculate(CardType cardType, decimal amount)
        {
            decimal discountAmount = 0;

            switch (cardType)
            {
                case CardType.MasterCard:
                    discountAmount = amount * 0.05m;
                    break;

                case CardType.RuPay:
                    discountAmount = amount * 0.10m;
                    break;

                case CardType.Visa:
                default:
                    discountAmount = 0;
                    break;
            }

            decimal finalAmount = amount - discountAmount;
            return (discountAmount, finalAmount);
        }
    }
}
