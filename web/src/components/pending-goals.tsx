import { Plus } from 'lucide-react'
import { OutlineButton } from './ui/outline-button'
import { getPendingGoals } from '../http/get-pending-goals'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createGoalCompletion } from '../http/create-goal-completion'
import { Toast } from 'primereact/toast'
import { useRef } from 'react'

export function PendingGoals() {
  const queryClient = useQueryClient()
  const toast = useRef<Toast>(null)

  const { data } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60, // 60 seconds
  })

  if (!data) {
    return null
  }

  const showSuccess = (message: string) => {
    console.log(toast)

    if (toast.current) {
      toast.current.show({
        severity: 'success',
        summary: 'Success',
        detail: message,
        life: 3000,
      })
    }
  }

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId)

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
    showSuccess('Goal completion created!')
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Toast ref={toast} />
      {data.map(goal => {
        return (
          <OutlineButton
            key={goal.id}
            disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
            onClick={() => handleCompleteGoal(goal.id)}
          >
            <Plus className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}
