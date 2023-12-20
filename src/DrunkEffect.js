import { Effect } from "postprocessing";

export default class DrunkEffect extends Effect {
  constructor(options = {}) {
    super("DrunkEffect", fragment, {
      uniforms: new Map([
        ["time", { value: 0 }],
        ["strength", { value: 0.1 }],
        ["speed", { value: 0.1 }],
        ["resolution", { value: options.resolution || [1, 1] }],
      ]),
      ...options,
    });
  }
}
