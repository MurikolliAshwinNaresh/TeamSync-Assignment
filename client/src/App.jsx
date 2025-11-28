import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  
  // Forms
  const [empForm, setEmpForm] = useState({ name: '', email: '', role: 'Staff' });
  const [taskForm, setTaskForm] = useState({ title: '', assignedTo: '', status: 'Todo' });

  // 1. Initial Load
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const empRes = await axios.get('http://localhost:5000/api/employees');
      const taskRes = await axios.get('http://localhost:5000/api/tasks');
      setEmployees(empRes.data);
      setTasks(taskRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 2. Handlers
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/employees', empForm);
      setEmpForm({ name: '', email: '', role: 'Staff' });
      fetchData(); 
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    if(!confirm("Are you sure? This will unassign their tasks.")) return;
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if(!taskForm.assignedTo) return alert("Please select an employee");
    try {
      await axios.post('http://localhost:5000/api/tasks', taskForm);
      setTaskForm({ title: '', assignedTo: '', status: 'Todo' });
      fetchData(); 
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  // --- STYLES (DARK MODE NEON) ---
  const styles = {
    container: "min-h-screen bg-slate-950 font-sans text-slate-100 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black",
    navbar: "bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 shadow-lg sticky top-0 z-10",
    navText: "bg-gradient-to-r from-violet-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent",
    card: "bg-slate-800/40 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/5 relative overflow-hidden",
    inputLabel: "block text-sm font-bold text-slate-400 uppercase mb-2 tracking-wider",
    inputField: "w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-4 text-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all",
    
    // Employee Accents (Purple/Pink)
    empNumber: "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/20",
    empButton: "w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg shadow-fuchsia-900/30 hover:shadow-fuchsia-700/50 active:scale-95 mt-4 border border-fuchsia-500/20",
    empInputFocus: "focus:ring-fuchsia-500/50",
    empListCard: "bg-slate-900/40 border border-white/5 hover:bg-slate-800/60 hover:border-fuchsia-500/30 transition-all",
    empAvatar: "bg-gradient-to-br from-violet-400 to-fuchsia-500 shadow-lg shadow-fuchsia-500/20",

    // Task Accents (Cyan/Blue)
    taskNumber: "bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20",
    taskButton: "w-full xl:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-lg px-10 py-4 rounded-xl transition-all shadow-lg shadow-cyan-900/30 hover:shadow-cyan-700/50 active:scale-95 border border-cyan-500/20",
    taskInputFocus: "focus:ring-cyan-500/50",
    taskBoard: "bg-slate-900/30 border border-white/5 p-6 rounded-3xl min-h-[600px]",
    taskCard: "bg-slate-800/60 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10 hover:border-cyan-400/40 transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 hover:shadow-cyan-900/20",
  };

  return (
    <div className={styles.container}>
      
      {/* NAVBAR */}
      <nav className={styles.navbar}>
        <div className="w-[95%] mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-4xl drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">🚀</span>
            <h1 className={`text-3xl font-extrabold ${styles.navText} drop-shadow-sm`}>
              TeamSync
            </h1>
          </div>
          <span className="text-sm font-bold text-slate-300 bg-slate-800/50 border border-slate-700 px-4 py-2 rounded-full uppercase tracking-wider">
            Full-Stack Track
          </span>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="w-[95%] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- LEFT COLUMN: EMPLOYEES (Purple Theme) --- */}
          <section className="lg:col-span-4 flex flex-col gap-8">
            
            {/* Add Employee Card */}
            <div className={styles.card}>
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-fuchsia-600/20 rounded-full blur-[100px] pointer-events-none"></div>
              
              <div className="flex items-center gap-3 mb-8 relative">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${styles.empNumber} ring-2 ring-white/10`}>1</div>
                <h2 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">Add Employee</h2>
              </div>
              
              <form onSubmit={handleAddEmployee} className="space-y-6 relative z-10">
                <div>
                  <label className={styles.inputLabel}>Full Name</label>
                  <input 
                    className={`${styles.inputField} ${styles.empInputFocus}`}
                    placeholder="e.g. Sarah Smith" 
                    value={empForm.name} 
                    onChange={e => setEmpForm({...empForm, name: e.target.value})} 
                    required 
                  />
                </div>
                <div>
                  <label className={styles.inputLabel}>Email Address</label>
                  <input 
                    className={`${styles.inputField} ${styles.empInputFocus}`}
                    placeholder="sarah@company.com" 
                    value={empForm.email} 
                    onChange={e => setEmpForm({...empForm, email: e.target.value})} 
                    required 
                  />
                </div>
                <div>
                  <label className={styles.inputLabel}>Role</label>
                  <input 
                    className={`${styles.inputField} ${styles.empInputFocus}`}
                    placeholder="e.g. Cyber Security" 
                    value={empForm.role} 
                    onChange={e => setEmpForm({...empForm, role: e.target.value})} 
                  />
                </div>
                <button className={styles.empButton}>
                  Create Employee
                </button>
              </form>
            </div>

            {/* Employee List */}
            <div className={`${styles.card} flex-1 min-h-[400px] flex flex-col`}>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Team Members ({employees.length})</h3>
              
              <div className="space-y-4 overflow-y-auto pr-2 flex-1 custom-scrollbar">
                {employees.length === 0 && <p className="text-base text-slate-500 italic text-center py-10">No employees added yet.</p>}
                
                {employees.map(emp => (
                  <div key={emp._id} className={`flex items-center justify-between p-4 rounded-2xl ${styles.empListCard} group cursor-default`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${styles.empAvatar} text-white flex items-center justify-center font-bold text-xl border border-white/10`}>
                        {emp.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-100 text-lg">{emp.name}</p>
                        <p className="text-sm text-slate-400 font-medium">{emp.role}</p>
                      </div>
                    </div>
                    {/* NEW DELETE BUTTON */}
                    <button onClick={() => handleDeleteEmployee(emp._id)} className="text-slate-600 hover:text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition-all">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                       </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* --- RIGHT COLUMN: TASKS (Cyan Theme) --- */}
          <section className="lg:col-span-8 space-y-8">
            
            {/* Task Creation Bar */}
            <div className={styles.card}>
               <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none"></div>

              <div className="flex items-center gap-3 mb-8 relative">
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${styles.taskNumber} ring-2 ring-white/10`}>2</div>
                 <h2 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">Assign New Task</h2>
              </div>
              
              <form onSubmit={handleAddTask} className="flex flex-col xl:flex-row gap-6 items-end relative z-10">
                <div className="flex-1 w-full">
                   <label className={styles.inputLabel}>Task Title</label>
                   <input 
                    className={`${styles.inputField} ${styles.taskInputFocus}`} 
                    placeholder="What needs to be done?" 
                    value={taskForm.title} 
                    onChange={e => setTaskForm({...taskForm, title: e.target.value})} 
                    required 
                  />
                </div>
                <div className="w-full xl:w-80">
                  <label className={styles.inputLabel}>Assignee</label>
                  <div className="relative">
                    <select 
                      className={`${styles.inputField} ${styles.taskInputFocus} appearance-none cursor-pointer`} 
                      value={taskForm.assignedTo} 
                      onChange={e => setTaskForm({...taskForm, assignedTo: e.target.value})} 
                      required
                    >
                      <option value="" className="bg-slate-900">Select Member...</option>
                      {employees.map(emp => (
                         <option key={emp._id} value={emp._id} className="bg-slate-900">{emp.name}</option>
                      ))}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-500">▼</div>
                  </div>
                </div>
                <button className={styles.taskButton}>
                  Assign Task
                </button>
              </form>
            </div>

            {/* Task Board */}
            <div className={styles.taskBoard}>
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 ml-2">Active Tasks Board ({tasks.length})</h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {tasks.length === 0 && (
                    <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-700/50 rounded-3xl bg-slate-900/30">
                      <p className="text-xl text-slate-300 font-medium">No tasks active right now.</p>
                      <p className="text-slate-500 mt-2">Create a task above to get started.</p>
                    </div>
                  )}

                  {tasks.map(task => (
                    <div key={task._id} className={styles.taskCard}>
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${task.status === 'Done' ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]'}`}></div>
                      
                      <div className="flex justify-between items-start mb-4 pl-4">
                        <span className={`inline-block px-3 py-1 text-xs font-bold uppercase rounded-lg tracking-wide border ${task.status === 'Done' ? 'bg-green-900/30 text-green-400 border-green-500/30' : 'bg-cyan-900/30 text-cyan-400 border-cyan-500/30'}`}>
                          {task.status}
                        </span>
                        <button onClick={() => handleDeleteTask(task._id)} className="text-slate-500 hover:text-red-400 hover:bg-red-950/50 p-2 rounded-lg transition-all">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <h3 className="font-bold text-xl text-white mb-2 pl-4 leading-snug drop-shadow-sm">{task.title}</h3>
                      
                      <div className="flex items-center gap-3 mt-6 pl-4 pt-5 border-t border-white/5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center text-sm font-bold shadow-sm border border-white/10">
                          {task.assignedTo ? task.assignedTo.name.charAt(0) : '?'}
                        </div>
                        <span className="text-sm text-slate-300 font-semibold">
                          {task.assignedTo ? task.assignedTo.name : 'Unassigned'}
                        </span>
                      </div>
                    </div>
                  ))}
               </div>
            </div>

          </section>
        </div>
      </main>
    </div>
  );
}

export default App;