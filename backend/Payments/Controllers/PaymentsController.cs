using Microsoft.AspNetCore.Mvc;
using Payments.Domain;
using Payments.Domain.Services;

namespace Payments.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        [HttpPost("pay")]
        public IActionResult Pay([FromBody] PaymentRequest request)
        {
            // 1. Basic validation
            if (request == null)
                return BadRequest("Request cannot be null");

            if (request.CardDetails == null || 
                string.IsNullOrWhiteSpace(request.CardDetails.CardNumber))
                return BadRequest("Card number is required");

            if (request.Amount <= 0)
                return BadRequest("Amount must be greater than zero");

            // 2. Detect card type
            var cardType = CardTypeDetector.Detect(request.CardDetails.CardNumber);
var discountPercentage = DiscountService.GetDiscountPercentage(cardType);

var discountAmount = request.Amount * discountPercentage;
var finalAmount = request.Amount - discountAmount;

var response = new PaymentResponse
{
    CardType = cardType.ToString(),
    TotalAmount = request.Amount,
    DiscountPercentage = discountPercentage * 100,
    DiscountAmount = discountAmount,
    FinalPayable = finalAmount
};

return Ok(response);

        }
    }
}
