using Microsoft.EntityFrameworkCore.Migrations;

namespace Voter.Migrations
{
    public partial class ChangedPropertyName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "AspNetUsers",
                newName: "FirstNamee");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FirstNamee",
                table: "AspNetUsers",
                newName: "FirstName");
        }
    }
}
