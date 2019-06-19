using Microsoft.EntityFrameworkCore.Migrations;

namespace Voter.Migrations
{
    public partial class AddedCascadeDeleting : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ResidentResolution_AspNetUsers_VoterId",
                table: "ResidentResolution");

            migrationBuilder.AddForeignKey(
                name: "FK_ResidentResolution_AspNetUsers_VoterId",
                table: "ResidentResolution",
                column: "VoterId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ResidentResolution_AspNetUsers_VoterId",
                table: "ResidentResolution");

            migrationBuilder.AddForeignKey(
                name: "FK_ResidentResolution_AspNetUsers_VoterId",
                table: "ResidentResolution",
                column: "VoterId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
