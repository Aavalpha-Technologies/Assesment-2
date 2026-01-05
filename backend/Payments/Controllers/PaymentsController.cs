using Microsoft.AspNetCore.Mvc;
using Payments;
using Payments.Domain;

namespace Payments.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        [HttpPost("pay")]
        public IActionResult Pay([FromBody] PaymentRequest request)
        {
            try
            {
                if (request == null || request.Amount <= 0)
                    return BadRequest(new { message = "Invalid amount" });

                if (request.CardDetails == null ||
                    string.IsNullOrWhiteSpace(request.CardDetails.CardNumber) ||
                    request.CardDetails.CardNumber.Length < 12)
                    return BadRequest(new { message = "Invalid card number" });

                var cardType = CalculateDiscount.GetCardType(request.CardDetails.CardNumber);
                var discountPercent = CalculateDiscount.GetDiscount(cardType);

                var discountAmount = request.Amount * discountPercent / 100;
                var finalAmount = request.Amount - discountAmount;

                var response = new PaymentResponse
                {
                    TotalAmount = request.Amount,
                    CardType = cardType,
                    DiscountPercent = discountPercent,
                    DiscountAmount = discountAmount,
                    FinalPayableAmount = finalAmount,
                    Message = "Payment calculated successfully"
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
