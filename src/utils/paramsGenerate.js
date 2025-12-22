
/**
 * Generate url params
 * @returns {URLSearchParams}
 * IParam { 
      name: string;
      value: string;
    }
 * @param args {IParam[]}
*/
export default function paramsGenerate(args) {
  const params = new URLSearchParams();

  if (args !== undefined && args.length > 0) {
    args.forEach((item) => {
      if (item.value) {
        params.append(item.name, item.value);
      }
    });
  }

  return params;
}
