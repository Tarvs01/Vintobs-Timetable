import { GeneralCourseData, SingleDepartmentCourses, TimetableData } from "../types";
import { TimetableObject } from "../types";

/* const dummyTimetable : TimetableData = {
  name: "Examination timetable for Engineering 2023/2024",
  semester: "first",
  startDate: "2023-12-04",
  endDate: "2023-12-23",
  generalCourses: [
    {
      courseTitle: "cpe 507",
      departmentsOffering: ["cpe", "eee", "ice", "mce"],
      numberOfStudents: 200
    },
    {
      courseTitle: "eee 305",
      departmentsOffering: ["eee", "cpe", "ice"],
      numberOfStudents: 150
    },
    {
      courseTitle: "cpe 201",
      departmentsOffering: ["cpe", "ice"],
      numberOfStudents: 169
    },
  ],
  specificCourses: [
    {
      level: "200",
      department: "eee",
      courses: [
        ["eee 201", 70],
        ["eee 203",100],
        ["eee 205",90],
        ["eee 207",80],
        ["eee 209",120],
        ["eee 211",140],
        ["eee 213",161],
        ["eee 215",183],
        ["eee 217",182],
        ["eee 219",142],
      ],
    },
    {
      level: "300",
      department: "eee",
      courses: [
        ["eee 301", 90],
        ["eee 303",120],
        ["eee 305",94],
        ["eee 307",81],
        ["eee 309",180],
        ["eee 311",190],
        ["eee 313",131],
        ["eee 315",193],
        ["eee 317",189],
        ["eee 319",190],
      ],
    },
    {
      level: "400",
      department: "eee",
      courses: [
        ["eee 401", 170],
        ["eee 403",60],
        ["eee 405",93],
        ["eee 407",56],
        ["eee 409",180],
        ["eee 411",145],
        ["eee 413",121],
        ["eee 415",283],
        ["eee 417",122],
        ["eee 419",42],
      ],
    },
    {
      level: "500",
      department: "eee",
      courses: [
        ["eee 501", 220],
        ["eee 503",140],
        ["eee 505",50],
        ["eee 507",90],
        ["eee 509",126],
        ["eee 511",156],
        ["eee 513",169],
        ["eee 515",181],
        ["eee 517",112],
        ["eee 519",102],
      ],
    },
    {
      level: "200",
      department: "cpe",
      courses: [
        ["cpe 201", 90],
        ["cpe 203",180],
        ["cpe 205",290],
        ["cpe 207",140],
        ["cpe 209",126],
        ["cpe 211",149],
        ["cpe 213",111],
        ["cpe 215",103],
        ["cpe 217",102],
        ["cpe 219",102],
      ]
    },
    {
      level: "300",
      department: "cpe",
      courses: [
        ["cpe 301", 230],
        ["cpe 303",190],
        ["cpe 305",50],
        ["cpe 307",95],
        ["cpe 309",116],
        ["cpe 311",134],
        ["cpe 313",161],
        ["cpe 315",163],
        ["cpe 317",185],
        ["cpe 319",172],
      ]
    },
    {
      level: "400",
      department: "cpe",
      courses: [
        ["cpe 401", 83],
        ["cpe 403",160],
        ["cpe 405",98],
        ["cpe 407",300],
        ["cpe 409",190],
        ["cpe 411",120],
        ["cpe 413",169],
        ["cpe 415",83],
        ["cpe 417",89],
        ["cpe 419",162],
      ]
    },
    {
      level: "500",
      department: "cpe",
      courses: [
        ["cpe 501", 60],
        ["cpe 503",170],
        ["cpe 505",91],
        ["cpe 507",180],
        ["cpe 509",192],
        ["cpe 511",145],
        ["cpe 513",111],
        ["cpe 515",183],
        ["cpe 517",282],
        ["cpe 519",149],
      ]
    },
    {
      level: "200",
      department: "ice",
      courses: [
        ["ice 201", 30],
        ["ice 203",190],
        ["ice 205",290],
        ["ice 207",180],
        ["ice 209",139],
        ["ice 211",170],
        ["ice 213",163],
        ["ice 215",153],
        ["ice 217",192],
        ["ice 219",172],
      ]
    },
    {
      level: "300",
      department: "ice",
      courses: [
        ["ice 301", 79],
        ["ice 303",106],
        ["ice 305",110],
        ["ice 307",280],
        ["ice 309",180],
        ["ice 311",141],
        ["ice 313",166],
        ["ice 315",182],
        ["ice 317",192],
        ["ice 319",202],
      ]
    },
    {
      level: "400",
      department: "ice",
      courses: [
        ["ice 401", 200],
        ["ice 403",150],
        ["ice 405",190],
        ["ice 407",130],
        ["ice 409",100],
        ["ice 411",146],
        ["ice 413",160],
        ["ice 415",163],
        ["ice 417",189],
        ["ice 419",141],
      ]
    },
    {
      level: "500",
      department: "ice",
      courses: [
        ["ice 501", 220],
        ["ice 503",180],
        ["ice 505",69],
        ["ice 507",96],
        ["ice 509",125],
        ["ice 511",180],
        ["ice 513",191],
        ["ice 515",183],
        ["ice 517",189],
        ["ice 519",122],
      ]
    }
  ],
}; */

export function generateTimetable(timetable : TimetableData) : TimetableObject | false {
  /* console.log(timetable);
  if (timetable.endDate < timetable.startDate) {
    return {
      status: "FAILURE",
      message: "The end date must be greater than or equal to the start date",
    };
  } */

  //console.log(timetable);
  
  const endDate = new Date(timetable.endDate);
  let loop = new Date(timetable.startDate);

  const timetableObject: TimetableObject = {};

  while (loop <= endDate) {

    if (!loop.toDateString().startsWith("Sun")) {    
      timetableObject[loop.toDateString()] = {
        morning: {departmentsOffering: [], courses: {}, population: 0},
        afternoon: {departmentsOffering: [], courses: {}, population: 0},
        evening: {departmentsOffering: [], courses: {}, population: 0},
      };
    }

    const newDate = loop.setDate(loop.getDate() + 1);
    loop = new Date(newDate);
  }
  
  addGeneralCourses(timetableObject, timetable.generalCourses);
  const addSpecificResult = addSpecificCourses(timetableObject, timetable.specificCourses);
  
  if(addSpecificResult === false){
    return false;
  }

  return timetableObject;
}

function addGeneralCourses(timetableObject: TimetableObject, generalCourses : GeneralCourseData[]){
  const ttkeys = Object.keys(timetableObject);
  generalCourses.map((course, index) => {
    if(index < ttkeys.length){
      timetableObject[ttkeys[index]].morning.courses[course.courseTitle] = course.numberOfStudents
      timetableObject[ttkeys[index]].morning.departmentsOffering = [...timetableObject[ttkeys[index]].morning.departmentsOffering, ...course.departmentsOffering];
      timetableObject[ttkeys[index]].morning.population += course.numberOfStudents;
    }
    else if(index < ttkeys.length * 2){
      timetableObject[ttkeys[index % (ttkeys.length)]].afternoon.courses[course.courseTitle] = course.numberOfStudents
      timetableObject[ttkeys[index]].afternoon.departmentsOffering = [...timetableObject[ttkeys[index]].afternoon.departmentsOffering, ...course.departmentsOffering];
      timetableObject[ttkeys[index]].afternoon.population += course.numberOfStudents;
    }
    else{
      timetableObject[ttkeys[index % (ttkeys.length)]].evening.courses[course.courseTitle] = course.numberOfStudents
      timetableObject[ttkeys[index]].evening.departmentsOffering = [...timetableObject[ttkeys[index]].evening.departmentsOffering, ...course.departmentsOffering];
      timetableObject[ttkeys[index]].evening.population += course.numberOfStudents;
    }
  })  
}

function addSpecificCourses(timetableObject : TimetableObject, specificCourses: SingleDepartmentCourses[]){
  const ttkeys = Object.keys(timetableObject);
  specificCourses.map((levelCourses, index) => {
    let iteration = 1;

    if(index % 3 === 0){
      while(levelCourses.courses.length !== 0){
        switch(iteration){
          case 1:
            {
              for(let i = 0; i < ttkeys.length; i += 2){
                if(levelCourses.courses.length !== 0){
                  if(!timetableObject[ttkeys[i]].morning.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].morning.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].morning.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].morning.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else if(!timetableObject[ttkeys[i]].afternoon.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].afternoon.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].afternoon.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].afternoon.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else if(!timetableObject[ttkeys[i]].evening.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].evening.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].evening.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].evening.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else{
                    continue;
                  }
                }
              }
              iteration++;
            }
            break;
          case 2:
            {
              for(let i = 1; i < ttkeys.length; i += 2){
                if(levelCourses.courses.length !== 0){
                  if(!timetableObject[ttkeys[i]].afternoon.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].afternoon.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].afternoon.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].afternoon.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else if(!timetableObject[ttkeys[i]].evening.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].evening.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].evening.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].evening.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else if(!timetableObject[ttkeys[i]].morning.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].morning.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].morning.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].morning.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else{
                    continue;
                  }
                }
              }
              iteration++;
            }
            break;
          case 3:
          case 4:
          case 5:
            {
              for(let i = 0; i < ttkeys.length; i++){
                if(levelCourses.courses.length !== 0){
                  if(!timetableObject[ttkeys[i]].evening.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].evening.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].evening.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].evening.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else if(!timetableObject[ttkeys[i]].morning.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].morning.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].morning.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].morning.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else if(!timetableObject[ttkeys[i]].afternoon.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].afternoon.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].afternoon.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].afternoon.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else{
                    continue;
                  }
                }
              }
              iteration++;
            }
            break;
          default:
            return false;
        }
      }
    }
    else if(index % 3 === 1){
      while(levelCourses.courses.length !== 0){
        switch(iteration){
          case 1:
            {
              for(let i = 0; i < ttkeys.length; i += 2){
                if(levelCourses.courses.length !== 0){
                  if(!timetableObject[ttkeys[i]].afternoon.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].afternoon.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].afternoon.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].afternoon.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else if(!timetableObject[ttkeys[i]].morning.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].morning.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].morning.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].morning.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else if(!timetableObject[ttkeys[i]].evening.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].evening.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].evening.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].evening.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else{
                    continue;
                  }
                }
              }
              iteration++;
            }
            break;
          case 2:
            {
              for(let i = 1; i < ttkeys.length; i += 2){
                if(levelCourses.courses.length !== 0){
                  if(!timetableObject[ttkeys[i]].evening.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].evening.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].evening.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].evening.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else if(!timetableObject[ttkeys[i]].afternoon.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].afternoon.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].afternoon.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].afternoon.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else if(!timetableObject[ttkeys[i]].morning.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].morning.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].morning.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].morning.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else{
                    continue;
                  }
                }
              }
              iteration++;
            }
            break;
          case 3:
          case 4:
          case 5:
            {
              for(let i = 0; i < ttkeys.length; i++){
                if(levelCourses.courses.length !== 0){
                  if(!timetableObject[ttkeys[i]].morning.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].morning.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].morning.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].morning.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else if(!timetableObject[ttkeys[i]].evening.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].evening.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].evening.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].evening.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else if(!timetableObject[ttkeys[i]].afternoon.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].afternoon.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].afternoon.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].afternoon.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else{
                    continue;
                  }
                }
              }
              iteration++;
            }
            break;
          default:
            return false;
        }
      }
    }
    else{
      while(levelCourses.courses.length !== 0){
        switch(iteration){
          case 1:
            {
              for(let i = 0; i < ttkeys.length; i += 2){
                if(levelCourses.courses.length !== 0){
                  if(!timetableObject[ttkeys[i]].evening.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].evening.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].evening.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].evening.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else if(!timetableObject[ttkeys[i]].morning.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].morning.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].morning.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].morning.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else if(!timetableObject[ttkeys[i]].afternoon.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].afternoon.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].afternoon.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].afternoon.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else{
                    continue;
                  }
                }
              }
              iteration++;
            }
            break;
          case 2:
            {
              for(let i = 1; i < ttkeys.length; i += 2){
                if(levelCourses.courses.length !== 0){
                  if(!timetableObject[ttkeys[i]].morning.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].morning.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].morning.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].morning.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else if(!timetableObject[ttkeys[i]].afternoon.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].afternoon.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].afternoon.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].afternoon.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else if(!timetableObject[ttkeys[i]].evening.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].evening.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].evening.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].evening.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else{
                    continue;
                  }
                }
              }
              iteration++;
            }
            break;
          case 3:
          case 4:
          case 5:
            {
              for(let i = 0; i < ttkeys.length; i++){
                if(levelCourses.courses.length !== 0){
                  if(!timetableObject[ttkeys[i]].afternoon.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].afternoon.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].afternoon.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].afternoon.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else if(!timetableObject[ttkeys[i]].evening.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].evening.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].evening.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].evening.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else if(!timetableObject[ttkeys[i]].morning.departmentsOffering.includes(levelCourses.department)){
                    timetableObject[ttkeys[i]].morning.courses[levelCourses.courses[levelCourses.courses.length - 1][0]] = levelCourses.courses[levelCourses.courses.length - 1][1];
                    timetableObject[ttkeys[i]].morning.departmentsOffering.push(levelCourses.department);
                    timetableObject[ttkeys[i]].morning.population += levelCourses.courses[levelCourses.courses.length - 1][1];
                    levelCourses.courses.pop();
                  }
                  else{
                    continue;
                  }
                }
              }
              iteration++;
            }
            break;
          default:
            return false;
        }
      }
    }
  })
  return true
}
