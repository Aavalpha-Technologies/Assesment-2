namespace Payments.Domain
{
    // Decide card type based on the first digit of the card number
    public class CalculateDiscount
    {
        public static CardType GetCardType(string cardNumber)
        {
            if (string.IsNullOrWhiteSpace(cardNumber))
                return CardType.Visa;

            if (cardNumber.StartsWith("4"))
                return CardType.Visa;

            if (cardNumber.StartsWith("5"))
                return CardType.MasterCard;

            if (cardNumber.StartsWith("6"))
                return CardType.RuPay;

            return CardType.Visa;
        }

        // Apply simple discount rules based on card type
        public static (bool DiscountApplied, decimal FinalAmount) Calculate(
            CardType cardType,
            decimal amount)
        {
            decimal discountPercentage = 0;

            switch (cardType)
            {
                case CardType.MasterCard:
                    discountPercentage = 0.05m; // 5%
                    break;

                case CardType.RuPay:
                    discountPercentage = 0.10m; // 10%
                    break;

                case CardType.Visa:
                default:
                    discountPercentage = 0;
                    break;
            }

            var discountAmount = amount * discountPercentage;
            var finalAmount = amount - discountAmount;

            return (discountPercentage > 0, finalAmount);
        }
    }
}
