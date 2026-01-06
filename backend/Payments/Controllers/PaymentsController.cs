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
       
            if (request == null || request.CardDetails == null)
                return BadRequest("Invalid payment request");

            if (request.Amount <= 0)
                return BadRequest("Amount must be greater than zero");

            if (string.IsNullOrWhiteSpace(request.CardDetails.CardNumber))
                return BadRequest("Card number is required");

           
            var cardType = CalculateDiscount.GetCardType(
                request.CardDetails.CardNumber
            );

            var (discountApplied, finalAmount) =
                CalculateDiscount.Calculate(cardType, request.Amount);

          
            var response = new PaymentResponse
            {
                OriginalAmount = request.Amount,
                CardType = cardType.ToString(),
                DiscountApplied = discountApplied,
                FinalAmount = finalAmount
            };

            return Ok(response);
        }
    }
}
