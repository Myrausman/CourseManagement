namespace CourseManagementAPI.Models
{
        public partial class Course
        {
            public int CourseId { get; set; }
            public string CourseCode { get; set; }
            public string CourseName { get; set; }
            public int? CreditHours { get; set; }
        
    }
}
