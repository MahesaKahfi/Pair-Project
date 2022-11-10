module.exports = function toHourAndMinute(createdAt) {
  let hour
  let min
  if (createdAt.getMinutes().toString().length === 1) min = `0${createdAt.getMinutes()}`
  else min = createdAt.getMinutes()
  if (createdAt.getHours().toString().length === 1) hour = `0${createdAt.getHours()}`
  else hour = createdAt.getHours()
  return `${hour}:${min}`
}