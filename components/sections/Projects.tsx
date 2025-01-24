import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
  details: string[]
}

const projects: Project[] = [
  {
    title: "Event-Driven Payment Gateway",
    description: "A high-performance payment processing system built with Java Spring Boot and Kafka, handling millions of transactions with 99.99% reliability.",
    image: "/payment-gateway.png",
    technologies: [
      "Java",
      "Spring Boot",
      "Kafka",
      "MySQL",
      "OAuth2.0",
      "JWT",
      "Docker",
      "Jenkins"
    ],
    details: [
      "Engineered using Java Spring Boot with Kafka for real-time event processing",
      "Reduced transaction failures by 30% through robust error handling",
      "Implemented OAuth2.0 and JWT for secure payment transactions",
      "Optimized MySQL performance with indexing and sharding, reducing load times by 40%"
    ],
    githubUrl: "https://github.com/dakshpruthi099/payment-gateway",
    liveUrl: "https://payment-gateway-demo.com"
  },
  {
    title: "E-commerce Microservices Platform",
    description: "A scalable microservices architecture for online retail, supporting 100K+ concurrent users with sub-second response times.",
    image: "/e-commerce.png",
    technologies: [
      "Java",
      "Spring Boot",
      "Redis",
      "Kafka",
      "Kubernetes",
      "Docker",
      "Prometheus",
      "Grafana"
    ],
    details: [
      "Architected scalable microservices using Java, Spring Boot, and Kubernetes",
      "Reduced cart abandonment by 25% through personalized recommendations",
      "Implemented real-time fraud detection using Spring Security and JWT",
      "Enhanced monitoring with Prometheus and Grafana for performance optimization"
    ],
    githubUrl: "https://github.com/dakshpruthi099/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.com"
  }
]

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>
                  
                  <ul className="list-disc list-inside mb-4 text-gray-600 dark:text-gray-400 space-y-2">
                    {project.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary"
                    >
                      <FaGithub /> Code
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}