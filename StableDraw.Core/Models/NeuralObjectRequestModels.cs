using Microsoft.AspNetCore.Http;

namespace StableDraw.Core.Models;

public class NeuralRequestModel
{
    public string? NeuralType { get; set; }
    public string? Caption { get; set; }
    public IEnumerable<string>? Prompts { get; set; }
    public string? Parameters { get; set; }
    public IEnumerable<IFormFile>? ImagesInput { get; set; }
}

// public interface INeuralObjectRequest
// {
//     public string NeuralType { get; set; }
//     public string ParametersDict { get; set; }
// }
//
// public class NeuralColorizerModel : INeuralObjectRequest
// {
//     public string NeuralType { get; set; }
//     public string ParametersDict { get; set; }
//     public IFormFile InitImage { get; set; }
// }
//
// public class NeuralDeleteBackgroundModel : INeuralObjectRequest
// {
//     public string NeuralType { get; set; }
//     public string ParametersDict { get; set; }
//     public IFormFile InitImage { get; set; }
// }
//
// public class NeuralUpscalerModel : INeuralObjectRequest
// {
//     public string NeuralType { get; set; }
//     public string ParametersDict { get; set; }
//     public IFormFile InitImage { get; set; }
//     public string Caption { get; set; }
// }
//
// public class NeuralImageToImageModel : INeuralObjectRequest
// {
//     public string NeuralType { get; set; }
//     public string ParametersDict { get; set; }
//     public IFormFile InitImage { get; set; }
//     public string Caption { get; set; }
// }
//
// public class NeuralTextToImageModel : INeuralObjectRequest
// {
//     public string NeuralType { get; set; }
//     public string ParametersDict { get; set; }
//     public string Caption { get; set; }
// }
//
// public class NeuralImageCaptioningModel : INeuralObjectRequest
// {
//     public string NeuralType { get; set; }
//     public string ParametersDict { get; set; }
//     public IFormFile InitImage { get; set; }
//     public string Caption { get; set; }
// }
//
// public class NeuralImpationModel : INeuralObjectRequest
// {
//     public string NeuralType { get; set; }
//     public string ParametersDict { get; set; }
//     public string Caption { get; set; }
//     public IFormFile InitImage { get; set; }
//     public IFormFile MaskInmage { get; set; }
// }
//
// public class NeuralStylizationModel : INeuralObjectRequest
// {
//     public string NeuralType { get; set; }
//     public string ParametersDict { get; set; }
//     public string Prompt { get; set; }
//     public IFormFile ContentData { get; set; }
//     public IFormFile StyleData { get; set; }
// }
//
// public class NeuralImageFusionModel : INeuralObjectRequest
// {
//     public string NeuralType { get; set; }
//     public string ParametersDict { get; set; }
//     public string Prompt1 { get; set; }
//     public string Prompt2 { get; set; }
//     public IFormFile InitImage1 { get; set; }
//     public IFormFile InitImage2 { get; set; }
// }
//
// public class NeuralImageClassificationModel
// {
//     public string NeuralType { get; set; }
//     public IFormFile InitImage { get; set; }
// }
//
// public class NeuralTranslation
// {
//     public string InputText { get; set; }
//     public string SourceLeng { get; set; }
//     public string DestinationLend { get; set; } = "en";
// }