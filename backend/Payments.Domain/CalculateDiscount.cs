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

            // Default must be RuPay
            return CardType.RuPay;
        }

        //Discount calculation logic
        public static (bool DiscountApplied, decimal FinalAmount) Calculate(
            CardType cardType,
            decimal amount
        )
        {
            decimal finalAmount = amount;
            bool discountApplied = false;

            switch (cardType)
            {
                case CardType.Visa:
                    // 0% 
                    finalAmount = amount;
                    discountApplied = false;
                    break;

                case CardType.MasterCard:
                    // 5% discount
                    finalAmount = amount * 0.95m;
                    discountApplied = true;
                    break;

                case CardType.RuPay:
                    
                    finalAmount = amount * 0.90m;
                    discountApplied = true;
                    break;
            }

            return (discountApplied, finalAmount);
        }
    }
}