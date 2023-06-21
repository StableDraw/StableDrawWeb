using System;
using Minio;
using Minio.Exceptions;
using Minio.DataModel;
using System.Threading.Tasks;

namespace FileLoader
{
    class FileLoad
    {
        static void Main(string[] args)
        {
            var endpoint = "play.min.io"; // where to load, <Domain-name> or <ip:port> of an object storage
            var accessKey = "minioadmin"; // User ID that uniquely identifies an account
            var secretKey = "minioadmin"; // Password to an account
            try
            {
                var minio = new MinioClient()
                                    .WithEndpoint(endpoint)
                                    .WithCredentials(accessKey, secretKey)
                                    .WithSSL()  //.WithSSL(false) for the port, no argument for play
                                    .Build(); 
                // Set file to upload here
                FileLoad.Push(minio, "myfirstbucket", // bucketname, if doesn't exist, will be created
                                       "test1-1.txt", // how to call a file in server
                                       "C:\\Users\\TANYA\\Documents\\Git\\test1.txt", // full filename
                                       "text/txt" //filetype
                                       ).Wait();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            
            try
            {
                var minio = new MinioClient()
                                    .WithEndpoint(endpoint)
                                    .WithCredentials(accessKey, secretKey)
                                    .WithSSL()
                                    .Build();
                // Set file to download here
                FileLoad.Pull(minio, "myfirstbucket", // bucket name
                                              "test1-1.txt", // name of a file in server
                                              "C:\\Users\\TANYA\\Documents\\Git\\test2.txt" // where to save (including name
                                                                                            // for saving)
                                              ).Wait();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            Console.ReadLine();
        }

        // File uploader task.
        private async static Task Push(MinioClient minio, string bucktname, string objnm, string fPath, string cnttype)
        {
            var bucketName = bucktname;
            var objectName = objnm;
            var filePath = fPath;
            var contentType = cnttype;

            try
            {
                // Make a bucket on the server, if not already present.
                var beArgs = new BucketExistsArgs()
                    .WithBucket(bucketName);
                bool found = await minio.BucketExistsAsync(beArgs).ConfigureAwait(false);
                if (!found)
                {
                    var mbArgs = new MakeBucketArgs()
                        .WithBucket(bucketName);
                    await minio.MakeBucketAsync(mbArgs).ConfigureAwait(false);
                }
                // Upload a file to bucket.
                var putObjectArgs = new PutObjectArgs()
                    .WithBucket(bucketName)
                    .WithObject(objectName)
                    .WithFileName(filePath)
                    .WithContentType(contentType);
                await minio.PutObjectAsync(putObjectArgs).ConfigureAwait(false);
                Console.WriteLine("Successfully uploaded " + objectName);
            }
            catch (MinioException e)
            {
                Console.WriteLine("File Upload Error: {0}", e.Message);
            }
        }

        // File downloader task
        public static async Task Pull(IMinioClient minio,
        string bucketName,
        string objectName,
        string fileName,
        IServerSideEncryption sse = null) // Idk what is this
        {
            try
            {
                File.Delete(fileName);
                var args = new GetObjectArgs()
                    .WithBucket(bucketName)
                    .WithObject(objectName)
                    .WithFile(fileName)
                    .WithServerSideEncryption(sse);
                await minio.GetObjectAsync(args).ConfigureAwait(false);
                Console.WriteLine($"Downloaded to {fileName} from bucket {bucketName}");
                Console.WriteLine();
            }
            catch (Exception e)
            {
                Console.WriteLine($"[Bucket]  Exception: {e}");
            }
        }
    }
}
