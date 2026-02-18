/**
 * Sample mind map data (ESS coursework roadmap style).
 * Structure: { name, children? } for tree. Later can be replaced by API/PDF-generated data.
 */
export const mindmapSampleData = {
  name: "ESS coursework roadmap",
  children: [
    {
      name: "Beginning Programming",
      children: [
        {
          name: "HTML/CSS",
          children: [
            { name: "Introduction" },
            { name: "HTML Styling" },
            { name: "Cascading Style Sheets" },
            { name: "JavaScript Intro" },
          ],
        },
        {
          name: "Excel/VBA",
          children: [
            { name: "Formulas" },
            { name: "Conditional Formatting" },
            { name: "PivotTables" },
            { name: "Macros and VBA" },
          ],
        },
        {
          name: "Access",
          children: [
            { name: "Database Structure" },
            { name: "Queries" },
            { name: "Reports and Forms" },
          ],
        },
      ],
    },
    {
      name: "C++ Programming",
      children: [
        {
          name: "Data Types",
          children: [
            { name: "Integers" },
            { name: "Floating point" },
            { name: "Char" },
            { name: "String" },
          ],
        },
        {
          name: "Operators",
          children: [
            { name: "Arithmetic (+,-,*,/,%)" },
            { name: "Relational (<,>,==,!=,<=,>=)" },
            { name: "Logical (&&,||,!)" },
            { name: "Increment/Decrement (++,--)" },
            { name: "Bitwise (&,|,^,~,<<,>>)" },
          ],
        },
        {
          name: "Control Structures",
          children: [
            { name: "If/Else/Else If" },
            { name: "Switch Statement" },
            { name: "Loops" },
          ],
        },
      ],
    },
    {
      name: "Visual Basic",
      children: [
        {
          name: "General Overview",
          children: [
            { name: "The IDE" },
            { name: "Variables & Types" },
            { name: "Input & Output" },
          ],
        },
        {
          name: "Loop & Decisions",
          children: [
            { name: "If Statements" },
            { name: "Select Case" },
            { name: "For Loop" },
            { name: "Do Loop" },
            { name: "While Loop" },
          ],
        },
        {
          name: "Procedures",
          children: [
            { name: "Sub" },
            { name: "Function" },
            { name: "Parameters" },
          ],
        },
      ],
    },
    {
      name: "Advanced Programming",
      children: [
        {
          name: "Functions",
          children: [
            { name: "Pass by value" },
            { name: "Pass by Reference" },
            { name: "Overloading" },
            { name: "Recursion" },
            { name: "Pointers" },
          ],
        },
        {
          name: "Arrays & Pointers",
          children: [
            { name: "1-D Arrays" },
            { name: "Multi-Dimensional Arrays" },
            { name: "Pointers to Arrays" },
            { name: "Dynamic Memory Allocation" },
          ],
        },
        {
          name: "The Preprocessor",
          children: [
            { name: "#include" },
            { name: "#define" },
            { name: "#ifdef" },
          ],
        },
      ],
    },
    {
      name: "Database Security",
      children: [
        {
          name: "Threats and Vulnerabilities",
          children: [
            { name: "Unauthorized Access" },
            { name: "Data Corruption" },
            { name: "Denial of Service" },
          ],
        },
        {
          name: "Security Measures",
          children: [
            { name: "Authentication" },
            { name: "Encryption" },
            { name: "Backup and Recovery" },
          ],
        },
      ],
    },
  ],
};
