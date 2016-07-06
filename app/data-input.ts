
/**
 * Container for display data.
 *
 * code: Data for initial high level code.
 * compiledCode: Data for compiled code.
 * memory: Data for memory dump.
 * output: Data for computer display output.
 */
export class DataInput {
	constructor(
		public code: string,
		public compiledCode: string,
		public memory: string,
		public output: string
	) {  }
}