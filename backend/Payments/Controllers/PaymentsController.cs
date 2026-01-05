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
            // -------- Validation --------
            if (request == null)
                return BadRequest("Request body is required.");

            if (request.Amount <= 0)
                return BadRequest("Amount must be greater than zero.");

            if (request.CardDetails == null ||
                string.IsNullOrWhiteSpace(request.CardDetails.CardNumber))
                return BadRequest("Card number is required.");

            // -------- Business Logic --------
            var cardType = CalculateDiscount.GetCardType(
                request.CardDetails.CardNumber
            );

            decimal discountPercentage = cardType switch
            {
                CardType.Visa => 0m,
                CardType.MasterCard => 5m,
                CardType.RuPay => 10m,
                _ => 10m
            };

            decimal discountAmount = request.Amount * discountPercentage / 100;
            decimal finalAmount = request.Amount - discountAmount;

            // -------- Response --------
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
