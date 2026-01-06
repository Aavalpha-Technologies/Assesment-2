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
            // Basic validation
            if (request == null)
            {
                return BadRequest("Request body is required.");
            }

            if (request.Amount <= 0)
            {
                return BadRequest("Amount must be greater than zero.");
            }

            if (request.CardDetails == null ||
                string.IsNullOrWhiteSpace(request.CardDetails.CardNumber))
            {
                return BadRequest("Valid card details are required.");
            }

            // Detect card type
            var cardType = CalculateDiscount.GetCardType(
                request.CardDetails.CardNumber
            );

            // Calculate discount
            var (discountApplied, finalAmount) =
                CalculateDiscount.Calculate(cardType, request.Amount);

            // Build response
            var response = new PaymentResponse
            {
                CardType = cardType.ToString(),
                OriginalAmount = request.Amount,
                DiscountApplied = discountApplied,
                FinalAmount = finalAmount
            };

            return Ok(response);
        }
    }
}
