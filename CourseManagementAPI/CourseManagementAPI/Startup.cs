using CourseManagementAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;

public class Startup
{
    // Other using statements...

    public void ConfigureServices(IServiceCollection services)
    {
        // In ConfigureServices method
        services.AddCors(options =>
        {
            options.AddPolicy("AllowReactApp",
                builder => builder.WithOrigins("http://localhost:3000")
                                  .AllowAnyHeader()
                                  .AllowAnyMethod());
        });

        // other configurations...
    }

    public void Configure(IApplicationBuilder app)
    {
        // In Configure method
        app.UseCors("AllowReactApp");
        // other configurations...
    }
}
