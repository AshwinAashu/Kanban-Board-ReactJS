import React, { Component } from 'react';
import '../App.css';


class DragDrop extends Component {


	constructor(props){
		super(props);

		this.state = {
			inittasks: [
			  {id: "1", taskName:"Read a book",type:"Tasks", bgcolor:"#289bde", priority:"Low" },
			  {id: "2", taskName:"Pay bills", type:"Tasks",bgcolor:"#289bde", priority:"Low"},
			  {id: "3", taskName:"Go to the gym", type:"Tasks", bgcolor:"#289bde", priority:"Low"},
			  {id: "4", taskName:"Play Cricket", type:"Tasks", bgcolor:"#289bde",priority:"Low"}
			],
			newTask :'',
			isOpen: false,
		}; 

	};
		
	
		

		
		
		
	//handle elements being added to the task list 
	handleAdd = (event)=>{
		
		
		this.setState({newTask:event.target.value});
		//setting the target value as the state 
	}

	handleChange=(event)=>{
		event.preventDefault();
		this.setState({
			inittasks: [...this.state.inittasks, {id: Math.random()*1000 , taskName: this.state.newTask, type:"Tasks" , bgcolor:"#289bde", priority:"Low"}],
			newTask:"",
		})

	}
	//handle the form  submit 
	handleSubmit= (event)=>{
		event.preventDefault();
		this.setState({newTask: " "});
		
	}

	

	//to handle the priority on change
	submitPriority=(event, id)=>{
		event.preventDefault();
	

		this.state.inittasks.filter((task)=>{
			let priorTask = task;
			//changing priority by first storing item wise into a variable and then updating the variable and finally setting state
			if(priorTask.id === id){
				priorTask.priority = event.target.value; 
			}

			//changing flame color	
			if(priorTask.priority === "High" ){
				priorTask.bgcolor="#c42408";
			}
			else if(priorTask.priority === "Medium"){
				priorTask.bgcolor="#08c47f";
			}
			else{
				priorTask.bgcolor="#289bde";
			}
			
			this.setState({task: priorTask,})
		})
	}


	//handinling the taks deletion and task list updation 
	deleteHandler = (event, id) =>{
		event.preventDefault();
		//create an empty list to make a collection of all id that don't match with the item to be deleted
		let tasks = [];
		this.state.inittasks.filter((task) => {
	        if(task.id !=id){
				tasks.push(task);
			}
	    });
		//update state to the new tasks list 
		this.setState({
			inittasks: tasks,
		})
	}

	onDragStart = (event, taskName) => {
    	// console.log('dragstart on div: ', taskName);
    	event.dataTransfer.setData("taskName", taskName);
	}
	onDragOver = (event) => {
	    event.preventDefault();
	}

	onDrop = (event, cat) => {
	    let taskName = event.dataTransfer.getData("taskName");

	    let tasks = this.state.inittasks.filter((task) => {
	        if (task.taskName === taskName) {
	            task.type = cat;
	        }
	        return task;
	    });

	    this.setState({
	        ...this.state,
	        tasks
	    });
	}   
	render() {
		var tasks = {
	      inProgress: [],
	      Done: [],
          Tasks:[]
	    }

		this.state.inittasks.forEach ((task) => {
		  tasks[task.type].push(
		    <div key={task.id}
		      onDragStart = {(event) => this.onDragStart(event, task.taskName)}
		      draggable
		      className="draggable"
		      >
				  
		      {task.taskName}
			  {/* //set configurations */}
				<div className="item-settings">
					{/* Delete option */}
			  		<i className="fa fa-minus-circle" aria-hidden="true" onClick={(event) => this.deleteHandler(event, task.id)}></i>
					  <i className="fa fa-fire" aria-hidden="true"  style={{color: task.bgcolor}}></i>

			 		{/* For assiigning priority */}
					 <div className="priority-indicator">
						<select onChange={(event)=>this.submitPriority(event,task.id)}>
							<option type="radio" name="Low" value="Low">Low</option>
							<option type="radio" name="Medium" value="Medium">Medium</option>
							<option type="radio" name="High" value="High">High</option>
						</select> 
					</div>
			  	</div>
				 
		    </div>
		  );
		});

	    return (
	      <div className="drag-container">
	        <h2 className="head"> KanBan Board using React JS </h2>
          <div  className="kanban-container">
          <div className="Tasks"
            onDragOver={(event)=>this.onDragOver(event)}
              onDrop={(event)=>{this.onDrop(event, "Tasks")}}>
              <span className="group-header">Tasks</span>
              {tasks.Tasks}
			  <div className="new-task">
			 		<form onSubmit={this.handleSubmit}>
						<input type="text" placeholder="Enter a new Task" value={this.state.newTask} onChange={this.handleAdd} ></input>
	
					</form>
			  		<i className="fa fa-plus" aria-hidden="true" onClick= {this.handleChange} ></i>
			  </div>
			  
            </div>
		    <div className="inProgress"
	    		onDragOver={(event)=>this.onDragOver(event)}
      			onDrop={(event)=>{this.onDrop(event, "inProgress")}}>
	          <span className="group-header">In Progress</span>
	          {tasks.inProgress}  
	        </div>
	        <div className="droppable"
	        	onDragOver={(event)=>this.onDragOver(event)}
          		onDrop={(event)=>this.onDrop(event, "Done")}>
	          <span className="group-header">Done</span>
	          {tasks.Done}
	        </div>
          </div>
	      </div>
	    );
  	}
}
export default DragDrop
