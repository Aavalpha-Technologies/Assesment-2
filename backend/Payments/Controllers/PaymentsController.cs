using Microsoft.AspNetCore.Mvc;
using Payments;
using Payments.Domain;

namespace Payments.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentsController : ControllerBase
    {
        [HttpPost("Pay")]
        public IActionResult Pay([FromBody] PaymentRequest request)
        {
            if (request == null)
                return BadRequest(new { Message = "Request body is required." });

            if (request.Amount <= 0)
                return BadRequest(new { Message = "Amount must be greater than 0." });

            if (string.IsNullOrWhiteSpace(request.CardNumber))
                return BadRequest(new { Message = "CardNumber is required." });

            var cardNumber = request.CardNumber.Trim();
            if (cardNumber.Length < 6)
                return BadRequest(new { Message = "CardNumber is too short." });

            var cardType = CalculateDiscount.GetCardType(cardNumber);
            var (discountPercentage, discountAmount, finalAmount) = CalculateDiscount.Calculate(cardType, request.Amount);

            var response = new PaymentResponse
            {
                OriginalAmount = request.Amount,
                DiscountPercentage = discountPercentage,
                DiscountAmount = discountAmount,
                FinalAmount = finalAmount,
                CardType = cardType.ToString()
            };

            return Ok(response);
        }
    }
}
