
  export const TimeToSecConvert=(time)=>{
    var a = time.split(':')
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60  
    
    return seconds
  }