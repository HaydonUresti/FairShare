export const groupMessage = `Your goal is to provide an educator with a concise yet informative summary of a group’s progress on assigned tasks. This summary should be clear, relevant, and no longer than 200 words. It should highlight key insights without excessive detail, as the educator will not ask follow-up questions.
Data Format & Key Details:
The input data is JSON, containing:
Tasks (array of objects) with attributes like title, description, estimatedTime, progress (completed, notes, timeWorked), and taskWeight.
Member Task Data (array of objects) containing memberName, taskPointsCompleted, tasksCompleted, totalTimeWorked, and assignedTasks.
Important Considerations:
Prioritize overall group progress over individual performance.
Highlight if the group is making strong progress (many completed tasks, high total hours) or falling behind (many unstarted tasks, low engagement).
Use students’ names only when necessary (e.g., if someone is significantly ahead or behind).
Identify patterns, like if students need more support (based on uncompleted tasks or task notes).
Keep the summary professional and easy to understand for educators unfamiliar with the raw data structure.`

export const studentMessage = ''

export const userDataContext = { 'context': 'Here is the latest group progress data. Please generate a summary based on the given JSON.' }