import { Component } from '@angular/core';
import { DataInput }    from './data-input';
import { Computer }    from './computer';

@Component({
	selector: 'computer-ui',
	templateUrl: 'app/computer-ui.component.html'
})
export class ComputerUiComponent {
	computer = null;
	model = new DataInput(
		'def print_tenten\nprint(multiply(101, 10))\nend\n\nprint(1009)\nprint_tenten()',
		`PRINT_TENTEN_BEGIN = 50
MAIN_BEGIN = 0

def main
# Create new computer with a stack of 100 addresses
computer = Computer.new(100)

# Instructions for the print_tenten function computer.set_address(PRINT_TENTEN_BEGIN).insert("MULT").insert("PRINT").insert("RET")

# The start of the main function
computer.set_address(MAIN_BEGIN).insert("PUSH", 1009).insert("PRINT")

# Return address for when print_tenten function finishes
computer.insert("PUSH", 6)

# Setup arguments and call print_tenten
computer.insert("PUSH", 101).insert("PUSH", 10).insert("CALL", PRINT_TENTEN_BEGIN)

# Stop the program
computer.insert("STOP")

computer.set_address(MAIN_BEGIN).execute()
end

main()`,
		'', '');

	onCompile() {
		console.log("compiling!");
	}
	
	onBoot() {
		console.log("booting!");
		
		// TODO: Read the compilation input
		var PRINT_TENTEN_BEGIN = 50;
		var MAIN_BEGIN = 0;
		this.computer = new Computer(100);
		this.computer.setAddress(PRINT_TENTEN_BEGIN).insert("MULT").insert("PRINT").insert("RET");
		this.computer.setAddress(MAIN_BEGIN).insert("PUSH", 1009).insert("PRINT");
		this.computer.insert("PUSH", 6);
		this.computer.insert("PUSH", 101).insert("PUSH", 10).insert("CALL", PRINT_TENTEN_BEGIN);
		this.computer.insert("STOP");
		this.computer.setAddress(MAIN_BEGIN).execute();
		
		this.model.output = this.computer.getOutput();
		this.model.memory = this.computer.getMemoryDump();
	}
	
	onStep() {
		console.log("stepping!");
		if(!this.computer) {
			this.model.output = "Computer not yet booted up!";
			return;
		}
		this.computer.clock();
		this.model.output = this.computer.getOutput();
		this.model.memory = this.computer.getMemoryDump();
	}
}