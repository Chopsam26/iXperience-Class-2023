import {collection, addDoc, query, getDocs, doc, deleteDoc, updateDoc} from 'firebase/firestore';

import { db } from '../firebase/firebase';
import {Task, task } from '../models/Task';

class TaskService {
    constructor() {
        this.collection = 'tasks';
    }

       async fetchTasks() {
        const collectionRef = collection(db, this.collection);
        const q = query(collectionRef);
        const querySnapshot = await getDocs(q);

        const tasks = [];
        QuerySnapshot.forEach((doc) => {
            const data = doc.data();
            const task = new Task(doc.id, data.name, data.complete);
            tasks.push(task);

        })

        return tasks;
       } 

       async createTask(task) {
        const collectionRef = collection(db, this.collection);

        const docRef =  await addDoc(collectionRef,{
            name: task.name,
            complete: task.complete
        }) ;

        task.id = docRef.id;
        return task;
       }
       async updateTask(task) {
        const docRef = doc(db, this.collection, task);

        await updateDoc(docRef,{
            name: task.name,
            complete: task.complete

        });
           return task;
       }

       async deleteTask(taskId) {
        const docRef = doc(db, this.collection, taskId);
        await deleteDoc();
       }
    

}

const service = new TaskService();
export default service;