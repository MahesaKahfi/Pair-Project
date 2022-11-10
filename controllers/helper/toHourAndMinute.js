module.exports = function toHourAndMinute(createdAt) {
  let now = createdAt.toLocaleString()
  return now.slice(12, 17)
}