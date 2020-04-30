export async function wait(timeout = 1000) {
  await new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
