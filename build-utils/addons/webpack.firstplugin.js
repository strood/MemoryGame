// These addons can act as a wrokbench to do things liek develop plugsin or play with
// features without mesing up your whole config.

module.exports = {
  plugins: [
    function() {
      const compiler = this;

      console.log(compiler);
    }
  ]
}
