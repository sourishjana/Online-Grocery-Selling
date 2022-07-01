using Core.Entities.Orders;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        public StoreContext _context { get; set; }
        public OrderService(StoreContext context)
        {
            _context = context;
        }
        public async Task<Order> CreateOrderAsync(
            string email, 
            int deliveryMethod, 
            string basketId, 
            Address shippingAddress,
            IReadOnlyList<OrderItem> orderItems)
        {
            Order order = new Order()
            {
                BuyerEmail=email,
                ShipToAddress=shippingAddress,
                DeliveryMethod=await _context.DeliveryMethods.FindAsync(deliveryMethod),
                OrderItems=orderItems
            };
            order.Subtotal = orderItems.Sum(item => item.Price * item.Quantity);
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await _context.DeliveryMethods.ToListAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string email)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == id && o.BuyerEmail == email);
            return order;
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string email)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .Include(o => o.DeliveryMethod)
                .Include(o => o.ShipToAddress)
                .OrderByDescending(o => o.OrderDate)
                .Where(o => o.BuyerEmail == email).ToListAsync();
            return order;
        }
    }
}
