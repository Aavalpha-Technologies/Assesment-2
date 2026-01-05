using Microsoft.AspNetCore.Mvc;
using Payments;
using Payments.Domain;

namespace Payments.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentsController : ControllerBase
    {
        [HttpPost("Pay")] // This appends /Pay to the controller route.
        public IActionResult Pay([FromBody] PaymentRequest request)
        {
            if (request == null || request.CardDetails == null)
                return BadRequest("Invalid payment request");

            if (request.Amount <= 0)
                return BadRequest("Amount must be greater than zero");

            var cardNumber = request.CardDetails.CardNumber;
            var cardType = CalculateDiscount.GetCardType(cardNumber);

            decimal discountPercentage = cardType switch
            {
                CardType.MasterCard => 5,
                CardType.RuPay => 10,
                _ => 0
            };

            var discountAmount = request.Amount * discountPercentage / 100;
            var finalAmount = request.Amount - discountAmount;

            var response = new PaymentResponse
            {
                CardType = cardType.ToString(),
                TotalAmount = request.Amount,
                DiscountAmount = discountAmount,
                FinalAmount = finalAmount
            };

            return Ok(response);
        }
    }
}