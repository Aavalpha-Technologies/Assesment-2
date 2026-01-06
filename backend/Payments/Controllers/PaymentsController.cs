using Microsoft.AspNetCore.Mvc;
using Payments.Domain;

namespace Payments.Controllers
{
    [ApiController]
    [Route("api/payments")]
    public class PaymentsController : ControllerBase
    {
        [HttpPost("calculate")]
        public IActionResult Calculate([FromBody] PaymentRequest request)
        {
            try
            {
                // 1️⃣ Validate request at API boundary
                if (request == null || request.CardDetails == null)
                    return BadRequest(new { error = "Invalid payment request." });

                // 2️⃣ Detect card type using domain logic
                var cardType = CalculateDiscount.GetCardType(request.CardDetails.CardNumber);

                // 3️⃣ Calculate discount using domain logic
                var (discountApplied, finalAmount, discountAmount) =
                    CalculateDiscount.Calculate(cardType, request.Amount);

                // 4️⃣ Build structured response
                var response = new PaymentResponse
                {
                    TotalAmount = request.Amount,
                    DiscountApplied = discountApplied,
                    DiscountAmount = discountAmount,
                    FinalAmount = finalAmount,
                    CardType = cardType.ToString()
                };

                // 5️⃣ Return HTTP 200 with JSON
                return Ok(response);
            }
            catch (ArgumentException ex)
            {
                // 6️⃣ Handle validation errors gracefully
                return BadRequest(new { error = ex.Message });
            }
            catch
            {
                // 7️⃣ Catch unexpected failures
                return StatusCode(500, new { error = "An unexpected error occurred while processing payment." });
            }
        }
    }
}
