function postTime(createdAt) {
  let newTimeHourArr = new Date().toISOString().split('T')[1].split('.')[0].split(':')
  let postTimeHourArr = new Date(createdAt).toISOString().split('T')[1].split('.')[0].split(':')
  let newTimeDayArr = new Date().toISOString().split('T')[0].split('-')
  let postTimeDayArr = new Date(createdAt).toISOString().split('T')[0].split('-')
  let timeDifference
  if (Number(newTimeDayArr[0])-Number(postTimeDayArr[0]) === 0) {
    if (Number(newTimeDayArr[1])-Number(postTimeDayArr[1]) === 0) {
      if (Number(newTimeDayArr[2])-Number(postTimeDayArr[2]) === 0) {
        if (Number(newTimeHourArr[0])-Number(postTimeHourArr[0]) === 0) {
          if (Number(newTimeHourArr[1])-Number(postTimeHourArr[1]) === 0) {
            if (Number(newTimeHourArr[2])-Number(postTimeHourArr[2]) === 0) {
              timeDifference = `Just Posted`
            } else {
              if (Number(newTimeHourArr[2])-Number(postTimeHourArr[2]) === 1) {
                timeDifference = `${Number(newTimeHourArr[2])-Number(postTimeHourArr[2])} second ago`
              } else {
                timeDifference = `${Number(newTimeHourArr[2])-Number(postTimeHourArr[2])} seconds ago`
              }
            }
          } else {
            if (Number(newTimeHourArr[1])-Number(postTimeHourArr[1]) === 1) {
              timeDifference = `${Number(newTimeHourArr[1])-Number(postTimeHourArr[1])} minute ago`
            } else {
              timeDifference = `${Number(newTimeHourArr[1])-Number(postTimeHourArr[1])} minutes ago`
            }
          }
        } else {
          if (Number(newTimeHourArr[0])-Number(postTimeHourArr[0]) === 1) {
            timeDifference = `${Number(newTimeHourArr[0])-Number(postTimeHourArr[0])} hour ago`
          } else {
            timeDifference = `${Number(newTimeHourArr[0])-Number(postTimeHourArr[0])} hours ago`
          }
        }
      } else {
        if (Number(newTimeDayArr[2])-Number(postTimeDayArr[2]) === 1) {
          timeDifference = `${Number(newTimeDayArr[2])-Number(postTimeDayArr[2])} day ago`
        } else {
          timeDifference = `${Number(newTimeDayArr[2])-Number(postTimeDayArr[2])} days ago`
        }
      }
    } else {
      if (Number(newTimeDayArr[1])-Number(postTimeDayArr[1]) === 1) {
        timeDifference = `${Number(newTimeDayArr[1])-Number(postTimeDayArr[1])} month ago`
      } else {
        timeDifference = `${Number(newTimeDayArr[1])-Number(postTimeDayArr[1])} months ago`
      }
    }
  } else {
    if (Number(newTimeDayArr[0])-Number(postTimeDayArr[0]) === 1) {
      timeDifference = `${Number(newTimeDayArr[0])-Number(postTimeDayArr[0])} year ago`
    } else {
      timeDifference = `${Number(newTimeDayArr[0])-Number(postTimeDayArr[0])} years ago`
    }
  }
  // console.log(newTimeHourArr, postTimeHourArr, newTimeDayArr, postTimeDayArr);
  return timeDifference
}

// console.log(new Date().toISOString().split('T')[1].split('.')[0].split(':'));
// console.log(postTime('2022-11-09'));

module.exports = postTime