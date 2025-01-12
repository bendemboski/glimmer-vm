import type { ResolutionTimeConstants, RuntimeConstants, RuntimeHeap, RuntimeOp } from '../program';
import type { RuntimeResolver } from '../serialize';
import type { Environment } from './environment';

/**
  The Runtime is the set of static structures that contain the compiled
  code and any host configuration.

  The contents of the Runtime do not change as the VM executes, unlike
  the VM state.
 */
export interface RuntimeContext {
  env: Environment;
  program: RuntimeProgram;
  resolver: RuntimeResolver;
}

export interface RuntimeProgram {
  readonly constants: RuntimeConstants & ResolutionTimeConstants;
  readonly heap: RuntimeHeap;

  opcode(offset: number): RuntimeOp;
}

export interface RuntimeArtifacts {
  readonly constants: RuntimeConstants & ResolutionTimeConstants;
  readonly heap: RuntimeHeap;
}
