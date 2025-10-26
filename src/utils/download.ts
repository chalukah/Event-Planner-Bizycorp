export function downloadText(filename: string, text: string, mimeType = 'text/plain;charset=utf-8') {
  const blob = new Blob([text], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadJSON(filename: string, data: unknown) {
  const json = JSON.stringify(data, null, 2);
  downloadText(filename, json, 'application/json');
}
