namespace CourseManagementAPI.Models
{
        public partial class TimeSlot
        {
            public int TimeSlotId { get; set; }
            public string TimeSlotCode { get; set; }
            public DateTime StartTime { get; set; }
            public DateTime EndTime { get; set; }
        }
}


