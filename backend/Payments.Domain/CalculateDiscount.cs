using System;

namespace Payments.Domain
{
    public class CalculateDiscount
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

        public static (bool DiscountApplied, decimal FinalAmount) Calculate(CardType cardType, decimal amount)
        {

            decimal discountPercentage = 0;

            switch (cardType)
            {
                case CardType.Visa:
                    discountPercentage = 0;
                    break;

                case CardType.MasterCard:
                    discountPercentage = 5;
                    break;

                case CardType.RuPay:
                    discountPercentage = 10;
                    break;
            }

            decimal discountAmount = amount * discountPercentage / 100;
            decimal finalAmount = amount - discountAmount;

            bool discountApplied = discountPercentage > 0;

            return (discountApplied, finalAmount);
        }
    }
}
