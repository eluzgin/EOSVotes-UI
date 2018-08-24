export const stringify = data => {
  const object = {};
  for (let key in data){
    if (data[key].sort) {
      object[key] = [].concat(data[key]);
      object[key].sort();
    } else {
      object[key] = data[key];
    }
  }
  return JSON.stringify(object);
}
