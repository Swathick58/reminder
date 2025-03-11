type Reminder = {
    id: string;
    title: string;
    details?: string;
    dueDate: Date;
    isCompleted: boolean;
  };
  
  class ReminderStorage {
    private reminderList: Reminder[];
  
    constructor() {
      this.reminderList = [];
    }
  
    addReminder(id: string, title: string, dueDate: Date, details?: string): void {
      if (this.doesExist(id)) {
        throw new Error("A reminder with this ID already exists.");
      }
      this.reminderList.push({ id, title, dueDate, details, isCompleted: false });
    }
  
    doesExist(id: string): boolean {
      return this.reminderList.some(reminder => reminder.id === id);
    }
  
    completeReminder(id: string): boolean {
      const reminder = this.findReminder(id);
      if (!reminder) return false;
      reminder.isCompleted = true;
      return true;
    }
  
    undoCompleteReminder(id: string): boolean {
      const reminder = this.findReminder(id);
      if (!reminder) return false;
      reminder.isCompleted = false;
      return true;
    }
  
    fetchAllReminders(): Reminder[] {
      return [...this.reminderList];
    }
  
    findReminder(id: string): Reminder | null {
      return this.reminderList.find(reminder => reminder.id === id) || null;
    }
  
    fetchCompletedReminders(): Reminder[] {
      return this.reminderList.filter(reminder => reminder.isCompleted);
    }
  
    fetchPendingReminders(): Reminder[] {
      return this.reminderList.filter(reminder => !reminder.isCompleted);
    }
  
    fetchDueReminders(): Reminder[] {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return this.reminderList.filter(reminder => reminder.dueDate <= today);
    }
  
    modifyReminder(id: string, title?: string, dueDate?: Date, details?: string): boolean {
      const reminder = this.findReminder(id);
      if (!reminder) return false;
  
      reminder.title = title ?? reminder.title;
      reminder.dueDate = dueDate ?? reminder.dueDate;
      reminder.details = details ?? reminder.details;
      return true;
    }
  
    deleteReminder(id: string): boolean {
      const index = this.reminderList.findIndex(reminder => reminder.id === id);
      if (index !== -1) {
        this.reminderList.splice(index, 1);
        return true;
      }
      return false;
    }
  }
  
  export default ReminderStorage;