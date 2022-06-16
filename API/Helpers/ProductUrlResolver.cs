using API.Dtos;
using AutoMapper;
using Core.Entities;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class ProductUrlResolver : IValueResolver<Product, ProductToReturnDto, string>
    {
        private IConfiguration _config { get; set; }
        public ProductUrlResolver(IConfiguration config)
        {
            _config = config;
        }
        public string Resolve(Product source, ProductToReturnDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.PictureUrl))
            {
                return _config["ApiUrl"] + source.PictureUrl;
            }
            return null;
        }
    }
}

/*
 
the prop pictureUrl is like
    "pictureUrl": "images/products/sb-core1.png"
But if our picture is loaded from a server and we need to give the starting url of the server
like:
 "pictureUrl": "https://localhost:5001/images/products/sb-core1.png"
 
Here we are adding the extra part when we are returning a DTO
 
 */