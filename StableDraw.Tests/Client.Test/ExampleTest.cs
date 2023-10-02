namespace Client.Test
{
    public class ExampleTest
    {
        [Theory]
        [InlineData(2)]
        public void Test1(int a)
        {
            Example example = new();
            int b = example.Summ(a);
            Assert.Equal(8, b);
        }
    }
}