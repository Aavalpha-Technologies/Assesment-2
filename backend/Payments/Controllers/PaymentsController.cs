using System.Linq;
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
            // Validate request
            if (request == null)
            {
                return BadRequest(new { error = "Request body is required" });
            }

            if (request.CardDetails == null)
            {
                return BadRequest(new { error = "Card details are required" });
            }

            if (string.IsNullOrWhiteSpace(request.CardDetails.CardNumber))
            {
                return BadRequest(new { error = "Card number is required" });
            }

            if (request.Amount <= 0)
            {
                return BadRequest(new { error = "Amount must be greater than zero" });
            }

            // Basic card number validation (16 digits)
            var cardNumberClean = request.CardDetails.CardNumber.Replace(" ", "");
            if (cardNumberClean.Length != 16 || !cardNumberClean.All(char.IsDigit))
            {
                return BadRequest(new { error = "Card number must be 16 digits" });
            }

            // Get card type and calculate discount
            var cardType = CalculateDiscount.GetCardType(request.CardDetails.CardNumber);
            var (discountApplied, discountPercentage, discountAmount, finalAmount) = CalculateDiscount.Calculate(cardType, request.Amount);

            var response = new PaymentResponse
            {
                OriginalAmount = request.Amount,
                CardType = cardType.ToString(),
                DiscountPercentage = discountPercentage,
                DiscountAmount = discountAmount,
                FinalAmount = finalAmount,
                DiscountApplied = discountApplied
            };

            return Ok(response);
        }
    }
}
