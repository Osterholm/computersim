import { ComputerState } from './computer-state';

/**
 * Models a computer.
 * The main responsibility for this class is to handle
 * computer interface, execution flow and instruction
 * interpretation.
 */
export class Computer {

	state: ComputerState;
	outputString: String;

	constructor(stackDepth : number) {
		console.log("Creating computer (" + stackDepth + ")");
		this.outputString = '';
		this.state = new ComputerState(stackDepth);
	}

	/** Sets PC to target address.
	 * Returns this object to allow chaining.
	 */
	setAddress(address) {
		console.log("Setting address to " + address);
		this.state.setPc(address);
		return this;
	}

	/** Inserts an instruction into the memory at current PC.
	 * PC is incremented after insert.
	 * Returns this object to allow chaining.
	 */
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

	/** Execute one instruction. */
	// TODO: Restructure. We want to be able to run these commands in more configurations.
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

	/** Append str to the output. */
	output(str) {
		this.outputString += str + "\n";
	}

	/** Get data to be displayed on a monitor as String. */
	getOutput() {
		return this.outputString;
	}
	
	/** Returns a memory dump as String. */
	getMemoryDump() {
		return this.state.getMemoryDump();
	}

	/** Run computer until program finishes or computer crashes. */
	execute() {
		// TODO: Implement so that this will run
		// until program finishes.
		console.log("Executing");
	}
}