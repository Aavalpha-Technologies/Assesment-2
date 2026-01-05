namespace Payments.Domain
{
    public class CalculateDiscount
    {
        public static string GetCardType(string cardNumber)
        {
            if (string.IsNullOrWhiteSpace(cardNumber))
                return "RuPay";

            if (cardNumber.StartsWith('4'))
                return "Visa";

            if (cardNumber.StartsWith('5'))
                return "MasterCard";

            if (cardNumber.StartsWith('6'))
                return "RuPay";

            return "RuPay";   // Default always RuPay
        }

        public static int GetDiscount(string cardType)
        {
            return cardType switch
            {
                "Visa" => 0,
                "MasterCard" => 5,
                "RuPay" => 10,
                _ => 10
            };
        }
    }
}
