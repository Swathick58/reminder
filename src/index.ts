import ReminderStorage from "./reminder";

const db = new ReminderStorage();

db.addReminder("1", "Doctor Appointment", new Date("2025-03-15"), "Visit Dr. Smith at 10 AM");
db.addReminder("2", "Meeting", new Date("2025-03-20"), "Project discussion at 3 PM");
db.addReminder("3", "Grocery Shopping", new Date("2025-03-10"));

console.log("Reminder 1 exists:", db.doesExist("1"));
console.log("Reminder 4 exists:", db.doesExist("4"));

console.log("All Reminders:", db.fetchAllReminders());

db.completeReminder("1");
console.log("Completed Reminders:", db.fetchCompletedReminders());

db.undoCompleteReminder("1");
console.log("Not Completed Reminders:", db.fetchPendingReminders());

console.log("Reminder 1 Details:", db.findReminder("1"));
console.log("Reminder 4 Details:", db.findReminder("4"));

console.log("Reminders Due by Today:", db.fetchDueReminders());

db.modifyReminder("1", "Dentist Appointment", new Date("2025-03-16"), "Changed to Dr. Lee at 11 AM");
console.log("Updated Reminder 1:", db.findReminder("1"));

db.deleteReminder("2");
console.log("All Reminders After Removal:", db.fetchAllReminders());