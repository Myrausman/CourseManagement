using Microsoft.EntityFrameworkCore;

namespace CourseManagementAPI.Models
{
    public class TimeSlotContext : DbContext
    {
        public TimeSlotContext(DbContextOptions<TimeSlotContext> options) : base(options)
        {

        }

        public DbSet<TimeSlot> TimeSlots { get; set; } = null;

    }
}
