﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ProfitOrLossBackend.Models;

#nullable disable

namespace ProfitOrLossBackend.Migrations
{
    [DbContext(typeof(ProfitOrLossContext))]
    [Migration("20241011080236_addSaleTable")]
    partial class addSaleTable
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ProfitOrLossBackend.Models.FinancialYear", b =>
                {
                    b.Property<int>("FinancialYearId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("FinancialYearId");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("FinancialYearId"));

                    b.Property<string>("FinancialYearName")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("FinancialYearName");

                    b.HasKey("FinancialYearId");

                    b.ToTable("FinancialYear");
                });

            modelBuilder.Entity("ProfitOrLossBackend.Models.Sale", b =>
                {
                    b.Property<Guid>("SaleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("SaleId");

                    b.Property<int?>("CostPrice")
                        .HasColumnType("int")
                        .HasColumnName("CostPrice");

                    b.Property<int?>("ProfitOrLoss")
                        .HasColumnType("int")
                        .HasColumnName("ProfitOrLoss");

                    b.Property<int?>("SellingPrice")
                        .HasColumnType("int")
                        .HasColumnName("SellingPrice");

                    b.Property<string>("ShareCompany")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("ShareCompany");

                    b.HasKey("SaleId");

                    b.ToTable("Sale");
                });

            modelBuilder.Entity("ProfitOrLossBackend.Models.ShareCompany", b =>
                {
                    b.Property<int>("ShareCompanyId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ShareCompanyId");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ShareCompanyId"));

                    b.Property<string>("ShareCompanyName")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("ShareCompanyName");

                    b.HasKey("ShareCompanyId");

                    b.ToTable("ShareCompany");
                });
#pragma warning restore 612, 618
        }
    }
}
