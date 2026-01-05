using Payments.Domain;

namespace Payments.Domain.Services
{
    public static class DiscountService
    {
        public static decimal GetDiscountPercentage(CardType type)
        {
            return type switch
            {
                CardType.Visa => 0m,
                CardType.MasterCard => 0.05m,
                CardType.RuPay => 0.10m,
                _ => 0.10m
            };
        }
    }
}
