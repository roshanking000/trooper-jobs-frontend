import preserveDirectives from "rollup-plugin-preserve-directives";

export default {
  output: {
    preserveModules: false,
  },
  // This supresses the warning, but the plugin does nothing
  plugins: [preserveDirectives({ supressPreserveModulesWarning: true })],
};