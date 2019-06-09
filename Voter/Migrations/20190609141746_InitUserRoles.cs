using Microsoft.EntityFrameworkCore.Migrations;

namespace Voter.Migrations
{
    public partial class InitUserRoles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id","Name", "NormalizedName" },
                values: new object[] { "1","Admin","Admin" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "Name", "NormalizedName" },
                values: new object[] { "2", "User", "User" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
