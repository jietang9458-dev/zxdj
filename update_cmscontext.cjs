const fs = require('fs');
let content = fs.readFileSync('src/context/CMSContext.tsx', 'utf-8');

content = content.replace(`getFeedbacks, getCourseRegistrations, getUsers }`, `getFeedbacks, getCourseRegistrations, getUsers, getVisitBookings, addVisitBooking }`);

content = content.replace(`courseRegistrations: any[];`, `courseRegistrations: any[];\n  visitBookings: any[];`);

content = content.replace(`const [courseRegistrations, setCourseRegistrations] = useState<any[]>([]);`, `const [courseRegistrations, setCourseRegistrations] = useState<any[]>([]);\n  const [visitBookings, setVisitBookings] = useState<any[]>([]);`);

content = content.replace(`dbCourseRegistrations, dbUsers`, `dbCourseRegistrations, dbUsers, dbVisitBookings`);
content = content.replace(`getCourseRegistrations(), getUsers()`, `getCourseRegistrations(), getUsers(), getVisitBookings()`);

content = content.replace(`if (dbCourseRegistrations !== null) setCourseRegistrations(dbCourseRegistrations);`, `if (dbCourseRegistrations !== null) setCourseRegistrations(dbCourseRegistrations);\n      if (dbVisitBookings !== null) setVisitBookings(dbVisitBookings);`);

content = content.replace(`courseRegistrations, users, loading, refresh: fetchData`, `courseRegistrations, visitBookings, users, loading, refresh: fetchData`);

fs.writeFileSync('src/context/CMSContext.tsx', content);
