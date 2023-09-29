using System;
using System.Collections.Generic;
using System.Globalization;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace RentalMovieDetailsApi.Models;

public partial class RentalMovieDetailsDatabaseContext : DbContext
{
    public RentalMovieDetailsDatabaseContext()
    {
    }

    public RentalMovieDetailsDatabaseContext(DbContextOptions<RentalMovieDetailsDatabaseContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TblActor> TblActors { get; set; }

    public virtual DbSet<TblActorMovie> TblActorMovies { get; set; }

    public virtual DbSet<TblCategory> TblCategories { get; set; }

    public virtual DbSet<TblCategoryMovie> TblCategoryMovies { get; set; }

    public virtual DbSet<TblCustomer> TblCustomers { get; set; }

    public virtual DbSet<TblMovie> TblMovies { get; set; }

    public virtual DbSet<TblRental> TblRentals { get; set; }

    public virtual DbSet<TblRentalDetail> TblRentalDetails { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=DESKTOP-ANGFMSD\\SQLEXPRESS;Initial Catalog=RentalMovieDetailsDatabase;Integrated Security=True;Persist Security Info=False;Pooling=False;Multiple Active Result Sets=False;Connect Timeout=60;Encrypt=False;Trust Server Certificate=False;Command Timeout=0");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TblActor>(entity =>
        {
            entity.HasKey(e => e.ActorId).HasName("PK__TblActor__57B3EA4BE1542701");

            entity.ToTable("TblActor");

            entity.Property(e => e.ActorFullName)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TblActorMovie>(entity =>
        {
            entity.HasKey(e => e.ActorMovieId)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
                .HasName("PK__TblActor__1853BAEF92C2786F");

            entity.ToTable("TblActorMovie");

            entity.Property(e => e.ActorId).HasColumnName("ActorId");
            entity.Property(e => e.MovieId).HasColumnName("MovieId");
        });

        modelBuilder.Entity<TblCategory>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__TblCateg__19093A0BAFB0E9DB");

            entity.ToTable("TblCategory");

            entity.Property(e => e.CategoryName)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TblCategoryMovie>(entity =>
        {
            entity.HasKey(e => e.CategoryMovieId)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
                .HasName("PK__TblCateg__0EAFD47D8568961E");

            entity.ToTable("TblCategoryMovie");

            entity.Property(e => e.CategoryId).HasColumnName("CategoryId");
            entity.Property(e => e.MovieId).HasColumnName("MovieId");
        });

        modelBuilder.Entity<TblCustomer>(entity =>
        {
            entity.HasKey(e => e.CustomerId).HasName("PK__TblCusto__A4AE64D8226E0066");

            entity.ToTable("TblCustomer");

            entity.Property(e => e.CustomerCellphone)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CustomerCity)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CustomerDateBirth)
                .HasColumnType("date");
            entity.Property(e => e.CustomerFirstName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CustomerLastName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CustomerMiddleName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CustomerStreet)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CustomerTelephone)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CustomerAge).HasColumnName("CustomerAge");
        });

        modelBuilder.Entity<TblMovie>(entity =>
        {
            entity.HasKey(e => e.MovieId).HasName("PK__TblMovie__4BD2941A1176B394");

            entity.ToTable("TblMovie");

            entity.Property(e => e.MovieDescription).HasColumnType("text");
            entity.Property(e => e.MovieName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.MovieReleaseDate).HasColumnType("date");
            entity.Property(e => e.MoviePrice).HasColumnType("double");
        });

        modelBuilder.Entity<TblRental>(entity =>
        {
            entity.HasKey(e => e.RentalId).HasName("PK__TblRenta__9700594313C5EF71");

            entity.ToTable("TblRental");

            entity.Property(e => e.RentalRentDate).HasColumnType("date");
            entity.Property(e => e.RentalReturnDate).HasColumnType("date");
            entity.Property(e => e.RentalStatus)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CustomerId).HasColumnName("CustomerId");

            entity.HasOne(d => d.TblCustomer)
                .WithMany(p => p.TblRental)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TblRental_TblCustomer");
        });

        modelBuilder.Entity<TblRentalDetail>(entity =>
        {
            entity.HasKey(e => e.RentalDetailId).HasName("PK__TblRenta__10B3587936B45A15");

            entity.ToTable("TblRentalDetail");

            entity.Property(e => e.RentalDetailStatus)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.RentalId).HasColumnName("RentalId");
            entity.Property(e => e.MovieId).HasColumnName("MovieId");

            entity.HasOne(d => d.TblRental)
                .WithMany(p => p.TblRentalDetail)
                .HasForeignKey(d => d.RentalId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TblRentalDetail_TblRental");

            entity.HasOne(d => d.TblMovie)
                .WithMany(p => p.TblRentalDetail)
                .HasForeignKey(d => d.MovieId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TblRentalDetail_TblMovie");
        });

        //TblActorMovie
        modelBuilder.Entity<TblActorMovie>()
            .HasKey(ac => new { ac.MovieId, ac.ActorId });
        modelBuilder.Entity<TblActorMovie>()
            .HasOne(ac => ac.Movies)
            .WithMany(m => m.ActorMovies)
            .HasForeignKey(ac => ac.MovieId)
            .OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<TblActorMovie>()
            .HasOne(ac => ac.Actors)
            .WithMany(c => c.ActorMovies)
            .HasForeignKey(ac => ac.ActorId)
            .OnDelete(DeleteBehavior.Cascade);

        //TblCategoryMovie
        modelBuilder.Entity<TblCategoryMovie>()
            .HasKey(sc => new { sc.CategoryId, sc.MovieId });
        modelBuilder.Entity<TblCategoryMovie>()
            .HasOne(sc => sc.Categories)
            .WithMany(s => s.CategoryMovies)
            .HasForeignKey(sc => sc.CategoryId)
            .OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<TblCategoryMovie>()
            .HasOne(sc => sc.Movies)
            .WithMany(s => s.CategoryMovies)
            .HasForeignKey(sc => sc.MovieId)
            .OnDelete(DeleteBehavior.Cascade);

        //modelBuilder.Entity<TblRental>(entity =>
        //{
        //    //entity.HasKey(e => e.RentalId);

        //    entity.HasOne(d => d.TblCustomer)
        //        .WithMany(p => p.TblRental)
        //        .HasForeignKey(d => d.CustomerId)
        //        .OnDelete(DeleteBehavior.ClientSetNull)
        //        .HasConstraintName("FK_TblRental_TblCustomer");
        //});

        //modelBuilder.Entity<TblRentalDetail>(entity =>
        //{
        //    //entity.HasKey(e => e.RentalDetailId);

        //    entity.HasOne(d => d.TblRental)
        //        .WithMany(p => p.TblRentalDetail)
        //        .HasForeignKey(d => d.RentalId)
        //        .OnDelete(DeleteBehavior.ClientSetNull)
        //        .HasConstraintName("FK_TblRentalDetail_TblRental");

        //    entity.HasOne(d => d.TblMovie)
        //        .WithMany(p => p.TblRentalDetail)
        //        .HasForeignKey(d => d.MovieId)
        //        .OnDelete(DeleteBehavior.ClientSetNull)
        //        .HasConstraintName("FK_TblRentalDetail_TblMovie");
        //});

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
