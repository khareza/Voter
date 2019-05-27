using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Voter.Migrations
{
    public partial class AddedResolutionsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ResidentAct_Act_ActId",
                table: "ResidentAct");

            migrationBuilder.DropTable(
                name: "Act");

            migrationBuilder.RenameColumn(
                name: "ActId",
                table: "ResidentAct",
                newName: "ResolutionId");

            migrationBuilder.RenameIndex(
                name: "IX_ResidentAct_ActId",
                table: "ResidentAct",
                newName: "IX_ResidentAct_ResolutionId");

            migrationBuilder.CreateTable(
                name: "Resolutions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ActNumber = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Resolutions", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_ResidentAct_Resolutions_ResolutionId",
                table: "ResidentAct",
                column: "ResolutionId",
                principalTable: "Resolutions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ResidentAct_Resolutions_ResolutionId",
                table: "ResidentAct");

            migrationBuilder.DropTable(
                name: "Resolutions");

            migrationBuilder.RenameColumn(
                name: "ResolutionId",
                table: "ResidentAct",
                newName: "ActId");

            migrationBuilder.RenameIndex(
                name: "IX_ResidentAct_ResolutionId",
                table: "ResidentAct",
                newName: "IX_ResidentAct_ActId");

            migrationBuilder.CreateTable(
                name: "Act",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ActNumber = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Act", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_ResidentAct_Act_ActId",
                table: "ResidentAct",
                column: "ActId",
                principalTable: "Act",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
