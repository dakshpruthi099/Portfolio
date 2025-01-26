import { motion } from 'framer-motion'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

interface NotificationProps {
  type: 'success' | 'error'
  message: string
}

export default function Notification({ type, message }: NotificationProps) {
  const Icon = type === 'success' ? CheckCircleIcon : XCircleIcon
  const bgColor = type === 'success' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'
  const textColor = type === 'success' ? 'text-green-500' : 'text-red-500'

  return (
    <div className='mt-4'>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`${bgColor} ${textColor} p-4 rounded-lg flex items-center gap-2`}
    >
      <Icon className="h-5 w-5" />
      <span>{message}</span>
    </motion.div>
    </div>
  )
}