import GroupModel from '../models/Group.js'

export const getGroupTasks = async (groupId) => {
   return await GroupModel.findById(groupId).populate('tasks').lean()
}