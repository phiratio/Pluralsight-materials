
namespace WebSocketServer
{
    public class Stock
    {
        public string Symbol { get; set; }
        public decimal Value { get; set; }
        public bool IsUp { get; set; }
        public decimal PercentChange { get; set; }
    }
}
