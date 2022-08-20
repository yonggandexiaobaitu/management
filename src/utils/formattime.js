
import day from "dayjs"
// 格式化时间
class Day{
  static formatday(timeStamp,formats){
    return day(timeStamp).format(formats)
  }
}
export default Day;