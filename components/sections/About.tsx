import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaBriefcase, FaGraduationCap, FaTrophy } from 'react-icons/fa'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'

interface ExperienceDetails {
  company: string
  role: string
  date: string
  location: string
  details: string[]
}

export default function About() {
  const [expandedExp, setExpandedExp] = useState<string | null>(null)

  const experiences: ExperienceDetails[] = [
    {
      company: "Sprowt",
      role: "Software Engineer",
      date: "September 2024 – Present",
      location: "NJ",
      details: [
        "Leading development of microservices architecture",
        "Implementing CI/CD pipelines with Jenkins",
        "Optimizing database performance"
      ]
    },
    {
      company: "Bespoke Digital Media",
      role: "Software Developer",
      date: "May 2023 – August 2023",
      location: "New Delhi",
      details: [
        "Developed RESTful APIs using Spring Boot",
        "Implemented caching solutions with Redis",
        "Enhanced system monitoring with Prometheus"
      ]
    },
    {
      company: "FIS",
      role: "Senior Analyst",
      date: "July 2019 – March 2021",
      location: "Maharashtra",
      details: [
        "Developed and maintained core banking applications",
        "Optimized SQL queries improving performance by 40%",
        "Implemented automated testing reducing bugs by 30%"
      ]
    },
    {
      company: "Panasonic",
      role: "Software Engineer Intern",
      date: "July 2018 – August 2018",
      location: "Haryana",
      details: [
        "Developed automation scripts for testing",
        "Assisted in implementing new features",
        "Collaborated with cross-functional teams"
      ]
    }

  ]

  const stats = [
    { label: "Years Experience", value: "2+" },
    { label: "Projects Completed", value: "20+" },
    { label: "Technologies", value: "15+" }
  ]

  const education = [
    {
      degree: "Master of Science in Computer Science",
      school: "Stevens Institute of Technology",
      date: "2022 - 2024",
      location: "Hoboken, NJ",
      gpa: "3.63/4.0"
    },
    {
      degree: "Bachelor of Technology in Computer Science",
      school: "Bharati Vidyapeeth University",
      date: "2015 - 2019",
      location: "India",
      gpa: "B+"
    }
  ]

  const achievements = [
    "System Scalability: Led migration to microservices, achieving 70% improvement",
    "Performance Optimization: Reduced API response times by 60%",
    "Event Processing: Built pipeline with 99.99% system reliability"
  ]
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-all"
              >
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* About Text */}
            <div className="space-y-6">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I&apos;m passionate about building modern web applications. 
                With a strong foundation in both frontend and backend technologies, I create seamless 
                digital experiences that solve real-world problems.
              </p>
              
              {/* Work Experience */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FaBriefcase className="text-primary" />
                  <h3 className="text-xl font-semibold">Work Experience</h3>
                </div>
                
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <motion.div
                      key={exp.company}
                      className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-all cursor-pointer"
                      onClick={() => setExpandedExp(expandedExp === exp.company ? null : exp.company)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{exp.role} - {exp.company}, {exp.location}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{exp.date}</div>
                        </div>
                        {expandedExp === exp.company ? <HiChevronUp /> : <HiChevronDown />}
                      </div>
                      
                      {expandedExp === exp.company && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside"
                        >
                          {exp.details.map((detail, index) => (
                            <li key={index}>{detail}</li>
                          ))}
                        </motion.ul>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Education and Achievements */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FaGraduationCap className="text-primary" />
                  <h3 className="text-xl font-semibold">Education</h3>
                </div>
                
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.school} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="font-medium">{edu.degree}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{edu.school}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {edu.date} | {edu.location} | GPA: {edu.gpa}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FaTrophy className="text-primary" />
                  <h3 className="text-xl font-semibold">Achievements</h3>
                </div>
                
                <ul className="space-y-2">
                  {achievements.map((achievement, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}