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
                return BadRequest("Request body is required.");

            if (request.Amount <= 0)
                return BadRequest("Amount must be greater than zero.");

            if (request.CardDetails == null || string.IsNullOrWhiteSpace(request.CardDetails.CardNumber))
                return BadRequest("Valid card number is required.");

            var cardType = CalculateDiscount.GetCardType(request.CardDetails.CardNumber);

            var (discountApplied, finalAmount) =
                CalculateDiscount.Calculate(cardType, request.Amount);

            var response = new PaymentResponse
            {
                CardTypeName = cardType.ToString(),
                TotalAmount = request.Amount,
                DiscountApplied = discountApplied,
                Amount = finalAmount
            };

            return Ok(response);
        }
    }
}
