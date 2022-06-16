using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using API.Dtos;
using API.Errors;
using Core.Specifications;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private IProductRepository _repo { get; set; }
        private IMapper _mapper { get; set; }
        public ProductsController(IProductRepository repo,IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts([FromQuery]ProductSpecParams productParams)
        {
            var products = await _repo.GetProductsAsync(productParams);
            return Ok(_mapper
                .Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProductById(int id)
        {
            var product = await _repo.GetProductByIdAsync(id);
            if (product == null) return NotFound(new ApiResponse(404));
            return _mapper.Map<Product, ProductToReturnDto>(product);
        }
    }
}
