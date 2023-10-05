using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StableDraw.Core.Models
{
    public class GetRenderedImageRequestModel
    {
        public Guid OrderId { get; set; }
        public string? SceneName { get; set; }
        public double[]? Coords { get; set; }
    }
}
