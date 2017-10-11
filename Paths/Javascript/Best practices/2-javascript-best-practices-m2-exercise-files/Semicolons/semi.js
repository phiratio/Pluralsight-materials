function test() {
  if (true) {
    var x = 0;
  }

  x += 1; // Default: 'x' used out of scope.
            // No warning when funcscope:true
}
