function define(name, value) {
    Object.defineProperty(exports, name, {
      value: value,
      enumerable: true,
    });
  }

  define("cloudinaryType",["cards"]);
  define("competitionStatus",["incoming","past"]);