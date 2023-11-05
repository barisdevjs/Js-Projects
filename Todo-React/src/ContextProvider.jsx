import  { useContext } from 'react';
import { TaskContext } from './Context';

export function useTasks() {
  return useContext(TaskContext);
}
