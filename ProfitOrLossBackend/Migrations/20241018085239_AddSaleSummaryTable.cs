using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProfitOrLossBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddSaleSummaryTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SaleSummary",
                columns: table => new
                {
                    SaleSummaryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ShareCompany = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CostPrice = table.Column<int>(type: "int", nullable: true),
                    SellingPrice = table.Column<int>(type: "int", nullable: true),
                    ProfitOrLoss = table.Column<int>(type: "int", nullable: true),
                    FinancialYear = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SaleSummary", x => x.SaleSummaryId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SaleSummary");
        }
    }
}
