using Core.Entities;
using Core.Interfaces;
using System;
using System.Collections.Generic;
//using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Core.Specifications;

namespace Infrastructure.Data
{
    public class ProductRepository : IProductRepository
    {
        public StoreContext _context { get; set; }
        public ProductRepository(StoreContext context)
        {
            _context = context;
        }
        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products
                .Include(p=>p.ProductBrand) // eager loading
                .Include(p=>p.ProductType)
                .FirstOrDefaultAsync(p=>p.Id==id);
        }

        public async Task<IReadOnlyList<Product>> GetProductsAsync(ProductSpecParams productParams)
        {
            var products = _context.Products
                            .Include(p => p.ProductBrand) // eager loading
                            .Include(p => p.ProductType)
                            .Where(p => productParams.BrandId == null ? true : productParams.BrandId == p.ProductBrandId)
                            .Where(p => productParams.TypeId == null ? true : productParams.TypeId == p.ProductTypeId)
                            .Where(p => string.IsNullOrEmpty(productParams.Search) ? true : p.Name.ToLower().Contains(productParams.Search));
            var productsOrdered= products;
            if (!string.IsNullOrEmpty(productParams.Sort))
            {
                switch (productParams.Sort)
                {
                    case "priceAsc":
                        productsOrdered=products.OrderBy(p => p.Price);
                        break;
                    case "priceDesc":
                        productsOrdered=products.OrderByDescending(p => p.Price);
                        break;
                    default:
                        productsOrdered=products.OrderBy(p => p.Name);
                        break;
                }
            }
            int skip = productParams.PageSize * (productParams.PageIndex - 1);
            int take = productParams.PageSize;
            var productsAppliedPagination = productsOrdered.Skip(skip).Take(take);
            return await productsAppliedPagination.ToListAsync();
        }
    }
}
