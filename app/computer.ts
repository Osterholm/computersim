import { ComputerState } from './computer-state';

export class Computer {

//	constructor(
//		public state: ComputerState,
//		public outputString: string
//	) {}
//	state: ComputerState = new ComputerState(this.stackDepth);
	state: ComputerState;
	outputString: String;
	
	constructor(stackDepth : number) {
		console.log("Creating computer (" + stackDepth + ")");
		this.outputString = '';
		this.state = new ComputerState(stackDepth);
	}
	
	setAddress(address) {
		console.log("Setting address to " + address);
		this.state.setPc(address);
		return this;
	}
	
	insert(str, nr) {
		var retval = null;
		if(nr) {
			console.log("Inserting " + str + " " + nr);
			retval = this.state.insert(str + " " + nr);
			}
		else {
			console.log("Inserting " + str);
			retval = this.state.insert(str);
		}
		if(retval != null) {
			this.output(retval);
		}
		return this;
	}
	
//	insert(str) {
//		state.insert(str);
//		return this;
//	}
  
	clock() {
		console.log("Clocking");
		var data = this.state.nextInstruction();
		if(!data) {
			this.output("Error: No instruction");
			return;
		}
		this.output("Instruction: " + data);
		
		if(data == "MULT") {
			var data1 = this.state.popStack();
			var data2 = this.state.popStack();
			try {
				var multResult = Number(data1) * Number(data2);
				this.state.pushStack(""+multResult);
			} catch(e) {
				this.output('Error: Failed performing MULT instruction with data (' + data1 + ', ' + data2 + ')');
				return;
			}
		}
		else if(data.startsWith("CALL ")) {
			try {
			var address = Number(data.substring(5));
			this.state.setPc(address);
			} catch(e) {
				this.output("Error: Failed parsing address in instruction \"" + data + "\"");
				return;
			}
		}
		else if(data == "RET") {
			this.state.ret();
		}
		else if(data == "STOP") {
			return;
		}
		else if(data == "PRINT") {
			this.output(this.state.popStack());
		}
		else if(data.startsWith("PUSH ")) {
			var arg = data.substring(5);
			this.state.pushStack(arg);
		}
	}
  
	output(str) {
		this.outputString += str + "\n";
	}
  
	getOutput() {
		return this.outputString;
	}
	
	getMemoryDump() {
		return this.state.getMemoryDump();
	}
	
	execute() {
			console.log("Executing");
		
	}
}