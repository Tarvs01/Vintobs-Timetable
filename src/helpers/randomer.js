//for index 0
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







  
  //for index 1