import del from "del"; // Очистка каталогу

export const reset = () => {
  return del(app.path.clean);
};
