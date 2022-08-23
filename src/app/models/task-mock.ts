import { Task } from './task-model';

export const TASKS: Task[] = [
/*
  { Id:  1, IdBucket: 1, Title: 'jTask_01', Description: 'TaskDescription_01', Priority: 'Normal'   , State: "To Do"      , Asignee: ""  },
  { Id:  2, IdBucket: 1, Title: 'iTask_02', Description: 'TaskDescription_02', Priority: 'Normal'   , State: "In Progress", Asignee: ""  },
  { Id:  3, IdBucket: 1, Title: 'hTask_03', Description: 'TaskDescription_03', Priority: 'Normal'   , State: "In Progress", Asignee: ""  },
  { Id:  4, IdBucket: 1, Title: 'gTask_04', Description: 'TaskDescription_04', Priority: 'High'     , State: "Done"       , Asignee: ""  },    
  { Id:  5, IdBucket: 1, Title: 'fTask_05', Description: 'TaskDescription_05', Priority: 'High'     , State: "Done"       , Asignee: ""  },
  { Id:  6, IdBucket: 1, Title: 'eTask_06', Description: 'TaskDescription_06', Priority: 'High'     , State: "Done"       , Asignee: ""  },
  { Id:  7, IdBucket: 1, Title: 'dTask_07', Description: 'TaskDescription_07', Priority: 'Low'      , State: "Cancelled"  , Asignee: ""  },
  { Id:  8, IdBucket: 1, Title: 'cTask_08', Description: 'TaskDescription_08', Priority: 'Low'      , State: "Cancelled"  , Asignee: ""  },
  { Id:  9, IdBucket: 1, Title: 'bTask_09', Description: 'TaskDescription_09', Priority: 'Low'      , State: "Cancelled"  , Asignee: ""  },
  { Id: 10, IdBucket: 2, Title: 'aTask_10', Description: 'TaskDescription_10', Priority: 'Low'      , State: "Cancelled"  , Asignee: ""  },
*/
  { Id:  1, IdBucket: 1, Title: 'Task_01', Description: 'TaskDescription_01', Priority: 'High'   , State: "In Progress"      , Asignee: ""  },
  { Id:  2, IdBucket: 1, Title: 'Task_02', Description: 'TaskDescription_02', Priority: 'Normal' , State: "In Progress", Asignee: ""  },
  { Id:  3, IdBucket: 1, Title: 'Task_03', Description: 'TaskDescription_03', Priority: 'Low'    , State: "In Progress", Asignee: ""  },
  { Id:  4, IdBucket: 1, Title: 'Task_04', Description: 'TaskDescription_04', Priority: 'High'   , State: "In Progress"       , Asignee: ""  },    
  { Id:  5, IdBucket: 1, Title: 'Task_05', Description: 'TaskDescription_05', Priority: 'Normal' , State: "In Progress"       , Asignee: ""  },
  { Id:  6, IdBucket: 1, Title: 'Task_06', Description: 'TaskDescription_06', Priority: 'Low'    , State: "In Progress"       , Asignee: ""  },
  { Id:  7, IdBucket: 1, Title: 'Task_07', Description: 'TaskDescription_07', Priority: 'High'   , State: "In Progress"  , Asignee: ""  },
  { Id:  8, IdBucket: 1, Title: 'Task_08', Description: 'TaskDescription_08', Priority: 'Normal' , State: "In Progress"  , Asignee: ""  },
  { Id:  9, IdBucket: 1, Title: 'Task_09', Description: 'TaskDescription_09', Priority: 'Low'    , State: "In Progress"  , Asignee: ""  },
  { Id: 10, IdBucket: 1, Title: 'Task_10', Description: 'TaskDescription_10', Priority: 'High'   , State: "In Progress"  , Asignee: ""  },

  { Id: 11, IdBucket: 2, Title: 'Task_11', Description: 'TaskDescription_11', Priority: 'Normal'   , State: "To Do"      , Asignee: ""  },
  { Id: 12, IdBucket: 2, Title: 'Task_12', Description: 'TaskDescription_12', Priority: 'Normal'   , State: "To Do"      , Asignee: ""  },
  { Id: 13, IdBucket: 2, Title: 'Task_13', Description: 'TaskDescription_13', Priority: 'Normal'   , State: "In Progress", Asignee: ""  },
  { Id: 14, IdBucket: 2, Title: 'Task_14', Description: 'TaskDescription_14', Priority: 'High'     , State: "In Progress", Asignee: ""  },    
  { Id: 15, IdBucket: 2, Title: 'Task_15', Description: 'TaskDescription_15', Priority: 'High'     , State: "In Progress", Asignee: ""  },
  { Id: 16, IdBucket: 2, Title: 'Task_16', Description: 'TaskDescription_16', Priority: 'High'     , State: "Done"       , Asignee: ""  },
  { Id: 17, IdBucket: 2, Title: 'Task_17', Description: 'TaskDescription_17', Priority: 'Low'      , State: "Done"       , Asignee: ""  },
  { Id: 18, IdBucket: 2, Title: 'Task_18', Description: 'TaskDescription_18', Priority: 'Low'      , State: "Done"       , Asignee: ""  },
  { Id: 19, IdBucket: 2, Title: 'Task_19', Description: 'TaskDescription_19', Priority: 'Low'      , State: "Done"       , Asignee: ""  },
  { Id: 20, IdBucket: 2, Title: 'Task_20', Description: 'TaskDescription_20', Priority: 'Low'      , State: "Cancelled"  , Asignee: ""  },

  { Id: 21, IdBucket: 3, Title: 'Task_21', Description: 'TaskDescription_21', Priority: 'Normal'   , State: "To Do"      , Asignee: ""  },
  { Id: 22, IdBucket: 3, Title: 'Task_22', Description: 'TaskDescription_22', Priority: 'Normal'   , State: "To Do"      , Asignee: ""  },
  { Id: 23, IdBucket: 3, Title: 'Task_23', Description: 'TaskDescription_23', Priority: 'Normal'   , State: "To Do"      , Asignee: ""  },
  { Id: 24, IdBucket: 3, Title: 'Task_24', Description: 'TaskDescription_24', Priority: 'High'     , State: "In Progress", Asignee: ""  },    
  { Id: 25, IdBucket: 3, Title: 'Task_25', Description: 'TaskDescription_25', Priority: 'High'     , State: "In Progress", Asignee: ""  },
  { Id: 26, IdBucket: 3, Title: 'Task_26', Description: 'TaskDescription_26', Priority: 'High'     , State: "In Progress", Asignee: ""  },
  { Id: 27, IdBucket: 3, Title: 'Task_27', Description: 'TaskDescription_27', Priority: 'Low'      , State: "In Progress", Asignee: ""  },
  { Id: 28, IdBucket: 3, Title: 'Task_28', Description: 'TaskDescription_28', Priority: 'Low'      , State: "Done"       , Asignee: ""  },
  { Id: 29, IdBucket: 3, Title: 'Task_29', Description: 'TaskDescription_29', Priority: 'Low'      , State: "Done"       , Asignee: ""  },
  { Id: 30, IdBucket: 3, Title: 'Task_30', Description: 'TaskDescription_30', Priority: 'Low'      , State: "Done"       , Asignee: ""  },
];

