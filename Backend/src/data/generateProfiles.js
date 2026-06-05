import fs from "fs";

const maleNames = [
  "Rahul","Amit","Rohit","Saurabh","Akash",
  "Vikram","Kunal","Ankit","Nikhil","Yash",
  "Aditya","Arjun","Harsh","Shubham","Ayush",
  "Pratik","Manish","Siddharth","Abhishek","Rajat",
  "Varun","Rohan","Tushar","Mayank","Gaurav",
  "Deepak","Vivek","Sandeep","Mohit","Nitin",
  "Sahil","Krishna","Parth","Dhruv","Chirag",
  "Lakshay","Aman","Tarun","Kartik","Aryan",
  "Dev","Rishabh","Naman","Ujjwal","Pulkit",
  "Tejas","Omkar","Atharva","Vedant","Pranav"
];

const femaleNames = [
  "Sneha","Priya","Neha","Anjali","Pooja",
  "Riya","Kavya","Aditi","Shreya","Meera",
  "Ishita","Nidhi","Simran","Muskan","Tanvi",
  "Sakshi","Khushi","Vaishnavi","Rashmi","Palak",
  "Anushka","Ritika","Madhuri","Prachi","Payal",
  "Komal","Divya","Shruti","Pallavi","Swati",
  "Naina","Tanya","Jiya","Bhavya","Trisha",
  "Avantika","Kiara","Navya","Aarohi","Diya",
  "Mahima","Radhika","Mitali","Sanya","Charu",
  "Niharika","Shalini","Sonal","Juhi","Ayesha"
];

const lastNames = [
  "Patil",
  "Sharma",
  "Kulkarni",
  "Deshmukh",
  "Joshi",
  "Jadhav",
  "Pawar",
  "More",
  "Shinde",
  "Chavan",
  "Gaikwad",
  "Kadam",
  "Rane",
  "Sawant",
  "Patankar",
  "Bhosale",
  "Mane",
  "Salunkhe",
  "Naik",
  "Yadav",
  "Gupta",
  "Agarwal",
  "Bansal",
  "Mittal",
  "Goyal",
  "Singhal",
  "Mahajan",
  "Jain",
  "Verma",
  "Tiwari",
  "Mishra",
  "Dubey",
  "Pandey",
  "Shukla",
  "Tripathi",
  "Srivastava",
  "Saxena",
  "Singh",
  "Rajput",
  "Rathore",
  "Chauhan",
  "Sisodia",
  "Tomar",
  "Solanki",
  "Mehta",
  "Shah",
  "Patel",
  "Bhatt",
  "Parikh",
  "Trivedi",
  "Desai",
  "Modi",
  "Kapoor",
  "Khanna",
  "Malhotra",
  "Arora",
  "Chopra",
  "Sethi",
  "Bedi",
  "Ahuja",
  "Gill",
  "Sandhu",
  "Brar",
  "Sidhu",
  "Grewal",
  "Cheema",
  "Reddy",
  "Rao",
  "Naidu",
  "Iyer",
  "Iyengar",
  "Nair",
  "Menon",
  "Pillai",
  "Krishnan",
  "Subramanian",
  "Banerjee",
  "Mukherjee",
  "Chatterjee",
  "Bose",
  "Das",
  "Dutta"
];

const cities = [
  "Pune",
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Surat",
  "Jaipur",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Bhopal",
  "Patna",
  "Ranchi",
  "Raipur",
];

const colleges = [
  "IIT Bombay",
  "IIT Delhi",
  "IIT Madras",
  "IIT Kanpur",
  "IIT Kharagpur",
  "IIT Roorkee",
  "IIT Guwahati",
  "IIT Hyderabad",
  "IIIT Hyderabad",
  "IIIT Bangalore",
  "IIIT Delhi",
  "IIIT Bhopal",
  "BITS Pilani",
  "BITS Goa",
  "BITS Hyderabad",
  "NIT Trichy",
  "NIT Surathkal",
  "NIT Warangal",
  "NIT Calicut",
  "NIT Rourkela",
  "NIT Bhopal",
  "NIT Jaipur",
  "VIT Vellore",
  "VIT Chennai",
  "SRM University",
  "Manipal University",
  "Thapar Institute",
  "DAIICT",
  "COEP Pune",
  "PICT Pune",
  "Walchand College",
  "College of Engineering Pune",
  "Jadavpur University",
  "Anna University",
  "Delhi University",
  "Mumbai University",
  "Pune University",
  "Osmania University",
  "Amity University",
  "Lovely Professional University",
  "Christ University",
  "NMIMS",
  "Symbiosis Pune",
  "IIM Ahmedabad",
  "IIM Bangalore",
  "IIM Calcutta",
  "IIM Lucknow",
  "IIM Indore",
  "IIM Kozhikode",
  "XLRI Jamshedpur",
  "SPJIMR Mumbai",
  "FMS Delhi",
  "IIFT Delhi",
  "ISM Dhanbad",
  "Shiv Nadar University",
  "Ashoka University",
  "BHU",
  "Aligarh Muslim University",
  "Jamia Millia Islamia",
  "Punjab University"
];

const degrees = [
  "B.Tech",
  "B.Tech IT",
  "B.Tech CSE",
  "B.Tech ECE",
  "B.Tech Mechanical",
  "B.Tech Civil",
  "BCA",
  "MCA",
  "B.Sc",
  "M.Sc",
  "MBA",
  "PGDM",
  "M.Tech",
  "B.Com",
  "M.Com",
  "CA",
  "CS",
  "MBBS",
  "BDS",
  "PhD"
];

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Apple",
  "Netflix",
  "Adobe",
  "Oracle",
  "Salesforce",
  "Uber",
  "Airbnb",
  "LinkedIn",
  "Nvidia",
  "Intel",
  "Cisco",
  "IBM",
  "SAP",
  "Atlassian",
  "Flipkart",
  "Swiggy",
  "Zomato",
  "Paytm",
  "PhonePe",
  "Razorpay",
  "CRED",
  "Meesho",
  "Myntra",
  "Groww",
  "Zerodha",
  "Freshworks",
  "Zoho",
  "Infosys",
  "TCS",
  "Wipro",
  "HCL",
  "Tech Mahindra",
  "Accenture",
  "Capgemini",
  "Deloitte",
  "PwC",
  "EY",
  "KPMG",
  "Goldman Sachs",
  "JP Morgan",
  "Morgan Stanley",
  "HSBC",
  "American Express",
  "Reliance",
  "Adani",
  "Tata Steel",
  "Tata Motors",
  "Mahindra",
  "Bajaj",
  "L&T",
  "Siemens",
  "Bosch",
  "Samsung",
  "Qualcomm",
  "Boeing",
  "Shell"
];

const designations = [
  "Software Engineer",
  "Senior Software Engineer",
  "SDE",
  "SDE II",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Analyst",
  "Data Scientist",
  "ML Engineer",
  "AI Engineer",
  "DevOps Engineer",
  "Cloud Engineer",
  "Product Manager",
  "Associate Product Manager",
  "Project Manager",
  "Business Analyst",
  "Consultant",
  "Senior Consultant",
  "QA Engineer",
  "Test Engineer",
  "Architect",
  "Solution Architect",
  "Technical Lead",
  "Engineering Manager",
  "Director",
  "HR Manager",
  "Recruiter",
  "Marketing Manager",
  "Sales Manager",
  "Finance Analyst",
  "Investment Banker",
  "Chartered Accountant",
  "Doctor",
  "Dentist",
  "Surgeon",
  "Professor",
  "Teacher",
  "Research Scientist",
  "Lawyer",
  "Advocate",
  "Entrepreneur",
  "Founder",
  "Co-Founder",
  "UX Designer",
  "UI Designer",
  "Graphic Designer",
  "Content Strategist",
  "Operations Manager",
  "Supply Chain Manager"
];

const hobbiesPool = [
  "Travel",
  "Fitness",
  "Reading",
  "Music",
  "Movies",
  "Cricket",
  "Football",
  "Badminton",
  "Tennis",
  "Swimming",
  "Cycling",
  "Running",
  "Yoga",
  "Meditation",
  "Hiking",
  "Camping",
  "Photography",
  "Cooking",
  "Baking",
  "Gardening",
  "Painting",
  "Sketching",
  "Dancing",
  "Singing",
  "Guitar",
  "Piano",
  "Writing",
  "Blogging",
  "Podcasting",
  "Gaming",
  "Chess",
  "Investing",
  "Trading",
  "Volunteering",
  "Animal Welfare",
  "Pets",
  "Fashion",
  "Interior Design",
  "Technology",
  "AI",
  "Robotics",
  "Astronomy",
  "Travel Vlogging",
  "Public Speaking",
  "Drama",
  "Standup Comedy",
  "Spirituality",
  "Social Work",
  "Food Exploration",
  "Car Enthusiast"
];

const castes = [
  "Maratha",
  "Brahmin",
  "Jain",
  "Rajput",
  "Patel"
];

const religions = [
  "Hindu",
  "Jain",
  "Sikh"
];

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomHobbies() {
  const shuffled = [...hobbiesPool]
    .sort(() => Math.random() - 0.5);

  return shuffled.slice(0, 5);
}

function randomDate(startYear, endYear) {
  const year =
    Math.floor(
      Math.random() *
      (endYear - startYear + 1)
    ) + startYear;

  const month =
    Math.floor(Math.random() * 12) + 1;

  const day =
    Math.floor(Math.random() * 28) + 1;

  return `${year}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
}

const maritalStatuses = [
  "Single",
  "Divorced",
  "Widowed"
];

function randomMaritalStatus() {
  const rand = Math.random();

  if (rand < 0.8) return "Single";
  if (rand < 0.95) return "Divorced";

  return "Widowed";
}

const languagesPool = [
  "Hindi",
  "English",
  "Marathi",
  "Gujarati",
  "Punjabi",
  "Bengali",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Odia",
  "Assamese",
  "Urdu",
  "Konkani"
];

function randomLanguages() {
  const shuffled = [...languagesPool]
    .sort(() => Math.random() - 0.5);

  const count =
    Math.floor(Math.random() * 4) + 1;

  return shuffled.slice(0, count);
}

function randomWantKids() {
  const rand = Math.random();

  if (rand < 0.6) return "Yes";
  if (rand < 0.85) return "Maybe";

  return "No";
}

const profiles = [];

let id = 1;

for(let i=0;i<100;i++) {

  profiles.push({
    id:id++,
    firstName:random(maleNames),
    lastName:random(lastNames),
    gender:"Male",
    dateOfBirth:randomDate(1988,2000),
    country:"India",
    city:random(cities),
    height:170 + Math.floor(Math.random()*20),
    email:`male${i}@gmail.com`,
    phone:`98${Math.floor(
      10000000 + Math.random()*90000000
    )}`,
    college:random(colleges),
    degree:random(degrees),
    income:
      500000 +
      Math.floor(Math.random()*3000000),
    currentCompany:random(companies),
    designation:random(designations),
    maritalStatus: randomMaritalStatus(),
    languagesKnown: randomLanguages(),
    siblings:
      Math.floor(Math.random()*4),
    caste:random(castes),
    religion:random(religions),
    wantKids:randomWantKids(),
    openToRelocate:random([
      "Yes",
      "No",
      "Maybe"
    ]),
    openToPets:random([
      "Yes",
      "No",
      "Maybe"
    ]),
    hobbies:randomHobbies(),
    verified:
      Math.random()>0.15
        ? "Yes"
        : "No"
  });
}

for(let i=0;i<100;i++) {

  profiles.push({
    id:id++,
    firstName:random(femaleNames),
    lastName:random(lastNames),
    gender:"Female",
    dateOfBirth:randomDate(1990,2004),
    country:"India",
    city:random(cities),
    height:150 + Math.floor(Math.random()*25),
    email:`female${i}@gmail.com`,
    phone:`97${Math.floor(
      10000000 + Math.random()*90000000
    )}`,
    college:random(colleges),
    degree:random(degrees),
    income:
      400000 +
      Math.floor(Math.random()*2500000),
    currentCompany:random(companies),
    designation:random(designations),
    maritalStatus: randomMaritalStatus(),
    languagesKnown: randomLanguages(),
    siblings:
      Math.floor(Math.random()*4),
    caste:random(castes),
    religion:random(religions),
    wantKids:randomWantKids(),
    openToRelocate:random([
      "Yes",
      "No",
      "Maybe"
    ]),
    openToPets:random([
      "Yes",
      "No",
      "Maybe"
    ]),
    hobbies:randomHobbies(),
    verified:
      Math.random()>0.15
        ? "Yes"
        : "No"
  });
}

fs.writeFileSync(
  "customers.json",
  JSON.stringify(profiles,null,2)
);

console.log(
  `${profiles.length} profiles generated`
);