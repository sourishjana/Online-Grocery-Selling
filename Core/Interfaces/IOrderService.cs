using Core.Entities.Orders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IOrderService
    {
        Task<Order> CreateOrderAsync(string email, int deliveryMethod, string basketId, Address shippingAddress, IReadOnlyList<OrderItem> orderItems);
        Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string email);
        Task<Order> GetOrderByIdAsync(int id, string email);
        Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync();
    }
}
