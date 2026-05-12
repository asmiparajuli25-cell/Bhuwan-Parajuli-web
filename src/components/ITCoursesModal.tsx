import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Code, Database, Monitor, Shield, Network, GraduationCap, ArrowRight, ArrowLeft } from 'lucide-react';

interface ITCoursesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const courses = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Learn to build modern, responsive websites and applications using HTML, CSS, JavaScript, and modern frameworks like React and Node.js.',
    icon: <Code size={24} className="text-emerald-500" />,
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2000',
    color: 'from-emerald-500/20 to-emerald-900/40',
    borderColor: 'border-emerald-500/30',
    instructor: {
      name: 'Sarah Jenkins',
      role: 'Senior Full-stack Engineer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150'
    },
    tags: ['React', 'Node.js', 'Typescript'],
    features: ['12 Real-world projects', 'Code reviews', 'Portfolio building'],
    details: {
      overview: 'Our Web Development track is designed to take you from a beginner to a job-ready full-stack developer. You will build real-world projects and learn the best practices of modern web engineering.',
      duration: '12 Weeks',
      level: 'Beginner to Intermediate',
      modules: [
        { title: 'HTML5, CSS3, & Responsive Design', description: 'Master semantic HTML, CSS Grid, Flexbox, and Tailwind CSS.', image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=300' },
        { title: 'JavaScript (ES6+) & DOM Manipulation', description: 'Learn logic, data structures, and how to dynamically update the DOM.', image: 'https://images.unsplash.com/photo-1627398246734-d082736b0404?q=80&w=300' },
        { title: 'React.js & State Management', description: 'Build interactive user interfaces with components, hooks, and Redux.', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=300' },
        { title: 'Node.js, Express & REST APIs', description: 'Create powerful backend services and robust APIs for web applications.', image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=300' },
        { title: 'Database Management (MongoDB & PostgreSQL)', description: 'Structure and query data securely with both NoSQL and SQL databases.', image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=300' },
      ],
      careerOutcomes: ['Frontend Developer', 'Backend Developer', 'Full-stack Engineer']
    }
  },
  {
    id: 'data-science',
    title: 'Data Science & AI',
    description: 'Master data analysis, machine learning algorithms, and artificial intelligence using Python, R, and specialized libraries.',
    icon: <Database size={24} className="text-blue-500" />,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000',
    color: 'from-blue-500/20 to-blue-900/40',
    borderColor: 'border-blue-500/30',
    instructor: {
      name: 'Dr. Alan Turing',
      role: 'AI Researcher',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150'
    },
    tags: ['Python', 'TensorFlow', 'SQL'],
    features: ['Real datasets', 'Machine learning models', 'Kaggle competitions'],
    details: {
      overview: 'Dive deep into the world of Data Science and Artificial Intelligence. Learn how to extract insights from complex datasets and build predictive models.',
      duration: '16 Weeks',
      level: 'Intermediate',
      modules: [
        { title: 'Python Programming & Data Structures', description: 'Analyze data and build powerful scripts with Python fundamentals.', image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?q=80&w=300' },
        { title: 'Data Analysis (Pandas, NumPy)', description: 'Clean, manipulate, and analyze datasets with high-performance tools.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300' },
        { title: 'Data Visualization (Matplotlib, Seaborn)', description: 'Create beautiful, interactive charts and identify data trends.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300' },
        { title: 'Machine Learning Algorithms (Scikit-learn)', description: 'Train predictive models and evaluate model performance.', image: 'https://images.unsplash.com/photo-1518932945647-7a3c9692214f?q=80&w=300' },
        { title: 'Deep Learning Basics (TensorFlow/Keras)', description: 'Develop neural networks and understand advanced AI concepts.', image: 'https://images.unsplash.com/photo-1620712948343-0008ce8440ce?q=80&w=300' },
      ],
      careerOutcomes: ['Data Analyst', 'Data Scientist', 'Machine Learning Engineer']
    }
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Protect systems and networks from digital attacks. Learn ethical hacking, cryptography, and security protocols.',
    icon: <Shield size={24} className="text-rose-500" />,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000',
    color: 'from-rose-500/20 to-rose-900/40',
    borderColor: 'border-rose-500/30',
    instructor: {
      name: 'Alex Harper',
      role: 'Security Analyst',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150'
    },
    tags: ['Linux', 'Networking', 'Python'],
    features: ['Live hack labs', 'Cert prep (CEH)', 'Vulnerability testing'],
    details: {
      overview: 'Develop the skills to defend against modern cyber threats. This course covers everything from network security to penetration testing and ethical hacking.',
      duration: '14 Weeks',
      level: 'All Levels',
      modules: [
        { title: 'Introduction to Cybersecurity & Networking', description: 'Understand basic networking protocols and the threat landscape.', image: 'https://images.unsplash.com/photo-1614064641913-6b7140414c71?q=80&w=300' },
        { title: 'Linux Administration & Security', description: 'Master command-line tools and secure server environments.', image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=300' },
        { title: 'Vulnerability Assessment & Penetration Testing', description: 'Identify weak points in applications and infrastructure actively.', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=300' },
        { title: 'Cryptography & Network Security', description: 'Explore encryption, hash algorithms, and securing network traffic.', image: 'https://images.unsplash.com/photo-1510511459019-5efa7aeeb4c6?q=80&w=300' },
        { title: 'Incident Response & Forensics', description: 'Investigate breaches, collect evidence, and mitigate security incidents.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=300' },
      ],
      careerOutcomes: ['Security Analyst', 'Penetration Tester', 'Cybersecurity Engineer']
    }
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Computing',
    description: 'Design and manage scalable cloud infrastructure across AWS, Azure, or Google Cloud platforms.',
    icon: <Network size={24} className="text-purple-500" />,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000',
    color: 'from-purple-500/20 to-purple-900/40',
    borderColor: 'border-purple-500/30',
    instructor: {
      name: 'Michael Chen',
      role: 'Cloud Architect',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150'
    },
    tags: ['AWS', 'Docker', 'Kubernetes'],
    features: ['Deploy real apps', 'Architect scalable infra', 'AWS cert prep'],
    details: {
      overview: 'Master the cloud and learn to build scalable, fault-tolerant, and highly available systems on modern cloud providers.',
      duration: '10 Weeks',
      level: 'Intermediate',
      modules: [
        { title: 'Cloud Computing Fundamentals', description: 'Learn concepts like virtualization, containers, and serverless architectures.', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=300' },
        { title: 'AWS/Azure Core Services', description: 'Navigate cloud providers, compute instances, storage, and IAM.', image: 'https://images.unsplash.com/photo-1558486012-817176f84c6d?q=80&w=300' },
        { title: 'Infrastructure as Code (Terraform)', description: 'Automate infrastructure provisioning using leading IaC tools.', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=300' },
        { title: 'Serverless Architecture', description: 'Design robust, event-driven platforms without managing servers.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=300' },
        { title: 'Cloud Security & Architecture Best Practices', description: 'Design highly available, secure, and cost-effective cloud systems.', image: 'https://images.unsplash.com/photo-1614064641913-6b7140414c71?q=80&w=300' },
      ],
      careerOutcomes: ['Cloud Engineer', 'DevOps Engineer', 'Cloud Architect']
    }
  },
  {
    id: 'mobile-dev',
    title: 'Mobile App Development',
    description: 'Create native and cross-platform mobile applications for iOS and Android using Swift, Kotlin, or React Native.',
    icon: <Monitor size={24} className="text-amber-500" />,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2000',
    color: 'from-amber-500/20 to-amber-900/40',
    borderColor: 'border-amber-500/30',
    instructor: {
      name: 'Priya Sharma',
      role: 'Mobile Lead Engineer',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150'
    },
    tags: ['React Native', 'Swift', 'Kotlin'],
    features: ['App store deployment', 'Native APIs', 'State management'],
    details: {
      overview: 'Learn to build powerful and beautiful mobile applications for both iOS and Android platforms, focusing on modern frameworks and app store deployment.',
      duration: '12 Weeks',
      level: 'Beginner to Intermediate',
      modules: [
        { title: 'Mobile UI/UX Principles', description: 'Understand touch patterns, responsive layouts, and native navigation.', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=300' },
        { title: 'Cross-platform Development with React Native/Flutter', description: 'Write code once to deploy to both Apple and Android platforms securely.', image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=300' },
        { title: 'State Management and API Integration', description: 'Connect mobile apps to backend services securely and efficiently.', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=300' },
        { title: 'Device Hardware & Offline Functionality', description: 'Utilize cameras, GPS, and offline local-first databases seamlessly.', image: 'https://images.unsplash.com/photo-1614064641913-6b7140414c71?q=80&w=300' },
        { title: 'App Store & Play Store Deployment', description: 'Handle signing, releasing, and updating apps via the official stores.', image: 'https://images.unsplash.com/photo-1521747116042-5a810fda9664?q=80&w=300' },
      ],
      careerOutcomes: ['Mobile App Developer', 'React Native Developer', 'iOS/Android Developer']
    }
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description: 'Design intuitive and visually appealing digital experiences, focusing on user behavior and interface aesthetics.',
    icon: <Monitor size={24} className="text-pink-500" />,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000',
    color: 'from-pink-500/20 to-pink-900/40',
    borderColor: 'border-pink-500/30',
    instructor: {
      name: 'David Lee',
      role: 'Product Designer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150'
    },
    tags: ['Figma', 'UX Research', 'Prototyping'],
    features: ['User testing', 'Wireframing', 'Design systems'],
    details: {
      overview: 'Transform your creativity into functional design. Learn user research, wireframing, prototyping, and how to create stunning user interfaces.',
      duration: '10 Weeks',
      level: 'All Levels',
      modules: [
        { title: 'Design Thinking & User Research', description: 'Discover user pain points and define effective interactive solutions deeply.', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=300' },
        { title: 'Wireframing & Prototyping (Figma)', description: 'Master Figma to layout screens and create interactive clickable prototypes.', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=300' },
        { title: 'UI Design Principles & Typography', description: 'Enhance visual focus with professional spacing, colors and font selections.', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=300' },
        { title: 'Interaction Design & Micro-animations', description: 'Implement polished transitions and feedback for interactive interfaces.', image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=300' },
        { title: 'Portfolio Building & Case Studies', description: 'Curate your design work into a coherent showcase for potential clients.', image: 'https://images.unsplash.com/photo-1491897554428-130a60dd4757?q=80&w=300' },
      ],
      careerOutcomes: ['UI Designer', 'UX Researcher', 'Product Designer']
    }
  }
];

export default function ITCoursesModal({ isOpen, onClose }: ITCoursesModalProps) {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleClose = () => {
    setSelectedCourseId(null);
    onClose();
  };

  const selectedCourse = courses.find(c => c.id === selectedCourseId);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-800/50">
            <div className="flex items-center gap-3">
              {selectedCourseId ? (
                <button 
                  onClick={() => setSelectedCourseId(null)}
                  className="w-10 h-10 rounded-xl bg-slate-700/50 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-600 transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <GraduationCap size={24} />
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-white">
                  {selectedCourseId ? selectedCourse?.title : 'IT Courses & Tracks'}
                </h2>
                <p className="text-xs text-slate-400">
                  {selectedCourseId ? 'Course Details' : 'Explore career paths in technology'}
                </p>
              </div>
            </div>
            <button 
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto custom-scrollbar flex-1 bg-slate-900/80 relative">
            <AnimatePresence mode="wait">
              {!selectedCourseId ? (
                <motion.div 
                  key="grid"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6 md:p-8"
                >
                  <div className="text-center mb-10 max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold text-white mb-3">Discover Your Tech Journey</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Whether you want to build websites, analyze data, or secure networks, there's a path for you in the IT industry. Explore our comprehensive course tracks below.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                      <motion.div 
                        key={course.id}
                        whileHover={{ y: -5 }}
                        onClick={() => setSelectedCourseId(course.id)}
                        className={`group relative bg-slate-800/50 rounded-2xl overflow-hidden border ${course.borderColor} transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/20 flex flex-col cursor-pointer`}
                      >
                        {/* Image Header */}
                        <div className="h-40 relative overflow-hidden shrink-0">
                          <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10 duration-300"></div>
                          <img 
                            src={course.image} 
                            alt={course.title} 
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${course.color} mix-blend-multiply z-0`}></div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-slate-900/50 shadow-inner">
                              {course.icon}
                            </div>
                            <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{course.title}</h4>
                          </div>
                          
                          <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">
                            {course.description}
                          </p>

                          <div className="space-y-4 mb-6">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                              {course.tags.map(tag => (
                                <span key={tag} className="px-2.5 py-1 rounded-md bg-slate-800 text-[11px] font-medium text-slate-300 border border-slate-700/50">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            
                            {/* Features */}
                            <ul className="space-y-1.5">
                              {course.features.map(feature => (
                                <li key={feature} className="flex items-center gap-2 text-xs text-slate-400">
                                  <div className="w-1 h-1 rounded-full bg-blue-500/50"></div>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            
                            {/* Instructor */}
                            <div className="flex items-center gap-2.5 pt-2 border-t border-slate-800/50">
                              <img src={course.instructor.image} alt={course.instructor.name} className="w-8 h-8 rounded-full object-cover border border-slate-700" />
                              <div>
                                <p className="text-xs font-bold text-slate-300">{course.instructor.name}</p>
                                <p className="text-[10px] text-slate-500">{course.instructor.role}</p>
                              </div>
                            </div>
                          </div>

                          <button 
                            onClick={() => setSelectedCourseId(course.id)}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-700/50 hover:bg-blue-600 text-white text-sm font-semibold transition-all duration-300 group-hover:shadow-md mt-auto"
                          >
                            <span>View Details</span>
                            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-0"
                >
                  {selectedCourse && (
                    <div className="flex flex-col md:flex-row h-full">
                      {/* Left: Image & Quick Stats */}
                      <div className="md:w-5/12 relative bg-slate-900 border-r border-slate-800">
                        <div className="h-48 md:h-64 relative overflow-hidden">
                          <img 
                            src={selectedCourse.image} 
                            alt={selectedCourse.title} 
                            className="w-full h-full object-cover"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${selectedCourse.color} opacity-80 mix-blend-multiply`}></div>
                          <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-slate-900 to-transparent">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="p-2 rounded-lg bg-slate-900/80 shadow-inner">
                                {selectedCourse.icon}
                              </div>
                            </div>
                            <h2 className="text-3xl font-extrabold text-white mb-2">{selectedCourse.title}</h2>
                          </div>
                        </div>

                        <div className="p-6 md:p-8 space-y-6">
                            <div>
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-tighter mb-1">Duration</h4>
                                <p className="text-lg font-medium text-white">{selectedCourse.details.duration}</p>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-tighter mb-1">Level</h4>
                                <p className="text-lg font-medium text-white">{selectedCourse.details.level}</p>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-tighter mb-3">Career Outcomes</h4>
                                <ul className="space-y-2">
                                    {selectedCourse.details.careerOutcomes.map((outcome, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-slate-300 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                            {outcome}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="pt-6">
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-tighter mb-3">Your Instructor</h4>
                                <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                                  <img src={selectedCourse.instructor.image} alt={selectedCourse.instructor.name} className="w-10 h-10 rounded-full object-cover border-2 border-slate-700" />
                                  <div>
                                    <p className="text-sm font-bold text-slate-200">{selectedCourse.instructor.name}</p>
                                    <p className="text-[11px] text-slate-400">{selectedCourse.instructor.role}</p>
                                  </div>
                                </div>
                            </div>
                            <div className="pt-6">
                                <button className="w-full py-3 px-4 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 transition-all active:scale-95">
                                    Enroll Now
                                </button>
                            </div>
                        </div>
                      </div>

                      {/* Right: Overview & Modules */}
                      <div className="md:w-7/12 p-6 md:p-10 bg-slate-900">
                        <div className="mb-10">
                            <h3 className="text-xl font-bold text-white mb-4">Course Overview</h3>
                            <p className="text-slate-300 leading-relaxed">
                                {selectedCourse.details.overview}
                            </p>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold text-white mb-6">What You Will Learn</h3>
                            <div className="space-y-4">
                                {selectedCourse.details.modules.map((mod, idx) => (
                                    <div key={idx} className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 transition-colors group">
                                        <div className="w-full sm:w-20 h-32 sm:h-20 shrink-0 overflow-hidden rounded-lg border border-slate-700/50 group-hover:border-slate-500/50 transition-colors">
                                            <img src={(mod as {image: string, title: string, description: string}).image} alt={(mod as {image: string, title: string, description: string}).title} className="w-full h-full object-cover shadow-sm group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <div className="flex items-start gap-2 mb-2">
                                                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs shrink-0 mt-0.5">
                                                    {idx + 1}
                                                </div>
                                                <h4 className="text-slate-200 font-bold leading-tight">{(mod as {image: string, title: string, description: string}).title}</h4>
                                            </div>
                                            <p className="text-sm text-slate-400 leading-relaxed">{(mod as {image: string, title: string, description: string}).description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

