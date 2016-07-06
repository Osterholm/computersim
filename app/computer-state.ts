
/**
 * Holds program counter, stack pointer and memory.
 *
 * The stack resides in the program memory, starts
 * at highest address and grows towards smaller
 * addresses.
 */
export class ComputerState {

	pc: number;
	sp: number;
	memory: String[];
	stackDepth: number;

	constructor(stackDepth : number) {
		this.stackDepth = stackDepth;
		this.pc = 0;
		this.sp = stackDepth - 1;
		this.memory = [];
		console.log("Creating state (" + stackDepth + ")");
	}
  
	setPc(address) {
		console.log("Setting pc to " + address);
		this.pc = address;
	}
  
	/** Inserts data into memory at PC. PC is increased. Returns null if successful. */
	insert(data) {
		console.log("Inserting data \"" + data + "\" at pc=" + this.pc);
		if(this.pc >= this.stackDepth) {
			console.log("Stack overflow!");
			return "Stack overflow!";
		}
		this.memory[this.pc] = data;
		this.pc = this.pc + 1;
		return null;
	}
  
	popStack() {
		this.sp++;
		return this.memory[this.sp];
	}
	
	pushStack(data) {
		this.memory[this.sp] = data;
		this.sp--;
	}
	
	nextInstruction() {
		var data = this.memory[this.pc];
		this.pc++;
		return data;
	}
	
	/** Return from subroutine .*/
	ret() {
		var data = this.popStack();
		this.pc = Number(data);
	}
	
	/** Creates a memory dump and returns it as a String. */
	getMemoryDump() {
		var out = "";
		for(let i=0; i<this.stackDepth; i++) {
			out += i + ": " + this.memory[i];
			if(i == this.pc)
				out += " \tPC";
			if(i == this.sp)
				out += " \tSP";
			out += '\n';
		}
		return out;
	}

}