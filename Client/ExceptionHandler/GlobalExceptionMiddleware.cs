using System.Net;
using Newtonsoft.Json;

namespace CLI.ExceptionHandler;

public class GlobalExceptionMiddleware
{
    public async Task InvokeAsync(HttpContext context, Func<Task> next)
    {
        try
        {
            await next();
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception ex)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        var response = new
        {
            error = new
            {
                message = "An error occurred while processing your request.",
                details = ex.Message
            }
        };

        return context.Response.WriteAsync(JsonConvert.SerializeObject(response));
    }
}