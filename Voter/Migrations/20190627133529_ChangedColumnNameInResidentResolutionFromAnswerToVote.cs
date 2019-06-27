using Microsoft.EntityFrameworkCore.Migrations;

namespace Voter.Migrations
{
    public partial class ChangedColumnNameInResidentResolutionFromAnswerToVote : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Answer",
                table: "ResidentResolution");

            migrationBuilder.AddColumn<int>(
                name: "Vote",
                table: "ResidentResolution",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Vote",
                table: "ResidentResolution");

            migrationBuilder.AddColumn<int>(
                name: "Answer",
                table: "ResidentResolution",
                nullable: false,
                defaultValue: 0);
        }
    }
}
