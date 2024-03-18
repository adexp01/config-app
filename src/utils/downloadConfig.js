export const downloadConfig = (config) => {
  const dataStr = JSON.stringify(config, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "config.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
