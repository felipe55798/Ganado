export const csvToJSON = (csvText: any) => {
  let delimiter = ",";
  const lines: any[] = [];
  const linesArray = csvText.split("\n");
  linesArray.forEach((e: any) => {
    const row = e.replace(/[\s]+[,]+|[,]+[\s]+/g, ",").trim();
    lines.push(row);
  });
  lines.splice(lines.length - 1, 1);
  const result = [];
  if (lines[0].includes(";")) {
    delimiter = ";";
  }
  const headers = lines[0].split(delimiter);

  for (let i = 1; i < lines.length; i++) {
    const obj: any = {};
    const currentline = lines[i].split(delimiter);
    if (isAllEmpty(currentline)) {
      //Si es una fila vacia no la agrego
      for (let  j = 0; j < headers.length; j++) {
        obj[headers[j]] = isNaN(Number(currentline[j]))
          ? currentline[j]
          : Number(currentline[j]);
      }
      result.push(obj);
    }
  }
  return result;
};

const isAllEmpty = (array: any[]) => {
  let estado = false;
  array.forEach((el) => {
    estado = estado || Boolean(String(el));
  });
  return estado;
};
