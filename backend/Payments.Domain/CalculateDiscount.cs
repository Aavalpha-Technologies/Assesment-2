using System;

namespace Payments.Domain
{
    public class CalculateDiscount
    {
        // STEP 1: Detect Card Type
        public static CardType GetCardType(string cardNumber)
        {
            if (string.IsNullOrWhiteSpace(cardNumber))
                throw new ArgumentException("Card number is required.");

            // Business rules given in assessment
            if (cardNumber.StartsWith("4"))
                return CardType.Visa;

            if (cardNumber.StartsWith("5"))
                return CardType.MasterCard;

            if (cardNumber.StartsWith("6"))
                return CardType.RuPay;

            // Default must be RuPay
            return CardType.RuPay;
        }

        // STEP 2: Calculate Discount and Final Amount
        public static (bool DiscountApplied, decimal FinalAmount, decimal DiscountAmount) Calculate(CardType cardType, decimal amount)
        {
            if (amount <= 0)
                throw new ArgumentException("Amount must be greater than zero.");

            decimal discountRate = cardType switch
            {
                CardType.Visa => 0m,        // 0%
                CardType.MasterCard => 0.05m, // 5%
                CardType.RuPay => 0.10m,     // 10%
                _ => 0.10m                  // Default to RuPay
            };

            var discountAmount = amount * discountRate;
            var finalAmount = amount - discountAmount;

            bool discountApplied = discountAmount > 0;

            return (discountApplied, finalAmount, discountAmount);
        }
    }
}
