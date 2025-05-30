import { MdLocationOn } from "react-icons/md";

const education = [
  {
    location: "Suratkal, Mangalore, KN",
    degree: "Information Technology",
    institution: "NITK",
    duration: "2023-2027",
    details: "Learned Core Concepts - OOPS, CN, OS, DSA, DBMS",
  },
];

export default function EducationSection() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-8">Education</h2>
      {education.map((edu, idx) => (
        <div
          key={idx}
          className="bg-transparent border-l-2 border-neutral-700 pl-6 mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2 sm:mb-0">
              <MdLocationOn className="inline-block" />
              <span>{edu.location}</span>
            </div>
            <div className="text-gray-400 text-sm">{edu.duration}</div>
          </div>
          <div className="font-bold text-lg text-white">{edu.degree}</div>
          <div className="text-gray-300 text-base mb-2">{edu.institution}</div>
          <div className="text-gray-400 text-base">{edu.details}</div>
        </div>
      ))}
    </section>
  );
}
