import { motion } from 'framer-motion'
import {
  FaJava,
  FaAws,
  FaDocker,
  FaPython,
  FaDatabase,
  FaJenkins,
  FaNode,
  FaReact,
} from 'react-icons/fa'
import {
  SiSpring,
  SiKubernetes,
  SiApachekafka,
  SiRedis,
  SiMongodb,
  SiPostgresql,
  SiTerraform,
  SiAnsible,
  SiGrafana,
  SiElasticsearch,
  SiTypescript,
  SiNextdotjs,
  SiJunit5,
  SiGithubactions,
  SiPrometheus,
  SiJira,
  SiConfluence,
  SiMysql,
} from 'react-icons/si'

const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'Java', icon: FaJava },
      { name: 'Python', icon: FaPython },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'SQL', icon: FaDatabase },
    ],
  },
  {
    title: 'Frameworks',
    skills: [
      { name: 'Spring Boot', icon: SiSpring },
      { name: 'React', icon: FaReact },
      { name: 'Node.js', icon: FaNode },
      { name: 'Next.js', icon: SiNextdotjs },
    ],
  },
  {
    title: 'Databases & Caching',
    skills: [
      { name: 'MySQL', icon: SiMysql },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'Redis', icon: SiRedis },
    ],
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', icon: FaAws },
      { name: 'Docker', icon: FaDocker },
      { name: 'Kubernetes', icon: SiKubernetes },
      { name: 'Jenkins', icon: FaJenkins },
      { name: 'Terraform', icon: SiTerraform },
      { name: 'GitHub Actions', icon: SiGithubactions },
    ],
  },
  {
    title: 'Infrastructure & Tools',
    skills: [
      { name: 'Kafka', icon: SiApachekafka },
      { name: 'Elasticsearch', icon: SiElasticsearch },
      { name: 'Prometheus', icon: SiPrometheus },
      { name: 'Grafana', icon: SiGrafana },
      { name: 'JUnit', icon: SiJunit5 },
      { name: 'Ansible', icon: SiAnsible },
    ],
  },
  {
    title: 'Project Management',
    skills: [
      { name: 'Agile/Scrum', icon: SiJira },
      { name: 'Jira', icon: SiJira },
      { name: 'Confluence', icon: SiConfluence },
      { name: 'Git', icon: SiGithubactions },
    ],
  }
]

export default function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <h2 className="text-3xl font-bold">Skills & Technologies</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold">{category.title}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                    >
                      <skill.icon className="h-6 w-6 text-primary" />
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}