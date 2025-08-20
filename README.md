
npm i group-by-date

```javascript
import groupByDate from 'group-by-date';

const data = [
  { date: new Date(), value: 10 },
  { date: new Date()-24*60*60*1000, value: 20 },
  { date: new Date()-30*24*60*60*1000, value: 30 },
  { date: '2021-01-04', value: 40 },
  { date: '2021-12-05', value: 50 },
];

const groupedData = groupByDate(data, 'date');

console.log(groupedData);
```

Output:

```javascript
[
    {
        "name": "今天",
        "times": 1755619200000,
        "list": [
            {
                "date": "2025-08-20T00:36:49.805Z",
                "value": 10
            }
        ]
    },
    {
        "name": "昨天",
        "times": 1755532800000,
        "list": [
            {
                "date": 1755563809805,
                "value": 20
            }
        ]
    },
    {
        "name": "30天内",
        "times": 1753027200000,
        "list": [
            {
                "date": 1753058209805,
                "value": 30
            }
        ]
    },
    {
        "name": "2021年",
        "times": 1609689600000,
        "list": [
            {
                "date": "2021-01-04",
                "value": 40
            },
            {
                "date": "2021-12-05",
                "value": 50
            }
        ]
    }
]
```