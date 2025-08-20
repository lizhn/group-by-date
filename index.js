import dayjs from 'dayjs';

export const groupByDate = (list, config) => {
    // 判断是不是数组
    if (!Array.isArray(list)) {
        throw new Error('The first argument must be an array');
    }

    let groups =[
        {
            name: '今天',
            times:dayjs().startOf('day').valueOf(),
        },
        {
            name: '昨天',
            times:dayjs().subtract(1, 'day').startOf('day').valueOf(),
        },
        {
            name: '7天内',
            times:dayjs().subtract(7, 'day').startOf('day').valueOf(),
        },
        {
            name: '30天内',
            times:dayjs().subtract(30, 'day').startOf('day').valueOf(),
        }
    ]
    let yearStart = dayjs().startOf('year').valueOf();
    
    const key = config?.key || 'date';
    // 分组
    const objs={};
    list.map(row=>{
        let times = dayjs(row[key]).valueOf();
        let index = groups.findIndex(item=>times>=item.times);
        let name = groups[index]?.name||"";
        if(index==-1){
            // 判断是否超过1年
            if(times<yearStart){
                name = dayjs(row[key]).format("YYYY年");
            }else{
                name = dayjs(row[key]).format("YYYY-MM");
            }
        }
        if(objs[name]){
            objs[name].list.push(row)
        }else{
            objs[name]={
                name:name,
                times:index==-1?times:groups[index].times,
                list:[row]
            }
        }
    })
    let arr = Object.values(objs);
    arr.sort((a,b)=>{
        return b.times-a.times
    })
    return arr;
}

export default groupByDate;