// Format the address to be more presentable
export function formatAddress(address: string):string {
  let temp = address.split('');
  temp.splice(6, 30, '.....');
  return temp.join('');
}