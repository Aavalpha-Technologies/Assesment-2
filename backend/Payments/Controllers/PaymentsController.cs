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
            var cardType = CalculateDiscount.GetCardType(request.CardDetails.CardNumber);
            var (discountApplied, finalAmount) = CalculateDiscount.Calculate(cardType, request.Amount);

            var response = new PaymentResponse
            {
                DiscountApplied = discountApplied,
                Amount = finalAmount
            };

            return Ok(response);
        }
    }
}
