'use strict';

const {Operation, OperationQueue} = require('./index');

/* Construct an OperationQueue which runs three tasks in parallel. The first
 * parameter is the maximum parallelism allowed. The second parameter is
 * optional and is for verbose prints. The operations run silently otherwise. */
let queue = new OperationQueue(3, {verbose: true});

/* Construct the operations graph. */
let operations = [...Array(7).keys()].map((i) => {
  /* Construct a new Operation. Operations take in a function with a callback
   * which you should call when the operation is complete. */
  return new Operation((done, fail) => {
    /* Set our operations to finish at a random interval. */
    setTimeout(() => done(), Math.random()*1000);
  });
});

/* Add the operations to the queue and start! The OperationQueue returns an
 * native Promise when all the operations are complete. You can check if the
 * queue is running by accessing the 'running' property. */
queue
  .addOperations(operations)
  .start()
  .then(() => console.log('Queue is running: ' + queue.running));

/* Control flow returns back to you immediately after starting the first batch
 * of operations. */
console.log('Queue is running: ' + queue.running);
