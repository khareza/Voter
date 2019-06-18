using Microsoft.EntityFrameworkCore.Migrations;

namespace Voter.Migrations
{
    public partial class AddedResolutionStatusColumnToResolutionsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ResolutionStatus",
                table: "Resolutions",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ResolutionStatus",
                table: "Resolutions");
        }
    }
}
