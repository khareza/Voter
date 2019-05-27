using Microsoft.EntityFrameworkCore.Migrations;

namespace Voter.Migrations
{
    public partial class ChangedActNumberColumntoResolutionNumberColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ActNumber",
                table: "Resolutions",
                newName: "ResolutionNumber");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ResolutionNumber",
                table: "Resolutions",
                newName: "ActNumber");
        }
    }
}
