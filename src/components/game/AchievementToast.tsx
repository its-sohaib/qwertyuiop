import { AnimatePresence, motion } from 'framer-motion'
import './AchievementToast.css'

type Props = {
  message: string | null
}

export function AchievementToast({ message }: Props) {
  return (
    <div className="ach-toast" aria-live="polite">
      <AnimatePresence>
        {message && (
          <motion.div
            className="ach-toast__card"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="status"
          >
            <div className="ach-toast__icon" aria-hidden="true">
              🏆
            </div>
            <div>
              <p className="ach-toast__label">Achievement unlocked!</p>
              <p className="ach-toast__title">{message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
