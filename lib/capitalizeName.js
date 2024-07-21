export function capitalizeName(name) {
  const nameArray = name.split(" ");

  const capitalizedName = nameArray
    .map((name) => {
      return name[0].toUpperCase() + name.slice(1).toLowerCase();
    })
    .join(" ");
  return capitalizedName;
}
