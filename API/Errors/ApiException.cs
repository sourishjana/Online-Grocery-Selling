namespace API.Errors
{
    public class ApiException : ApiResponse
    {
        public ApiException(int statusCode, string message = null, string details = null)
            : base(statusCode, message)
        {
            Details = details;
        }

        public string Details { get; set; }
    }
}

/*
 
 When we go for any server error the response we get is not very structured
for this we need to send the Exception or error in a certain format

lets say JSON here
 
 */