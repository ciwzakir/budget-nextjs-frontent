export const maritalStatusOptions = [
  {
    label: "Married",
    value: "married",
  },
  {
    label: "Unmarried",
    value: "unmarried",
  },
];

export const genderOptions = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Third",
    value: "others",
  },
];

export const bloodGroupOptions = [
  {
    label: "A+ (Positive)",
    value: "a+(Positive)",
  },
  {
    label: "A- (Negative)",
    value: "a-(Negative)",
  },
  {
    label: "B+ (Positive)",
    value: "b+(Positive)",
  },
  {
    label: "B- (Negative)",
    value: "b-(Negative)",
  },
  {
    label: "AB+ (Positive)",
    value: "ab+(Positive)",
  },
  {
    label: "AB- (Negative)",
    value: "ab-(Negative)",
  },

  {
    label: "O+ (Positive)",
    value: "o+(Positive)",
  },
  {
    label: "O- (Negative)",
    value: "o-(Negative)",
  },
];

export const acSemesterOptions = [
  {
    label: "Fall 2023",
    value: "fall23",
  },
  {
    label: "Autumn 2023",
    value: "autumn2023",
  },
  {
    label: "Summer 2023",
    value: "summer23",
  },
];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const monthOptions = months.map((month: string) => {
  return {
    label: month,
    value: month,
  };
});

export const days = [
  "SATURDAY",
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
];
export const daysOptions = days.map((day: string) => {
  return {
    label: day,
    value: day,
  };
});

export const semesterRegistrationStatus = ["UPCOMING", "ONGOING", "ENDED"];

export enum ExamType {
  FINAL = "FINAL",
  MIDTERM = "MIDTERM",
}

export const qualificationOptions = [
  {
    label: "SSC",
    value: "ssc",
  },
  {
    label: "HSC",
    value: "hsc",
  },

  {
    label: "Degree",
    value: "degree",
  },
  {
    label: "Honours",
    value: "honours",
  },
  {
    label: "Masters",
    value: "masters",
  },
];

export const fieldOfStudyOptions = [
  {
    label: "Computer Science",
    value: "computerscience",
  },

  {
    label: "Science",
    value: "science",
  },

  {
    label: "Business Studies",
    value: "businessStudies",
  },
  {
    label: "Humanities",
    value: "humanities",
  },
  {
    label: "Math",
    value: "math",
  },
  {
    label: "Higher Math",
    value: "higherMath",
  },
  {
    label: "English Literature",
    value: "englishLiterature",
  },

  {
    label: "Physics",
    value: "physics",
  },
  {
    label: "Chemistry",
    value: "chemistry",
  },
  {
    label: "Statistics",
    value: "statistics",
  },
];

export const graduationYearOptions = [
  {
    label: "Ten",
    value: 2010,
  },

  {
    label: "Eleven",
    value: 2013,
  },
];

export const obtainGradeOptions = [
  {
    label: "A+",
    value: "a+",
  },
  {
    label: "A-",
    value: "a-",
  },
  {
    label: "B",
    value: "b",
  },
  {
    label: "C",
    value: "c",
  },
  {
    label: "First Class",
    value: "firstClass",
  },
  {
    label: "Second Class",
    value: "secondClass",
  },

  {
    label: "AA",
    value: "4.00",
  },
  {
    label: "BB",
    value: "3.80",
  },
  {
    label: "CC",
    value: "3.50",
  },
];

export const monitorColorOptions = [
  {
    label: "Red",
    value: "red",
  },
  {
    label: "Green",
    value: "green",
  },
  {
    label: "Blue",
    value: "blue",
  },
  {
    label: "Off White",
    value: "off_white",
  },
  {
    label: "Cyan",
    value: "cyan",
  },
];
export const monitorSizeOptions = [
  {
    label: "Large",
    value: "large",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Small",
    value: "small",
  },
  {
    label: "Extra Large",
    value: "extra-large",
  },
  {
    label: "Extra Small",
    value: "extra-small",
  },
];

export const monitorPaymentStatusOptions = [
  {
    label: "Initial",
    value: "initial",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Processing",
    value: "processing",
  },
  {
    label: "Complete",
    value: "complete",
  },
];
export const monitorSalesStatusOptions = [
  {
    label: "Sold",
    value: "sold",
  },
  {
    label: "Available",
    value: "available",
  },
  {
    label: " Not Available",
    value: "not-available",
  },
];
export const productIsPublishedOptions = [
  {
    label: "Published",
    value: true,
  },
  {
    label: "Draft",
    value: false,
  },
];

export const productWarrantyOptions = [
  {
    label: "One Year",
    value: 1,
  },
  {
    label: "Two Years",
    value: 2,
  },
  {
    label: "Five Years",
    value: 5,
  },
  {
    label: "Seven Years",
    value: 7,
  },
  {
    label: "Ten Years",
    value: 10,
  },
];
