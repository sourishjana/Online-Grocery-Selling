using Core.Entities.Orders;
using System.Collections.Generic;

namespace API.Dtos
{
    public class OrderDto
    {
        //public string Email { get; set; }
        public string BasketId { get; set; }
        public int DeliveryMethod { get; set; }
        public AddressDto ShipToAddress { get; set; }
        public IReadOnlyList<OrderItemDto> OrderItems { get; set; }
    }
}
