using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StableDraw.Domain.Migrations
{
    /// <inheritdoc />
    public partial class AddTimer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GenerationCount",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GenerationCount",
                table: "AspNetUsers");
        }
    }
}
