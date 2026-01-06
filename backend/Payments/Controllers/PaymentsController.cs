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

    if (request == null ||
        request.CardDetails == null ||
        string.IsNullOrWhiteSpace(request.CardDetails.CardNumber))
    {
        return BadRequest("Invalid card details.");
    }

    if (request.Amount <= 0)
    {
        return BadRequest("Amount must be greater than zero.");
    }

    var cardType = CalculateDiscount.GetCardType(
        request.CardDetails.CardNumber
    );

    var (discountAmount, finalAmount) =
        CalculateDiscount.Calculate(cardType, request.Amount);

    decimal discountPercentage = cardType switch
    {
        CardType.Visa => 0,
        CardType.MasterCard => 5,
        CardType.RuPay => 10,
        _ => 10
    };


    var response = new PaymentResponse
    {
        CardType = cardType.ToString(),
        OriginalAmount = request.Amount,
        DiscountPercentage = discountPercentage,
        DiscountAmount = discountAmount,
        FinalAmount = finalAmount
    };

    return Ok(response);
}

    }
}
