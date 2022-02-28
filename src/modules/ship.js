const shipFactory = (id, length, coordinates) => ({
  id,
  length,
  coordinates,
  hitbox: [],
  hit(position) {
    if (JSON.stringify(this.coordinates).includes(position)) {
      this.hitbox.push(position);
    }
  },
  isSunk() {
    return !!(
      this.hitbox.length >= 0 && this.hitbox.length >= this.coordinates.length
    );
  },
});

export { shipFactory };
module.exports = shipFactory;
