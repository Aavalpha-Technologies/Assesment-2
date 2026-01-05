namespace Payments.Domain
{
    public static class CardTypeDetector
    {
        public static CardType Detect(string cardNumber)
        {
            if (cardNumber.StartsWith("4")) return CardType.Visa;
            if (cardNumber.StartsWith("5")) return CardType.MasterCard;
            if (cardNumber.StartsWith("6")) return CardType.RuPay;

            return CardType.RuPay; // default
        }
    }
}
