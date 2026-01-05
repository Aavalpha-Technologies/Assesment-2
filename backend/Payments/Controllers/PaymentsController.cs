using Microsoft.AspNetCore.Mvc;
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
            // 1. Validate
            if (request.Amount <= 0) return BadRequest("Invalid Amount");
            if (string.IsNullOrEmpty(request.CardNumber)) return BadRequest("Card number is required");

            // 2. Logic
            var cardType = CalculateDiscount.GetCardType(request.CardNumber);
            var result = CalculateDiscount.Calculate(cardType, request.Amount);

            // 3. Response (Filling all REQUIRED fields to fix CS9035)
            var response = new PaymentResponse
            {
                Result = true,
                Message = "Payment Successful",
                Amount = request.Amount,
                FinalAmount = result.FinalAmount,
                DiscountApplied = result.DiscountApplied,
                CardType = cardType.ToString()
            };

            return Ok(response);
        }
    }
}