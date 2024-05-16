import dbConnect from '@/lib/dbConnect'
import TaskFazt from '@/models/TaskFazt'

async function loadTasks() {
    dbConnect()
    const tasks = await TaskFazt.find()
    console.log(tasks)
    return tasks
}

async function TasksFazt() {
    const tasks =  await loadTasks()
  return (
    <div className="text-white mt-20">
        {tasks?.map(task => (
          <div key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
        ))}
    </div>
  )
}

export default TasksFazt